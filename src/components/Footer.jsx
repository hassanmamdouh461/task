import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
          </div>
          
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-indigo-600 transition-colors"><Github size={24} /></a>
            <a href="#" className="hover:text-blue-700 transition-colors"><Linkedin size={24} /></a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400 text-sm flex items-center justify-center gap-1">
          <span>صنع بـ</span>
          <Heart size={16} className="text-red-500 fill-red-500" />
          <span>في مصر</span>
        </div>
      </div>
    </footer>
  );
}
