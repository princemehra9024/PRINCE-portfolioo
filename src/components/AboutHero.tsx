import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import aboutPortrait from "@/assets/about-portrait.jpg";

export default function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax for background text
    const y1 = useTransform(scrollY, [0, 800], [0, -150]);

    // Mouse follow spotlight effect using GSAP
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !spotlightRef.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();

            const x = clientX - left;
            const y = clientY - top;

            gsap.to(spotlightRef.current, {
                x: x,
                y: y,
                duration: 0.8,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[110vh] w-full bg-[#0a0a0a] overflow-hidden flex flex-col justify-between p-6 md:p-12 lg:p-16 text-[#ede4d1] selection:bg-[#ff8c00]/30 cursor-none"
        >
            {/* 1. LAYER: Base Atmosphere (Radial Gradients) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff8c00]/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ffa500]/5 blur-[150px] rounded-full"></div>
            </div>

            {/* 2. LAYER: GSAP Mouse Follow Spotlight */}
            <div
                ref={spotlightRef}
                className="absolute w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            ></div>

            {/* 3. LAYER: Grain & Noise Texture */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* 4. LAYER: Scanlines/Vignette */}
            <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
            <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

            {/* Removed local header as it clashes with global minimalist Navbar */}

            {/* Side Metadata (Vertical) */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                <p className="rotate-90 origin-right text-[10px] font-bold tracking-[0.8em] uppercase opacity-30 whitespace-nowrap">
                    Creative Studio &copy; 2026 &nbsp; // &nbsp; Digital Experiences
                </p>
            </div>

            {/* Background Text: PORTFOLIO with Parallax */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <motion.h1
                    style={{ y: y1 }}
                    initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.2em" }}
                    animate={{ opacity: 0.6, scale: 1, letterSpacing: "-0.05em" }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[25vw] lg:text-[28vw] font-display font-black leading-none uppercase select-none text-[#ede4d1]/40"
                >
                    Portfolio
                </motion.h1>
            </div>

            {/* Moving Particles/Blur Layers */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[15%] w-64 h-64 bg-[#ff8c00]/10 blur-[80px] rounded-full z-10"
            />
            <motion.div
                animate={{
                    y: [0, 50, 0],
                    x: [0, -40, 0],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[30%] left-[10%] w-96 h-96 bg-[#ffa500]/10 blur-[100px] rounded-full z-10"
            />

            {/* Central Portrait with Glow */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                >
                    {/* Animated Glow behind portrait */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-10 bg-[#ff8c00]/10 blur-[60px] rounded-full z-[-1]"
                    />

                    <div className="relative w-[75vw] md:w-[35vw] max-w-[450px] aspect-[3/4] overflow-hidden translate-y-4 md:translate-y-0 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {/* Image Border/Frame Effect */}
                        <div className="absolute inset-0 border-[12px] border-black/80 z-10 pointer-events-none"></div>
                        <motion.img
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            src={aboutPortrait}
                            alt="Prince Mehra"
                            className="w-full h-full object-cover grayscale-[0.5] contrast-[1.2] brightness-[0.9] hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Sections */}
            <div className="flex flex-col md:flex-row justify-between items-end z-50 w-full mb-4">
                {/* Left Bottom */}
                <div className="space-y-12 mb-12 md:mb-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-4 group cursor-pointer"
                    >
                        <div className="w-12 h-[1px] bg-[#ede4d1]/40 group-hover:w-20 group-hover:bg-[#ff8c00] transition-all duration-500"></div>
                        <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-60 group-hover:opacity-100 group-hover:text-[#ff8c00] transition-all duration-300">Explore Work</p>
                    </motion.div>

                    <div className="space-y-[-0.5rem]">
                        <motion.h2
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-display font-black leading-none uppercase tracking-tighter"
                        >
                            Prince
                        </motion.h2>
                        <motion.h2
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-display font-black leading-none uppercase tracking-tighter ml-4 md:ml-12 text-outline"
                            style={{ WebkitTextStroke: '1px #ede4d1', color: 'transparent' }}
                        >
                            Mehra
                        </motion.h2>
                    </div>
                </div>

                {/* Right Bottom */}
                <div className="flex flex-col items-end gap-2">
                    <motion.div
                        animate={{
                            rotate: [0, 90, 180, 270, 360],
                            backgroundColor: ["#ff8c00", "#ffa500", "#ff8c00"]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 relative flex items-center justify-center mb-4"
                    >
                        <div className="absolute inset-0 border-2 border-[#ede4d1]/20"></div>
                    </motion.div>
                    <div className="text-right">
                        <motion.h3
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-3xl md:text-5xl font-display font-light leading-none italic opacity-60 lowercase mb-1"
                        >
                            Full Stack
                        </motion.h3>
                        <motion.h3
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-4xl md:text-7xl font-display font-black leading-none uppercase tracking-tighter"
                        >
                            Developer
                        </motion.h3>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#ede4d1] to-transparent"></div>
            </motion.div>

            {/* Custom Cursor Overlay (Simple) */}
            <div className="fixed inset-0 z-[100] pointer-events-none mix-blend-difference hidden md:block">
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-white rounded-full blur-[2px]"
                    style={{ x: -2, y: -2 }} // Offset to center
                />
            </div>
        </section>
    );
}
