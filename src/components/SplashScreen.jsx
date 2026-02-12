import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Braces, Hash, FileCode, Brackets, Binary } from 'lucide-react';

const floatingIcons = [
  { Icon: Code2, x: -120, y: -100, delay: 0.2, size: 24, color: 'text-indigo-400' },
  { Icon: Braces, x: 130, y: -80, delay: 0.4, size: 20, color: 'text-purple-400' },
  { Icon: Hash, x: -140, y: 40, delay: 0.3, size: 22, color: 'text-blue-400' },
  { Icon: FileCode, x: 110, y: 70, delay: 0.5, size: 26, color: 'text-indigo-300' },
  { Icon: Brackets, x: -60, y: -140, delay: 0.6, size: 18, color: 'text-purple-300' },
  { Icon: Binary, x: 60, y: 130, delay: 0.35, size: 20, color: 'text-blue-300' },
  { Icon: Code2, x: 160, y: -20, delay: 0.45, size: 18, color: 'text-indigo-200' },
  { Icon: Braces, x: -160, y: -30, delay: 0.55, size: 22, color: 'text-purple-200' },
];

export default function SplashScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white overflow-hidden"
        >
          {/* Floating icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            {floatingIcons.map(({ Icon, x, y, delay, size, color }, i) => (
              <motion.div
                key={i}
                className={`absolute ${color}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0.7],
                  scale: [0, 1, 1],
                  x: x,
                  y: y,
                }}
                transition={{ 
                  delay,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: delay + 0.8,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon size={size} strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Center logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative mb-6"
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.2] }}
              transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                boxShadow: '0 0 40px 15px rgba(99,102,241,0.15)',
              }}
            />
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Terminal size={40} className="text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2"
          >
            C# Master
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-500 text-base"
          >
            تاسكات C#
          </motion.p>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-indigo-400"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
