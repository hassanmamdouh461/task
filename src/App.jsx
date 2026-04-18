import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import tasksData from './data/tasks.json';

function App() {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState('All');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = filter === 'All' 
    ? tasks 
    : tasks.filter(t => t.difficulty === filter);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <Header />
      
      <main>
        <section id="tasks" className="max-w-4xl mx-auto px-4 py-8 md:py-12 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 gap-4">
            <div className="text-center md:text-right">
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                بنك الأسئلة
              </h2>
              <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">"اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الصعب إن شئت سهلاً"</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {['All', 'Easy', 'Medium', 'Hard'].map((level) => {
                const count = level === 'All' ? tasks.length : tasks.filter(t => t.difficulty === level).length;
                return (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base active:scale-95 ${
                      filter === level 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600'
                    }`}
                  >
                    {level === 'All' ? 'الكل' : level}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      filter === level 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filteredTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>لا توجد تاسكات بهذا المستوى حالياً.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
    </>
  );
}

export default App;
