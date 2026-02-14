import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Lock } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./Magnetic";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isMinimalist = location.pathname === "/contact" || location.pathname === "/about";

  if (location.pathname === "/about" && !isMinimalist) return null; // Fallback for old check if needed

  // Use all links for minimal mode but keep the styling
  const currentLinks = links;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isMinimalist ? "bg-transparent border-none" : "bg-background/50 backdrop-blur-md border-b border-white/5"
        }`}
    >
      <div className="flex items-center justify-between px-8 md:px-12 lg:px-24 py-8">
        <Magnetic>
          <Link to="/" className="group">
            <Logo minimalist={isMinimalist} />
          </Link>
        </Magnetic>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-12">
          {currentLinks.map((link) => (
            <Magnetic key={link.to}>
              <Link
                to={link.to}
                className={`nav-link text-[10px] font-medium uppercase tracking-[0.4em] transition-all ${location.pathname === link.to ? "opacity-100" : "opacity-40 hover:opacity-100"
                  } ${isMinimalist ? "text-white" : "text-foreground"}`}
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
          {!isMinimalist && (
            <Magnetic>
              <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors ml-4">
                <Lock size={18} />
              </Link>
            </Magnetic>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden ${isMinimalist ? "text-white" : "text-foreground"}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden glass border-t border-border ${isMinimalist ? "bg-black/90" : ""}`}
        >
          <div className="flex flex-col px-6 py-8 gap-6">
            {currentLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-black uppercase tracking-widest ${location.pathname === link.to ? "opacity-100" : "opacity-40"
                  } ${isMinimalist ? "text-white" : "text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
