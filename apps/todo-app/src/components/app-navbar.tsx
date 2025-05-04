import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ListChecks, // For tasks page
  BarChart, // For statistics page
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Define the types
interface NavItem {
  label: string;
  href: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: 'Tasks',
      href: '/tasks',
      icon: ListChecks,
    },
    {
      label: 'Statistics',
      href: '/statistics',
      icon: BarChart,
    },
  ];

  return (
    <nav className="w-full max-w-6xl mx-auto lg:mt-4  border-b border-border py-4">
      <div className=" mx-auto flex items-center justify-between px-4 lg:px-0">
        <div className="text-xl lg:text-3xl font-serif font-bold text-foreground">
          My Todo App
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-1 transition-all duration-300',
                  'hover:bg-primary/5 hover:font-semibold',
                  isActive
                    ? 'bg-primary/10 font-semibold text-primary' // Active page style
                    : 'text-foreground'
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />} {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="p-1"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 right-4 bg-card border border-border rounded-md shadow-lg p-1 space-y-1 w-48"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={cn(
                      'w-full justify-start flex items-center gap-2 rounded-full px-4 py-1 transition-all duration-300',
                      'hover:bg-primary/5 hover:font-semibold',
                      isActive
                        ? 'bg-primary/10 font-semibold text-primary-foreground' // Active page style
                        : 'text-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
