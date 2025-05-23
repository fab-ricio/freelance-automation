import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

// Shader material
const fragmentShader = `
  uniform float uTime;
  uniform float uIntegral;
  varying vec2 vUv;
  void main() {
    float t = uTime * 0.1;
    float intensity = 0.5 + 0.5 * sin(uIntegral * 2.0 + t + vUv.x * 6.0 + vUv.y * 6.0);
    float blue = 0.6 + 0.4 * cos(uIntegral * 3.0 + t + vUv.y * 8.0);
    float red = 0.3 + 0.7 * abs(sin(uIntegral + t + vUv.x * 8.0));
    float green = 0.4 + 0.6 * abs(cos(uIntegral * 2.0 + t + vUv.y * 8.0));
    gl_FragColor = vec4(red, green, blue, 1.0);
  }
`;
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function computeIntegral(alpha) {
  if (alpha > 1) {
    return alpha / (alpha * alpha - 1.0);
  }
  return 0.0;
}

function AnimatedShaderBackground({ alpha }) {
  const mesh = useRef();
  const material = useRef();
  const integral = useMemo(() => computeIntegral(alpha), [alpha]);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
      material.current.uniforms.uIntegral.value = integral;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[6, 3.5, 1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uIntegral: { value: integral },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const MapSection = () => {
  // Contrôle du slider alpha (pour la démo, valeur par défaut 2)
  const { alpha } = useControls({ alpha: { value: 2, min: 0.5, max: 5, step: 0.01 } });

  return (
    <section style={{ position: 'relative', minHeight: '420px' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
          <AnimatedShaderBackground alpha={alpha} />
        </Canvas>
      </div>
      <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-bold text-white dark:text-blue-100 mb-4 tracking-wide uppercase drop-shadow-lg">Où me trouver ?</h2>
        <div className="h-64 sm:h-80 w-full rounded-3xl overflow-hidden shadow-xl border border-blue-400/20 bg-[#23265d]/40 dark:bg-[#232b4e] flex items-center justify-center">
          <iframe
            title="Carte quartier"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.3488%2C48.8534%2C2.3688%2C48.8634&layer=mapnik"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ filter: 'grayscale(0.2) contrast(1.1) brightness(0.95)' }}
          ></iframe>
        </div>
        <p className="mt-2 text-xs text-white/80 dark:text-blue-100/70">Quartier : Paris 5e (exemple, à personnaliser)</p>
        <div className="flex items-center gap-4 mt-4">
          <label className="text-blue-100 font-medium">α =</label>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.01}
            value={alpha}
            onChange={e => window.dispatchEvent(new CustomEvent('leva:set', { detail: { path: 'alpha', value: Number(e.target.value) } }))}
            className="accent-blue-500 w-40"
          />
          <span className="w-10 text-center text-blue-300 font-mono">{alpha.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
