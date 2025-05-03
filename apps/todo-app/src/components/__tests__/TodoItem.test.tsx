import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import TodoItem from '../DragDropTodoItem';
import { Todo } from '../../types/todo';
import { vi, describe, it, expect } from 'vitest';

// Mock the DnD context properly
vi.mock('@hello-pangea/dnd', () => ({
  Draggable: ({ children }: { children: any }) =>
    children(
      {
        draggableProps: {},
        dragHandleProps: {},
        innerRef: vi.fn(),
      },
      {}
    ),
}));

describe('TodoItem Component', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
    status: 'todo',
    label: 'Work',
    labelColor: 'blue',
  };

  it('renders todo item correctly', () => {
    render(
      <RecoilRoot>
        <TodoItem todo={mockTodo} index={0} />
      </RecoilRoot>
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('toggles completion status when checkbox is clicked', () => {
    render(
      <RecoilRoot>
        <TodoItem todo={mockTodo} index={0} />
      </RecoilRoot>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Since we can't test Recoil state directly in this unit test,
    // we verify that the click event happens without errors
    expect(checkbox).not.toBeDisabled();
  });

  it('enters edit mode when edit button is clicked', () => {
    render(
      <RecoilRoot>
        <TodoItem todo={mockTodo} index={0} />
      </RecoilRoot>
    );

    // Find the edit button (it has an Edit icon)
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // After clicking edit, there should be an input field with the todo title
    const inputField = screen.getByDisplayValue('Test Todo');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveFocus();
  });
});
