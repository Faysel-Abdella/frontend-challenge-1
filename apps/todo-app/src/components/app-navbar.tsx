import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ListChecks, // For tasks page
  BarChart, // For statistics page
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the types
interface NavItem {
  label: string;
  onClick: () => void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const Navbar = ({ navItems }: { navItems: NavItem[] }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="max-w-6xl mx-auto lg:mt-4  border-b border-border py-4">
      <div className=" mx-auto flex items-center justify-between">
        <div className="text-xl lg:text-3xl font-serif font-bold text-foreground">
          My Todo App
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-1.5  rounded-full hover:bg-primary/5 hover:font-semibold transition-all duration-300  px-4 py-1" // Added class for icon spacing
            >
              {item.icon && <item.icon className="h-4 w-4" />} {item.label}
            </Link>
          ))}
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
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start flex items-center gap-2 rounded-full hover:bg-primary/5 hover:font-semibold transition-all duration-300" // Added class for icon
                  onClick={() => {
                    item.onClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
