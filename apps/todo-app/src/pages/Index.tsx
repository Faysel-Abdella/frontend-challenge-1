import { RecoilRoot } from 'recoil';
import TodoForm from '../components/TodoForm';
import TodoSearch from '../components/TodoSearch';
import TodoStats from '../components/TodoStats';
import TodoBoard from '../components/TodoBoard';
import TodoList from '@/components/TodoList';

const Index = () => {
  return (
    <RecoilRoot>
      <div className="container py-8 max-w-7xl mx-auto">
        <TodoForm />
        <TodoList />

        {/* <TodoStats />
        <TodoSearch />
        <TodoBoard /> */}
      </div>
    </RecoilRoot>
  );
};

export default Index;
