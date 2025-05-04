import { useSetRecoilState, useRecoilState } from 'recoil';
import { Draggable } from '@hello-pangea/dnd';
import {
  todosState,
  formModeState,
  formDataState,
  formOpenState,
} from '../../store/todoStore';
import type { Todo } from '../../types/todo';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TodoItemContent } from './todo-item-content';

interface TodoItemProps {
  todo: Todo;
  index: number;
  isDraggable?: boolean;
}

export default function TodoItem({
  todo,
  index,
  isDraggable = false,
}: TodoItemProps) {
  const setTodos = useSetRecoilState(todosState);
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
    const formData = {
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
            'absolute w-2 h-full max-h-[30%] rounded-full self-center align-middle items-center justify-center left-5 top-10',
            `bg-${todo.color}-500`
          )}
        />
        <TodoItemContent
          todo={todo}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Card>
    );
  };

  if (isDraggable) {
    return (
      <Draggable draggableId={todo.id} index={index}>
        {(provided) => (
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
