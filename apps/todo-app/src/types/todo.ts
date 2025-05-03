export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  dueTime?: string;
  label?: string;
  labelColor: TodoLabelColor; // Make labelColor non-optional to match the form's default
  status: TodoStatus;
  icon?: string | null; // Add the icon property
  color?: string 
  
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

export const LABEL_COLORS: { value: TodoLabelColor; label: string }[] = [ // Changed 'name' to 'label' for consistency with Select
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink', label: 'Pink' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'gray', label: 'Gray' },
];

export const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];