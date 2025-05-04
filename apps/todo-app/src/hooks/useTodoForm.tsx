import type React from 'react';

import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
  todosState,
  createTodo,
  formModeState,
  formDataState,
  formOpenState,
} from '@/store/todoStore';
import type { TodoLabelColor } from '@/types/todo';

interface CustomLabel {
  name: string;
  color: TodoLabelColor;
  icon: string | null;
  value: string;
}

export function useTodoForm() {
  const setTodos = useSetRecoilState(todosState);
  const [formMode, setFormMode] = useRecoilState(formModeState);
  const [formData, setFormData] = useRecoilState<{
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
    label?: string;
    labelColor?: TodoLabelColor;
    status: string;
    color?: string;
    createdAt?: string; // Added createdAt property
    completed?: boolean; // Added completed property
  }>(formDataState);
  const [isFormOpen, setIsFormOpen] = useRecoilState(formOpenState);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dueTime, setDueTime] = useState('');
  const [selectedLabelValue, setSelectedLabelValue] = useState<string | null>(
    null
  );
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [customLabels, setCustomLabels] = useState<CustomLabel[]>([]);
  const [taskColor, setTaskColor] = useState<TodoLabelColor | null>(null);

  // Set form to be open by default
  useEffect(() => {
    setIsFormOpen(true);
  }, []);

  // Initialize form fields from formData when in edit mode
  useEffect(() => {
    if (formMode === 'edit' && formData) {
      setTitle(formData.title || '');
      setDescription(formData.description || '');
      setDueDate(formData.dueDate ? new Date(formData.dueDate) : undefined);
      setDueTime(formData.dueTime || '');
      setSelectedLabelValue(
        formData.label
          ? formData.label.toLowerCase().replace(/\s+/g, '-')
          : null
      );
      setStatus(formData.status as 'todo' | 'in-progress' | 'done');
      setTaskColor((formData.color as TodoLabelColor) || null);
      setIsFormExpanded(true);
      setIsFormOpen(true);
    }
  }, [formMode, formData]);

  const getSelectedLabelData = () => {
    // This function will be imported from LabelPicker in a real implementation
    // For now, we'll return a simplified version
    return {
      name: selectedLabelValue || '',
      color: 'blue' as TodoLabelColor,
      icon: null,
      value: selectedLabelValue || '',
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const labelData = getSelectedLabelData();

    if (formMode === 'edit' && formData) {
      // Update existing todo
      const completed = formData.completed || false; // Initialize 'completed' with a default value

      const updatedTodo = {
        ...formData,
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString().split('T')[0] : undefined,
        dueTime,
        label: labelData.name,
        labelColor: labelData.color,
        status,
        icon: labelData.icon,
        color: taskColor,
        completed, // Ensure 'completed' is included
        createdAt: formData.createdAt, // Ensure 'createdAt' is included
      };

      setTodos((prev) =>
        prev.map((todo) => (todo.id === formData.id ? updatedTodo : todo))
      );
    } else {
      // Create new todo
      const newTodo = createTodo({
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString().split('T')[0] : undefined,
        dueTime,
        label: labelData.name,
        labelColor: labelData.color,
        status,
        icon: labelData.icon,
        color: taskColor,
      });

      setTodos((prev) => [newTodo, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setDueTime('');
    setSelectedLabelValue(null);
    setStatus('todo');
    setIsFormExpanded(false);
    setFormMode('create');
    setFormData(null);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    dueTime,
    setDueTime,
    selectedLabelValue,
    setSelectedLabelValue,
    status,
    setStatus,
    isFormExpanded,
    setIsFormExpanded,
    customLabels,
    setCustomLabels,
    taskColor,
    setTaskColor,
    handleSubmit,
    resetForm,
    formMode,
  };
}
