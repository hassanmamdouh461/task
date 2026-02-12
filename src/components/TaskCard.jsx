import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaskCard({ task, index }) {
  const [copied, setCopied] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(task.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    
    // Wrap the snippet in a runnable C# program structure
    const fileContent = `using System;
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getDifficultyColor(task.difficulty)}`}>
          {task.difficulty}
        </span>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-indigo-600 active:text-indigo-700 transition-colors p-2 -m-1 rounded-lg active:bg-gray-100" 
          title="نسخ الكود"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">{task.description}</p>
      
      <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 dir-ltr text-left overflow-x-auto max-h-[150px] overflow-y-auto">
        <pre className="whitespace-pre-wrap break-words sm:whitespace-pre">{task.codeSnippet}</pre>
      </div>

      <button 
        onClick={handleDownload}
        className="w-full bg-white border border-gray-200 text-indigo-600 font-bold py-2.5 sm:py-2 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 transition-colors flex items-center justify-center gap-2 group text-sm sm:text-base"
      >
        <Download size={18} className="group-hover:scale-110 transition-transform" />
        <span>تحميل الحل (.cs)</span>
      </button>
    </motion.div>
  );
}
