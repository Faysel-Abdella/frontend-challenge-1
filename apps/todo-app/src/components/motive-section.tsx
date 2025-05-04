import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming you have Button component
import { useRecoilValue } from 'recoil';
import { todosState } from '@/store/todoStore';
import { cn } from '@/lib/utils';

const MotiveSection: React.FC = () => {
  const todosLength = useRecoilValue(todosState).length;

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center pt-28 pb-16',
        todosLength < 1 && 'hidden'
      )}
    >
      <motion.h1
        variants={headingVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-5xl py-3  font-sans md:text-5xl font-extrabold  text-black/70 backdrop-hue-rotate-60"
      >
        Unleash Your Productivity
        <br />
        With <span className="text-primary ">My ToDo</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.9 }}
        className="mt-1"
      >
        <p className="text-sm md:text-lg text-muted-foreground">
          Master your tasks and boost your efficiency.
        </p>
      </motion.div>
    </div>
  );
};

export default MotiveSection;
