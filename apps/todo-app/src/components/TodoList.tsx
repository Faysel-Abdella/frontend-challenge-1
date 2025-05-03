import { todosState } from '@/store/todoStore';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TodoItem from './TodoItem';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '@/types/todo';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'incomplete', label: 'To Do Now' },
  { value: 'completed', label: 'Done' },
  { value: 'deadlinePassed', label: 'Deadline Passed' },
  { value: 'latestCreated', label: 'Latest Created' },
];

const itemVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function TodoList() {
  const [todos] = useRecoilState(todosState);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [isSearching, setIsSearching] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid'); // 'grid' or 'list'

  useEffect(() => {
    let filtered = [...todos];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(lowerQuery) ||
          (todo.description &&
            todo.description.toLowerCase().includes(lowerQuery))
      );
      setLayout('list'); // Switch to list layout when searching
      setIsSearching(true);
    } else {
      setIsSearching(false);
      if (filter !== 'all') {
        setLayout('list'); // Stay in list layout if a filter is active
      } else {
        setLayout('grid'); // Default to grid layout when no search and no active filter
      }
      switch (filter) {
        case 'incomplete':
          filtered = filtered.filter((todo) => !todo.completed);
          break;
        case 'completed':
          filtered = filtered.filter((todo) => todo.completed);
          break;
        case 'deadlinePassed':
          filtered = filtered.filter(
            (todo) =>
              todo.dueDate &&
              new Date(todo.dueDate) < new Date() &&
              !todo.completed
          );
          break;
        case 'latestCreated':
          filtered = [...filtered].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        default:
          break;
      }
    }

    setFilteredTodos(filtered);
  }, [todos, filter, searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        className="mb-4 flex  items-center space-x-4"
        layout // Enable layout animation for width change
      >
        {!isSearching && (
          <motion.h1
            className="text-xl font-semibold"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 1 }}
          >
            Your Tasks
          </motion.h1>
        )}
        <motion.div
          className="flex-1 relative"
          style={{ width: isSearching ? '100%' : 'auto' }}
          layout
        >
          <Input
            id="search"
            type="text"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
            onBlur={() => {
              if (!searchQuery) setIsSearching(false);
            }}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </motion.div>
        <div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[120px] md:w-[200px] lg:w-[280px]">
              <SelectValue placeholder="Filter Tasks" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {layout === 'grid' && (
        <motion.div
          className="w-full"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            columns: 'auto 300px',
            gap: '1rem',
          }}
        >
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="break-inside-avoid mb-4"
              >
                <TodoItem todo={todo} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredTodos.length === 0 && filter === 'all' && !searchQuery && (
            <p className="text-muted-foreground col-span-full">
              No tasks yet. Add some!
            </p>
          )}
          {filteredTodos.length === 0 && (filter !== 'all' || searchQuery) && (
            <p className="text-muted-foreground col-span-full">
              No todos match your criteria.
            </p>
          )}
        </motion.div>
      )}

      {layout === 'list' && (
        <motion.div
          className="flex flex-col space-y-2"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <TodoItem todo={todo} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredTodos.length === 0 && (
            <p className="text-muted-foreground">
              No todos match your criteria.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
