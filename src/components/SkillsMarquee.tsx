
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useData } from "@/contexts/DataContext";

gsap.registerPlugin(ScrollTrigger);

const SkillsMarquee = () => {
    const { data } = useData();
    // Fallback if data is missing, though context should provide it
    const defaultSkills = ["React", "TypeScript", "Node.js", "Three.js", "GSAP", "Tailwind", "Next.js", "MongoDB", "AWS", "Framer Motion"];
    const skills = (data?.skills?.flatMap(s => s.items) || defaultSkills).concat(data?.skills?.flatMap(s => s.items) || defaultSkills);

    const container = useRef(null);
    const row1 = useRef(null);
    const row2 = useRef(null);

    useEffect(() => {
        let xPercent = 0;
        let direction = -1;
        let velocity = 0;
        let skew = 0;

        const animate = () => {
            // Velocity decay
            velocity *= 0.95;
            skew *= 0.9;

            // Base speed + velocity
            const speed = 0.05 + Math.abs(velocity) * 0.0005;

            if (xPercent <= -100) xPercent = 0;
            if (xPercent > 0) xPercent = -100;

            gsap.set(row1.current, { xPercent: xPercent, skewX: skew });
            gsap.set(row2.current, { xPercent: -100 - xPercent, skewX: -skew }); // Reverse direction for row 2

            xPercent += speed * direction;
            requestAnimationFrame(animate);
        };

        const animation = requestAnimationFrame(animate);

        // Track Scroll Velocity
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                velocity = self.getVelocity();
                direction = self.direction; // 1 or -1
                skew = velocity * 0.005; // Adjust skew sensitivity
            }
        });

        return () => cancelAnimationFrame(animation);
    }, []);

    return (
        <div ref={container} className="relative py-20 bg-obsidian overflow-hidden border-y border-white/5">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]"></div>

            {/* Row 1: Filled Text */}
            <div ref={row1} className="relative flex whitespace-nowrap will-change-transform">
                <MarqueeRow items={skills} type="filled" />
                <MarqueeRow items={skills} type="filled" />
            </div>

            {/* Row 2: Outlined Text */}
            <div ref={row2} className="relative flex whitespace-nowrap mt-4 will-change-transform">
                <MarqueeRow items={skills} type="outlined" />
                <MarqueeRow items={skills} type="outlined" />
            </div>
        </div>
    );
};

const MarqueeRow = ({ items, type }: { items: string[], type: "filled" | "outlined" }) => (
    <div className="flex gap-8 px-4">
        {items.map((skill, i) => (
            <span
                key={i}
                className={`
                    text-7xl md:text-9xl font-display font-black uppercase tracking-tighter transition-colors duration-300
                    ${type === 'filled'
                        ? 'text-white/20 hover:text-white'
                        : 'text-transparent stroke-text hover:text-primary'
                    }
                    ${type === 'outlined' ? 'stroke-current' : ''}
                `}
                style={{
                    WebkitTextStroke: type === 'outlined' ? '1px rgba(255,255,255,0.2)' : 'none'
                }}
            >
                {skill}
            </span>
        ))}
    </div>
);

export default SkillsMarquee;
