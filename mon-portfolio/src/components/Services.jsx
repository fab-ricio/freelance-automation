import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Bots Telegram",
    description: "Création de bots automatisés pour publier, répondre ou gérer des canaux.",
  },
  {
    title: "Scripts API sur mesure",
    description: "Connexion à des API externes pour automatiser des flux de travail.",
  },
  {
    title: "Scraping intelligent",
    description: "Extraction de données web pour alimenter des bases ou dashboards.",
  },
];

const Services = () => {
  return (
    <section id="services" className="w-full py-8 sm:py-12 md:py-20 px-2 sm:px-4 md:px-8 bg-transparent text-white">
      <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10 text-center">Mes Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white/10 p-4 sm:p-6 rounded-lg shadow hover:shadow-xl border border-white/10 transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xs sm:text-base md:text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-200 text-xs sm:text-base">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
