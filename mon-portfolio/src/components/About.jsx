// src/components/About.jsx
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Photo de profil"
          className="mx-auto rounded-full w-40 h-40 mb-6 border-4 border-gray-700"
        />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Qui suis-je ?</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          Je suis un développeur freelance passionné par l’automatisation avec Python et les interfaces web modernes. J’aide les entreprises et particuliers à gagner du temps grâce à des outils sur mesure comme des bots, dashboards ou API personnalisées.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
