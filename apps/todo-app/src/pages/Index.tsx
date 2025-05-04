import { RecoilRoot } from 'recoil';
import TodoForm from '../components/TodoForm';
import TodoList from '@/components/TodoList';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="p-4 lg:py-4 max-w-7xl mx-auto">
      <HeroSection />
      <TodoForm />
      <TodoList />

      {/* <TodoStats />
        <TodoSearch />
        <TodoBoard /> */}
    </div>
  );
};

export default Index;
