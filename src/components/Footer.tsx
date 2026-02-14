import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="section-padding flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="font-display text-lg font-bold tracking-tight text-foreground">
          PORTFOLIO<span className="text-primary">.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/about" className="nav-link text-sm uppercase tracking-widest">About</Link>
          <Link to="/projects" className="nav-link text-sm uppercase tracking-widest">Projects</Link>
          <Link to="/contact" className="nav-link text-sm uppercase tracking-widest">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/princesinghrajput" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Twitter">
            <Twitter size={18} />
          </a>
          <a href="https://www.linkedin.com/in/prince-mehra-562681366/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:hello@princemehra.dev" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 pb-8">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} All rights reserved. Crafted with passion.
        </p>
      </div>
    </footer>
  );
}
