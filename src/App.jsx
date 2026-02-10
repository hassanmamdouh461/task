import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TaskCard from './components/TaskCard';
import Footer from './components/Footer';
import tasksData from './data/tasks.json';
import { Search, Filter } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState('All');

  const filteredTasks = filter === 'All' 
    ? tasks 
    : tasks.filter(t => t.difficulty === filter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main>
        <Hero />
        
        <section id="tasks" className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                أحدث التحديات
              </h2>
              <p className="text-gray-500 mt-2">اختر التحدي المناسب لمستواك وابدأ البرمجة.</p>
            </div>

            <div className="flex gap-2">
              {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === level 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {level === 'All' ? 'الكل' : level}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

export default App;
