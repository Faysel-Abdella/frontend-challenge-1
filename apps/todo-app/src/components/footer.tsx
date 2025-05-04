import React from 'react';

export default function Footer() {
  return (
    <footer className="py-5 md:py-8  text-center w-full max-w-5xl mt-20 border-t mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {' '}
        <span className="text-primary font-bold">My ToDo</span> Get Organized{' '}
      </p>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} My ToDo
      </p>
    </footer>
  );
}
