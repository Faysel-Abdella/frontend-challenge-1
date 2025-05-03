import { TodoLabelColor } from '../types/todo';

export const getLabelColorClasses = (
  color: TodoLabelColor | undefined, // Make color optional
  selected: boolean
): string => {
  const colorMap: Record<
    TodoLabelColor,
    { bg: string; text: string; selectedBg: string; borderColor: string } // Add borderColor
  > = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      selectedBg: 'bg-blue-500',
      borderColor: 'border-blue-500', // Add borderColor
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      selectedBg: 'bg-green-500',
      borderColor: 'border-green-500', // Add borderColor
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      selectedBg: 'bg-yellow-500',
      borderColor: 'border-yellow-500', // Add borderColor
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      selectedBg: 'bg-red-500',
      borderColor: 'border-red-500', // Add borderColor
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      selectedBg: 'bg-purple-500',
      borderColor: 'border-purple-500', // Add borderColor
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
      selectedBg: 'bg-indigo-500',
      borderColor: 'border-indigo-500', // Add borderColor
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-700',
      selectedBg: 'bg-pink-500',
      borderColor: 'border-pink-500', // Add borderColor
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      selectedBg: 'bg-gray-500',
      borderColor: 'border-gray-500', // Add borderColor
    },
  };

  if (!color) {
    return 'border-gray-300 bg-gray-100 text-gray-700'; // Default for no color
  }

  if (selected) {
    return `${colorMap[color].selectedBg} text-white border-2 border-${color}`; // Added border-2
  }
  return `${colorMap[color].bg} ${colorMap[color].text} border border-${color}`; // Added border
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
