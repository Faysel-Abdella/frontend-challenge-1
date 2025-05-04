import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import TodoStats from '../todo-stats';
import { todosState } from '../../store/todoStore';
import { Todo } from '../../types/todo';
import { describe, it, expect } from 'vitest';

describe('TodoStats Component', () => {
  it('displays correct stats when there are no todos', () => {
    render(
      <RecoilRoot>
        <TodoStats />
      </RecoilRoot>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('displays correct stats with todos', () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Todo 1',
        completed: true,
        createdAt: new Date().toISOString(),
        status: 'done',
        description: '',
        labelColor: 'blue',
      },
      {
        id: '2',
        title: 'Todo 2',
        completed: false,
        createdAt: new Date().toISOString(),
        status: 'todo',
        description: '',
        labelColor: 'red',
      },
    ];

    render(
      <RecoilRoot initializeState={({ set }) => set(todosState, mockTodos)}>
        <TodoStats />
      </RecoilRoot>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
