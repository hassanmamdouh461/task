import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle2, Circle } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ActiveQuestion from './components/ActiveQuestion';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import tasksData from './data/tasks.json';

function App() {
  const tasks = tasksData;
  const [showSplash, setShowSplash] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswerSelect = (taskId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [taskId]: answer
    }));
  };

  const handleNext = () => {
    if (activeQuestionIndex < tasks.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const activeTask = tasks[activeQuestionIndex];

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      <div className="h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col relative overflow-hidden">
        <Header />
      
        <main className="flex-1 flex overflow-hidden relative">
          
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
              className="absolute inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            absolute lg:static inset-y-0 right-0 z-50
            w-72 sm:w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800
            transform transition-transform duration-300 ease-in-out shrink-0
            flex flex-col shadow-2xl lg:shadow-none
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[100%] lg:translate-x-0'}
          `}>
            {/* Sidebar header */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 shrink-0">
              <div className="w-full pl-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Question List</h2>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${tasks.length > 0 ? (Object.keys(userAnswers).length / tasks.length) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">
                  Completed {Object.keys(userAnswers).length} of {tasks.length}
                </p>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden absolute left-4 top-5 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-gray-50/30 dark:bg-gray-900/30">
              <div className="flex flex-col gap-2">
                {tasks.map((task, idx) => {
                  const isActive = idx === activeQuestionIndex;
                  const isAnswered = userAnswers[task.id] !== undefined;
                  
                  return (
                    <button
                      key={task.id}
                      onClick={() => {
                        setActiveQuestionIndex(idx);
                        setIsSidebarOpen(false); // Close on mobile
                      }}
                      className={`
                        w-full text-right p-3 rounded-xl flex items-start gap-3 transition-all duration-200 group
                        ${isActive 
                            ? 'bg-indigo-600 outline-none shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 text-white' 
                            : 'hover:bg-white dark:hover:bg-gray-800 bg-transparent text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm'}
                      `}
                    >
                      <div className={`mt-0.5 shrink-0 transition-colors ${isActive ? 'text-indigo-200' : isAnswered ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
                        {isAnswered ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                      <div className="flex-1 text-right" dir="ltr">
                        <span className={`text-sm font-bold line-clamp-2 leading-relaxed ${isActive ? 'text-white' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                          {task.id}. {task.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 flex flex-col h-full overflow-y-auto bg-gray-50/50 dark:bg-gray-950 relative w-full scroll-smooth custom-scrollbar">
             {/* Mobile open sidebar button */}
            <div className="lg:hidden sticky top-4 z-30 px-4 flex justify-end pointer-events-none mb-[-40px]">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="pointer-events-auto flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2.5 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900 border border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
              >
                <Menu size={20} className="text-indigo-600 dark:text-indigo-400" />
                <span>Questions</span>
              </button>
            </div>

            <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8 mt-12 lg:mt-0 pb-10 flex-1 flex flex-col">
              {tasks.length > 0 ? (
                <ActiveQuestion 
                  task={activeTask}
                  index={activeQuestionIndex}
                  totalTasks={tasks.length}
                  userAnswer={userAnswers[activeTask.id]}
                  onAnswerSelect={handleAnswerSelect}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-10 text-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No questions available</h2>
                    <p className="text-gray-500 dark:text-gray-400">Waiting for new questions to be added.</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Minimal Footer for App Layout inside main */}
            <div className="mt-auto shrink-0 w-full">
               <Footer />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
