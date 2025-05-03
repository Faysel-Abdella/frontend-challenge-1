
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  dueTime?: string;
  label?: string;
  labelColor?: TodoLabelColor;
  status: TodoStatus;
}

export type TodoLabelColor = 
  | 'red' 
  | 'blue' 
  | 'green' 
  | 'yellow' 
  | 'purple' 
  | 'pink'
  | 'indigo'
  | 'gray';

export type TodoStatus = 'todo' | 'in-progress' | 'done';

export const LABEL_COLORS: { value: TodoLabelColor; name: string }[] = [
  { value: 'red', name: 'Red' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
  { value: 'yellow', name: 'Yellow' },
  { value: 'purple', name: 'Purple' },
  { value: 'pink', name: 'Pink' },
  { value: 'indigo', name: 'Indigo' },
  { value: 'gray', name: 'Gray' },
];

export const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];
