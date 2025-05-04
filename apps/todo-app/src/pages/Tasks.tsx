import React from 'react';
import TodoBoard from '@/components/todo-board';

export default function Tasks() {
  return (
    <section className="p-4 lg:p-0 my-14 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold">Task List By Status</h1>
      <p className="text-base text-muted-foreground pb-5 mt-1">
        Drag and drop your tasks from your To Do column to In Progress or Done.
      </p>
      <TodoBoard />
    </section>
  );
}
