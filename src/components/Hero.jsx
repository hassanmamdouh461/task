import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-20 lg:py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <Code2 size={48} className="text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            أتقن لغة <span className="text-indigo-600">C#</span> بسهولة
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            مجموعة مختارة من التاسكات والتحديات البرمجية المصممة لرفع مستواك من المبتدئ إلى المحترف.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
