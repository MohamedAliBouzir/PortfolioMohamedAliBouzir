"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingInitialsProps {
  initials: string;
}

function FloatingInitials({ initials }: FloatingInitialsProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  const particlePositions = useMemo(() => {
    const count = 28;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = 0.72 + Math.random() * 0.18;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return positions;
  }, []);

  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,255,65,0.18)");
    grad.addColorStop(1, "rgba(0,255,65,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = "#00FF41";
    ctx.font = "bold 52px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#00FF41";
    ctx.shadowBlur = 14;
    ctx.fillText(initials.slice(0, 2).toUpperCase(), 64, 66);

    return new THREE.CanvasTexture(canvas);
  }, [initials]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.6) * 0.25;
      meshRef.current.position.y = Math.sin(t * 1.1) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group>
      {/* Core plane with initials */}
      <mesh ref={meshRef}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshBasicMaterial map={textTexture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Spinning orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.78, 0.012, 8, 64]} />
        <meshBasicMaterial color="#00FF41" transparent opacity={0.55} />
      </mesh>

      {/* Particle orbit */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#00FF41"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Ambient glow */}
      <pointLight color="#00FF41" intensity={1.2} distance={3} />
    </group>
  );
}

interface LogoPlaceholder3DProps {
  initials: string;
  size?: number;
}

export default function LogoPlaceholder3D({ initials, size = 44 }: LogoPlaceholder3DProps) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <FloatingInitials initials={initials} />
      </Canvas>
    </div>
  );
}
