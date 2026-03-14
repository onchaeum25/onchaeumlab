import { motion } from 'motion/react';
import Iridescence from './Iridescence';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Iridescence Background */}
      <div className="absolute inset-0 z-0 bg-white">
        <Iridescence
          color={[0.3, 0.7, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={0.9}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Vertical Indicator (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-start pt-4">
            <div className="w-[1px] h-16 bg-white/30 mb-6"></div>
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Onchaeum Lab
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            {/* Text removed as requested */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
