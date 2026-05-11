"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

/* ─────────────────────────────────────────────────────────────────
   PLANET DATA
   radius      = orbital radius from sun
   size        = planet sphere radius
   speed       = orbital angular speed (rad/s)
   tilt        = orbital plane tilt (rad)
   startAngle  = initial angle offset so planets don't stack at t=0
   selfSpin    = self-rotation speed
   color       = atmosphere / ring tint
   emissive    = emissive color for glow
───────────────────────────────────────────────────────────────── */
const PLANETS = [
  { id: "react",      src: "/tech-icons/react.svg",      radius: 1.6, size: 0.30, speed: 1.10, tilt: 0.10, startAngle: 0.0,  selfSpin: 1.2, color: "#61DAFB", emissive: "#0ea5c8" },
  { id: "typescript", src: "/tech-icons/typescript.svg", radius: 2.3, size: 0.26, speed: 0.75, tilt: 0.22, startAngle: 1.2,  selfSpin: 0.9, color: "#3178C6", emissive: "#1d4ed8" },
  { id: "next",       src: "/tech-icons/next.svg",       radius: 3.0, size: 0.32, speed: 0.55, tilt: -0.15,startAngle: 2.5,  selfSpin: 0.7, color: "#e0e0e0", emissive: "#aaaaaa" },
  { id: "tailwind",   src: "/tech-icons/tailwind.svg",   radius: 3.7, size: 0.24, speed: 0.42, tilt: 0.30, startAngle: 0.8,  selfSpin: 1.1, color: "#38BDF8", emissive: "#0284c7" },
  { id: "nest",       src: "/tech-icons/nest.svg",       radius: 4.4, size: 0.28, speed: 0.32, tilt: -0.25,startAngle: 3.8,  selfSpin: 0.8, color: "#E0234E", emissive: "#be123c" },
  { id: "node",       src: "/tech-icons/node.svg",       radius: 5.0, size: 0.26, speed: 0.24, tilt: 0.18, startAngle: 1.9,  selfSpin: 1.0, color: "#68A063", emissive: "#15803d" },
  { id: "postgres",   src: "/tech-icons/postgres.svg",   radius: 5.7, size: 0.24, speed: 0.18, tilt: -0.12,startAngle: 4.5,  selfSpin: 0.6, color: "#336791", emissive: "#1e4f70" },
  { id: "docker",     src: "/tech-icons/docker.svg",     radius: 6.3, size: 0.22, speed: 0.13, tilt: 0.35, startAngle: 2.8,  selfSpin: 0.5, color: "#2496ED", emissive: "#1d4ed8" },
] as const;

/* ─────────────────────────────────────────────────────────────────
   BUILD PLANET TEXTURE
   Sphere UV mapping — just draw the logo centered on a solid
   colored background. The sphere will wrap it correctly.
───────────────────────────────────────────────────────────────── */
function buildPlanetTexture(color: string, isDark: boolean, logoTex: THREE.Texture): THREE.CanvasTexture {
  const S = 512;
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const ctx = cv.getContext("2d")!;

  /* ── Solid base fill ── */
  ctx.fillStyle = isDark ? "#0d0b1e" : "#f0f4ff";
  ctx.fillRect(0, 0, S, S);

  /* ── Color atmosphere gradient ── */
  const g = ctx.createRadialGradient(S * 0.4, S * 0.35, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0,   color + (isDark ? "66" : "44"));
  g.addColorStop(0.5, color + (isDark ? "33" : "22"));
  g.addColorStop(1,   color + (isDark ? "11" : "08"));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  /* ── Subtle surface bands (latitude lines like real planets) ── */
  for (let i = 0; i < 6; i++) {
    const y = (i / 6) * S;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(S, y);
    ctx.strokeStyle = color + (isDark ? "1a" : "10");
    ctx.lineWidth = 8;
    ctx.stroke();
  }

  /* ── Logo centered, full opacity ── */
  const img = logoTex.image as CanvasImageSource | undefined;
  if (img) {
    const pad = 100;
    const logoSize = S - pad * 2;
    ctx.save();
    ctx.globalAlpha = isDark ? 0.92 : 0.85;
    /* White backing so dark logos on dark backgrounds are visible */
    if (isDark) {
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, logoSize / 2 + 16, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fill();
    }
    ctx.drawImage(img, pad, pad, logoSize, logoSize);
    ctx.restore();
  }

  return new THREE.CanvasTexture(cv);
}

