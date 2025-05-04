import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Tasks from './pages/Tasks';
import Statistics from './pages/Statistics';
import Navbar from './components/AppNavbar';
import { ChartColumnStacked, ChartSpline, Home } from 'lucide-react';
import { RecoilRoot } from 'recoil';
// import { Home, ChartColumnStacked, ChartSpline } from './icons'; // Adjust the path as needed

const queryClient = new QueryClient();
const navLinks = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    onClick: () => console.log('Home clicked'),
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: ChartColumnStacked,
    onClick: () => console.log('About clicked'),
  },
  {
    label: 'Statistics',
    href: '/statistics',
    icon: ChartSpline,
    onClick: () => console.log('Contact clicked'),
  },
];

const App = () => (
  <RecoilRoot>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar navItems={navLinks} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </RecoilRoot>
);

export default App;
