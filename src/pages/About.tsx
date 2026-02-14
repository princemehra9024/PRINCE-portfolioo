import { useRef, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import aboutPortrait from "@/assets/about-portrait.jpg";
import { useData } from "@/contexts/DataContext";
import AboutHero from "@/components/AboutHero";
import Magnetic from "@/components/Magnetic";
import Tilt from "@/components/Tilt";
import CoderModel from "@/components/CoderModel";
import CyberPortrait from "@/components/CyberPortrait";

const SpaceBackground = lazy(() => import("@/components/SpaceBackground"));

export default function About() {
  const { data } = useData();
  const { scrollYProgress } = useScroll();
  const showcaseRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for gloss/glow effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Parallax for background text
  const textY = useTransform(scrollYProgress, [0.3, 1], [0, 200]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.2]);

  // Parallax for portrait
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Variant for blur reveal
  const blurReveal = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <PageTransition>
      <main className="bg-[#0e0d0c] relative selection:bg-[#ff8c00]/30 overflow-hidden">
        {/* 1. LAYER: 3D Space Background (Fills empty space) */}
        <Suspense fallback={null}>
          <SpaceBackground />
        </Suspense>

        <AboutHero />

        {/* Editorial Showcase Section */}
        <section
          ref={showcaseRef}
          onMouseMove={handleMouseMove}
          className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden"
        >
          {/* Volumetric Mouse Glow Cluster */}
          <div
            className="absolute pointer-events-none z-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-transform duration-300 ease-out"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(255,140,0,0.4) 0%, rgba(59,130,246,0.1) 50%, transparent 100%)"
            }}
          ></div>

          {/* Background Typography */}
          <motion.div
            style={{ y: textY, scale: textScale }}
            className="absolute top-20 left-12 z-0 pointer-events-none select-none opacity-10"
          >
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15vw] font-display font-black leading-none uppercase tracking-tighter"
            >
              Prince<br />Mehra
            </motion.h2>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl font-mono tracking-[0.5em] uppercase text-[#ff8c00]"
            >
              Full Stack MERN Developer
            </motion.p>
          </motion.div>

          <div className="container mx-auto relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Column (Creative DNA & Coder Model) */}
            <div className="lg:col-span-4 space-y-12 w-full">
              {/* 3D Coder Model - Unique Visual Filler */}
              <ScrollReveal direction="left">
                <div className="glass rounded-[2rem] border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#ff8c00]/5 to-transparent">
                  <div className="absolute top-6 left-8 z-10">
                    <h3 className="text-sm font-display font-black uppercase tracking-[0.3em] text-[#ff8c00]">Digital Core</h3>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">360° Interactive View</p>
                  </div>
                  <CoderModel />
                </div>
              </ScrollReveal>

              {/* Creative DNA Card */}
              <ScrollReveal direction="left">
                <Tilt>
                  <div className="glass rounded-[2rem] p-10 border-white/10 shadow-2xl relative group overflow-hidden">
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none"></div>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c00]/5 to-transparent rounded-[2rem]"></div>
                    <h3 className="text-2xl font-display font-black uppercase mb-8 tracking-tighter text-[#ede4d1]">Creative DNA</h3>
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-display font-bold text-[#ff8c00]">20+</span>
                        <span className="text-sm font-medium opacity-60">Projects & Contributions</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-display font-bold text-[#ff8c00]">3+</span>
                        <span className="text-sm font-medium opacity-60">Years Experience</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-display font-bold text-[#ff8c00]">MERN</span>
                        <span className="text-sm font-medium opacity-60 italic">Full Stack Ecosystem.</span>
                      </div>
                      <motion.p
                        variants={blurReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-sm leading-relaxed text-[#ede4d1]/70 pt-4 font-light border-t border-white/5"
                      >
                        {data.bio.description[0]}
                      </motion.p>
                    </div>
                  </div>
                </Tilt>
              </ScrollReveal>

              {/* Expertise Domains Grid */}
              <ScrollReveal direction="left" delay={0.2}>
                <Tilt>
                  <div className="glass rounded-[2rem] p-10 border-white/10 shadow-2xl group overflow-hidden relative">
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(110deg,transparent_20%,rgba(255,140,0,0.05)_50%,transparent_80%)] pointer-events-none"></div>
                    <h3 className="text-lg font-display font-black uppercase mb-8 tracking-widest text-[#ff8c00]">Expertise Domains</h3>
                    <div className="grid grid-cols-2 gap-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 relative z-10">
                      <div className="h-8 flex items-center justify-center font-bold text-sm hover:text-[#ff8c00] transition-colors cursor-default tracking-widest">E-COMMERCE</div>
                      <div className="h-8 flex items-center justify-center font-bold text-sm hover:text-[#ff8c00] transition-colors cursor-default tracking-widest">FINTECH</div>
                      <div className="h-8 flex items-center justify-center font-bold text-sm hover:text-[#ff8c00] transition-colors cursor-default tracking-widest">AI & ML</div>
                      <div className="h-8 flex items-center justify-center font-bold text-sm hover:text-[#ff8c00] transition-colors cursor-default tracking-widest">SAAS DEPLOY</div>
                    </div>
                  </div>
                </Tilt>
              </ScrollReveal>
            </div>

            {/* Middle Column (Central Portrait Cutout-style) */}
            <div className="lg:col-span-4 flex justify-center relative w-full lg:h-full lg:pt-10">
              <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: portraitY }}
                className="relative z-20 w-full max-w-[420px] lg:h-[850px] shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
              >
                {/* Cyber Portrait Enhancement */}
                <CyberPortrait
                  src={aboutPortrait}
                  alt="Prince Mehra"
                  className="w-full h-full rounded-[4rem] border-2 border-white/10"
                />

                {/* Decorative Overlay */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-3 bg-white/5 backdrop-blur-md"
                  >
                    <span className="text-xl text-[#ff8c00]">&darr;</span>
                  </motion.div>
                  <p className="text-[10px] font-display font-black tracking-[0.6em] uppercase text-[#ede4d1]/50">Scroll Depth</p>
                </div>
              </motion.div>

              {/* Central Glow behind portrait */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#ff8c00]/5 blur-[120px] rounded-full z-0"></div>
            </div>

            {/* Right Column (Everything Else) */}
            <div className="lg:col-span-4 space-y-12 w-full lg:pt-32">
              {/* Education Section */}
              <ScrollReveal direction="right">
                <div className="space-y-4 group">
                  <h3 className="text-xl font-display font-black uppercase text-[#ff8c00] tracking-[0.2em]">Education</h3>
                  <div className="h-0.5 w-12 bg-[#ff8c00]/30 group-hover:w-full transition-all duration-700"></div>
                  <p className="text-sm font-light text-[#ede4d1]/80 max-w-xs leading-relaxed italic">
                    "Computer Science & Engineering, specializing in Full Stack Web Development and AI integration."
                  </p>
                </div>
              </ScrollReveal>

              {/* Expertise Tag Cloud */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="space-y-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-display font-black uppercase text-[#ff8c00] tracking-[0.2em] flex items-center gap-4">
                    Expertise
                    <span className="h-px flex-1 bg-gradient-to-r from-[#ff8c00]/50 to-transparent"></span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.flatMap(s => s.items).slice(0, 18).map((skill, i) => (
                      <motion.div
                        key={i}
                        variants={blurReveal}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255, 140, 0, 0.1)",
                          borderColor: "rgba(255, 140, 0, 0.4)",
                          boxShadow: "0 0 20px rgba(255, 140, 0, 0.2)"
                        }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: i * 0.05
                        }}
                        className="glass px-6 py-2.5 rounded-full border border-white/10 cursor-default group/skill relative overflow-hidden"
                      >
                        {/* Light Sweep Effect on Hover */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover/skill:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        <span className="text-[10px] md:text-[11px] font-display font-black tracking-[0.2em] uppercase text-[#ede4d1]/80 group-hover/skill:text-[#ff8c00] transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Creative Journey (Experience) */}
              <ScrollReveal direction="right" delay={0.4}>
                <Tilt>
                  <div className="glass rounded-[3rem] p-10 border-white/10 shadow-2xl relative overflow-hidden group">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,140,0,0.05)_0%,transparent_60%)] pointer-events-none"></div>

                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-700">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="#ff8c00"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
                    </div>

                    <h3 className="text-lg font-display font-black uppercase mb-10 tracking-[0.3em] text-[#ff8c00]">Creative Journey</h3>
                    <div className="space-y-12 relative z-10">
                      {data.experience.slice(0, 3).map((item, i) => (
                        <div key={item.id} className="relative pl-8 border-l border-white/10 group-hover:border-[#ff8c00]/40 transition-colors">
                          <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#ff8c00] group-hover:scale-150 transition-all shadow-[0_0_10px_rgba(255,140,0,0)] group-hover:shadow-[0_0_15px_rgba(255,140,0,0.5)]"></div>
                          <h4 className="text-[13px] font-display font-black uppercase tracking-tight text-[#ede4d1] mb-2">{item.role}</h4>
                          <p className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-[0.3em]">{item.company} &mdash; {item.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </ScrollReveal>
            </div>
          </div>

          {/* Footer Contact Info */}
          <div className="container mx-auto mt-32 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-2 underline decoration-[#ff8c00]">Direct Connect</span>
              <a href="mailto:hello@princemehra.dev" className="text-xl md:text-2xl font-display font-bold hover:text-[#ff8c00] transition-colors">hello@princemehra.dev</a>
              <p className="text-sm opacity-60 font-medium">+91 [Inquiry Only]</p>
            </div>
            <div className="text-center md:text-right space-y-2">
              <p className="text-sm font-bold tracking-[0.2em] uppercase">Based in Chandigarh, IN</p>
              <p className="text-[10px] opacity-30 uppercase tracking-[0.5em]">Pan-India Coverage &bull; Remote Availability</p>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
