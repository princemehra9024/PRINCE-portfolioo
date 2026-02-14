import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web Design", "Development", "Branding", "3D / Interactive"];

const projects = [
  { id: "1", title: "Nebula Dashboard", category: "Web Design", description: "A sleek analytics dashboard with real-time data visualization and dark-first design.", image: project1, tech: ["React", "D3.js", "TypeScript"] },
  { id: "2", title: "Flux Commerce", category: "Development", description: "High-performance e-commerce platform with fluid animations and micro-interactions.", image: project2, tech: ["Next.js", "Stripe", "Tailwind"] },
  { id: "3", title: "Void Studio", category: "3D / Interactive", description: "An immersive 3D portfolio experience built with WebGL and custom shaders.", image: project3, tech: ["Three.js", "GLSL", "React"] },
  { id: "4", title: "Aurora Brand", category: "Branding", description: "Complete brand identity and website for a creative studio.", image: project1, tech: ["Figma", "React", "Motion"] },
  { id: "5", title: "Pulse App", category: "Development", description: "Health tracking application with beautiful data viz and haptic feedback design.", image: project2, tech: ["React Native", "Node.js", "Charts"] },
  { id: "6", title: "Vertex 3D", category: "3D / Interactive", description: "Interactive product configurator using real-time 3D rendering.", image: project3, tech: ["Three.js", "WebGL", "TypeScript"] },
];

import ProjectHero from "@/components/ProjectHero";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Images
      const images = document.querySelectorAll(".parallax-project-img");
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

      // Grid Skew on Scroll
      let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".projects-grid", "skewY", "deg"),
        clamp = gsap.utils.clamp(-5, 5); // Don't skew too much

      ScrollTrigger.create({
        trigger: containerRef.current,
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <PageTransition>
      <main ref={containerRef}>
        <ProjectHero />

        <section className="section-padding">

          {/* Filters */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mt-12 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(175_80%_50%/0.2)]"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <motion.div layout ref={gridRef} className="projects-grid grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div className="group relative overflow-hidden rounded-lg border border-border transition-all duration-500 hover:border-primary/30 hover:glow-border">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="parallax-project-img w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-background/50 transition-opacity duration-500 group-hover:bg-background/30" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-1">{project.category}</p>
                          <h3 className="font-display font-bold text-xl text-foreground">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {project.description}
                          </p>
                          <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {project.tech.map((t) => (
                              <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
