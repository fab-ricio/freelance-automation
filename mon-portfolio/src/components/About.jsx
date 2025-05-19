// src/components/About.jsx
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="w-full min-h-[60vh] sm:min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 md:px-8 py-8 sm:py-12 md:py-20 bg-transparent text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center"
      >
        <div className="relative flex items-center justify-center mb-4 sm:mb-6" style={{ minHeight: '170px' }}>
          {/* Effet 3D lumineux animé autour de la photo */}
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <svg className="animate-spin-slow" width="170" height="170" viewBox="0 0 170 170" fill="none" style={{ filter: 'blur(10px)' }}>
              <defs>
                <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <ellipse cx="85" cy="85" rx="80" ry="80" fill="url(#glow1)" />
            </svg>
            <svg className="absolute animate-spin-reverse-slower" width="140" height="140" viewBox="0 0 140 140" fill="none">
              <defs>
                <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <ellipse cx="70" cy="70" rx="62" ry="62" fill="url(#glow2)" />
            </svg>
          </span>
          <img
            src="/images/profil.jpg"
            alt="Photo de profil"
            className="relative z-20 mx-auto aspect-square rounded-full w-20 sm:w-28 md:w-36 lg:w-40 object-cover max-w-full shadow-xl"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
        <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">Qui suis-je ?</h2>
        <p className="text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 px-2 sm:px-0">
          Je suis un développeur freelance passionné par l’automatisation avec Python et les interfaces web modernes. J’aide les entreprises et particuliers à gagner du temps grâce à des outils sur mesure comme des bots, dashboards ou API personnalisées.
        </p>
      </motion.div>
    </section>
  );
};

export default About;

/* Ajout des animations spin-slow et spin-reverse-slower dans le CSS global si elles n'existent pas :
.animate-spin-slow { animation: spin 6s linear infinite; }
.animate-spin-reverse-slower { animation: spin-reverse 12s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes spin-reverse { to { transform: rotate(-360deg); } }
*/
