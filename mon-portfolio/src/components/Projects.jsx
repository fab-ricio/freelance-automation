import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, RoundedBox, Sphere } from '@react-three/drei';
import ProjetsWeb from './ProjetsWeb';

const projects = [
  {
    title: 'Générateur de factures PDF',
    description: 'Crée automatiquement des factures en PDF à partir de données.',
    github: 'https://github.com/tonprofil/facture-pdf',
    image: '/images/facture.jpg', // À placer dans le dossier images
  },
  {
    title: 'Bot Telegram auto-poster',
    description: 'Publie automatiquement du contenu sur Telegram via une API.',
    github: 'https://github.com/tonprofil/bot-telegram',
    image: '/images/bot.jpg',
  },
  {
    title: 'Scraper de données web',
    description: 'Récupère des données d’un site en temps réel avec Node.js.',
    github: 'https://github.com/tonprofil/scraper-node',
    image: '/images/scraper.jpg',
  },
];

function ProjectCard3D({ project, position, rotation, isActive, onClick }) {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation;
    }
  });
  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[3.7, 2.1, 0.22]} // width, height, depth (agrandi)
        radius={0.38}
        smoothness={8}
        scale={isActive ? [1.7, 1.7, 1.7] : [1.25, 1.25, 1.25]}
        onClick={isActive ? undefined : onClick}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={isActive ? '#6366f1' : '#3b82f6'} transparent opacity={isActive ? 0.98 : 0.5} metalness={0.7} roughness={0.18} />
      </RoundedBox>
      {/* Effet néon autour */}
      {isActive && (
        <RoundedBox
          args={[3.8, 2.18, 0.01]}
          radius={0.42}
          smoothness={8}
          position={[0, 0, 0.13]}
        >
          <meshStandardMaterial emissive="#60a5fa" emissiveIntensity={0.7} color="white" transparent opacity={0.18} />
        </RoundedBox>
      )}
      <Html center>
        <div className={`w-80 p-6 flex flex-col items-center transition-all duration-300 rounded-2xl shadow-[0_0_32px_#6366f1aa] ${isActive ? '' : 'blur-[2px] grayscale opacity-60 pointer-events-none'}`}
          style={{ pointerEvents: isActive ? 'auto' : 'none', boxShadow: isActive ? '0 0 32px #6366f1cc, 0 0 8px #60a5fa99' : undefined, background: 'linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(67,56,202,0.85) 50%, rgba(139,92,246,0.85) 100%)', borderRadius: '1rem' }}>
          {/* Image illustrative du projet */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-24 h-24 object-cover rounded-xl shadow-lg mb-4 border-2 border-indigo-400 bg-white/10"
              style={{ maxWidth: '96px', maxHeight: '96px' }}
            />
          )}
          <h3 className="text-lg md:text-2xl font-bold mb-3 text-blue-200 tracking-wide uppercase drop-shadow text-center futuristic-font">{project.title}</h3>
          <p className="text-gray-200 mb-5 text-base md:text-lg opacity-90 text-center">{project.description}</p>
          <a
            href={project.github}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 text-base"
            target="_blank"
            rel="noopener noreferrer"
            style={{ pointerEvents: isActive ? 'auto' : 'none', textShadow: '0 0 8px #60a5fa' }}
          >
            Voir sur GitHub
          </a>
        </div>
      </Html>
    </group>
  );
}

// Lumières dynamiques futuristes autour des projets
function FuturisticLights() {
  // Crée 5 refs pour 5 lumières
  const lightRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lightRefs.forEach((ref, i) => {
      if (ref.current) {
        // Mouvement orbital lent, hauteur et rayon variables, effet "futuriste"
        const baseRadius = 5.5 + Math.sin(t * 0.13 + i) * 0.7;
        const angle = t * (0.12 + i * 0.04) + i * (Math.PI * 2 / lightRefs.length);
        const y = Math.sin(t * 0.18 + i) * 1.2 + 0.2 * Math.cos(angle * 2);
        ref.current.position.set(
          Math.cos(angle) * baseRadius,
          y,
          Math.sin(angle) * baseRadius
        );
      }
    });
  });
  // Couleurs néon variées pour effet "futuriste"
  const colors = ["#60a5fa", "#f472b6", "#facc15", "#a5b4fc", "#34d399"];
  return (
    <>
      {lightRefs.map((ref, i) => (
        <pointLight
          key={i}
          ref={ref}
          intensity={0.7 + 0.2 * Math.sin(i)}
          distance={7.5}
          color={colors[i % colors.length]}
          decay={2}
        />
      ))}
    </>
  );
}

