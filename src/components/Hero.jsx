import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  // Hack to force remove Spline logo (Shadow DOM support)
  React.useEffect(() => {
    const hideWatermark = () => {
      // 1. Try standard DOM
      const watermark = document.querySelector('a[href*="spline.design"]') || document.querySelector('#spline-watermark');
      if (watermark) {
        watermark.style.display = 'none';
        watermark.parentElement?.removeChild(watermark);
      }

      // 2. Try Shadow DOM (piercing)
      const hosts = document.querySelectorAll('*');
      hosts.forEach(host => {
        if (host.shadowRoot) {
          const shadowWatermark = host.shadowRoot.querySelector('a[href*="spline.design"]') || host.shadowRoot.querySelector('#spline-watermark');
          if (shadowWatermark) {
            shadowWatermark.style.display = 'none';
            shadowWatermark.parentElement?.removeChild(shadowWatermark);
          }
        }
      });
    };
    
    // Aggressive checking
    const interval = setInterval(hideWatermark, 100);
    setTimeout(() => clearInterval(interval), 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              أتقن لغة <span className="text-indigo-600">C#</span> بسهولة
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              مجموعة من التاسكات والتحديات البرمجية المصممة لرفع مستواك من المبتدئ إلى المحترف.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[300px] md:h-[400px] lg:h-[500px] w-full relative overflow-hidden"
          >
             {/* Spline is rendered taller than the container, cropping the watermark at the bottom */}
             <div className="absolute inset-0" style={{ bottom: '-60px', position: 'absolute', top: 0, left: 0, right: 0 }}>
               <Spline scene="https://prod.spline.design/iJ9Hvr2SHoxbKyn1/scene.splinecode" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
