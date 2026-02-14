import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, PerspectiveCamera, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function CoderCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.z += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                <octahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial
                    color="#ff8c00"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    emissive="#ff8c00"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Outer Wireframe */}
            <mesh scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
            </mesh>
        </Float>
    );
}

function CodeParticles() {
    const count = 100;
    const meshRef = useRef<THREE.Group>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push({ x, y, z, speed: Math.random() * 0.02 });
        }
        return temp;
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={meshRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]}>
                    <boxGeometry args={[0.05, 0.05, 0.05]} />
                    <meshBasicMaterial color={Math.random() > 0.5 ? "#ff8c00" : "#3b82f6"} />
                </mesh>
            ))}
        </group>
    );
}

export default function CoderModel() {
    return (
        <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff8c00" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

                <CoderCore />
                <CodeParticles />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <fog attach="fog" args={["#0a0a0a", 5, 15]} />
            </Canvas>
        </div>
    );
}
