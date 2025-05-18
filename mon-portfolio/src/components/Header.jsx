import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = ['Accueil', 'À propos', 'Projets', 'Services', 'Contact'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MonPortfolio
        </motion.h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={`#${link.toLowerCase()}`}
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
          className="md:hidden bg-black bg-opacity-95 text-white flex flex-col items-center py-4 space-y-4"
        >
          {links.map((link, i) => (
            <a
              key={i}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-indigo-400"
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
