
import { SiteData } from "@/types";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import f1Hero from "@/assets/f1-hero.png";
import lumiereHero from "@/assets/lumiere-hero.png";
import safaHero from "@/assets/safa-hero.png";
import aboutPortrait from "@/assets/about-portrait.jpg";

export const initialSiteData: SiteData = {
    projects: [
        {
            id: "1",
            title: "AAPNO COLLEGE APP",
            category: "Android / Mobile",
            description: "A flagship production-ready Android application designed to simplify college communication and student services. Built for security, scalability, and usability in real-world college use cases.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
            gallery: ["https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200"],
            tech: ["Android SDK", "Firebase", "Java/Kotlin"],
            url: "https://aapno-college.apk",
            isFlagship: true
        },
        {
            id: "2",
            title: "SEC-C SECURITY CYBERS",
            category: "Cybersecurity / Web",
            description: "A cybersecurity-focused website built to showcase digital security services with a strong, professional presence. Emphasizes protection, trust, and advanced digital security solutions.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
            gallery: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"],
            tech: ["React", "Firebase", "Netlify"],
            url: "https://sec-c-security-cybers.netlify.app"
        },
        {
            id: "3",
            title: "F1 VELOCITY",
            category: "High-Performance / Web",
            description: "The pinnacle of motorsport website featuring bold visuals and a modern speed-inspired UI for an immersive digital experience.",
            image: f1Hero,
            gallery: [f1Hero],
            tech: ["Three.js", "GSAP", "React", "Vercel"],
            url: "https://f1-velocity-the-pinnacle-of-motorsp.vercel.app"
        },
        {
            id: "4",
            title: "PERSONAL PORTFOLIO",
            category: "Identity / Branding",
            description: "A developer identity and skills showcase building a strong digital brand and professional presence for creative developers.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
            gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"],
            tech: ["React", "Tailwind", "GSAP"],
            url: "https://prince-portfoliosuper-101.netlify.app"
        },
        {
            id: "5",
            title: "HR EVENT MANAGEMENT",
            category: "Business / Service",
            description: "A business and service-based coordination platform for high-level HR operations and corporate gatherings.",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
            gallery: ["https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200"],
            tech: ["Next.js", "Node.js", "MongoDB"],
            url: "https://hr-event-management.netlify.app"
        },
        {
            id: "6",
            title: "LUMI RE-SIX",
            category: "Creative / Experimental",
            description: "A creative experimental web project where heritage meets modern mastery through refined digital design and interactions.",
            image: lumiereHero,
            gallery: [lumiereHero],
            tech: ["Next.js", "GSAP", "Tailwind", "Lenis"],
            url: "https://lumi-re-six.vercel.app"
        },
    ],
    skills: [
        { category: "Cybersecurity", items: ["Network Security", "Ethical Hacking", "Cloud Protection", "Threat Analysis", "Encryption"] },
        { category: "Full Stack", items: ["React / Next.js", "Node.js / Express", "MongoDB", "Firebase", "Tailwind CSS"] },
        { category: "Tools & DevOps", items: ["Git / GitHub", "Docker", "AWS", "Netlify / Vercel", "VS Code"] },
    ],
    experience: [
        { id: "1", year: "2024 — Present", role: "Security Solutions Lead", company: "SEC-C Security Cybers" },
        { id: "2", year: "2023 — 2024", role: "Full Stack Developer", company: "Sensation Software Solutions" },
        { id: "3", year: "2022 — 2023", role: "Digital Security Intern", company: "Tech Dynamic" },
    ],
    bio: {
        title: "Building Secure, Smart, and Scalable Digital Solutions at SEC-C.",
        description: [
            "At SEC-C Security Cybers, we specialize in delivering high-performance digital solutions that bridge the gap between robust security and modern user experience.",
            "My focus is on developing real-world apps and cybersecurity-focused platforms that offer unmatched reliability and visual excellence.",
            "Whether it's a flagship mobile application or a complex web ecosystem, I ensure every byte is secure and every pixel is perfect."
        ]
    }
};

export { aboutPortrait }; 
