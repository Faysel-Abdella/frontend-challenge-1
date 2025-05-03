import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getTaskColorClass } from '@/lib/colorUtils';
import { type TodoLabelColor } from '@/types/todo';

const availableTaskColors: TodoLabelColor[] = [
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'indigo',
  'pink',
];

interface ColorPickerProps {
  taskColor: TodoLabelColor | null;
  setTaskColor: (color: TodoLabelColor | null) => void;
}

export function ColorPicker({ taskColor, setTaskColor }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label>Task Color</Label>
      <div className="flex flex-wrap gap-2">
        {availableTaskColors.map((color) => (
          <button
            key={color}
            type="button"
            className={cn(
              'size-8 rounded-full text-white',
              getTaskColorClass(color),
              taskColor === color && 'ring-1 ring-offset-2 ring-black'
            )}
            onClick={() => setTaskColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
