import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 px-6 md:px-12 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white"
    >
      {/* Blobs animés */}
      <motion.div
        className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500 opacity-20 blur-3xl"
        animate={{ x: [0, -30, 30, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-3xl"
        animate={{ x: [0, 30, -30, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          À propos de moi
        </motion.h2>

        {/* Avatar / image */}
        <motion.div
          className="mx-auto w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <img
            src="/images/fabricio-avatar.png" // place l'image dans public/images/
            alt="Photo de Fabricio"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Texte */}
        <motion.p
          className="text-lg md:text-xl text-white/80 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Je suis un développeur freelance passionné basé au Maroc, spécialisé en automatisation,
          développement web moderne et création d’expériences utilisateurs fluides.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
