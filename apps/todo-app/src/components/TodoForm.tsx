import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState, createTodo } from '../store/todoStore';
import { TodoLabelColor, LABEL_COLORS } from '../types/todo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Check,
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
// import { getLabelColorClasses, getTaskColorClass } from '../utils/colorUtils';
import { Badge } from '@/components/ui/badge';
import { getLabelColorClasses, getTaskColorClass } from '@/lib/colorUtils';

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
  // Add more predefined labels as needed
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

interface CustomLabel {
  name: string;
  color: TodoLabelColor;
  icon: string | null;
  value: string;
}

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

const availableTaskColors: TodoLabelColor[] = [
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'indigo',
  'pink',
];

export default function TodoForm() {
  const setTodos = useSetRecoilState(todosState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dueTime, setDueTime] = useState('');
  const [selectedLabelValue, setSelectedLabelValue] = useState<string | null>(
    null
  );
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [isAddingCustomLabel, setIsAddingCustomLabel] = useState(false);
  const [customLabelName, setCustomLabelName] = useState('');
  const [customLabelColor, setCustomLabelColor] =
    useState<TodoLabelColor>('blue');
  const [customLabelIcon, setCustomLabelIcon] = useState<string | null>(null);
  const [customLabels, setCustomLabels] = useState<CustomLabel[]>([]);
  const [taskColor, setTaskColor] = useState<TodoLabelColor | null>(null);

  const getSelectedLabelData = () => {
    const predefined = predefinedLabels.find(
      (label) => label.value === selectedLabelValue
    );
    const custom = customLabels.find(
      (label) => label.value === selectedLabelValue
    );
    if (predefined) {
      return {
        name: predefined.name,
        color: predefined.color as TodoLabelColor,
        icon: predefined.icon,
        value: predefined.value,
      };
    }
    if (custom) {
      const IconComponent = custom.icon ? iconMap[custom.icon] : Tag;
      return {
        name: custom.name,
        color: custom.color,
        icon: IconComponent,
        value: custom.value,
      };
    }
    return { name: '', color: 'blue' as TodoLabelColor, icon: Tag, value: '' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const labelData = getSelectedLabelData();

    const newTodo = createTodo({
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : undefined,
      dueTime,
      label: labelData.name,
      labelColor: labelData.color,
      status,
      icon: labelData.icon?.name?.toLowerCase() || null,
      color: taskColor,
    });

    setTodos((prev) => [newTodo, ...prev]);
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
    setIsAddingCustomLabel(false);
    setCustomLabelName('');
    setCustomLabelColor('blue');
    setCustomLabelIcon(null);
    setTaskColor(null);
  };

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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 mb-8 shadow-sm">
        <form onSubmit={handleSubmit}>
          <motion.div layout className="space-y-4">
            <motion.div layout>
              <Input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!isFormExpanded && e.target.value) {
                    setIsFormExpanded(true);
                  }
                }}
                placeholder="What needs to be done?"
                className="text-lg font-medium"
                autoFocus
              />
            </motion.div>

            {isFormExpanded && (
              <motion.div layout className="space-y-4">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description..."
                  rows={3}
                  className="resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Due Date */}
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !dueDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? (
                            format(dueDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Due Time */}
                  <div className="space-y-2">
                    <Label>Due Time</Label>
                    <Input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                    />
                  </div>
                </div>

                {/* Label Picker */}
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
                      const IconComponent = label.icon
                        ? iconMap[label.icon]
                        : Tag;
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
                          {IconComponent && (
                            <IconComponent className="h-3 w-3" />
                          )}
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
                                getTaskColorClass(
                                  color.value as TodoLabelColor
                                ),
                                customLabelColor === color.value
                                  ? 'ring-2 ring-primary'
                                  : 'opacity-70 hover:opacity-100'
                              )}
                              onClick={() =>
                                setCustomLabelColor(
                                  color.value as TodoLabelColor
                                )
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

                {/* Task Color Picker */}
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
                          taskColor === color &&
                            'ring-1 ring-offset-2 ring-black'
                        )}
                        onClick={() => setTaskColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="reset" variant="ghost" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Task
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
}
