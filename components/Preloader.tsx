"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LINES = ["Building Creativity...", "Loading Intelligence...", "Loading Experiences...", "Welcome."];

/** Petal positions bloom around the K. Fixed values — deterministic by design. */
const BLOOMS = [
  { x: -96, y: -54, d: 2.15, s: 1 },
  { x: 92, y: -84, d: 2.45, s: 0.78 },
  { x: -116, y: 62, d: 2.3, s: 0.86 },
  { x: 110, y: 58, d: 2.6, s: 1.1 },
  { x: 6, y: -108, d: 2.75, s: 0.7 },
  { x: -30, y: 104, d: 2.55, s: 0.92 },
  { x: 148, y: -8, d: 2.9, s: 0.64 },
  { x: -150, y: 6, d: 2.85, s: 0.72 },
];

function Bloom({ x, y, d, s, color }: { x: number; y: number; d: number; s: number; color: string }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0, rotate: -40 }}
      animate={{ opacity: 1, scale: s, rotate: 0 }}
      transition={{ delay: d, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${160 + x}px ${150 + y}px` }}
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={160 + x}
          cy={150 + y - 9}
          rx={5.5}
          ry={9}
          fill={color}
          opacity={0.85}
          transform={`rotate(${a} ${160 + x} ${150 + y})`}
        />
      ))}
      <circle cx={160 + x} cy={150 + y} r={3.2} fill="#FFD8BE" />
    </motion.g>
  );
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 600);
      return () => clearTimeout(t);
    }

    const timers = [
      setTimeout(() => setLine(1), 1500),
      setTimeout(() => setLine(2), 2700),
      setTimeout(() => setLine(3), 3800),
      setTimeout(() => {
        setVisible(false);
        onDone();
      }, 4900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg viewBox="0 0 320 300" className="w-[min(78vw,420px)]" aria-hidden>
            <defs>
              {/*
                userSpaceOnUse matters here: the vertical stroke of the K has a
                zero-width bounding box, and an objectBoundingBox gradient
                collapses to nothing on it — the letter renders as "<".
              */}
              <linearGradient id="pl-water" gradientUnits="userSpaceOnUse" x1="90" y1="60" x2="230" y2="245">
                <stop offset="0%" stopColor="#F7AFC9" />
                <stop offset="50%" stopColor="#DCCBFF" />
                <stop offset="100%" stopColor="#CFE8FF" />
              </linearGradient>
              <linearGradient id="pl-circuit" gradientUnits="userSpaceOnUse" x1="40" y1="60" x2="270" y2="240">
                <stop offset="0%" stopColor="#CFF5E7" />
                <stop offset="100%" stopColor="#DCCBFF" />
              </linearGradient>
              <filter id="pl-soft" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="7" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pl-wet" x="-25%" y="-25%" width="150%" height="150%">
                <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves={3} seed={7} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale={7} />
              </filter>
            </defs>

            {/* watercolour bloom behind the letter */}
            <motion.ellipse
              cx="160"
              cy="150"
              rx="98"
              ry="86"
              fill="url(#pl-water)"
              filter="url(#pl-wet)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.22, scale: 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              style={{ transformOrigin: "160px 150px" }}
            />

            {/* the brush painting a K */}
            <g strokeLinecap="round" fill="none" filter="url(#pl-wet)">
              <motion.path
                d="M108 62 L108 240"
                stroke="url(#pl-water)"
                strokeWidth="17"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: "easeInOut", delay: 0.15 }}
              />
              <motion.path
                d="M212 66 L112 152"
                stroke="url(#pl-water)"
                strokeWidth="16"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.65, ease: "easeInOut", delay: 0.95 }}
              />
              <motion.path
                d="M126 148 L218 240"
                stroke="url(#pl-water)"
                strokeWidth="16"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 1.5 }}
              />
            </g>

            {/* the brush turns to circuitry */}
            <g fill="none" stroke="url(#pl-circuit)" strokeWidth="1.6" filter="url(#pl-soft)" strokeLinecap="round">
              {[
                "M108 96 H62 V70",
                "M108 140 H54",
                "M108 200 H66 V228",
                "M180 96 H236 V72",
                "M172 196 H240 V226",
                "M218 240 H258",
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.95 }}
                  transition={{ duration: 0.7, delay: 2 + i * 0.11, ease: "easeOut" }}
                />
              ))}
            </g>
            <g>
              {[
                [62, 70],
                [54, 140],
                [66, 228],
                [236, 72],
                [240, 226],
                [258, 240],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="3.6"
                  fill="#DCCBFF"
                  filter="url(#pl-soft)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.5 + i * 0.1 }}
                />
              ))}
            </g>

            {/* flowers bloom */}
            {BLOOMS.map((b, i) => (
              <Bloom key={i} {...b} color={i % 2 ? "#FFD6E8" : "#F8C8DC"} />
            ))}
          </svg>

          <div className="mt-6 h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={line}
                initial={{ y: 22, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -22, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-sm tracking-[0.28em] uppercase text-ink2"
              >
                {LINES[line]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-7 h-[3px] w-56 overflow-hidden rounded-full bg-pink-candy/40">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#F7AFC9,#DCCBFF,#CFE8FF)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
