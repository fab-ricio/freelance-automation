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
        <img
          src="https://via.placeholder.com/150"
          alt="Photo de profil"
          className="mx-auto rounded-full w-20 sm:w-28 md:w-36 lg:w-40 mb-4 sm:mb-6 border-4 border-gray-700 object-cover max-w-full"
        />
        <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">Qui suis-je ?</h2>
        <p className="text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 px-2 sm:px-0">
          Je suis un développeur freelance passionné par l’automatisation avec Python et les interfaces web modernes. J’aide les entreprises et particuliers à gagner du temps grâce à des outils sur mesure comme des bots, dashboards ou API personnalisées.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
