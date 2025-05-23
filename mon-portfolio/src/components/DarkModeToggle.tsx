// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [sunset, setSunset] = useState<boolean>(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    updateHtmlClass(prefersDark);
  }, []);

  useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-700', 'ease-in-out');
  }, []);

  const updateHtmlClass = (dark: boolean) => {
    const html = document.documentElement;
    html.classList.add('transition-colors', 'duration-700', 'ease-in-out');
    if (dark) html.classList.add('dark');
    else html.classList.remove('dark');
  };

  const triggerSunset = () => {
    setSunset(true);
    setTimeout(() => setSunset(false), 2000);
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
      <AnimatePresence>
        {sunset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse at 90% 90%, #6366f1 0%, #0ea5e9 40%, #312e81 80%, transparent 100%)'
                : 'radial-gradient(ellipse at 90% 90%, #f0e7ff 0%, #a5b4fc 40%, #60a5fa 80%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="fixed right-4 bottom-24 md:right-8 md:bottom-32 w-12 h-12 rounded-full bg-yellow-200 dark:bg-gray-700 flex items-center justify-center shadow-lg cursor-pointer z-[120] border-2 border-yellow-300 dark:border-gray-600 transition-all duration-500 will-change-transform"
        style={{ boxShadow: isDark ? '0 0 24px #6366f1' : '0 0 24px #fde68a', pointerEvents: 'auto' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        title="Changer le mode clair/sombre"
        id="darkmode-toggle-btn"
        drag={false}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="dark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#facc15"
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
            <motion.svg
              key="light"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fde047"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              initial={{ rotate: 20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: [1, 1.1, 1] }}
              exit={{ rotate: -20, opacity: 0 }}
            >
              <ellipse cx="12" cy="10" rx="7" ry="7" fill="#fde047" stroke="#fbbf24" strokeWidth="2" />
              <path d="M9 18h6m-3 3v-3" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <g>
                <circle cx="12" cy="10" r="4" fill="#fffde7" opacity="0.7" />
              </g>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default DarkModeToggle;
