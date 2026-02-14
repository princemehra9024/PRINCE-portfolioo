import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

function CosmicArc() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group rotation={[-0.5, 0, 0]} position={[0, 4, -5]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={[1, 0.8, 1]}>
                    <torusGeometry args={[12, 0.3, 64, 200]} />
                    <meshPhysicalMaterial
                        color="#4f46e5"
                        emissive="#3b82f6"
                        emissiveIntensity={4}
                        toneMapped={false}
                        roughness={0.2}
                        metalness={1}
                        clearcoat={1}
                    />
                </mesh>
            </Float>
            <mesh scale={[1.05, 0.85, 1]} position={[0, 0, -0.5]}>
                <torusGeometry args={[12, 0.1, 32, 100]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

function FloatingParticles() {
    const count = 200;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
        }
        return pos;
    }, []);

    const ref = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.4} sizeAttenuation />
        </points>
    );
}

export default function ProjectHero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-obsidian">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 10, -5]} intensity={3} color="#3b82f6" distance={50} />
                    <CosmicArc />
                    <FloatingParticles />
                    <Stars radius={60} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
                    <fog attach="fog" args={['#030305', 5, 40]} />
                </Canvas>
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-display font-black text-[12vw] leading-none tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] mix-blend-overlay"
                >
                    PROJECTS
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-primary font-mono text-sm tracking-[0.5em] uppercase"
                >
                    Selected Works & Case Studies
                </motion.p>
            </div>
        </section>
    );
}
