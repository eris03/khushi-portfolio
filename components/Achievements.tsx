"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trophies } from "@/lib/data";
import { SectionHead, Tilt } from "./ui";
import { seeded } from "@/lib/rng";

const rand = seeded(4242);
const CONFETTI = Array.from({ length: 16 }, () => ({
  x: (rand() - 0.5) * 190,
  y: -40 - rand() * 130,
  r: rand() * 360,
  d: rand() * 0.22,
  c: ["#F8C8DC", "#DCCBFF", "#CFE8FF", "#CFF5E7", "#FFD8BE"][Math.floor(rand() * 5)],
  s: 5 + rand() * 6,
}));

function GlassTrophy({ color, lit }: { color: string; lit: boolean }) {
  return (
    <svg viewBox="0 0 100 120" className="h-28 w-24" aria-hidden>
      <defs>
        <linearGradient id={`tg-${color.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
        </linearGradient>
        <filter id={`tglow-${color.slice(1)}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={lit ? 7 : 2} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#tglow-${color.slice(1)})`}>
        {/* cup */}
        <path d="M28 16 H72 V44 C72 60 62 70 50 70 C38 70 28 60 28 44 Z" fill={`url(#tg-${color.slice(1)})`} stroke="#FFFFFF" strokeWidth="1.4" />
        {/* handles */}
        <path d="M28 24 C14 24 12 44 28 46" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.85" />
        <path d="M72 24 C86 24 88 44 72 46" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.85" />
        {/* stem + base */}
        <rect x="46" y="70" width="8" height="18" rx="3" fill={color} opacity="0.75" />
        <path d="M32 96 H68 L72 106 H28 Z" fill={`url(#tg-${color.slice(1)})`} stroke="#FFFFFF" strokeWidth="1.2" />
        {/* reflection */}
        <path d="M36 22 C34 36 36 52 44 62" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Achievements() {
  const [lit, setLit] = useState<number | null>(null);

  return (
    <section id="achievements" className="section relative z-10">
      <SectionHead
        eyebrow="Chapter eight"
        title="Four small trophies"
        sub="Numbers I can point at. Hover one and it lights up — the confetti is entirely gratuitous and I'm keeping it."
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trophies.map((t, i) => {
          const on = lit === i;
          return (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 56, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt max={10}>
                <div
                  data-cursor="card"
                  onMouseEnter={() => setLit(i)}
                  onMouseLeave={() => setLit(null)}
                  onFocus={() => setLit(i)}
                  onBlur={() => setLit(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={t.title}
                  className="relative flex h-full min-h-[19rem] flex-col items-center overflow-hidden rounded-[1.8rem] px-6 py-8 text-center glass shadow-soft transition-shadow duration-500 hover:shadow-lift"
                >
                  {/* glow pool */}
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    animate={{ opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ background: `radial-gradient(circle at 50% 30%, ${t.color}88, transparent 62%)` }}
                  />

                  {/* confetti */}
                  <AnimatePresence>
                    {on &&
                      CONFETTI.map((c, k) => (
                        <motion.span
                          key={k}
                          className="pointer-events-none absolute left-1/2 top-[32%] rounded-[2px]"
                          style={{ width: c.s, height: c.s * 0.55, background: c.c }}
                          initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 1, 0], x: c.x, y: c.y, rotate: c.r, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, delay: c.d, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ))}
                  </AnimatePresence>

                  <motion.div
                    className="relative"
                    animate={on ? { y: -6, rotate: [0, -4, 4, 0] } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <GlassTrophy color={t.color} lit={on} />
                  </motion.div>

                  <span className="relative mt-2 block h-display text-[clamp(1.9rem,4.4vw,2.6rem)] text-ink">{t.metric}</span>
                  <h3 className="relative mt-1 font-sans text-[0.95rem] font-medium text-ink">{t.title}</h3>

                  <motion.p
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden text-[0.86rem] leading-relaxed text-ink2"
                  >
                    <span className="block pt-4">{t.detail}</span>
                  </motion.p>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
