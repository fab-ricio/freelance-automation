import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = ['Accueil', 'À propos', 'Projets', 'Services', 'Contact'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center text-white gap-2 sm:gap-0 w-full">
        {/* Logo */}
        <motion.h1
          className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MonPortfolio
        </motion.h1>
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              whileHover={{ scale: 1.1 }}
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              {link}
            </motion.a>
          ))}
        </nav>
        {/* Burger Icon animé */}
        <motion.button
          className="md:hidden text-xl cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          animate={{ rotate: menuOpen ? 90 : 0, backgroundColor: menuOpen ? 'rgba(49,46,129,0.7)' : 'rgba(0,0,0,0.4)' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-full h-full"
              >
                <FaTimes />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-full h-full"
              >
                <FaBars />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32, duration: 0.35 }}
            className="md:hidden bg-black bg-opacity-95 text-white flex flex-col items-center py-4 space-y-2 text-base w-full shadow-2xl backdrop-blur-lg"
          >
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setMenuOpen(false)}
                className="font-medium hover:text-indigo-400"
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
