import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col justify-center items-center text-center min-h-screen px-4 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white"
    >
      {/* Blobs colorés animés */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500 opacity-20 blur-3xl"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-500 opacity-20 blur-3xl"
        animate={{
          x: [0, -25, 25, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Titre principal */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-4 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Bonjour, je suis <span className="text-accent">Fabricio</span>
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        className="text-xl md:text-2xl max-w-xl mb-8 z-10 text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Développeur freelance spécialisé en automatisation et solutions web modernes.
      </motion.p>

      {/* Bouton */}
      <motion.a
        href="#projects"
        className="inline-block px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500 transition z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        Voir mes projets
      </motion.a>
    </section>
  );
};

export default Hero;
