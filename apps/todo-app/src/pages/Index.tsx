import { RecoilRoot } from 'recoil';
import TodoForm from '../components/TodoForm';
import TodoSearch from '../components/TodoSearch';
import TodoStats from '../components/TodoStats';
import TodoBoard from '../components/TodoBoard';
import TodoList from '@/components/TodoList';
import Navbar from '@/components/AppNavbar';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <RecoilRoot>
      <div className="p-4 py-8 max-w-7xl mx-auto">
        <Navbar
          navItems={[
            { label: 'Home', onClick: () => console.log('Home clicked') },
            { label: 'About', onClick: () => console.log('About clicked') },
            { label: 'Contact', onClick: () => console.log('Contact clicked') },
          ]}
        />
        <HeroSection />
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
