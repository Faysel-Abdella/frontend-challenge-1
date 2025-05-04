import React from 'react';
import TodoBoard from '@/components/TodoBoard';

export default function Tasks() {
  return (
    <section className="p-4 lg:p-0 my-14 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold">Task List By Status</h1>
      <TodoBoard />
    </section>
  );
}
