import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
        {/* Burger Icon */}
        <div className="md:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black bg-opacity-95 text-white flex flex-col items-center py-4 space-y-2 text-base w-full"
        >
          {links.map((link, i) => (
            <a
              key={i}
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="font-medium hover:text-indigo-400"
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
