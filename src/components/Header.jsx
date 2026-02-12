import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <Terminal size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">C# Master</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">الرئيسية</a>
          <a href="#tasks" className="hover:text-indigo-600 transition-colors">التاسكات</a>
        </nav>

        {/* Mobile menu button — larger touch target */}
        <button 
          className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors p-2 -m-2 rounded-lg active:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu dropdown with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1 font-medium text-gray-600">
              <a href="#" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 hover:bg-indigo-50 transition-colors py-3 px-3 rounded-lg active:bg-indigo-100 text-base">الرئيسية</a>
              <a href="#tasks" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 hover:bg-indigo-50 transition-colors py-3 px-3 rounded-lg active:bg-indigo-100 text-base">التاسكات</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
