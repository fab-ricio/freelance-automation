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
    <section id="services" className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">Mes Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
