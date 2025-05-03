
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Draggable } from '@hello-pangea/dnd';
import { todosState } from '../store/todoStore';
import { Todo } from '../types/todo';
import { Check, Clock, Edit, Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

export default function TodoItem({ todo, index }: TodoItemProps) {
  const setTodos = useSetRecoilState(todosState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggleComplete = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id
          ? { ...t, completed: !t.completed, status: !t.completed ? 'done' : 'todo' }
          : t
      )
    );
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, title: editedTitle } : t
        )
      );
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <Card
            className={cn(
              "p-4 transition-all duration-200 shadow-sm hover:shadow-md",
              snapshot.isDragging ? "shadow-lg ring-2 ring-primary/20" : "",
              todo.completed ? "bg-secondary/50" : "bg-card"
            )}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggleComplete}
                className="mt-1"
              />
              
              <div className="flex-grow">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full p-1 text-base font-medium border-b border-input focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className={cn("text-base font-medium", todo.completed && "line-through text-muted-foreground")}>
                    {todo.title}
                  </div>
                )}
                
                {todo.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{todo.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2 items-center">
                  {todo.label && (
                    <div className="flex items-center text-xs">
                      <div 
                        className={cn(
                          "w-3 h-3 rounded-full mr-1",
                          todo.labelColor ? `bg-todo-${todo.labelColor}` : "bg-todo-gray"
                        )}
                      ></div>
                      <Tag className="w-3 h-3 mr-1" />
                      <span>{todo.label}</span>
                    </div>
                  )}
                  
                  {todo.dueDate && (
                    <div className="flex items-center text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>
                        {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                        {todo.dueTime && ` at ${todo.dueTime}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
