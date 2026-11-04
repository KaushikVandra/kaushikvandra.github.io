"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);

  // Raw cursor position values (updated outside React re-render cycle)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy, critically-damped spring follower for ultra-smooth 120/144Hz movement
  const springConfig = { damping: 30, stiffness: 650, mass: 0.05 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reduceMotion) return;

    // Only enable on devices with hover and fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        cursorX.jump(e.clientX);
        cursorY.jump(e.clientY);
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        setIsVisible(true);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onWindowBlur = () => {
      setIsVisible(false);
    };

    const onWindowFocus = () => {
      setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || !target.closest) return;

      const inputElement = target.closest("input, textarea, [contenteditable='true']");
      if (inputElement) {
        setIsInputHovered(true);
        setHovering(false);
        setLabel("");
        return;
      }
      setIsInputHovered(false);

      const interactive = target.closest("a, button, [role='button'], [data-cursor], summary");
      if (interactive) {
        setHovering(true);
        const cursorLabel =
          interactive.getAttribute("data-cursor-label") ||
          interactive.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ||
          "";
        setLabel(cursorLabel);
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
    };
  }, [reduceMotion, cursorX, cursorY, smoothX, smoothY]);

  if (reduceMotion) return null;

  return (
    <>
      {/* Instant center dot (1:1 with mouse pointer, zero latency) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden mix-blend-difference md:block"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible && !isInputHovered ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
      </motion.div>

      {/* Main round cursor follower (smooth spring physics, expands on hover) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden mix-blend-difference md:block"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible && !isInputHovered ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        {/* Centering wrapper: Keeps the round cursor centered at (smoothX, smoothY) at all times */}
        <div className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <motion.div
            animate={{
              width: hovering ? 48 : 16,
              height: hovering ? 48 : 16,
              scale: isClicked ? 0.85 : 1,
              backgroundColor: hovering ? "var(--accent-dim)" : "var(--accent)",
            }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 25,
            }}
            className="rounded-full border border-[var(--accent)] shadow-[0_0_12px_var(--accent-dim)]"
          />

          {/* Optional text label beneath cursor */}
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[var(--accent)] whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </div>
      </motion.div>
    </>
  );
}
