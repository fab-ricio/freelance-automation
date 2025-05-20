import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import ProjetsWeb from './ProjetsWeb';
import Services from './Services';
import Contact from './Contact';

export default function Main() {
  return (
    <main className="w-full max-w-full relative flex flex-col justify-center items-center text-center min-h-[60vh] sm:min-h-[80vh] md:min-h-screen px-2 sm:px-4 md:px-8 py-4 sm:py-8 bg-gradient-to-br from-[#181c2a] via-[#23265d] to-[#312e81] dark:from-gray-900 dark:to-gray-800 text-white overflow-x-hidden">
      {/* Cercles lumineux animés futuristes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Cercle principal */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[16rem] sm:w-[28rem] md:w-[38rem] h-[16rem] sm:h-[28rem] md:h-[38rem] rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cercle bleu en haut à gauche */}
        <motion.div
          className="absolute top-[-6rem] left-[-6rem] w-[18rem] h-[18rem] rounded-full bg-blue-400 opacity-20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Cercle rose en bas à droite */}
        <motion.div
          className="absolute bottom-[-7rem] right-[-7rem] w-[20rem] h-[20rem] rounded-full bg-pink-400 opacity-20 blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Cercle vert en bas à gauche */}
        <motion.div
          className="absolute bottom-[-5rem] left-[-4rem] w-[14rem] h-[14rem] rounded-full bg-emerald-400 opacity-10 blur-2xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* Cercle cyan en haut à droite */}
        <motion.div
          className="absolute top-[-4rem] right-[-4rem] w-[12rem] h-[12rem] rounded-full bg-cyan-400 opacity-10 blur-2xl"
          animate={{ scale: [1, 1.13, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <Hero />
        <About />
        <Projects />
        <ProjetsWeb />
        <Services />
        <Contact />
      </div>
    </main>
  );
}
