import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, RoundedBox } from '@react-three/drei';

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

function ProjectCard3D({ project, position, rotation, isActive, isSide, onClick }) {
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

function ProjectsCarousel3D() {
  const [active, setActive] = useState(1);
  const radius = 3.5;
  const angleStep = (2 * Math.PI) / projects.length;

  return (
    <>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        {projects.map((project, idx) => {
          const offset = idx - active;
          const angle = offset * angleStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - (offset === 0 ? 0 : 1.5); // recule les cartes latérales
          const isActive = idx === active;
          const isSide = Math.abs(offset) === 1;
          return (
            <ProjectCard3D
              key={idx}
              project={project}
              position={[x, 0, z]}
              rotation={-angle}
              isActive={isActive}
              isSide={isSide}
              onClick={() => setActive(idx)}
            />
          );
        })}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
      <div className="flex justify-center gap-8 mt-4">
        <button
          onClick={() => setActive((prev) => (prev - 1 + projects.length) % projects.length)}
          className="bg-white/10 hover:bg-white/20 text-blue-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-3xl transition-all duration-200"
          aria-label="Projet précédent"
        >
          &#8592;
        </button>
        <button
          onClick={() => setActive((prev) => (prev + 1) % projects.length)}
          className="bg-white/10 hover:bg-white/20 text-blue-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-3xl transition-all duration-200"
          aria-label="Projet suivant"
        >
          &#8594;
        </button>
      </div>
    </>
  );
}

const Projects = () => {
  return (
    <section id="projects" className="w-full py-8 sm:py-12 md:py-20 px-2 sm:px-4 md:px-8 text-white flex flex-col items-center">
      <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center">Mes Projets (Carrousel 3D)</h2>
      <div className="w-full max-w-5xl h-[400px] md:h-[500px]">
        <ProjectsCarousel3D />
      </div>
    </section>
  );
};

export default Projects;
