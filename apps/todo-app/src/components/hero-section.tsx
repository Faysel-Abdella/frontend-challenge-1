import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming you have Button component
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todosState } from '@/store/todoStore';

interface HeroSectionProps {
  todosLength: number;
}

const HeroSection: React.FC = () => {
  const todosLength = useRecoilValue(todosState).length;

  if (todosLength > 0) {
    return null; // Hide the hero section if there are todos
  }

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-28">
      <motion.h1
        variants={headingVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-5xl py-3 font-sans md:text-5xl font-extrabold text-white bg-gradient-to-r from-black/80 to-black/50 text-transparent bg-clip-text drop-shadow-xl backdrop-hue-rotate-30"
      >
        Get Organized with My ToDo
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.9 }}
        className="mt-1"
      >
        <p className="text-sm md:text-lg text-muted-foreground">
          Ready to take control of your tasks?
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
