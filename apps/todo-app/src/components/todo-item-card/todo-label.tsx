import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLabelColorClasses } from '@/lib/colorUtils';
import type { TodoLabelColor } from '../../types/todo';

interface TodoLabelProps {
  label: string;
  labelColor?: TodoLabelColor;
}

export function TodoLabel({ label, labelColor }: TodoLabelProps) {
  return (
    <div
      className={cn(
        getLabelColorClasses(labelColor, false),
        'border inline-flex border-black/15 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors'
      )}
    >
      {labelColor && (
        <span
          className={cn('mr-1.5 h-2 w-2 rounded-full', `bg-${labelColor}-500`)}
        />
      )}
      <Tag className="w-3 h-3 mr-1" />
      <span>{label}</span>
    </div>
  );
}
