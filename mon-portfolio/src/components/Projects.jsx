import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Générateur de factures PDF',
    description: 'Crée automatiquement des factures en PDF à partir de données.',
    github: 'https://github.com/tonprofil/facture-pdf',
  },
  {
    title: 'Bot Telegram auto-poster',
    description: 'Publie automatiquement du contenu sur Telegram via une API.',
    github: 'https://github.com/tonprofil/bot-telegram',
  },
  {
    title: 'Scraper de données web',
    description: 'Récupère des données d’un site en temps réel avec Node.js.',
    github: 'https://github.com/tonprofil/scraper-node',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-4 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Mes Projets</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <a
              href={project.github}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir sur GitHub →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
