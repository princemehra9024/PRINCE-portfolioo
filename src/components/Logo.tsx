import { motion } from "framer-motion";

export default function Logo({ className = "", minimalist = false }: { className?: string; minimalist?: boolean }) {
    return (
        <motion.div
            className={`flex items-center gap-3 ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Animated Background Ring */}
                <motion.div
                    className="absolute inset-0 rounded-xl border border-[#ff8c00]/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Logo Icon (Stylized P) */}
                <svg viewBox="0 0 40 40" className="w-8 h-8 relative z-10">
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff8c00" />
                            <stop offset="100%" stopColor="#ffa500" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M12 8H22C26.4183 8 30 11.5817 30 16C30 20.4183 26.4183 24 22 24H12V32"
                        fill="none"
                        stroke="url(#logo-gradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M12 24H18"
                        fill="none"
                        stroke="url(#logo-gradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    />
                </svg>

                {/* Decorative Sparkle */}
                <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff8c00] rounded-full shadow-[0_0_10px_#ff8c00]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {!minimalist && (
                <span className="font-display text-2xl font-black tracking-tighter italic flex items-center">
                    <span className="text-white">PRINCE</span>
                    <span className="text-[#ff8c00]">.</span>
                </span>
            )}
        </motion.div>
    );
}
