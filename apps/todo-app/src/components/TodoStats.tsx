
import { useRecoilValue } from 'recoil';
import { todosState } from '../store/todoStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function TodoStats() {
  const todos = useRecoilValue(todosState);
  
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const inProgress = todos.filter(todo => todo.status === 'in-progress').length;
  const pending = todos.filter(todo => !todo.completed && todo.status === 'todo').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 flex flex-col">
        <p className="text-muted-foreground text-sm">Total Tasks</p>
        <p className="text-2xl font-semibold">{total}</p>
      </Card>
      <Card className="p-4 flex flex-col">
        <p className="text-muted-foreground text-sm">Pending</p>
        <p className="text-2xl font-semibold text-todo-yellow">{pending}</p>
      </Card>
      <Card className="p-4 flex flex-col">
        <p className="text-muted-foreground text-sm">In Progress</p>
        <p className="text-2xl font-semibold text-todo-blue">{inProgress}</p>
      </Card>
      <Card className="p-4 flex flex-col">
        <p className="text-muted-foreground text-sm">Completed</p>
        <p className="text-2xl font-semibold text-todo-green">{completed}</p>
      </Card>
      <Card className="p-4 col-span-1 md:col-span-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm text-muted-foreground">Progress</p>
          <p className="text-sm font-medium">{completionPercentage}%</p>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </Card>
    </div>
  );
}
