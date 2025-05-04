import React, { useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { Draggable } from '@hello-pangea/dnd';
import {
  todosState,
  formModeState,
  formDataState,
  formOpenState,
} from '../store/todoStore';
import type { Todo, TodoLabelColor } from '../types/todo';
import { Clock, Edit, Tag, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getLabelColorClasses } from '@/lib/colorUtils';

interface TodoItemProps {
  todo: Todo;
  index: number;
  isDraggable?: boolean;
}

interface TodoFormData {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  label?: string;
  labelColor?: TodoLabelColor;
  status: string;
  color?: string;
  completed: boolean;
}

export default function TodoItem({
  todo,
  index,
  isDraggable = false,
}: TodoItemProps) {
  const setTodos = useSetRecoilState(todosState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [, setFormMode] = useRecoilState(formModeState);
  const [, setFormData] = useRecoilState(formDataState);
  const [, setFormOpen] = useRecoilState(formOpenState);

  const handleToggleComplete = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              completed: !t.completed,
              status: !t.completed ? 'done' : 'todo',
            }
          : t
      )
    );
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  const handleEdit = () => {
    const formData: TodoFormData = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      dueTime: todo.dueTime,
      label: todo.label,
      labelColor: todo.labelColor,
      status: todo.status,
      color: todo.color,
      completed: todo.completed,
    };
    setFormData(formData);
    setFormMode('edit');
    setFormOpen(true);
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

  const renderContent = () => {
    return (
      <Card
        className={cn(
          'overflow-hidden',
          todo.completed ? 'opacity-70' : 'bg-card border',
          `relative p-4 transition-all duration-200 shadow-sm hover:shadow-md `,
          todo.color &&
            (todo.completed
              ? `bg-${todo.color}-100 bg-opacity-90`
              : `bg-${todo.color}-100`)
        )}
        style={{ maxHeight: 'unset', height: 'fit-content' }}
      >
        <div
          className={cn(
            'absolute w-2 h-full max-h-[30%] rounded-full  self-center align-middle items-center justify-center left-5 top-10',
            `bg-${todo.color}-500`
            // todo.completed ? 'opacity-40' : 'opacity-100'
          )}
        />
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />

          <div className="flex-grow">
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full p-1 text-base font-medium border-b border-input focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  />
                ) : (
                  <div
                    className={cn(
                      'text-lg font-semibold tracking-tight',
                      todo.completed && 'line-through'
                    )}
                  >
                    {todo.title}
                  </div>
                )}

                {todo.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {todo.description}
                  </p>
                )}
              </div>
              <div className="h-fit">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleEdit}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="cursor-pointer text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div
              className={cn(
                'mt-3 flex flex-wrap w-full gap-2 items-center',
                todo.completed ? 'opacity-40' : 'opacity-100'
              )}
            >
              {todo.label && (
                <div
                  className={cn(
                    'border inline-flex border-red-600 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ',
                    getLabelColorClasses(todo.labelColor, false)
                  )}
                >
                  {todo.labelColor && (
                    <span
                      className={cn(
                        'mr-1.5 h-2 w-2 rounded-full',
                        `bg-${todo.labelColor}-500`
                      )}
                    />
                  )}
                  <Tag className="w-3 h-3 mr-1" />
                  <span>{todo.label}</span>
                </div>
              )}

              {todo.dueDate && (
                <div className="inline-flex items-center border-black/15 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{format(new Date(todo.dueDate), 'MMM d h:mm a')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  if (isDraggable) {
    return (
      <Draggable draggableId={todo.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-3"
          >
            {renderContent()}
          </div>
        )}
      </Draggable>
    );
  }

  return renderContent();
}
