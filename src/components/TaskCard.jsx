import React, { useState } from 'react';
import { Download, Copy, Check, ChevronDown, ExternalLink, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function TaskCard({ task, index }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // تحدد نوع السؤال هل هو اختياري أم مقالي
  const isMCQ = task.title.includes("MCQ") || task.title.includes("اختياري") || (task.description.includes("A)") && task.description.includes("B)"));

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowSolution(false);
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
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

  const renderDescription = (text) => {
    // تنسيق خاص لأسئلة الاختيارات
    if (isMCQ && text.includes("A)") && text.includes("B)")) {
       const lines = text.split('\n').filter(line => line.trim() !== '');
       const questionLines = [];
       const options = [];
       
       lines.forEach(line => {
         const trimmed = line.trim();
         if (/^[A-D]\)/.test(trimmed)) {
           options.push(trimmed);
         } else {
           questionLines.push(trimmed);
         }
       });

       return (
         <div className="mb-5 bg-white dark:bg-gray-800/60 p-4 sm:p-6 rounded-xl border-2 border-transparent shadow-[0_0_15px_rgba(0,0,0,0.03)] dark:shadow-none ring-1 ring-gray-100 dark:ring-gray-700/50">
           <div className="text-base sm:text-lg text-gray-800 dark:text-white mb-6 leading-relaxed font-bold whitespace-pre-wrap">
              {questionLines.join('\n')}
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {options.map((opt, idx) => {
                const prefix = opt.substring(0, 2);
                const textContent = opt.substring(2).trim();
                return (
                  <div key={idx} className="group/opt flex items-center p-3 sm:px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-white dark:hover:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-300">
                    <span className="flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 w-8 h-8 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 group-hover/opt:bg-indigo-100 dark:group-hover/opt:bg-indigo-900 shrink-0 text-left transition-colors" dir="ltr">
                      {prefix.replace(')', '')} {/* Remove parenthesis for cleaner look */}
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 mr-3 text-sm sm:text-base leading-relaxed" dir="auto">{textContent}</span>
                  </div>
                );
              })}
           </div>
         </div>
       );
    }

    // Default view for multi-line written questions
    return (
      <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-5 leading-relaxed bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm font-medium whitespace-pre-wrap">
        {text}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (isHovered) {
           setIsHovered(false);
           setShowSolution(false);
        } else {
           setIsHovered(true);
        }
      }}
      className="bg-white dark:bg-gray-800/80 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-200 dark:border-gray-700/80 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden cursor-pointer"
    >
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
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="flex sm:hidden mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
              </div>
              
              {renderDescription(task.description)}
              
              {!showSolution ? (
                <div className="flex flex-col items-center justify-center py-6 sm:py-8 bg-white dark:bg-[#1e1e2e]/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 mb-2 shadow-sm">
                  <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium text-center px-4">
                    {isMCQ 
                      ? "فكر في الاختيار الصحيح قبل الإطلاع على الحل الدقيق والتفسير" 
                      : "حاول حل السؤال في Visual Studio قبل رؤية الإجابة"}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowSolution(true); }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
                  >
                    <Lightbulb size={18} />
                    {isMCQ ? "إظهار الحل الصحيح" : "عرض الحل (Code)"}
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative group/code mb-2">
                    <div className="absolute top-2 left-2 z-20">
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-md transition-all text-xs font-medium backdrop-blur-sm border border-white/10"
                        title="نسخ الكود"
                      >
                        {copied ? <><Check size={14} className="text-green-400" /> تم النسخ</> : <><Copy size={14} /> انسخ</>}
                      </button>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden shadow-inner dir-ltr text-left border border-gray-800">
                      <SyntaxHighlighter
                        language="csharp"
                        style={vscDarkPlus}
                        customStyle={{
                          padding: '3rem 1.25rem 1.25rem 1.25rem',
                          margin: 0,
                          background: '#1e1e1e',
                          fontSize: '0.875rem',
                          lineHeight: '1.5'
                        }}
                      >
                        {task.codeSnippet}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  {!isMCQ && (
                    <div className="flex justify-end pt-3">
                      <button 
                        onClick={handleDownload}
                        className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-sm hover:shadow text-sm sm:text-base w-full sm:w-auto"
                      >
                        <ExternalLink size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        <span>تحميل وجرب الكود</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
