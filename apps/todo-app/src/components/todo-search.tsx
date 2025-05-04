import { useRecoilState } from 'recoil';
import { todoSearchState, todoFilterState } from '../store/todoStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STATUS_OPTIONS } from '../types/todo';
import { Search } from 'lucide-react';

export default function TodoSearch() {
  const [searchQuery, setSearchQuery] = useRecoilState(todoSearchState);
  const [filter, setFilter] = useRecoilState(todoFilterState);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10"
        />
      </div>
      <Select
        value={filter}
        onValueChange={(value: string) => setFilter(value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          {STATUS_OPTIONS.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(searchQuery || filter !== 'all') && (
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery('');
            setFilter('all');
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
