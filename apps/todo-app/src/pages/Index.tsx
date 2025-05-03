import { RecoilRoot } from 'recoil';
import TodoForm from '../components/TodoForm';
import TodoSearch from '../components/TodoSearch';
import TodoStats from '../components/TodoStats';
import TodoBoard from '../components/TodoBoard';

const Index = () => {
  return (
    <RecoilRoot>
      <div className="container py-8 max-w-7xl mx-auto">
        {/* <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Vivid Todo</h1>
          <p className="text-muted-foreground text-center text-lg">
            Organize your tasks with our beautiful, drag-and-drop todo app
          </p>
        </header> */}

        <TodoForm />
        <TodoStats />
        <TodoSearch />
        <TodoBoard />
      </div>
    </RecoilRoot>
  );
};

export default Index;
