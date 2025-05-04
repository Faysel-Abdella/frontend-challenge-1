import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { todosState, groupedTodosState } from '../store/todoStore';
import TodoColumn from './todo-column';
import { useToast } from '@/hooks/use-toast';

export default function TodoBoard() {
  const [todos, setTodos] = useRecoilState(todosState);
  const groupedTodos = useRecoilValue(groupedTodosState);
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the todo being dragged
    const todoToMove = todos.find((todo) => todo.id === draggableId);
    if (!todoToMove) return;

    // Create a new array without the dragged todo
    const newTodos = todos.filter((todo) => todo.id !== draggableId);

    // Create a copy of the dragged todo with updated status
    const updatedTodo = {
      ...todoToMove,
      status: destination.droppableId as 'todo' | 'in-progress' | 'done',
      completed: destination.droppableId === 'done',
    };

    // Find the todos in the destination list
    const destinationTodos = todos.filter(
      (todo) =>
        todo.status === destination.droppableId && todo.id !== draggableId
    );

    // Insert the todo at the new position
    const updatedTodos = [...newTodos];

    // Find where to insert in the array maintaining overall order
    const destinationStatusTodos = updatedTodos.filter(
      (todo) => todo.status === destination.droppableId
    );

    if (destinationStatusTodos.length === 0) {
      updatedTodos.push(updatedTodo);
    } else {
      const insertIndex =
        updatedTodos.findIndex(
          (todo) => todo.status === destination.droppableId
        ) + destination.index;

      updatedTodos.splice(insertIndex, 0, updatedTodo);
    }

    setTodos(updatedTodos);

    toast({
      title: 'Task Status Updated!',
      description: `"
      "Task",
      ${todoToMove.title}" moved to ${destination.droppableId.replace(
        '-',
        ' '
      )}`,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        <TodoColumn title="To Do" todos={groupedTodos.todo} status="todo" />
        <TodoColumn
          title="In Progress"
          todos={groupedTodos['in-progress']}
          status="in-progress"
        />
        <TodoColumn title="Done" todos={groupedTodos.done} status="done" />
      </div>
    </DragDropContext>
  );
}
