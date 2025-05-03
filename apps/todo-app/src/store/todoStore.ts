
import { atom, selector } from 'recoil';
import { Todo, TodoStatus } from '../types/todo';
import { v4 as uuidv4 } from 'uuid';

// Local storage persistence
const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any) => {
    if (newValue.length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

// Todos atom
export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
  effects: [localStorageEffect('todos')],
});

// Filter atom
export const todoFilterState = atom<TodoStatus | 'all'>({
  key: 'todoFilterState',
  default: 'all',
});

// Search query atom
export const todoSearchState = atom<string>({
  key: 'todoSearchState',
  default: '',
});

// Filtered todos selector
export const filteredTodosState = selector({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const todos = get(todosState);
    const filter = get(todoFilterState);
    const searchQuery = get(todoSearchState).toLowerCase();

    return todos
      .filter(todo => {
        const matchesFilter = filter === 'all' || todo.status === filter;
        const matchesSearch = 
          todo.title.toLowerCase().includes(searchQuery) || 
          (todo.description?.toLowerCase().includes(searchQuery) || false) ||
          (todo.label?.toLowerCase().includes(searchQuery) || false);
        
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by creation date, newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  },
});

// Grouped todos by status
export const groupedTodosState = selector({
  key: 'groupedTodosState',
  get: ({ get }) => {
    const todos = get(todosState);
    
    return {
      todo: todos.filter(todo => todo.status === 'todo'),
      'in-progress': todos.filter(todo => todo.status === 'in-progress'),
      done: todos.filter(todo => todo.status === 'done')
    };
  },
});

// Helper functions for CRUD operations
export const createTodo = (
  todoData: Omit<Todo, 'id' | 'createdAt' | 'completed'>
): Todo => {
  return {
    id: uuidv4(),
    title: todoData.title,
    description: todoData.description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: todoData.dueDate,
    dueTime: todoData.dueTime,
    label: todoData.label,
    labelColor: todoData.labelColor,
    status: todoData.status,
  };
};
