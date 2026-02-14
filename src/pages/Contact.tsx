import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <PageTransition>
      <main className="bg-[#0a0a0a] min-h-screen text-[#ede4d1] font-display selection:bg-[#ff8c00]/30 selection:text-white">
        {/* Fixed Sidebars */}
        {/* Left: Socials */}
        <div className="fixed left-8 bottom-12 z-50 hidden lg:flex flex-col gap-6 mix-blend-difference">
          {[
            { icon: <Instagram size={18} />, label: "IG", url: "#" },
            { icon: <Twitter size={18} />, label: "TW", url: "#" },
            { icon: <Linkedin size={18} />, label: "LI", url: "https://www.linkedin.com/in/prince-mehra-562681366/" },
            { icon: <Github size={18} />, label: "GH", url: "https://github.com/princesinghrajput" }
          ].map((social, i) => (
            <Magnetic key={i}>
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity p-2">
                {social.icon}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Right: Scroll Indicator */}
        <div className="fixed right-8 bottom-12 z-50 hidden lg:flex flex-col items-center gap-12 mix-blend-difference">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] rotate-90 origin-right whitespace-nowrap opacity-40">Scroll</span>
          <div className="w-px h-12 bg-white/20"></div>
        </div>

        {/* 1. LAYER: Monochromatic Hero */}
        <section className="relative h-screen flex flex-col justify-center items-center px-6">
          <ScrollReveal>
            <div className="text-center space-y-4 pt-20">
              <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40">I AM</p>
              <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-none">
                PRINCE
              </h1>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">FULL STACK DEVELOPER</p>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. LAYER: Middle Section - My Portfolio */}
        <section className="relative py-40 px-8 md:px-16 lg:px-24 border-t border-white/5 overflow-hidden">
          <div className="max-w-[1400px] mx-auto text-center space-y-24">
            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <div className="aspect-[4/5] bg-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
                    alt="Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="aspect-[4/5] bg-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 transform md:translate-y-12">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
                    alt="Visionary"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="aspect-[4/5] bg-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
                    alt="Digital Logic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Portfolio Text */}
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">MY PORTFOLIO</h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 max-w-lg mx-auto leading-relaxed">
                  HELLO I AM PRINCE MEHRA FULL STACK MERN DEVELOPER
                </p>

                <div className="pt-12">
                  <Magnetic>
                    <a
                      href="/projects"
                      className="inline-block px-12 py-4 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-black uppercase tracking-[0.5em]"
                    >
                      VIEW PROJECT
                    </a>
                  </Magnetic>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. LAYER: Editorial Grid (Contact Info & Form) */}
        <section className="px-8 md:px-16 lg:px-24 py-40 border-t border-white/5 bg-[#050505]">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 max-w-[1400px] mx-auto">

            {/* Left Column: Information */}
            <div className="space-y-20">
              <ScrollReveal direction="left">
                <div className="space-y-8">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">CONTACT</h2>
                  <p className="text-lg text-white/40 leading-relaxed max-w-md">
                    I’m currently available for Full Stack opportunities and technical collaborations. Let’s build something extraordinary together.
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-16">
                <ScrollReveal delay={0.1}>
                  <div className="space-y-4">
                    <p className="text-2xl font-black uppercase tracking-tighter">Address</p>
                    <p className="text-white/40 text-sm">Chandigarh, IN</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="space-y-4">
                    <p className="text-2xl font-black uppercase tracking-tighter">E-mail</p>
                    <a href="mailto:hello@princemehra.dev" className="text-white/40 text-sm hover:text-white transition-colors">
                      hello@princemehra.dev
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Column: Minimal Form */}
            <div>
              <ScrollReveal direction="right">
                <div className="space-y-12">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">CONTACT FORM</h2>

                  <form onSubmit={handleSubmit} className="space-y-10 group/form">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all text-sm uppercase tracking-widest"
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Your phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all text-sm uppercase tracking-widest"
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Your e-mail"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all text-sm uppercase tracking-widest"
                      />
                    </div>

                    <div className="space-y-2">
                      <textarea
                        placeholder="Message"
                        required
                        rows={1}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all text-sm uppercase tracking-widest resize-none"
                      />
                    </div>

                    <div className="pt-8">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-5 border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-500 flex items-center justify-center gap-4"
                      >
                        {submitted ? "MESSAGE_SENT" : "SEND MESSAGE"}
                        {!submitted && <ArrowRight size={14} />}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* Thanks Footer */}
        <section className="py-24 text-center border-t border-white/5">
          <h3 className="text-3xl font-black uppercase tracking-tighter opacity-20 hover:opacity-100 transition-opacity duration-1000">
            Thank you for visiting
          </h3>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
