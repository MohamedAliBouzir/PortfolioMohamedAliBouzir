"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

/* ── Ready Player Me avatar loader ────────────────────────── */
function RPMAvatar({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions, names } = useAnimations(animations, groupRef);

  /* Play idle animation if one exists */
  useEffect(() => {
    const idleName = names.find(
      (n) => n.toLowerCase().includes("idle") || n.toLowerCase().includes("breathing")
    ) ?? names[0];
    if (idleName && actions[idleName]) {
      actions[idleName]!.reset().fadeIn(0.5).play();
    }
    return () => {
      actions[idleName]?.fadeOut(0.3);
    };
  }, [actions, names]);

  /* Gentle idle sway */
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.12;
  });

  /* Apply aurora emissive tint to avatar materials */
  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.envMapIntensity = isDark ? 1.2 : 0.8;
        }
      });
    });
  }, [scene, isDark]);

  return (
    <group ref={groupRef} position={[0, -1.0, 0]} scale={1.0}>
      <primitive object={scene} />
    </group>
  );
}

/* ── Floating orbs around the avatar ──────────────────────── */
function FloatingOrb({
  position, color, emissive, size, isDark,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  size: number;
  isDark: boolean;
}) {
  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isDark ? 1.0 : 0.45}
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.82}
        />
      </mesh>
    </Float>
  );
}

/* ── Lights ─────────────────────────────────────────────────── */
function AvatarLights({ isDark }: { isDark: boolean }) {
  const keyRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (!keyRef.current) return;
    keyRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 1.5;
  });

  return isDark ? (
    <>
      <ambientLight intensity={0.3} color="#1a1040" />
      <spotLight
        ref={keyRef}
        position={[2.5, 4, 3]}
        angle={0.45}
        penumbra={0.6}
        intensity={60}
        color="#c084fc"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <pointLight position={[-2.5, 2, 1.5]} intensity={30} color="#38bdf8" distance={8} decay={2} />
      <pointLight position={[0,   -1, 2.5]} intensity={20} color="#ec4899" distance={6} decay={2} />
    </>
  ) : (
    <>
      <ambientLight intensity={1.2} color="#f0f4ff" />
      <directionalLight position={[3, 6, 5]}  intensity={2.5} color="#ffffff" castShadow />
      <pointLight       position={[-2, 3, 2]}  intensity={25} color="#a78bfa" distance={9}  decay={2} />
      <pointLight       position={[2, -1, 3]}  intensity={18} color="#f9a8d4" distance={7}  decay={2} />
    </>
  );
}

/* ── Placeholder shown while /avatar.glb loads ─────────────── */
function AvatarPlaceholder({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={1} floatIntensity={0.4}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.18, 128, 32]} />
        <meshStandardMaterial
          color={isDark ? "#7c3aed" : "#a78bfa"}
          metalness={0.9}
          roughness={0.05}
          emissive={isDark ? "#4c1d95" : "#6d28d9"}
          emissiveIntensity={isDark ? 0.6 : 0.3}
        />
      </mesh>
    </Float>
  );
}

/* ── Scene ──────────────────────────────────────────────────── */
function AvatarScene({ isDark, hasGlb }: { isDark: boolean; hasGlb: boolean }) {
  return (
    <>
      <AvatarLights isDark={isDark} />
      <Environment preset={isDark ? "night" : "city"} />

      {hasGlb ? (
        <Suspense fallback={<AvatarPlaceholder isDark={isDark} />}>
          <RPMAvatar isDark={isDark} />
        </Suspense>
      ) : (
        <AvatarPlaceholder isDark={isDark} />
      )}

      {/* Decorative orbs */}
      <FloatingOrb position={[-1.1,  0.8, 0.3]} color={isDark ? "#c084fc" : "#a78bfa"} emissive={isDark ? "#a855f7" : "#7c3aed"} size={0.075} isDark={isDark} />
      <FloatingOrb position={[ 1.0,  1.1, -0.2]} color={isDark ? "#38bdf8" : "#7dd3fc"} emissive={isDark ? "#0ea5e9" : "#0284c7"} size={0.065} isDark={isDark} />
      <FloatingOrb position={[ 1.2, -0.4, 0.5]} color={isDark ? "#34d399" : "#6ee7b7"} emissive={isDark ? "#10b981" : "#059669"} size={0.060} isDark={isDark} />
      <FloatingOrb position={[-0.9, -0.6, 0.4]} color={isDark ? "#f472b6" : "#f9a8d4"} emissive={isDark ? "#ec4899" : "#db2777"} size={0.055} isDark={isDark} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={isDark ? 0.45 : 0.18}
        scale={4}
        blur={2.5}
        far={4}
        color={isDark ? "#7c3aed" : "#a78bfa"}
      />
    </>
  );
}

/* ── Export ─────────────────────────────────────────────────── */
export default function AvatarCanvas() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  /* Check if /avatar.glb exists (avoids R3F error if file not dropped yet) */
  const [hasGlb, setHasGlb] = useState(false);
  useEffect(() => {
    fetch("/avatar.glb", { method: "HEAD" })
      .then((r) => { if (r.ok) setHasGlb(true); })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0.4, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 1.5]}
      >
        <AvatarScene isDark={isDark} hasGlb={hasGlb} />
      </Canvas>
    </div>
  );
}

/* Pre-load only if file exists (safe — useGLTF.preload silently fails) */
// useGLTF.preload("/avatar.glb");
