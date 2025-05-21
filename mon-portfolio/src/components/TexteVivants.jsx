import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TexteVivants
 * Texte animé à l'entrée (fade+up), pulsation continue, disparition au hover.
 * Props :
 * - children : texte à animer
 * - className : classes CSS optionnelles
 */
export default function TexteVivants({ children, className = '' }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <AnimatePresence>
      {!hovered && (
        <motion.span
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.08, 1] }}
          exit={{ opacity: 0, scale: 0.8, y: -16 }}
          transition={{ duration: 0.7, scale: { duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' } }}
          className={className + ' inline-block cursor-pointer select-none'}
          onMouseEnter={() => setHovered(true)}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
