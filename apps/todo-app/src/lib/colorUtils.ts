import { TodoLabelColor } from '../types/todo';

export const getLabelColorClasses = (
  color: TodoLabelColor,
  selected: boolean
): string => {
  const colorMap: Record<TodoLabelColor, { bg: string; text: string; selectedBg: string }> = {
    blue: { bg: 'bg-blue-200', text: 'text-blue-700', selectedBg: 'bg-blue-500' },
    green: { bg: 'bg-green-200', text: 'text-green-700', selectedBg: 'bg-green-500' },
    yellow: { bg: 'bg-yellow-200', text: 'text-yellow-700', selectedBg: 'bg-yellow-500' },
    red: { bg: 'bg-red-200', text: 'text-red-700', selectedBg: 'bg-red-500' },
    purple: { bg: 'bg-purple-200', text: 'text-purple-700', selectedBg: 'bg-purple-500' },
    indigo: { bg: 'bg-indigo-200', text: 'text-indigo-700', selectedBg: 'bg-indigo-500' },
    pink: { bg: 'bg-pink-200', text: 'text-pink-700', selectedBg: 'bg-pink-500' },
    gray: { bg: 'bg-gray-200', text: 'text-gray-700', selectedBg: 'bg-gray-500' },
  };

  if (selected) {
    return `${colorMap[color].selectedBg} text-white`;
  }
  return `${colorMap[color].bg} ${colorMap[color].text}`;
};

export const getTaskColorClass = (color: TodoLabelColor | null): string => {
  if (!color) return '';
  
  const colorMap: Record<TodoLabelColor, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
    gray: 'bg-gray-500',
  };
  
  return colorMap[color];
};