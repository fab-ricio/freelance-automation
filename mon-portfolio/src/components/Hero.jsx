import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="hero"
      className="w-full relative flex flex-col justify-center items-center text-center min-h-[60vh] sm:min-h-[80vh] md:min-h-screen px-0 py-0 bg-none dark:bg-none text-white"
    >
      {/* Texte principal animé */}
      <motion.h1
        className="text-base sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Bonjour, je suis Fabricio
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        className="text-xs sm:text-base md:text-lg lg:text-xl max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Développeur Freelance spécialisé en automatisation et solutions web modernes.
      </motion.p>

      {/* Bouton d’action */}
      <motion.a
        href="#projects"
        className="inline-block px-4 sm:px-8 py-2 sm:py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg hover:bg-indigo-50 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600 transition text-xs sm:text-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        Voir mes projets
      </motion.a>

      {/* Arrière-plan animé simple - un cercle lumineux */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
};

export default Hero;
