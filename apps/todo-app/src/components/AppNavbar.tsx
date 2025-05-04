import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for the navigation items
interface NavItem {
  label: string;
  onClick: () => void;
}

const Navbar = ({ navItems }: { navItems: NavItem[] }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl lg:text-3xl font-serif font-bold text-foreground">
          My Todo
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" onClick={item.onClick}>
              {item.label}
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 right-0 bg-card border border-border rounded-md shadow-lg p-2 space-y-2 w-48"
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    item.onClick();
                    setMobileMenuOpen(false); // Close menu on item click
                  }}
                >
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