function ProjectsCarousel3D({ active, setActive }) {
  const radius = 3.5;
  const angleStep = (2 * Math.PI) / projects.length;

  // Correction du bug d'écrasement initial :
  // On ne rend le carrousel que si le composant est monté côté client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ height: 320 }} />;

  return (
    <>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        {/* Lumières dynamiques futuristes autour des projets */}
        <FuturisticLights />
        {projects.map((project, idx) => {
          const offset = idx - active;
          const angle = offset * angleStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - (offset === 0 ? 0 : 1.5); // recule les cartes latérales
          const isActive = idx === active;
          return (
            <ProjectCard3D
              key={idx}
              project={project}
              position={[x, 0, z]}
              rotation={-angle}
              isActive={isActive}
              onClick={() => setActive(idx)}
            />
          );
        })}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </>
  );
}

const Projects = () => {
  const [active, setActive] = useState(1);

  return (
    <section id="projects" className="w-screen min-h-screen py-8 sm:py-12 md:py-20 pb-32 lg:pb-44 px-0 text-white flex flex-col items-center justify-center overflow-x-hidden max-w-full">
      <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center">Mes Projets (Carrousel 3D)</h2>
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
        <ProjectsCarousel3D active={active} setActive={setActive} />
        {/* Boutons de navigation en overlay, toujours visibles */}
        <div className="w-full flex justify-center items-end absolute bottom-8 left-0 z-30 pointer-events-none">
          <div className="flex gap-6 pointer-events-auto">
            <button
              onClick={() => setActive((prev) => (prev - 1 + projects.length) % projects.length)}
              className="relative group rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 focus:outline-none border-none bg-transparent"
              aria-label="Projet précédent"
              tabIndex={0}
            >
              {/* Effet 3D harmonisé avec RoundedBox */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-700 via-indigo-600 to-fuchsia-500 shadow-[0_0_16px_#6366f1cc] group-hover:from-fuchsia-500 group-hover:to-blue-700 group-hover:scale-105 transition-all duration-300" style={{ filter: 'blur(4px)', opacity: 0.7 }}></span>
              <span className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-600 via-indigo-500 to-fuchsia-400 border border-blue-300/40 shadow-[0_0_8px_#6366f1bb] group-hover:from-fuchsia-400 group-hover:to-blue-600 transition-all duration-300"></span>
              <span className="relative z-10 text-blue-100 text-2xl drop-shadow-[0_0_8px_#60a5fa] select-none">
                &#8592;
              </span>
            </button>
            <button
              onClick={() => setActive((prev) => (prev + 1) % projects.length)}
              className="relative group rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 focus:outline-none border-none bg-transparent"
              aria-label="Projet suivant"
              tabIndex={0}
            >
              {/* Effet 3D harmonisé avec RoundedBox */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-700 via-indigo-600 to-fuchsia-500 shadow-[0_0_16px_#6366f1cc] group-hover:from-fuchsia-500 group-hover:to-blue-700 group-hover:scale-105 transition-all duration-300" style={{ filter: 'blur(4px)', opacity: 0.7 }}></span>
              <span className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-600 via-indigo-500 to-fuchsia-400 border border-blue-300/40 shadow-[0_0_8px_#6366f1bb] group-hover:from-fuchsia-400 group-hover:to-blue-600 transition-all duration-300"></span>
              <span className="relative z-10 text-blue-100 text-2xl drop-shadow-[0_0_8px_#60a5fa] select-none">
                &#8594;
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Nouvelle section 3D : Planète des projets web */}
      {/* <ProjetsWeb /> */}
    </section>
  );
};

export default Projects;
