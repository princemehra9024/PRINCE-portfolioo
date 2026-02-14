import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 100;
                }
                return Math.min(prev + Math.floor(Math.random() * 10) + 1, 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100 && containerRef.current) {
            const tl = gsap.timeline();

            // Animate text out
            tl.to(textRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.inOut",
                delay: 0.2,
            });

            // Slide container up like a curtain
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
            });

            // Remove from DOM conceptually (or just z-index hide)
            tl.set(containerRef.current, { display: "none" });
        }
    }, [progress]);

    if (progress < 100) {
        // Keep rendering
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian text-foreground overflow-hidden"
        >
            <div className="relative overflow-hidden">
                <h1 ref={textRef} className="text-6xl md:text-9xl font-display font-bold tracking-tighter mix-blend-difference">
                    HELLO
                    <span className="text-primary">.</span>
                </h1>
            </div>

            <div className="absolute bottom-10 right-10 flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold text-primary">
                    {Math.min(progress, 100)}
                </span>
                <span className="text-sm font-mono text-muted-foreground">%</span>
            </div>
        </div>
    );
};

export default Preloader;
