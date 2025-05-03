import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState, createTodo } from '../store/todoStore';
import { TodoLabelColor, LABEL_COLORS, STATUS_OPTIONS } from '../types/todo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TodoForm() {
  const setTodos = useSetRecoilState(todosState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dueTime, setDueTime] = useState('');
  const [label, setLabel] = useState('');
  const [labelColor, setLabelColor] = useState<TodoLabelColor>('blue');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo = createTodo({
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : undefined,
      dueTime,
      label,
      labelColor,
      status,
    });

    setTodos((prev) => [newTodo, ...prev]);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setDueTime('');
    setLabel('');
    setLabelColor('blue');
    setStatus('todo');
    setIsFormExpanded(false);
  };

  return (
    <Card className="p-6 mb-8 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!isFormExpanded && e.target.value) {
                  setIsFormExpanded(true);
                }
              }}
              placeholder="What needs to be done?"
              className="text-lg font-medium"
              autoFocus
            />
          </div>

          {isFormExpanded && (
            <>
              <div>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !dueDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? (
                          format(dueDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Due Time</Label>
                  <Input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Add label..."
                      className="flex-grow"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex-shrink-0"
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full',
                              `bg-todo-${labelColor}`
                            )}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="grid grid-cols-4 gap-2">
                          {LABEL_COLORS.map((color) => (
                            <Button
                              key={color.value}
                              variant="ghost"
                              size="icon"
                              className="rounded-md h-10 w-10 p-0"
                              onClick={() => setLabelColor(color.value)}
                            >
                              <div
                                className="relative w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: `var(--todo-${color.value})`,
                                }}
                              >
                                {labelColor === color.value && (
                                  <Check className="h-4 w-4 text-white" />
                                )}
                              </div>
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={status}
                    onValueChange={(val: any) => setStatus(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            {isFormExpanded && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={!title.trim()}>
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
