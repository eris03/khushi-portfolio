"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** A vine that grows down the right edge as you read, with a bud at the tip. */
export default function Progress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.3 });
  const tip = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none fixed right-3 top-1/2 z-[110] hidden h-[42vh] -translate-y-1/2 sm:block" aria-hidden>
      <div className="relative h-full w-[2px] rounded-full bg-pink-candy/40">
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top rounded-full"
          style={{ scaleY: p, background: "linear-gradient(180deg,#F7AFC9,#DCCBFF,#CFF5E7)" }}
        />
        <motion.span
          className="absolute left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(247,175,201,0.95)]"
          style={{ top: tip }}
        />
      </div>
    </div>
  );
}
