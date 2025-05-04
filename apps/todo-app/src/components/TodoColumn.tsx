import { Todo, TodoStatus } from '../types/todo';
import TodoItem from './DragDropTodoItem';
import { Droppable } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';

interface TodoColumnProps {
  title: string;
  todos: Todo[];
  status: TodoStatus;
}

export default function TodoColumn({ title, todos, status }: TodoColumnProps) {
  return (
    <div className="flex flex-col shadow border border-black/5 w-full min-w-[300px] bg-secondary/50 rounded-lg py-4">
      <h2 className="text-lg font-semibold px-4">
        {title} ({todos.length})
      </h2>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-grow min-h-[200px] transition-colors rounded-lg p-4',
              snapshot.isDraggingOver
                ? 'bg-accent/40 border-2 border-primary/70 border-dashed'
                : ''
            )}
          >
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                isDraggable={true}
              />
            ))}
            {provided.placeholder}
            {todos.length === 0 && (
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm italic">
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
