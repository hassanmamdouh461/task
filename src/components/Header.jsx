import React from 'react';
import { Terminal, Code2, BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <Terminal size={28} strokeWidth={2.5} />
          <h1 className="text-2xl font-bold tracking-tight">C# Master</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">الرئيسية</a>
          <a href="#tasks" className="hover:text-indigo-600 transition-colors">التاسكات</a>
        </nav>

      </div>
    </header>
  );
}
