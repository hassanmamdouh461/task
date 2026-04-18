import React, { useState } from 'react';
import { Download, Copy, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskCard({ task, index }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };

  const handleCopy = async (e) => {
    e.stopPropagation(); // Prevent toggling if clicked on mobile
    await navigator.clipboard.writeText(task.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const element = document.createElement("a");
    const isFullProgram = task.codeSnippet.includes("namespace") || task.codeSnippet.includes("class Program");

    const fileContent = isFullProgram ? task.codeSnippet : `using System;
using System.Collections.Generic;
using System.Linq;

namespace CSharpTasks
{
    class Program
    {
        static void Main(string[] args)
        {
            // Task: ${task.title}
            // Level: ${task.difficulty}
            // Description: ${task.description}

            // ==========================================
            //              Start Your Code
            // ==========================================

${task.codeSnippet.split('\n').map(line => '            ' + line).join('\n')}

            // ==========================================
            //               End of Code
            // ==========================================

            Console.WriteLine("\\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}`;

    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Task-${task.id}.cs`;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Add onClick for mobile support so tapping expands it too
      onClick={() => setIsHovered(!isHovered)}
      className="bg-white dark:bg-gray-800/80 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-200 dark:border-gray-700/80 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden cursor-pointer"
    >
      {/* Header Strip - Always Visible */}
      <div className="p-4 sm:p-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0">
            {task.id}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{task.title}</h3>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <span className={`hidden sm:flex text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(task.difficulty)}`}>
            {task.difficulty}
          </span>
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-gray-400 dark:text-gray-500 ${isHovered ? 'text-indigo-500 dark:text-indigo-400' : ''}`}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      {/* Expandable Content Area */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/20"
          >
            <div 
              className="p-4 sm:p-5 lg:px-6 cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent closing when interacting with content
            >
              <div className="flex sm:hidden mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-5 leading-relaxed bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                {task.description}
              </p>
              
              <div className="relative group/code mb-5">
                <div className="absolute top-2 left-2 z-20">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-md transition-all text-xs font-medium backdrop-blur-sm border border-white/10"
                    title="نسخ الكود"
                  >
                    {copied ? <><Check size={14} className="text-green-400" /> تم النسخ</> : <><Copy size={14} /> انسخ</>}
                  </button>
                </div>
                
                <div className="bg-[#1e1e2e] rounded-xl p-4 sm:p-5 pt-12 overflow-x-auto shadow-inner dir-ltr text-left border border-gray-800">
                  <pre className="font-mono text-sm text-gray-300 whitespace-pre">
                    <code>{task.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={handleDownload}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-sm hover:shadow text-sm sm:text-base w-full sm:w-auto"
                >
                  <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span>تحميل الحل (.cs)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
