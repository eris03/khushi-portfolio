"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { chapters } from "@/lib/data";
import { SectionHead, Flower } from "./ui";

function Island({ hue, size = 1 }: { hue: string; size?: number }) {
  return (
    <svg viewBox="0 0 200 150" className="w-full" style={{ transform: `scale(${size})` }} aria-hidden>
      <defs>
        <linearGradient id={`isl-${hue.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hue} />
          <stop offset="100%" stopColor="#FFFDFD" />
        </linearGradient>
        <filter id={`isl-s-${hue.slice(1)}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor={hue} floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter={`url(#isl-s-${hue.slice(1)})`}>
        {/* the rock below */}
        <path d="M42 66 C40 92 62 120 100 138 C138 120 160 92 158 66 Z" fill={`url(#isl-${hue.slice(1)})`} opacity="0.9" />
        {/* grassy top */}
        <ellipse cx="100" cy="64" rx="58" ry="17" fill="#FFFDFD" />
        <ellipse cx="100" cy="62" rx="58" ry="17" fill={hue} opacity="0.55" />
      </g>
      {/* little trees */}
      <g opacity="0.8">
        <path d="M78 58 l-6 8 h12 z M78 52 l-5 7 h10 z" fill="#CFF5E7" />
        <rect x="76.6" y="64" width="2.6" height="6" rx="1" fill="#6D6D6D" opacity="0.4" />
        <path d="M120 60 l-7 9 h14 z M120 53 l-6 8 h12 z" fill="#CFF5E7" />
        <rect x="118.6" y="67" width="2.6" height="6" rx="1" fill="#6D6D6D" opacity="0.4" />
      </g>
      {/* waterfall of light */}
      <path d="M96 74 q4 22 2 40" stroke="#CFE8FF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}

function Bird({ delay = 0, top = 20, dur = 26 }: { delay?: number; top?: number; dur?: number }) {
  return (
    <div
      className="pointer-events-none absolute left-[-8%]"
      style={{ top: `${top}%`, animation: `bird-cross ${dur}s linear ${delay}s infinite` }}
    >
      <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden>
        <path d="M1 8 Q7 1 13 7 Q19 1 25 8" fill="none" stroke="#6D6D6D" strokeWidth="1.4" strokeLinecap="round" opacity="0.35">
          <animate attributeName="d" values="M1 8 Q7 1 13 7 Q19 1 25 8;M1 5 Q7 7 13 5 Q19 7 25 5;M1 8 Q7 1 13 7 Q19 1 25 8" dur="0.9s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="timeline" ref={ref} className="section relative z-10 overflow-hidden">
      <SectionHead
        eyebrow="Chapter two"
        title="Islands in the sky"
        sub="Every chapter got its own island. The clouds between them are the parts nobody puts on a resume."
      />

      <div className="relative mx-auto mt-20 max-w-5xl">
        <Bird top={6} delay={0} dur={30} />
        <Bird top={34} delay={9} dur={38} />
        <Bird top={68} delay={17} dur={34} />

        {/* the cloud path connecting the islands */}
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 100 600" preserveAspectRatio="none" aria-hidden>
          <motion.path
            d="M22 30 C70 70, 30 120, 78 160 C30 200, 70 250, 22 290 C70 330, 30 380, 78 420 C30 460, 70 510, 22 550"
            fill="none"
            stroke="#DCCBFF"
            strokeWidth="0.6"
            strokeDasharray="2.5 3.5"
            strokeLinecap="round"
            style={{ pathLength }}
            opacity={0.6}
          />
        </svg>

        <ol className="relative space-y-14 md:space-y-6">
          {chapters.map((c, i) => {
            const left = i % 2 === 0;
            const isOpen = open === c.id;
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 60, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col items-center gap-5 md:flex-row md:gap-10 ${left ? "" : "md:flex-row-reverse"}`}
              >
                {/* the island */}
                <motion.div
                  className="w-[min(62vw,230px)] shrink-0 animate-floaty"
                  style={{ animationDelay: `${i * 0.7}s` }}
                  whileHover={{ scale: 1.07, y: -10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Island hue={c.hue} />
                </motion.div>

                {/* the memory */}
                <button
                  type="button"
                  data-cursor="card"
                  onClick={() => setOpen(isOpen ? null : c.id)}
                  onMouseEnter={() => setOpen(c.id)}
                  onMouseLeave={() => setOpen(null)}
                  aria-expanded={isOpen}
                  className={`group w-full max-w-md rounded-3xl px-7 py-6 text-left glass shadow-soft transition-all duration-500 ease-silk hover:shadow-lift ${
                    left ? "md:text-left" : "md:text-right"
                  }`}
                  style={{ borderColor: isOpen ? c.hue : undefined }}
                >
                  <div className={`flex items-center gap-2.5 ${left ? "" : "md:flex-row-reverse"}`}>
                    <Flower size={15} color={c.hue} />
                    <span className="eyebrow text-ink2">{c.year}</span>
                  </div>
                  <h3 className="h-display mt-3 text-[clamp(1.35rem,3vw,1.9rem)] text-ink">{c.title}</h3>
                  <p className="mt-1.5 font-sans text-[0.9rem] text-ink">{c.place}</p>
                  <p className="mt-1 font-sans text-[0.8rem] text-ink2">{c.note}</p>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-[0.94rem] leading-relaxed text-ink2">{c.detail}</p>
                  </motion.div>

                  <span className="mt-3 block font-hand text-base text-pink-dusty opacity-70 transition-opacity group-hover:opacity-0">
                    hover to remember →
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <style jsx global>{`
        @keyframes bird-cross {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 0.9; }
          50% { transform: translateX(58vw) translateY(-3vh); }
          90% { opacity: 0.9; }
          100% { transform: translateX(120vw) translateY(2vh); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
