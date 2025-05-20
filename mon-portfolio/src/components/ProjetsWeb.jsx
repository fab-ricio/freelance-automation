import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

const webApps = [
  {
    title: 'Weather App',
    description: "Application météo moderne avec API et design responsive.",
    github: 'https://github.com/tonprofil/weather-app',
    image: '/images/weather.jpg',
  },
  {
    title: 'ToDo List',
    description: "Gestionnaire de tâches intuitif, rapide et synchronisé.",
    github: 'https://github.com/tonprofil/todo-list',
    image: '/images/todo.jpg',
  },
  {
    title: 'Dashboard Perso',
    description: "Dashboard web personnalisable pour visualiser vos données.",
    github: 'https://github.com/tonprofil/dashboard',
    image: '/images/dashboard.jpg',
  },
];

function Star({ app, position, isActive, onClick, i }) {
  const ref = React.useRef();
  // Fix: useFrame must be called inside the Canvas render tree
  // We'll use a local component inside the Canvas
  return (
    <group position={position}>
      <AnimatedStarMesh ref={ref} isActive={isActive} i={i} onClick={onClick} />
      {/* Halo lumineux animé */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color={isActive ? '#facc15' : '#60a5fa'} transparent opacity={isActive ? 0.18 : 0.09} />
      </mesh>
      <Html center distanceFactor={2.2} zIndexRange={[10, 0]}>
        <div className={`flex flex-col items-center transition-all duration-300 ${isActive ? '' : 'opacity-60 grayscale blur-[1px]'}`}
          style={{ pointerEvents: isActive ? 'auto' : 'none', background: 'rgba(30,58,138,0.85)', borderRadius: '1rem', padding: 12, minWidth: 120, boxShadow: isActive ? '0 0 24px #facc15cc' : undefined }}>
          <img src={app.image} alt={app.title} className="w-16 h-16 object-cover rounded-full shadow mb-1 border-2 border-indigo-400 bg-white/10" />
          <span className="text-base text-blue-100 font-bold mb-1 text-center">{app.title}</span>
          {isActive && <span className="text-xs text-blue-100 mb-2 text-center">{app.description}</span>}
          {isActive && <a href={app.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 text-xs">GitHub</a>}
        </div>
      </Html>
    </group>
  );
}

// Animation de la pulsation dans un composant séparé pour garantir le hook dans l'arbre Canvas
const AnimatedStarMesh = React.forwardRef(({ isActive, i, onClick }, ref) => {
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + i * 0.7;
      const pulse = isActive ? 1.3 + Math.sin(t) * 0.18 : 1 + Math.sin(t) * 0.08;
      ref.current.scale.x = pulse;
      ref.current.scale.y = pulse;
      ref.current.scale.z = pulse;
    }
  });
  return (
    <mesh ref={ref} onClick={onClick} castShadow>
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshStandardMaterial color={isActive ? '#facc15' : '#60a5fa'} emissive="#f472b6" emissiveIntensity={isActive ? 0.35 : 0.18} />
    </mesh>
  );
});

function ConstellationWebProjects({ active, setActive }) {
  const radius = 4.2;
  // Positions pseudo-aléatoires pour un effet constellation naturel
  const positions = webApps.map((_, i) => {
    const angle = (i / webApps.length) * Math.PI * 2;
    const random1 = Math.sin(i * 1.7 + 0.5) * 0.7;
    const random2 = Math.cos(i * 2.3 - 0.8) * 0.7;
    const x = Math.cos(angle) * (radius + random1);
    const y = Math.sin(angle) * (radius * 0.4 + random2);
    const z = Math.sin(angle + random1) * (radius + random2);
    return [x, y, z];
  });
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }} shadows>
      <ConstellationGroup positions={positions} active={active} setActive={setActive} />
      {/* Effets lumineux */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#facc15" />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
    </Canvas>
  );
}

function ConstellationGroup({ positions, active, setActive }) {
  const groupRef = React.useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.18 + clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.11) * 0.09;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Lignes lumineuses entre les projets (constellation) */}
      {positions.map((pos, i) => {
        const next = positions[(i + 1) % positions.length];
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attachObject={["attributes", "position"]}
                count={2}
                array={new Float32Array([...pos, ...next])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#60a5fa" linewidth={2} />
          </line>
        );
      })}
      {/* Projets = étoiles avec pulsation et glow */}
      {webApps.map((app, i) => (
        <Star
          key={i}
          app={app}
          position={positions[i]}
          isActive={i === active}
          onClick={() => setActive(i)}
          i={i}
        />
      ))}
    </group>
  );
}

const ProjetsWeb = () => {
  const [active, setActive] = React.useState(0);
  return (
    <section id="web-app-constellation" className="w-full max-w-5xl mx-auto mt-16 px-4">
      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-8 text-center text-blue-200">Projets App Web (Constellation interactive)</h3>
      <div className="w-full h-[350px] md:h-[420px] bg-transparent rounded-xl flex items-center justify-center">
        <ConstellationWebProjects active={active} setActive={setActive} />
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-5 py-2 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => setActive((prev) => (prev - 1 + webApps.length) % webApps.length)}
        >
          ◀ Précédent
        </button>
        <button
          className="px-5 py-2 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => setActive((prev) => (prev + 1) % webApps.length)}
        >
          Suivant ▶
        </button>
      </div>
    </section>
  );
};

export default ProjetsWeb;
