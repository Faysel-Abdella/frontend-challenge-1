import TodoStats from '@/components/todo-stats';
import React from 'react';

export default function Statistics() {
  return (
    <section className="p-4 lg:p-0 my-14 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold">Statistics of Tasks</h1>
      <TodoStats />
    </section>
  );
}
