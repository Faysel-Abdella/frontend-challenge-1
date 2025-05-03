'use client';

import React, { useState } from 'react';
import {
  Book,
  Briefcase,
  Home,
  ShoppingCart,
  Code,
  Tag,
  ListChecks,
  Star,
  Flag,
  Clock,
  Plus,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getLabelColorClasses, getTaskColorClass } from '@/lib/colorUtils';
import { type TodoLabelColor, LABEL_COLORS } from '@/types/todo';

interface CustomLabel {
  name: string;
  color: TodoLabelColor;
  icon: string | null;
  value: string;
}

interface PredefinedLabel {
  name: string;
  color: TodoLabelColor;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: string;
}

const predefinedLabels: PredefinedLabel[] = [
  { name: 'Study', color: 'blue', icon: Book, value: 'study' },
  { name: 'Work', color: 'indigo', icon: Briefcase, value: 'work' },
  { name: 'Personal', color: 'green', icon: Home, value: 'personal' },
  { name: 'Shopping', color: 'yellow', icon: ShoppingCart, value: 'shopping' },
  { name: 'Coding', color: 'purple', icon: Code, value: 'coding' },
];

const iconMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>> | undefined
> = {
  'list-checks': ListChecks,
  star: Star,
  flag: Flag,
  tag: Tag,
  clock: Clock,
  book: Book,
  briefcase: Briefcase,
  home: Home,
  shoppingcart: ShoppingCart,
  code: Code,
};

const availableIcons = [
  { name: 'list-checks', component: ListChecks },
  { name: 'star', component: Star },
  { name: 'flag', component: Flag },
  { name: 'tag', component: Tag },
  { name: 'clock', component: Clock },
  { name: 'book', component: Book },
  { name: 'briefcase', component: Briefcase },
  { name: 'home', component: Home },
  { name: 'shoppingcart', component: ShoppingCart },
  { name: 'code', component: Code },
];

interface LabelPickerProps {
  selectedLabelValue: string | null;
  setSelectedLabelValue: (value: string | null) => void;
  customLabels: CustomLabel[];
  setCustomLabels: React.Dispatch<React.SetStateAction<CustomLabel[]>>;
}

export function LabelPicker({
  selectedLabelValue,
  setSelectedLabelValue,
  customLabels,
  setCustomLabels,
}: LabelPickerProps) {
  const [isAddingCustomLabel, setIsAddingCustomLabel] = useState(false);
  const [customLabelName, setCustomLabelName] = useState('');
  const [customLabelColor, setCustomLabelColor] =
    useState<TodoLabelColor>('blue');
  const [customLabelIcon, setCustomLabelIcon] = useState<string | null>(null);

  const handleAddCustomLabel = () => {
    if (customLabelName.trim()) {
      const newValue = customLabelName.toLowerCase().replace(/\s+/g, '-');
      setCustomLabels((prev) => [
        ...prev,
        {
          name: customLabelName,
          color: customLabelColor,
          icon: customLabelIcon,
          value: newValue,
        },
      ]);
      setSelectedLabelValue(newValue);
      setIsAddingCustomLabel(false);
      setCustomLabelName('');
      setCustomLabelColor('blue');
      setCustomLabelIcon(null);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Label</Label>
      <div className="flex flex-wrap gap-2">
        {predefinedLabels.map((label) => (
          <button
            key={label.value}
            type="button"
            className={cn(
              'w-fit rounded-full px-2 py-1 text-xs flex items-center gap-1 cursor-pointer transition-colors duration-200',
              getLabelColorClasses(
                label.color,
                selectedLabelValue === label.value
              )
            )}
            onClick={() => setSelectedLabelValue(label.value)}
          >
            <label.icon className="h-3 w-3" />
            <span>{label.name}</span>
          </button>
        ))}
        {customLabels.map((label) => {
          const IconComponent = label.icon ? iconMap[label.icon] : Tag;
          return (
            <button
              key={label.value}
              type="button"
              className={cn(
                'w-fit rounded-full px-2 py-1 text-xs flex items-center gap-1 cursor-pointer transition-colors duration-200',
                getLabelColorClasses(
                  label.color,
                  selectedLabelValue === label.value
                )
              )}
              onClick={() => setSelectedLabelValue(label.value)}
            >
              {IconComponent && <IconComponent className="h-3 w-3" />}
              <span>{label.name}</span>
            </button>
          );
        })}
        <button
          type="button"
          className="w-fit rounded-full px-2 py-1 text-xs flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-200"
          onClick={() => setIsAddingCustomLabel(true)}
        >
          <Plus className="h-3 w-3" />
          <span>Add Custom</span>
        </button>
      </div>

      {isAddingCustomLabel && (
        <div className="mt-2 space-y-2">
          <Input
            type="text"
            placeholder="Label name"
            value={customLabelName}
            onChange={(e) => setCustomLabelName(e.target.value)}
          />
          <div>
            <Label>Label Color</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {LABEL_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={cn(
                    'w-8 h-8 rounded-full cursor-pointer transition-colors duration-200',
                    getTaskColorClass(color.value as TodoLabelColor),
                    customLabelColor === color.value
                      ? 'ring-2 ring-primary'
                      : 'opacity-70 hover:opacity-100'
                  )}
                  onClick={() =>
                    setCustomLabelColor(color.value as TodoLabelColor)
                  }
                />
              ))}
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start mt-2"
              >
                Icon:
                {customLabelIcon && iconMap[customLabelIcon] ? (
                  React.createElement(iconMap[customLabelIcon], {
                    className: 'ml-2 h-4 w-4',
                  })
                ) : (
                  <span>Select Icon</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="grid grid-cols-5 gap-2">
                {availableIcons.map((icon) => (
                  <Button
                    key={icon.name}
                    variant="ghost"
                    size="icon"
                    className="rounded-md h-8 w-8 p-0 flex items-center justify-center"
                    onClick={() => setCustomLabelIcon(icon.name)}
                  >
                    <icon.component className="h-4 w-4" />
                    {customLabelIcon === icon.name && (
                      <Check className="absolute h-3 w-3 text-primary bottom-0 right-0" />
                    )}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            size="sm"
            onClick={handleAddCustomLabel}
            disabled={!customLabelName.trim()}
            className="mt-2 h-7 mr-2"
          >
            Add Label
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddingCustomLabel(false)}
            className="mt-1 h-7"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
