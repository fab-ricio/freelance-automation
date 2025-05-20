import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [sunset, setSunset] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    updateHtmlClass(prefersDark);
  }, []);

  // Ajoute la transition Tailwind sur le body pour plus de fluidité
  useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-700', 'ease-in-out');
  }, []);

  // Met à jour la classe dark sur <html> avec transition
  const updateHtmlClass = (dark) => {
    const html = document.documentElement;
    html.classList.add('transition-colors', 'duration-700', 'ease-in-out');
    if (dark) html.classList.add('dark');
    else html.classList.remove('dark');
  };

  const triggerSunset = () => {
    setSunset(true);
    setTimeout(() => setSunset(false), 2000); // effet visible 2s
  };

  const toggleDarkMode = () => {
    setIsDark(prev => {
      updateHtmlClass(!prev);
      triggerSunset();
      return !prev;
    });
  };

  return (
    <>
      {/* Effet couché de soleil */}
      <AnimatePresence>
        {sunset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 90% 90%, #ffb347 0%, #ffcc33 40%, #ff5e62 80%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-yellow-300 dark:bg-gray-700 flex items-center justify-center shadow-lg cursor-pointer z-50"
        style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
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
    </>
  );
};

export default DarkModeToggle;
