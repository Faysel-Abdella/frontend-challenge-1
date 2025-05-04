import { Textarea } from '@/components/ui/textarea';

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  return (
    <div className="pt-1 pb-1">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add description..."
        rows={3}
        className="resize-none w-full focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
