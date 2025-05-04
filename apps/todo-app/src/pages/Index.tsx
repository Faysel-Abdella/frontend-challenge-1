import { RecoilRoot } from 'recoil';
import TodoForm from '../components/todo-form';
import TodoList from '@/components/todo-list';
import HeroSection from '@/components/hero-section';

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
