import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const webApps = [
  {
    title: 'Weather App',
    description: "Application météo moderne avec API et design responsive.",
    github: 'https://github.com/tonprofil/weather-app',
    demo: 'https://demo.weather-app.com',
    image: '/images/Weather-app.png', // image principale
    imageAlt: '/images/weather.jpg',   // image alternative (ancienne)
  },
  {
    title: 'ToDo List',
    description: "Gestionnaire de tâches intuitif, rapide et synchronisé.",
    github: 'https://github.com/tonprofil/todo-list',
    demo: 'https://demo.todo-list.com',
    image: '/images/to-do.png', // image principale
    imageAlt: '/images/todo.jpg',   // image alternative (ancienne)
  },
  {
    title: 'Dashboard Perso',
    description: "Dashboard web personnalisable pour visualiser vos données.",
    github: 'https://github.com/tonprofil/dashboard',
    demo: 'https://demo.dashboard.com',
    image: '/images/dashboard.jpg',
  },
];

function CoverflowWebProjects({ projects }) {
  const [active, setActive] = useState(1);
  const maxVisible = 2;
  const touchStartX = useRef(null);
  const isDragging = useRef(false);
  const coverflowRef = useRef(null);

  // Swipe mobile + drag desktop
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = false;
  }
  function handleTouchMove() {
    isDragging.current = true;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (!isDragging.current && Math.abs(dx) < 10) return; // tap only
    if (dx > 40) setActive((prev) => (prev - 1 + projects.length) % projects.length);
    if (dx < -40) setActive((prev) => (prev + 1) % projects.length);
    touchStartX.current = null;
    isDragging.current = false;
  }

  // Drag desktop (mouse)
  function handleMouseDown(e) {
    touchStartX.current = e.clientX;
    isDragging.current = false;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  function handleMouseMove() {
    isDragging.current = true;
  }
  function handleMouseUp(e) {
    if (touchStartX.current === null) return;
    const dx = e.clientX - touchStartX.current;
    if (!isDragging.current && Math.abs(dx) < 10) return; // click only
    if (dx > 40) setActive((prev) => (prev - 1 + projects.length) % projects.length);
    if (dx < -40) setActive((prev) => (prev + 1) % projects.length);
    touchStartX.current = null;
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') setActive((prev) => (prev - 1 + projects.length) % projects.length);
    if (e.key === 'ArrowRight') setActive((prev) => (prev + 1) % projects.length);
  }

  return (
    <div
      ref={coverflowRef}
      className="relative w-full flex flex-col items-center"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-visible select-none touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'grab' }}
      >
        {projects.map((project, i) => {
          const offset = i - active;
          if (Math.abs(offset) > maxVisible) return null;
          const translateX = offset * 120;
          const rotateY = offset * -35;
          const scale = offset === 0 ? 1.07 : 0.92;
          const zIndex = 10 - Math.abs(offset);
          if (offset === 0) {
            return (
              <motion.div
                key={i}
                className={`absolute left-1/2 top-1/2 w-64 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center bg-gradient-to-br from-[#232b4e] via-[#2e3a6a] to-[#3b82f6] border-2 border-blue-400/60 shadow-[0_4px_24px_#6366f1cc,0_0_16px_#facc15bb] rounded-3xl transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1)]`}
                style={{
                  zIndex,
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`
                }}
                tabIndex={0}
                onClick={() => setActive(i)}
                layout
                transition={{ type: 'spring', stiffness: 80, damping: 22, duration: 0.7 }}
              >
                <img src={project.image} alt={project.title} className="w-full h-40 md:h-52 object-cover rounded-t-3xl shadow-lg border-b-2 border-indigo-400 bg-white/10 transition-all duration-500" onError={e => { if (project.imageAlt) { e.target.onerror = null; e.target.src = project.imageAlt; } }} />
                <h3 className="text-lg md:text-2xl font-bold mb-2 text-blue-100 text-center uppercase drop-shadow futuristic-font transition-all duration-500 relative z-10 bg-gradient-to-r from-[#60a5fa] via-[#facc15] to-[#818cf8] bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-gray-100 mb-3 text-sm md:text-base opacity-95 text-center px-2 transition-all duration-500 relative z-10">
                  {project.description}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <a
                    href={project.github}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#232b4e] via-[#3b82f6] to-[#818cf8] shadow-[0_2px_12px_#6366f1bb] border border-blue-400/40 hover:from-[#818cf8] hover:to-[#60a5fa] hover:text-[#facc15] transition-all duration-300 backdrop-blur-[2px] ring-2 ring-[#818cf8]/30 ring-offset-2 ring-offset-[#232b4e] group-hover:scale-105 group-active:scale-95"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Voir sur GitHub"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 text-blue-100 group-hover:text-[#facc15]"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.29 9.29 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                    </motion.svg>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#818cf8] via-[#facc15] to-[#60a5fa] shadow-[0_2px_12px_#818cf8bb] border border-blue-300/40 hover:from-[#facc15] hover:to-[#818cf8] hover:text-[#232b4e] transition-all duration-300 backdrop-blur-[2px] ring-2 ring-[#facc15]/30 ring-offset-2 ring-offset-[#232b4e] group-hover:scale-105 group-active:scale-95"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Voir la démo"
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="w-7 h-7 text-blue-900 group-hover:text-[#232b4e]"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.18 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.5" />
                        <path d="M10 9l6 3-6 3V9z" fill="currentColor" />
                      </motion.svg>
                    </a>
                  )}
                </div>
                {/* Reflet Apple */}
                <Reflection image={project.image} />
              </motion.div>
            );
          }
          // Correction : le flou ne doit s'appliquer qu'à partir de sm (mobile: pas de blur)
          const blur = 'sm:backdrop-blur-[6px] sm:blur-[2px] grayscale opacity-70';
          const shadow = 'shadow-[0_1px_6px_#6366f188]';
          const border = 'border border-indigo-400/20';
          return (
            <motion.div
              key={i}
              className={`absolute left-1/2 top-1/2 w-64 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center rounded-3xl ${blur} ${shadow} ${border} transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1)]`}
              style={{
                zIndex,
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`
              }}
              layout
              transition={{ type: 'spring', stiffness: 80, damping: 22, duration: 0.7 }}
              tabIndex={0}
              onClick={() => setActive(i)}
            >
              <img src={project.image} alt={project.title} className="w-full h-40 md:h-52 object-cover rounded-t-3xl shadow-lg border-b-2 border-indigo-400 bg-white/10 transition-all duration-500" onError={e => { if (project.imageAlt) { e.target.onerror = null; e.target.src = project.imageAlt; } }} />
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-blue-200 text-center uppercase drop-shadow futuristic-font transition-all duration-500">{project.title}</h3>
              <p className="text-gray-200 mb-3 text-sm md:text-base opacity-90 text-center px-2 transition-all duration-500">{project.description}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <a
                  href={project.github}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#232b4e] via-[#3b82f6] to-[#818cf8] shadow-[0_2px_12px_#6366f1bb] border border-blue-400/40 hover:from-[#818cf8] hover:to-[#60a5fa] hover:text-[#facc15] transition-all duration-300 backdrop-blur-[2px] ring-2 ring-[#818cf8]/30 ring-offset-2 ring-offset-[#232b4e] group-hover:scale-105 group-active:scale-95"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir sur GitHub"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 text-blue-100 group-hover:text-[#facc15]"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.29 9.29 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                  </motion.svg>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#818cf8] via-[#facc15] to-[#60a5fa] shadow-[0_2px_12px_#818cf8bb] border border-blue-300/40 hover:from-[#facc15] hover:to-[#818cf8] hover:text-[#232b4e] transition-all duration-300 backdrop-blur-[2px] ring-2 ring-[#facc15]/30 ring-offset-2 ring-offset-[#232b4e] group-hover:scale-105 group-active:scale-95"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Voir la démo"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="w-7 h-7 text-blue-900 group-hover:text-[#232b4e]"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.5" />
                      <path d="M10 9l6 3-6 3V9z" fill="currentColor" />
                    </motion.svg>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-5 py-2 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => setActive((prev) => (prev - 1 + projects.length) % projects.length)}
        >
          ◀ Précédent
        </button>
        <button
          className="px-5 py-2 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => setActive((prev) => (prev + 1) % projects.length)}
        >
          Suivant ▶
        </button>
      </div>
    </div>
  );
}

// Reflet Apple style
function Reflection({ image }) {
  return (
    <div className="absolute left-1/2 bottom-0 w-24 h-10 md:w-32 md:h-14 -translate-x-1/2 pointer-events-none select-none" style={{ filter: 'blur(6px)', opacity: 0.18 }}>
      <img src={image} alt="reflet" className="w-full h-full object-cover rounded-xl rotate-180" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent rounded-xl" />
    </div>
  );
}

const ProjetsWeb = () => {
  return (
    <section id="web-app-coverflow" className="w-full max-w-5xl mx-auto mt-16 px-4 pt-6 pb-16">
      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-8 text-center text-blue-200">Projets App Web (Apple Coverflow)</h3>
      <div className="h-8" />
      <div className="w-full h-[350px] md:h-[420px] bg-transparent rounded-xl flex items-center justify-center">
        <CoverflowWebProjects projects={webApps} />
      </div>
    </section>
  );
};

export default ProjetsWeb;
