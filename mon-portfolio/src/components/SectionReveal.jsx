import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionReveal
 * Enveloppe une section pour un effet d'apparition futuriste fluide au scroll.
 * Props :
 * - children : contenu de la section
 * - delay : délai d'apparition (optionnel)
 */
export default function SectionReveal({ children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60, filter: 'blur(24px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      {/* Effet scan lumineux */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        transition={{ duration: 0.7, delay: delay + 0.1, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0 z-20"
        style={{ mixBlendMode: 'screen' }}
      >
        <div className="w-full h-full bg-gradient-to-r from-cyan-400/20 via-transparent to-pink-400/20 blur-2xl" />
      </motion.div>
      <div className="relative z-30">{children}</div>
    </motion.section>
  );
}
