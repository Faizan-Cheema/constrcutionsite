"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-orange-500 sm:h-1 supports-[padding:env(safe-area-inset-top)]:top-[env(safe-area-inset-top)]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
