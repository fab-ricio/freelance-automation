import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { motion } from 'framer-motion';

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Particules */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: 'transparent' },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
          },
          particles: {
            color: { value: '#8b5cf6' },
            links: {
              color: '#8b5cf6',
              distance: 120,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              outModes: { default: 'bounce' },
            },
            number: {
              density: { enable: true, area: 800 },
              value: 40,
            },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Titre */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        whileHover={{ rotateX: 10, rotateY: 10 }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-4"
      >
        Bienvenue sur <span className="text-indigo-500">Mon Portfolio</span>
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-lg md:text-xl text-center font-light max-w-xl"
      >
        Développeur fullstack freelance, passionné par l'automatisation, les interfaces modernes et les projets impactants.
      </motion.p>
    </section>
  );
}
