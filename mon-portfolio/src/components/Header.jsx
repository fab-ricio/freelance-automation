import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import FuturisticLoader from './FuturisticLoader';

const links = ['Accueil', 'À propos', 'Projets', 'Services', 'Contact'];
const servicesList = [
  'Automatisation de tâches',
  'Développement de bots',
  'Scraping web',
  'Scripts Python/Node.js',
  'Intégration API',
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blink, setBlink] = useState(false);
  const [blinkTimeout, setBlinkTimeout] = useState(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const logoRef = React.useRef();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700); // 1.7s futuriste
    return () => clearTimeout(timer);
  }, []);

  // Blinking automatique façon "humain" (plus naturel, double clignement parfois, durée variable)
  React.useEffect(() => {
    if (loading) return;
    let timeout;
    let isUnmounted = false;
    function scheduleBlink() {
      // Durée d'attente entre 2.5s et 6s
      const next = 2500 + Math.random() * 3500;
      timeout = setTimeout(() => {
        if (isUnmounted) return;
        // Parfois double clignement (10% de chance)
        if (Math.random() < 0.1) {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            setTimeout(() => {
              setBlink(true);
              setTimeout(() => setBlink(false), 110);
            }, 120);
          }, 110);
        } else {
          setBlink(true);
          setTimeout(() => setBlink(false), 140 + Math.random() * 60);
        }
        scheduleBlink();
      }, next);
    }
    scheduleBlink();
    return () => {
      isUnmounted = true;
      clearTimeout(timeout);
    };
  }, [loading]);

  // Ajout : les yeux suivent la souris
  React.useEffect(() => {
    function handleMove(e) {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      // centre du logo
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // position souris
      const mx = e.clientX;
      const my = e.clientY;
      // vecteur direction
      let dx = mx - cx;
      let dy = my - cy;
      // distance max pour l'effet (pour éviter de sortir de l'œil)
      const maxDist = 7;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
      }
      setEyeOffset({ x: dx, y: dy });
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  function handleLogoClick() {
    setBlink(true);
    if (blinkTimeout) clearTimeout(blinkTimeout);
    const t = setTimeout(() => setBlink(false), 220);
    setBlinkTimeout(t);
  }

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loader"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2a] via-[#23265d] to-[#312e81] overflow-hidden"
        >
          {/* Effet scan lumineux */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 blur-2xl pointer-events-none"
            initial={{ x: '-100vw', opacity: 0.2 }}
            animate={{ x: ['-100vw', '100vw'], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            style={{ zIndex: 2 }}
          />
          {/* Logo SVG animé unique et futuriste */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.7, 1.1, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="mb-8 z-10"
          >
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="cyber-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#0ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#23265d" stopOpacity="0.1" />
                </radialGradient>
                <linearGradient id="cyber-stroke" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0ff" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
                <linearGradient id="cyber-eye" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#a5b4fc" />
                </linearGradient>
              </defs>
              {/* Halo lumineux */}
              <motion.ellipse
                cx="45" cy="45" rx="38" ry="38"
                fill="url(#cyber-glow)"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              {/* Visage robotique stylisé */}
              <motion.path
                d="M20 60 Q45 80 70 60 Q80 40 45 20 Q10 40 20 60Z"
                fill="#181c2a"
                stroke="url(#cyber-stroke)"
                strokeWidth="3.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              {/* Yeux lumineux */}
              <motion.ellipse
                cx="33" cy="48" rx="4.5" ry="2.2"
                fill="url(#cyber-eye)"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              <motion.ellipse
                cx="57" cy="48" rx="4.5" ry="2.2"
                fill="url(#cyber-eye)"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.2 }}
              />
              {/* Bouche LED */}
              <motion.rect
                x="38" y="60" width="14" height="3.5" rx="1.5"
                fill="#0ff"
                initial={{ opacity: 0.5, scaleX: 1 }}
                animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              {/* Circuit lines */}
              <motion.line x1="45" y1="20" x2="45" y2="8" stroke="#0ff" strokeWidth="2" strokeDasharray="6 4" initial={{ opacity: 0.5 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} />
              <motion.line x1="20" y1="60" x2="10" y2="75" stroke="#0ff" strokeWidth="2" strokeDasharray="6 4" initial={{ opacity: 0.5 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.3 }} />
              <motion.line x1="70" y1="60" x2="80" y2="75" stroke="#0ff" strokeWidth="2" strokeDasharray="6 4" initial={{ opacity: 0.5 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.6 }} />
            </svg>
          </motion.div>
          {/* Texte glitch animé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl md:text-2xl font-bold text-blue-100 tracking-widest drop-shadow-lg z-10 font-mono"
            style={{ letterSpacing: '0.15em' }}
          >
            <span className="glitch" style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ position: 'absolute', left: 0, top: 0, color: '#60a5fa', opacity: 0.7, filter: 'blur(1px)', zIndex: 1, animation: 'glitch1 1.2s infinite linear alternate' }}>Bienvenue dans le futur</span>
              <span style={{ position: 'absolute', left: 0, top: 0, color: '#f472b6', opacity: 0.7, filter: 'blur(1px)', zIndex: 1, animation: 'glitch2 1.2s infinite linear alternate' }}>Bienvenue dans le futur</span>
              <span style={{ position: 'relative', zIndex: 2 }}>Bienvenue dans le futur</span>
            </span>
            <style>{`
              @keyframes glitch1 { 0%{transform:translate(0,0)} 20%{transform:translate(-2px,1px)} 40%{transform:translate(-1px,-2px)} 60%{transform:translate(-3px,0)} 80%{transform:translate(2px,2px)} 100%{transform:translate(0,0)} }
              @keyframes glitch2 { 0%{transform:translate(0,0)} 20%{transform:translate(2px,-1px)} 40%{transform:translate(1px,2px)} 60%{transform:translate(3px,0)} 80%{transform:translate(-2px,-2px)} 100%{transform:translate(0,0)} }
            `}</style>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-base md:text-lg font-semibold text-blue-200 mt-4 z-10"
            style={{ letterSpacing: '0.12em' }}
          >
            <span>
              <span className="inline-block animate-pulse">Chargement…</span>
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center text-white gap-2 sm:gap-0 w-full">
        {/* Logo avec clignement et clic */}
        <motion.div
          className="flex items-center gap-2 group cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          onClick={handleLogoClick}
          title="Cyberbot - cliquez pour un clin d'œil !"
          ref={logoRef}
        >
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cyber-glow-header" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#23265d" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="cyber-stroke-header" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0ff" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="cyber-eye-header" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
            <ellipse cx="32" cy="32" rx="28" ry="28" fill="url(#cyber-glow-header)" />
            <path d="M14 44 Q32 60 50 44 Q58 30 32 12 Q6 30 14 44Z" fill="#181c2a" stroke="url(#cyber-stroke-header)" strokeWidth="3" />
            {/* Yeux animés (clignement + suivi souris) */}
            <motion.ellipse
              cx={24 + eyeOffset.x * 0.5}
              cy={38 + eyeOffset.y * 0.5}
              rx="3.2"
              ry={blink ? 0.3 : 1.5}
              fill="url(#cyber-eye-header)"
              animate={{ ry: blink ? 0.3 : 1.5, cx: 24 + eyeOffset.x * 0.5, cy: 38 + eyeOffset.y * 0.5 }}
              transition={{ duration: 0.13, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={40 + eyeOffset.x * 0.5}
              cy={38 + eyeOffset.y * 0.5}
              rx="3.2"
              ry={blink ? 0.3 : 1.5}
              fill="url(#cyber-eye-header)"
              animate={{ ry: blink ? 0.3 : 1.5, cx: 40 + eyeOffset.x * 0.5, cy: 38 + eyeOffset.y * 0.5 }}
              transition={{ duration: 0.13, ease: 'easeInOut' }}
            />
            <rect x="27" y="46" width="10" height="2.2" rx="1" fill="#0ff" />
            <line x1="32" y1="12" x2="32" y2="4" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="14" y1="44" x2="4" y2="58" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50" y1="44" x2="60" y2="58" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          <motion.h1
            className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-0 group-hover:text-cyan-400 transition-colors duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ letterSpacing: '0.08em' }}
          >
            MonPortfolio
          </motion.h1>
        </motion.div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium items-center">
          {links.map((link, i) => (
            link === 'Services' ? (
              <div key={i} className="relative group flex items-center"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <motion.a
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                >
                  {link}
                  <motion.span
                    className="ml-1 text-lg font-bold text-indigo-300 transition-transform duration-200"
                    animate={{ rotate: servicesOpen ? 45 : 0 }}
                  >
                    +
                  </motion.span>
                </motion.a>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.22 }}
                      className="absolute left-0 top-full mt-2 min-w-[220px] bg-[#181c2a] border border-indigo-700 rounded-xl shadow-xl py-2 z-50 flex flex-col items-center"
                      style={{ minWidth: '220px' }}
                    >
                      {servicesList.map((srv, idx) => (
                        <li key={idx} className="px-4 py-2 text-sm text-white hover:bg-indigo-700/60 cursor-pointer transition-colors duration-150 w-full text-center">
                          {srv}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.a
                key={i}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                whileHover={{ scale: 1.1 }}
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                {link}
              </motion.a>
            )
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
