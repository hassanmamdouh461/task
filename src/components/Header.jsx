import React from 'react';
import { Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Terminal size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">C# Master</h1>
        </div>
        
        <nav className="flex items-center gap-4 md:gap-8 font-medium text-gray-600 dark:text-gray-300 text-sm md:text-base">
          <a href="#tasks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Question Bank</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
