import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Detecter la préférence système au démarrage
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    updateHtmlClass(prefersDark);
  }, []);

  // Met à jour la classe dark sur <html>
  const updateHtmlClass = (dark) => {
    const html = document.documentElement;
    if (dark) html.classList.add('dark');
    else html.classList.remove('dark');
  };

  const toggleDarkMode = () => {
    setIsDark(prev => {
      updateHtmlClass(!prev);
      return !prev;
    });
  };

  return (
    <motion.button
  onClick={toggleDarkMode}
  aria-label="Toggle Dark Mode"
  className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-yellow-300 dark:bg-gray-700 flex items-center justify-center shadow-lg cursor-pointer"
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  title="Changer le mode clair/sombre"
>
      <AnimatePresence mode="wait">
        {isDark ? (
          // Ampoule éteinte (sombre)
          <motion.svg
            key="dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="yellow"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 20, opacity: 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 00-7 7c0 4.418 3.134 8 7 8s7-3.582 7-8a7 7 0 00-7-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6m-3 3v-3" />
          </motion.svg>
        ) : (
          // Ampoule allumée (clair)
          <motion.svg
            key="light"
            xmlns="http://www.w3.org/2000/svg"
            fill="yellow"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            initial={{ rotate: 20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: [1, 1.1, 1] }}
            exit={{ rotate: -20, opacity: 0 }}
          >
            <path d="M12 2a7 7 0 00-7 7c0 4.418 3.134 8 7 8s7-3.582 7-8a7 7 0 00-7-7z" />
            <path d="M9 18h6m-3 3v-3" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default DarkModeToggle;
