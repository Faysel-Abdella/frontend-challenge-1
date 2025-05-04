import { RecoilRoot } from 'recoil';
import TodoForm from '../components/todo-form';
import TodoList from '@/components/todo-list';
import HeroSection from '@/components/hero-section';
import TodoSearch from '@/components/todo-search';
import TodoBoard from '@/components/todo-board';
import MotiveSection from '@/components/motive-section';

const Index = () => {
  return (
    <div className="p-4 w-full lg:py-4 max-w-7xl mx-auto">
      <HeroSection />
      <TodoForm />
      <TodoList />
      <MotiveSection />
    </div>
  );
};

export default Index;
