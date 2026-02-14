import React, { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export type CursorState = "default" | "hover" | "text" | "view" | "magnetic";

export default function CustomCursor() {
    const [cursorState, setCursorState] = useState<CursorState>("default");
    const [label, setLabel] = useState("");

    const mouseX = useSpring(0, { stiffness: 450, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 450, damping: 30 });

    const ringScale = useSpring(1, { stiffness: 300, damping: 20 });
    const dotScale = useSpring(1, { stiffness: 500, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const cursorType = target.getAttribute("data-cursor");
            const cursorLabel = target.getAttribute("data-cursor-label");

            if (cursorType === "view") {
                setCursorState("view");
                setLabel(cursorLabel || "VIEW");
            } else if (cursorType === "text") {
                setCursorState("text");
            } else if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("interactive")
            ) {
                setCursorState("hover");
            } else {
                setCursorState("default");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden hidden md:block">
            {/* Main Dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: cursorState === "view" ? 0 : 1,
                    opacity: cursorState === "view" ? 0 : 1,
                }}
                className="w-1.5 h-1.5 bg-primary rounded-full absolute z-20"
            />

            {/* Morphing Ring / Shape */}
            <motion.div
                animate={{
                    width: cursorState === "view" ? 100 : cursorState === "hover" ? 60 : 36,
                    height: cursorState === "view" ? 100 : cursorState === "hover" ? 60 : 36,
                    borderRadius: cursorState === "hover" ? "20px" : "50%",
                    backgroundColor: cursorState === "view" ? "rgba(var(--primary-rgb), 0.9)" : "transparent",
                    borderColor: cursorState === "view" ? "transparent" : "rgba(var(--primary-rgb), 0.5)",
                    borderWidth: cursorState === "view" ? 0 : 1.5,
                }}
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    // Use CSS variables for HSL to RGB conversion if needed, but here we can just use tailwind classes or plain HSL
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="absolute flex items-center justify-center border-primary mix-blend-difference"
            >
                <AnimatePresence>
                    {cursorState === "view" && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-[10px] font-bold tracking-widest text-primary-foreground uppercase pointer-events-none"
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
