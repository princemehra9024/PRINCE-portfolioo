import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshTransmissionMaterial, Trail, Stars, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function CodeSymbol({ position, char, color = "#ffffff", speed = 1 }: { position: [number, number, number], char: string, color?: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [randomOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + randomOffset;
      const radius = 4 + Math.sin(t * 0.5);
      meshRef.current.position.x = Math.cos(t) * radius + position[0] * 0.2;
      meshRef.current.position.z = Math.sin(t) * radius + position[2] * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.8;

      meshRef.current.lookAt(0, 0, 0);
      meshRef.current.rotation.z = Math.sin(t) * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <Text
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R60tsI.woff"
          fontSize={0.35}
          color={color}
          characters="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
          anchorX="center"
          anchorY="middle"
        >
          {char}
        </Text>
      </mesh>
    </Float>
  );
}

function TechRing({ radius, speed, rotation, color }: { radius: number, speed: number, rotation: [number, number, number], color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
      ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * speed;
      ref.current.rotation.z = rotation[2] + Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

function OrbitalParticle({ radius, speed, color, tilt }: { radius: number, speed: number, color: string, tilt: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = Math.random() * 100;
  const { mouse } = useThree();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;

      // Base orbital position
      let x = Math.cos(t) * radius;
      let z = Math.sin(t) * radius;
      let y = Math.sin(t * 3) * 0.5;

      // Mouse repulsion
      const mouseX = mouse.x * 10;
      const mouseY = mouse.y * 10;
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.5;
        x += (dx / dist) * force;
        y += (dy / dist) * force;
      }

      ref.current.position.set(x, y, z);
    }
  });

  return (
    <group rotation={tilt}>
      <Trail width={2} length={10} color={new THREE.Color(color)} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </Trail>
    </group>
  );
}

function QuantumCore() {
  const coreRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    if (cubeRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      cubeRef.current.scale.setScalar(pulse);

      if (Math.random() > 0.97) {
        cubeRef.current.scale.setScalar(pulse * 1.2);
      }
    }
  });

  return (
    <group ref={coreRef}>
      <Float speed={5} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={cubeRef}>
          <octahedronGeometry args={[1.5, 0]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={1.5}
            thickness={4}
            chromaticAberration={0.8}
            anisotropy={1}
            distortion={1}
            distortionScale={1}
            temporalDistortion={0.5}
            iridescence={1}
            iridescenceIOR={1.6}
            roughness={0}
            color="#000005"
            emissive="#4f46e5"
            emissiveIntensity={3}
          />
        </mesh>
      </Float>

      <Float speed={4} rotationIntensity={2}>
        <mesh>
          <torusKnotGeometry args={[1.8, 0.02, 256, 32]} />
          <MeshWobbleMaterial
            color="#00ffff"
            factor={0.8}
            speed={4}
            transparent
            opacity={0.4}
            emissive="#00ffff"
            emissiveIntensity={2}
          />
        </mesh>
      </Float>

      <TechRing radius={3} speed={0.6} rotation={[Math.PI / 3, 0, 0]} color="#3b82f6" />
      <TechRing radius={3.1} speed={-0.4} rotation={[Math.PI / 3, 0, 0]} color="#3b82f6" /> {/* Parallel Ring */}
      <TechRing radius={3.8} speed={-0.5} rotation={[-Math.PI / 4, 0, 0]} color="#fb923c" />
      <TechRing radius={3.9} speed={0.3} rotation={[-Math.PI / 4, 0, 0]} color="#fb923c" /> {/* Parallel Ring */}
      <TechRing radius={3.4} speed={0.4} rotation={[0, Math.PI / 2, Math.PI / 6]} color="#10b981" />
      <TechRing radius={3.5} speed={-0.2} rotation={[0, Math.PI / 2, Math.PI / 6]} color="#10b981" /> {/* Parallel Ring */}

      <OrbitalParticle radius={4.2} speed={2.5} color="#00ffff" tilt={[0.5, 0.5, 0]} />
      <OrbitalParticle radius={4.8} speed={-2.2} color="#fb923c" tilt={[-0.5, 0.2, 0]} />
      <OrbitalParticle radius={5.5} speed={1.8} color="#8b5cf6" tilt={[0.2, -0.5, 0]} />
      <OrbitalParticle radius={6.2} speed={-1.5} color="#3b82f6" tilt={[-0.2, 0.5, 0.5]} />
    </group>
  );
}

function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouse.x * 12, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mouse.y * 12, 0.08);
    }
  });

  return <pointLight ref={lightRef} intensity={5} distance={20} color="#6366f1" />;
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    // Smooth camera tilt/pan following the mouse
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, 14), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

export default function HeroScene() {
  const symbols = [
    "< >", "{ }", "//", "01", "fn", "var", "npm", "git",
    "&&", "||", "=>", "[]", "()", "++", "--", ";",
    "if", "for", "try", "res"
  ];

  return (
    <div className="absolute inset-0 z-0 bg-background">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#3b82f6" />
        <pointLight position={[-10, -5, -10]} intensity={3} color="#ff8c00" />
        <spotLight position={[0, 15, 5]} angle={0.4} penumbra={1} intensity={10} color="#4f46e5" />

        <CursorLight />
        <QuantumCore />
        <Rig />

        {symbols.map((char, i) => (
          <CodeSymbol
            key={i}
            char={char}
            position={[0, (i - 10) * 0.4, 0]}
            speed={0.4 + Math.random() * 0.5}
            color={Math.random() > 0.5 ? "#60a5fa" : "#fb923c"}
          />
        ))}

        <Stars radius={60} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        <fog attach="fog" args={['#030305', 5, 40]} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent 40% to-background z-10 pointer-events-none" />
    </div>
  );
}
