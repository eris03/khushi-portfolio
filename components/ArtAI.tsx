"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { artWords, aiWords } from "@/lib/data";
import { Flower } from "./ui";

/**
 * Two worlds sharing one frame. The divider follows the cursor —
 * the further you push it, the more of one side you get, and neither
 * ever fully wins. That's the argument.
 */
export default function ArtAI() {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);

  const set = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSplit(Math.min(88, Math.max(12, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section id="artai" className="section relative z-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-pink-dusty"
          >
            Chapter five
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-display mt-4 text-[clamp(2.1rem,5.4vw,4.2rem)] text-ink"
          >
            Creativity powers Intelligence.
          </motion.h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink2">
            Drag the line. Push it either way and something goes missing — which is roughly the point.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          ref={ref}
          data-cursor="card"
          onMouseMove={(e) => set(e.clientX)}
          onMouseLeave={() => setSplit(50)}
          onTouchStart={() => setDragging(true)}
          onTouchMove={(e) => set(e.touches[0].clientX)}
          onTouchEnd={() => setDragging(false)}
          className="relative mt-14 h-[clamp(26rem,58vh,34rem)] w-full select-none overflow-hidden rounded-[2.2rem] shadow-lift"
          role="group"
          aria-label="Art and AI split view"
        >
          {/* ---------- RIGHT: the AI half (base layer) ---------- */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, #1E1B2E, #2B2742 60%, #3A3358)" }}>
            {/* circuit grid */}
            <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
              <defs>
                <pattern id="circuit" width="52" height="52" patternUnits="userSpaceOnUse">
                  <path d="M0 26 H20 V6 H52 M26 52 V32 H52" fill="none" stroke="#CFF5E7" strokeWidth="0.7" opacity="0.55" />
                  <circle cx="20" cy="26" r="1.8" fill="#DCCBFF" />
                  <circle cx="26" cy="32" r="1.8" fill="#CFE8FF" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>

            {/* a small network, pulsing */}
            <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full opacity-80" aria-hidden>
              <g stroke="#DCCBFF" strokeWidth="0.4" opacity="0.55">
                {[30, 60, 90, 110].flatMap((y1) =>
                  [40, 70, 100].map((y2) => <line key={`${y1}-${y2}`} x1="60" y1={y1} x2="110" y2={y2} />)
                )}
                {[40, 70, 100].map((y1) => (
                  <line key={`o${y1}`} x1="110" y1={y1} x2="155" y2="70" />
                ))}
              </g>
              {[30, 60, 90, 110].map((y) => (
                <circle key={`i${y}`} cx="60" cy={y} r="2.6" fill="#CFE8FF">
                  <animate attributeName="opacity" values="0.35;1;0.35" dur="2.8s" begin={`${y / 60}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {[40, 70, 100].map((y) => (
                <circle key={`h${y}`} cx="110" cy={y} r="3" fill="#CFF5E7">
                  <animate attributeName="opacity" values="0.35;1;0.35" dur="2.4s" begin={`${y / 40}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <circle cx="155" cy="70" r="4" fill="#F7AFC9">
                <animate attributeName="r" values="4;5.6;4" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className="absolute inset-0 flex flex-col justify-end gap-4 p-8 sm:p-12">
              <span className="eyebrow text-mint">The engineer</span>
              <h3 className="h-display text-[clamp(1.7rem,4.2vw,2.8rem)] text-white">Intelligence</h3>
              <div className="flex flex-wrap gap-2">
                {aiWords.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                    className="rounded-full px-3 py-1.5 font-mono text-[0.72rem] text-mint glass-dark"
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- LEFT: the artist half (clipped) ---------- */}
          <div
            className="absolute inset-0 transition-[clip-path] duration-200 ease-out"
            style={{
              clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`,
              transitionDuration: dragging ? "0ms" : undefined,
              background: "linear-gradient(140deg, #FFF8F6, #FFD6E8 55%, #DCCBFF)",
            }}
          >
            {/* watercolour bleeds */}
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <filter id="art-wet" x="-25%" y="-25%" width="150%" height="150%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={3} seed={11} result="n" />
                  <feDisplacementMap in="SourceGraphic" in2="n" scale={22} />
                </filter>
              </defs>
              <g filter="url(#art-wet)" opacity="0.55">
                <circle cx="22%" cy="30%" r="88" fill="#F7AFC9" opacity="0.55" />
                <circle cx="40%" cy="62%" r="102" fill="#FFD8BE" opacity="0.5" />
                <circle cx="12%" cy="72%" r="72" fill="#CFE8FF" opacity="0.5" />
              </g>
            </svg>

            {/* brush strokes, drawn on view */}
            <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" aria-hidden>
              <g fill="none" stroke="#6D6D6D" strokeWidth="0.9" strokeLinecap="round" opacity="0.42">
                {["M18 96 C36 58, 58 52, 74 82", "M26 108 C50 92, 62 74, 88 66", "M14 60 C28 44, 44 40, 56 48"].map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.25, ease: "easeInOut" }}
                  />
                ))}
              </g>
            </svg>

            {[
              { x: 14, y: 20 },
              { x: 30, y: 44 },
              { x: 9, y: 62 },
            ].map((f, i) => (
              <span key={i} className="absolute animate-floaty" style={{ left: `${f.x}%`, top: `${f.y}%`, animationDelay: `${i * 0.8}s` }}>
                <Flower size={22 + i * 6} color={["#F7AFC9", "#DCCBFF", "#FFD8BE"][i]} />
              </span>
            ))}

            <div className="absolute inset-0 flex flex-col justify-end gap-4 p-8 sm:p-12">
              <span className="eyebrow text-pink-dusty">The artist</span>
              <h3 className="h-display text-[clamp(1.7rem,4.2vw,2.8rem)] text-ink">Creativity</h3>
              <div className="flex flex-wrap gap-2">
                {artWords.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                    className="rounded-full px-3 py-1.5 font-hand text-[0.95rem] text-ink glass"
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- the divider ---------- */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-[2px] transition-[left] duration-200 ease-out"
            style={{ left: `${split}%`, background: "linear-gradient(180deg,transparent,#FFFFFF 20%,#FFFFFF 80%,transparent)", transitionDuration: dragging ? "0ms" : undefined }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-lift">
                <span className="animate-breathe">
                  <Flower size={22} color="#DCCBFF" />
                </span>
              </div>
              <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-sans text-[0.66rem] tracking-[0.2em] uppercase text-white/70">
                drag me
              </span>
            </div>
          </div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-hand text-[clamp(1.2rem,3vw,1.65rem)] text-ink2">
          I have never been able to do one without the other. The cleaning, the tuning, the choosing —
          that&apos;s composition. It just runs.
        </p>
      </div>
    </section>
  );
}
