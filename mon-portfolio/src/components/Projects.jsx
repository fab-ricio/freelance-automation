import React from 'react';

const projects = [
  {
    title: 'Générateur de factures PDF',
    description: 'Crée automatiquement des factures en PDF à partir de données structurées.',
    stack: ['Python', 'ReportLab'],
    github: 'https://github.com/tonprofil/facture-pdf',
    demo: null,
    badges: ['Open Source', 'CLI', 'PDF'],
    image: '/images/facture.jpg',
  },
  {
    title: 'Bot Telegram auto-poster',
    description: 'Publie automatiquement du contenu sur Telegram via une API.',
    stack: ['Node.js', 'Telegraf', 'Cron'],
    github: 'https://github.com/tonprofil/bot-telegram',
    demo: null,
    badges: ['Open Source', 'Cron-ready', 'API'],
    image: '/images/bot.jpg',
  },
  {
    title: 'Scraper de données web',
    description: 'Récupère des données d’un site en temps réel avec Node.js.',
    stack: ['Node.js', 'Puppeteer', 'Cheerio'],
    github: 'https://github.com/tonprofil/scraper-node',
    demo: null,
    badges: ['Open Source', 'AI-powered', 'CLI'],
    image: '/images/scraper.jpg',
  },
];

const badgeColors = {
  'Open Source': 'bg-green-100 text-green-700 border-green-300',
  'AI-powered': 'bg-blue-100 text-blue-700 border-blue-300',
  'Cron-ready': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'CLI': 'bg-gray-100 text-gray-700 border-gray-300',
  'PDF': 'bg-indigo-100 text-indigo-700 border-indigo-300',
  'API': 'bg-cyan-100 text-cyan-700 border-cyan-300',
};

const Projects = () => (
  <section
    id="projects"
    className="w-full min-h-screen py-16 px-4 flex flex-col items-center"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-blue-100 mb-10 text-center tracking-wide uppercase drop-shadow-lg">
      Mes Projets Techniques
    </h2>
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="relative bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#312e81] border border-blue-900/30 rounded-3xl shadow-[0_4px_32px_#6366f133] hover:shadow-[0_8px_40px_#6366f1aa] transition-all p-8 flex flex-col items-center group overflow-hidden"
        >
          {/* Accent néon */}
          <div className="absolute -inset-1 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300" style={{boxShadow:'0 0 32px #6366f1cc, 0 0 8px #60a5fa99'}}></div>
          {/* Image illustrative du projet */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-20 h-20 object-cover rounded-xl shadow-lg mb-4 border-2 border-indigo-400 bg-white/10"
              style={{ maxWidth: '80px', maxHeight: '80px' }}
            />
          )}
          <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
            {project.badges.map((badge) => (
              <span
                key={badge}
                className={`px-2 py-1 text-xs font-semibold rounded border ${badgeColors[badge] || 'bg-gray-800 text-gray-200 border-gray-700'} mr-2 mb-1`}
              >
                {badge}
              </span>
            ))}
          </div>
          <h3 className="text-lg md:text-2xl font-bold mb-2 text-blue-100 tracking-wide uppercase drop-shadow text-center futuristic-font">{project.title}</h3>
          <p className="text-gray-200 mb-4 flex-1 text-center text-base md:text-lg opacity-90">{project.description}</p>
          <div className="flex items-center gap-2 mb-5 flex-wrap justify-center">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-blue-900/30 text-blue-200 text-xs font-medium px-2 py-0.5 rounded mr-1"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-auto justify-center">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition text-base"
              style={{ textShadow: '0 0 8px #60a5fa' }}
            >
              Voir le code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-blue-800 font-semibold hover:bg-gray-300 transition"
              >
                Démo CLI
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
