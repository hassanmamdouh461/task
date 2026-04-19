import React, { useState, useEffect } from 'react';
import { Download, Copy, Check, ChevronLeft, ChevronRight, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ActiveQuestion({ 
  task, 
  index, 
  totalTasks, 
  userAnswer, 
  onAnswerSelect, 
  onNext, 
  onPrev 
}) {
  const [copied, setCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // تحديث حالة الحل إذا تغير السؤال
  useEffect(() => {
    setShowSolution(false);
  }, [task.id]);

  const isMCQ = task.title.includes("MCQ") || task.title.includes("اختياري") || (task.description.includes("A)") && task.description.includes("B)"));

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

  const extractMCQData = (codeSnippet) => {
    const answerMatch = codeSnippet.match(/(?:الإجابة|Answer)\s*:\s*([A-D])/i);
    const correctOption = answerMatch ? answerMatch[1].toUpperCase() : null;
    const expMatch = codeSnippet.match(/(?:الإجابة|Answer)\s*:\s*[A-D]\s*([\s\S]*?)(?=\*\/)/i);
    const explanation = expMatch ? expMatch[1].trim() : '';
    
    // Extract everything before the comment block /* as code
    const codeMatch = codeSnippet.match(/^([\s\S]*?)(?=\/\*)/);
    const code = codeMatch ? codeMatch[1].trim() : '';
    
    return { correctOption, explanation, code };
  };

  const renderContent = () => {
    if (isMCQ && task.description.includes("A)") && task.description.includes("B)")) {
       const lines = task.description.split('\n').filter(line => line.trim() !== '');
       const questionLines = [];
       const options = [];
       
       lines.forEach(line => {
         const trimmed = line.trim();
         if (/^[A-D]\)/i.test(trimmed)) {
           options.push(trimmed);
         } else {
           questionLines.push(trimmed);
         }
       });

       const { correctOption, explanation, code } = extractMCQData(task.codeSnippet);
       const isAnswered = userAnswer !== undefined;
       const isCorrect = isAnswered && userAnswer === correctOption;

       return (
         <div className="mb-5">
           <div className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-white mb-6 leading-relaxed font-bold flex flex-col gap-1">
              {questionLines.map((line, i) => (
                <p key={i} dir="auto" className="whitespace-pre-wrap m-0 min-h-[1.5rem]">{line}</p>
              ))}
           </div>
           
           {code && (
             <div className="mb-6 rounded-xl overflow-hidden shadow-md border border-gray-800" dir="ltr">
               <SyntaxHighlighter
                 language="csharp"
                 style={vscDarkPlus}
                 customStyle={{
                   padding: '1.5rem',
                   margin: 0,
                   background: '#1e1e1e',
                   fontSize: '0.9rem',
                   lineHeight: '1.6',
                   textAlign: 'left'
                 }}
               >
                 {code}
               </SyntaxHighlighter>
             </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {options.map((opt, idx) => {
                const prefixMatch = opt.match(/^([A-D])\)/i);
                const prefix = prefixMatch ? prefixMatch[1].toUpperCase() : '';
                const textContent = prefixMatch ? opt.substring(prefixMatch[0].length).trim() : opt;
                
                let optionStyle = "border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-white dark:hover:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer";
                let prefixStyle = "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
                
                if (isAnswered) {
                  // If this option is the correct one
                  if (prefix === correctOption) {
                    optionStyle = "border-green-500 bg-green-50 dark:bg-green-900/20";
                    prefixStyle = "bg-green-500 text-white";
                  } 
                  // If this option is the wrong one selected by user
                  else if (prefix === userAnswer) {
                    optionStyle = "border-red-500 bg-red-50 dark:bg-red-900/20";
                    prefixStyle = "bg-red-500 text-white";
                  } else {
                    optionStyle = "border-gray-200 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800 opacity-60 cursor-default";
                    prefixStyle = "bg-gray-200 dark:bg-gray-700 text-gray-500";
                  }
                }

                return (
                  <motion.div 
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => !isAnswered && onAnswerSelect(task.id, prefix)}
                    key={idx} 
                    className={`flex items-center p-3 sm:px-4 rounded-xl border ${optionStyle} transition-all duration-300 shadow-sm`}
                  >
                    <span className={`flex items-center justify-center font-bold w-10 h-10 rounded-lg shrink-0 text-lg transition-colors ${prefixStyle}`} dir="ltr">
                      {prefix}
                    </span>
                    <span className={`font-semibold ml-3 mr-3 text-sm sm:text-lg leading-relaxed ${isAnswered && prefix === correctOption ? 'text-green-800 dark:text-green-300' : isAnswered && prefix === userAnswer ? 'text-red-800 dark:text-red-300' : 'text-gray-700 dark:text-gray-200'}`} dir="auto">{textContent}</span>
                  </motion.div>
                );
              })}
           </div>

           <AnimatePresence>
             {isAnswered && (
               <motion.div
                 initial={{ opacity: 0, y: 10, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: 'auto' }}
                 className="mt-6 overflow-hidden"
               >
                 <div className={`p-5 rounded-xl border-l-4 ${isCorrect ? 'border-l-green-500 bg-green-50 dark:bg-green-900/10 dark:border-l-green-400' : 'border-l-red-500 bg-red-50 dark:bg-red-900/10 dark:border-l-red-400'}`}>
                   <div className="flex items-center gap-2 mb-2">
                     {isCorrect ? (
                       <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                     ) : (
                       <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
                     )}
                     <h4 className={`text-lg font-bold ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                       {isCorrect ? 'Correct Answer!' : 'Incorrect Answer!'}
                     </h4>
                   </div>
                   <p className="text-gray-700 dark:text-gray-300 font-medium text-base whitespace-pre-wrap mt-2">
                     {explanation || "No further explanation provided."}
                   </p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       );
    }

    // Default view for multi-line written questions
    return (
      <div className="mb-5">
        <div className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-semibold flex flex-col gap-1">
          {task.description.split('\n').map((line, i) => (
            <p key={i} dir="auto" className="whitespace-pre-wrap m-0 min-h-[1.5rem]">{line}</p>
          ))}
        </div>
        
        {task.questionCode && (
           <div className="mt-5 mb-2 rounded-xl overflow-hidden shadow-md border border-gray-800" dir="ltr">
             <SyntaxHighlighter
               language="csharp"
               style={vscDarkPlus}
               customStyle={{
                 padding: '1.5rem',
                 margin: 0,
                 background: '#1e1e1e',
                 fontSize: '0.9rem',
                 lineHeight: '1.6',
                 textAlign: 'left'
               }}
             >
               {task.questionCode}
             </SyntaxHighlighter>
           </div>
        )}
        
        {!showSolution ? (
          <div className="flex flex-col items-center justify-center py-6 sm:py-10 bg-white dark:bg-[#1e1e2e]/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 mt-6 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm sm:text-base font-medium text-center px-4">
              Try to solve the question in (Visual Studio) first, then compare your answer.
            </p>
            <button
              onClick={() => setShowSolution(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Lightbulb size={20} />
              Show Model Answer
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mt-6"
          >
            <div className="relative group/code mb-2">
              <div className="absolute top-3 left-3 z-20">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-md transition-all text-xs font-bold backdrop-blur-sm border border-white/10"
                  title="Copy code"
                >
                  {copied ? <><Check size={16} className="text-green-400" /> Copied</> : <><Copy size={16} /> Copy Code</>}
                </button>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-xl dir-ltr text-left border border-gray-800">
                <SyntaxHighlighter
                  language="csharp"
                  style={vscDarkPlus}
                  customStyle={{
                    padding: '3.5rem 1.5rem 1.5rem 1.5rem',
                    margin: 0,
                    background: '#1e1e1e',
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}
                >
                  {task.codeSnippet}
                </SyntaxHighlighter>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
               <button 
                  onClick={() => onAnswerSelect(task.id, 'COMPLETED')}
                  className={`py-2 px-6 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2 ${userAnswer === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600'}`}
               >
                 {userAnswer === 'COMPLETED' ? <><CheckCircle2 size={18}/> Completed</> : 'Mark as Completed'}
               </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/80 overflow-hidden flex flex-col h-full min-h-[400px] sm:min-h-[500px]">
      {/* Header Area */}
      <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700/80 flex items-start sm:items-center justify-between bg-gray-50/50 dark:bg-gray-900/30 gap-3">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full">
          <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-400 font-black text-base sm:text-lg shrink-0 shadow-inner mt-0.5 sm:mt-0">
            {task.id}
          </span>
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug flex-1 text-left" dir="ltr">
            {task.title}
          </h2>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Navigation Footer */}
      <div className="p-3 sm:p-5 border-t border-gray-100 dark:border-gray-700/80 bg-gray-50/80 dark:bg-gray-900/50 flex items-center justify-between mt-auto gap-2">
        <button 
          onClick={onPrev}
          disabled={index === 0}
          className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm min-w-[80px] sm:min-w-[120px]"
        >
          <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          Previous
        </button>
        
        <span className="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm text-center">
          <span className="hidden sm:inline">Question </span>{index + 1} / {totalTasks}
        </span>

        <button 
          onClick={onNext}
          disabled={index === totalTasks - 1}
          className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] sm:min-w-[120px]"
        >
          Next
          <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
