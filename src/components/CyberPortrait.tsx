import { motion } from "framer-motion";

interface CyberPortraitProps {
    src: string;
    alt: string;
    className?: string;
}

export default function CyberPortrait({ src, alt, className = "" }: CyberPortraitProps) {
    return (
        <div className={`relative group overflow-hidden ${className}`}>
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff8c00] z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff8c00] z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ff8c00] z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff8c00] z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></div>

            {/* Scanning Line */}
            <div className="absolute inset-x-0 h-[2px] bg-[#ff8c00] shadow-[0_0_10px_#ff8c00] z-30 animate-scan pointer-events-none opacity-50 group-hover:opacity-100"></div>

            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden">
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover grayscale-[0.5] contrast-[1.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>

            {/* Data Widgets */}
            <div className="absolute bottom-4 left-4 z-30 flex gap-2">
                <div className="w-2 h-2 bg-[#ff8c00] rounded-full animate-ping"></div>
                <span className="text-[10px] font-mono font-bold text-[#ff8c00] tracking-widest">SYSTEM ONLINE</span>
            </div>
        </div>
    );
}
