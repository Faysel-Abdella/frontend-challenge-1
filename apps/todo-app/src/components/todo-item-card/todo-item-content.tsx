'use client';

import type React from 'react';
import { useState } from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Todo } from '../../types/todo';
import { TodoLabel } from './todo-label';
import { TodoDueDate } from './todo-due-date';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../store/todoStore';

interface TodoItemContentProps {
  todo: Todo;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function TodoItemContent({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}: TodoItemContentProps) {
  console.log('TodoItemContent', todo.labelColor);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const setTodos = useSetRecoilState(todosState);

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
    <div className="flex items-start gap-3">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={onToggleComplete}
        className="mt-1"
      />

      <div className="flex-grow">
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            {isEditing ? (
              <TodoTitleEditor
                value={editedTitle}
                onChange={setEditedTitle}
                onSave={handleSaveEdit}
                onKeyDown={handleKeyDown}
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
          <TodoItemMenu onEdit={onEdit} onDelete={onDelete} />
        </div>

        <TodoItemFooter todo={todo} />
      </div>
    </div>
  );
}

interface TodoTitleEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

function TodoTitleEditor({
  value,
  onChange,
  onSave,
  onKeyDown,
}: TodoTitleEditorProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onSave}
      onKeyDown={onKeyDown}
      autoFocus
      className="w-full p-1 text-base font-medium border-b border-input focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
    />
  );
}

interface TodoItemMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

function TodoItemMenu({ onEdit, onDelete }: TodoItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface TodoItemFooterProps {
  todo: Todo;
}

function TodoItemFooter({ todo }: TodoItemFooterProps) {
  console.log('todo footer', todo);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {todo.label && (
        <TodoLabel labelColor={todo.labelColor} label={todo.label} />
      )}
      {todo.dueDate && <TodoDueDate dueDate={todo.dueDate} />}
    </div>
  );
}
