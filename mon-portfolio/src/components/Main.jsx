import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Services from './Services';
import Contact from './Contact';

export default function Main() {
  return (
    <main className="w-full relative flex flex-col justify-center items-center text-center min-h-[60vh] sm:min-h-[80vh] md:min-h-screen px-2 sm:px-4 md:px-8 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-white">
      {/* Cercle lumineux animé en arrière-plan */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[16rem] sm:w-[28rem] md:w-[38rem] h-[16rem] sm:h-[28rem] md:h-[38rem] rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </div>
    </main>
  );
}
