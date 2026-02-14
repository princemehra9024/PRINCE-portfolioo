import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import SkillsMarquee from "@/components/SkillsMarquee";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = lazy(() => import("@/components/HeroScene"));

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "30+", label: "Happy Clients" },
  { value: "10+", label: "Awards Won" },
];

const featuredProjects = [
  { title: "Nebula Dashboard", category: "Web Design / Development", image: project1, id: "1" },
  { title: "Flux Commerce", category: "E-commerce / Branding", image: project2, id: "2" },
  { title: "Void Studio", category: "3D / Interactive", image: project3, id: "3" },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Images
      const images = document.querySelectorAll(".parallax-img");
      images.forEach((img) => {
        gsap.to(img, {
          y: "-20%",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-background relative">
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero */}
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
          <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <HeroScene />
          </Suspense>

          <motion.div
            style={{
              y: y1,
              x: mousePos.x * -0.3, // Stronger repulsion for 'avoiding' feel
              rotateX: mousePos.y * 0.1, // Dynamic tilt
              rotateY: mousePos.x * -0.1,
            }}
            className="relative z-20 section-padding text-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-primary font-mono text-xs md:text-sm tracking-[0.6em] uppercase mb-10 opacity-70">
                Creative Developer & Designer
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-6xl md:text-[11vw] leading-[0.75] tracking-tighter text-white perspective-2000"
            >
              <span className="block mb-2 mix-blend-exclusion">I CREATE</span>
              <span className="text-gradient drop-shadow-[0_0_80px_rgba(255,140,0,0.5)] block mb-2 font-black">DIGITAL</span>
              <span className="block italic font-light opacity-90 drop-shadow-2xl mix-blend-difference">EXPERIENCES</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <p className="mt-12 text-muted-foreground/60 max-w-lg mx-auto text-lg md:text-xl font-light tracking-wide leading-relaxed">
                Blending high-end design, code, and motion into <span className="text-foreground border-b border-primary/30">immersive digital products.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-14 flex items-center justify-center gap-8 pointer-events-auto"
            >
              <Magnetic>
                <Link
                  to="/projects"
                  className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#ff8c00] hover:text-white hover:shadow-[0_0_60px_rgba(255,140,0,0.6)] overflow-hidden"
                >
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-4 border border-white/10 text-white/50 px-12 py-6 rounded-full font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:border-white hover:text-white hover:bg-white/5 backdrop-blur-sm"
                >
                  Contact
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={20} className="text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Conveyor Belt */}
        <SkillsMarquee />

        {/* Stats */}
        <section className="section-padding border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-display font-bold text-gradient">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="section-padding">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-3">Selected Work</p>
                <h2 className="heading-lg font-display font-bold">
                  Featured <span className="text-gradient">Projects</span>
                </h2>
              </div>
              <Link to="/projects" className="hidden md:inline-flex items-center gap-2 nav-link text-sm uppercase tracking-widest">
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.15}>
                <Link to="/projects" className="group block">
                  <div className="relative overflow-hidden rounded-lg glow-border">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={project.image} alt={project.title} className="parallax-img w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-background/40 transition-opacity duration-500 group-hover:opacity-20" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <p className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-2">{project.category}</p>
                      <h3 className="heading-md font-display font-bold text-foreground">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="section-padding border-t border-white/10 text-center">
          <ScrollReveal>
            <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">Let's Collaborate</p>
            <h2 className="heading-lg font-display font-bold mb-8">Have a project in <span className="text-gradient">mind?</span></h2>
            <Link to="/contact" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_hsl(175_80%_50%/0.3)] hover:scale-105">
              Start a Conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