/* ─────────────────────────────────────────────────────────────────
   ORBITAL RING  — thin torus showing the orbit path
───────────────────────────────────────────────────────────────── */
function OrbitalRing({ radius, tilt, isDark }: { radius: number; tilt: number; isDark: boolean }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 180]} />
      <meshBasicMaterial
        color={isDark ? "#ffffff" : "#000000"}
        transparent
        opacity={isDark ? 0.10 : 0.07}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PLANET  — sphere that orbits the sun
───────────────────────────────────────────────────────────────── */
function Planet({
  src, radius, size, speed, tilt, startAngle, selfSpin,
  color, emissive, isDark,
}: {
  src: string; radius: number; size: number; speed: number;
  tilt: number; startAngle: number; selfSpin: number;
  color: string; emissive: string; isDark: boolean;
}) {
  const pivotRef = useRef<THREE.Group>(null);   // orbital pivot (rotates around sun)
  const sphereRef = useRef<THREE.Mesh>(null);   // self-spin

  const logoTex = useLoader(THREE.TextureLoader, src);

  const tex = useMemo(
    () => buildPlanetTexture(color, isDark, logoTex),
    [color, isDark, logoTex]
  );

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    map: tex,
    color: "#ffffff",
    roughness: isDark ? 0.55 : 0.65,
    metalness: isDark ? 0.15 : 0.05,
    emissiveMap: tex,
    emissive: "#ffffff",
    emissiveIntensity: isDark ? 0.18 : 0.06,
  }), [tex, isDark]);

  /* atmosphere glow — additive sphere slightly larger than the planet */
  const atmMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: isDark ? 0.5 : 0.2,
    transparent: true,
    opacity: isDark ? 0.12 : 0.08,
    side: THREE.BackSide,
    depthWrite: false,
  }), [color, isDark]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    /* Orbital motion — rotate pivot around sun */
    if (pivotRef.current) {
      pivotRef.current.rotation.y = startAngle + t * speed;
    }

    /* Self rotation */
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * selfSpin;
    }
  });

  return (
    <>
      <OrbitalRing radius={radius} tilt={tilt} isDark={isDark} />

      {/* Orbital pivot — tilted plane */}
      <group rotation={[tilt, 0, 0]}>
        <group ref={pivotRef}>
          {/* Planet sits at (radius, 0, 0) in the pivot's local space */}
          <group position={[radius, 0, 0]}>
            {/* Atmosphere */}
            <mesh scale={1.18}>
              <sphereGeometry args={[size, 32, 32]} />
              <primitive object={atmMat} attach="material" />
            </mesh>
            {/* Planet sphere */}
            <mesh ref={sphereRef}>
              <sphereGeometry args={[size, 40, 40]} />
              <primitive object={mat} attach="material" />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SUN  — center glowing sphere
───────────────────────────────────────────────────────────────── */
function Sun({ isDark }: { isDark: boolean }) {
  const coreRef   = useRef<THREE.Mesh>(null);
  const corona1Ref = useRef<THREE.Mesh>(null);
  const corona2Ref = useRef<THREE.Mesh>(null);

  /* Sun core texture — fiery gradient */
  const sunTex = useMemo(() => {
    const S = 256;
    const cv = document.createElement("canvas");
    cv.width = cv.height = S;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(S * 0.45, S * 0.4, 0, S / 2, S / 2, S / 2);
    if (isDark) {
      g.addColorStop(0,   "#fff7e0");
      g.addColorStop(0.3, "#ffcc44");
      g.addColorStop(0.6, "#ff6a00");
      g.addColorStop(0.85,"#c026d3");
      g.addColorStop(1,   "#4c1d95");
    } else {
      g.addColorStop(0,   "#ffffff");
      g.addColorStop(0.3, "#ffe066");
      g.addColorStop(0.65,"#ff9900");
      g.addColorStop(0.85,"#f97316");
      g.addColorStop(1,   "#fde68a");
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    return new THREE.CanvasTexture(cv);
  }, [isDark]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    /* Slow core rotation */
    if (coreRef.current)   coreRef.current.rotation.y   = t * 0.15;
    /* Pulsing corona */
    const pulse = 1 + Math.sin(t * 1.8) * 0.04;
    if (corona1Ref.current) corona1Ref.current.scale.setScalar(pulse);
    const pulse2 = 1 + Math.sin(t * 1.2 + 1) * 0.06;
    if (corona2Ref.current) corona2Ref.current.scale.setScalar(pulse2);
  });

  return (
    <group>
      {/* Point light emanating from sun — lights all planets */}
      <pointLight
        color={isDark ? "#ffcc44" : "#fff3b0"}
        intensity={isDark ? 200 : 160}
        distance={18}
        decay={2}
      />

      {/* Outer corona 2 — very faint wide halo */}
      <mesh ref={corona2Ref}>
        <sphereGeometry args={[0.88, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? "#ff6a00" : "#ffcc44"}
          emissive={isDark ? "#ff6a00" : "#ffcc44"}
          emissiveIntensity={isDark ? 0.3 : 0.2}
          transparent opacity={isDark ? 0.08 : 0.06}
          side={THREE.BackSide} depthWrite={false}
        />
      </mesh>

      {/* Inner corona 1 */}
      <mesh ref={corona1Ref}>
        <sphereGeometry args={[0.68, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? "#ffcc44" : "#ffe066"}
          emissive={isDark ? "#ffcc44" : "#ffe066"}
          emissiveIntensity={isDark ? 0.7 : 0.4}
          transparent opacity={isDark ? 0.18 : 0.12}
          side={THREE.BackSide} depthWrite={false}
        />
      </mesh>

      {/* Sun core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.52, 48, 48]} />
        <meshStandardMaterial
          map={sunTex}
          color="#ffffff"
          emissiveMap={sunTex}
          emissive="#ffffff"
          emissiveIntensity={isDark ? 1.8 : 1.2}
          roughness={0.4}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STAR FIELD
───────────────────────────────────────────────────────────────── */
function StarField({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { pos, col } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = isDark
      ? ["#7c3aed","#0ea5e9","#10b981","#ec4899","#ffffff"].map(h => new THREE.Color(h))
      : ["#a78bfa","#38bdf8","#6ee7b7","#f9a8d4","#94a3b8"].map(h => new THREE.Color(h));
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
    }
    return { pos, col };
  }, [isDark]);

  useFrame(s => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color"    args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.045 : 0.03}
        vertexColors
        transparent
        opacity={isDark ? 0.85 : 0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE LIGHTS  (ambient + fill — sun provides the key)
───────────────────────────────────────────────────────────────── */
function SceneLights({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <>
      <ambientLight intensity={0.08} color="#0d0b2e" />
      <pointLight position={[0, 8, 6]}  intensity={20} color="#7c3aed" distance={20} decay={2} />
      <pointLight position={[0,-8,-6]}  intensity={15} color="#ec4899" distance={18} decay={2} />
    </>
  ) : (
    <>
      <ambientLight intensity={0.6} color="#e8f0ff" />
      <directionalLight position={[4, 6, 5]} intensity={0.6} color="#f0e8ff" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE
───────────────────────────────────────────────────────────────── */
function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <SceneLights isDark={isDark} />
      <StarField isDark={isDark} />
      <Sun isDark={isDark} />
      {PLANETS.map(p => (
        <Planet
          key={p.id}
          src={p.src}
          radius={p.radius}
          size={p.size}
          speed={p.speed}
          tilt={p.tilt}
          startAngle={p.startAngle}
          selfSpin={p.selfSpin}
          color={p.color}
          emissive={p.emissive}
          isDark={isDark}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────────────────── */
export default function HeroCanvas() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 52 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.1 : 1.4,
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
