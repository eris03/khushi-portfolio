"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, type Skill } from "@/lib/data";
import { SectionHead, Flower } from "./ui";

/** Three orbits, biggest skills closest in. */
const RINGS = [
  { r: 22, dur: 46, items: skills.slice(0, 5) },
  { r: 34, dur: 66, items: skills.slice(5, 11) },
  { r: 45.5, dur: 88, items: skills.slice(11) },
];

function Planet({
  s,
  angle,
  radius,
  dur,
  onHover,
  active,
}: {
  s: Skill;
  angle: number;
  radius: number;
  dur: number;
  onHover: (s: Skill | null) => void;
  active: boolean;
}) {
  const size = 34 + (s.level - 75) * 0.85;
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `rotate(${angle}deg) translate(${radius}%) rotate(${-angle}deg)` }}
    >
      {/* counter-spin keeps the label upright while the ring turns */}
      <div style={{ animation: `spin-back ${dur}s linear infinite` }}>
        <button
          type="button"
          data-cursor="card"
          onMouseEnter={() => onHover(s)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(s)}
          onBlur={() => onHover(null)}
          aria-label={`${s.name} — ${s.years}`}
          className="group relative grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-500 ease-silk"
          style={{
            width: size,
            height: size,
            transform: `translate(-50%,-50%) scale(${active ? 1.55 : 1})`,
            background: `radial-gradient(circle at 32% 28%, #FFFFFF, ${s.color} 62%)`,
            boxShadow: active ? `0 0 34px ${s.color}, 0 12px 30px -10px ${s.color}` : `0 8px 22px -8px ${s.color}`,
          }}
        >
          {/* orbiting dust */}
          <span
            className="pointer-events-none absolute inset-[-10px] rounded-full border border-dashed opacity-40"
            style={{ borderColor: s.color, animation: `spin-fwd ${9 + (s.level % 5)}s linear infinite` }}
          >
            <span className="absolute -top-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ background: s.color }} />
          </span>

          <span className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap font-sans text-[0.66rem] tracking-wide text-ink2 transition-opacity duration-300 group-hover:opacity-0">
            {s.name}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Skills() {
  const [hot, setHot] = useState<Skill | null>(null);

  return (
    <section id="skills" className="section relative z-10 overflow-hidden">
      <SectionHead
        eyebrow="Chapter three"
        title="A small galaxy of things I can do"
        sub="Sixteen skills in orbit. The closer in, the more I lean on it. Hover a planet to see where it's actually been used."
      />

      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------------- the galaxy ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-[min(92vw,620px)]"
          style={{ animationPlayState: hot ? "paused" : "running" }}
        >
          {/* nebula */}
          <div className="absolute inset-[8%] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle,#FFD6E8,#DCCBFF 42%,transparent 70%)" }} />

          {/* orbit rings */}
          {RINGS.map((ring) => (
            <div
              key={ring.r}
              className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-pink-soft/50"
              style={{ width: `${ring.r * 2}%`, height: `${ring.r * 2}%`, transform: "translate(-50%,-50%)" }}
            />
          ))}

          {/* the planets, per ring */}
          <div className="absolute inset-0" style={{ animationPlayState: hot ? "paused" : "running" }}>
            {RINGS.map((ring) => (
              <div
                key={`spin-${ring.r}`}
                className="absolute inset-0"
                style={{ animation: `spin-fwd ${ring.dur}s linear infinite`, animationPlayState: hot ? "paused" : "running" }}
              >
                {ring.items.map((s, i) => (
                  <Planet
                    key={s.name}
                    s={s}
                    angle={(360 / ring.items.length) * i}
                    radius={ring.r}
                    dur={ring.dur}
                    onHover={setHot}
                    active={hot?.name === s.name}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* me, at the centre */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid h-[clamp(90px,17vw,132px)] w-[clamp(90px,17vw,132px)] place-items-center rounded-full glass shadow-lift">
              <div className="absolute inset-0 animate-breathe rounded-full" style={{ background: "radial-gradient(circle,rgba(248,200,220,0.5),transparent 68%)" }} />
              <div className="relative text-center">
                <span className="animate-breathe block">
                  <Flower size={26} className="mx-auto" />
                </span>
                <span className="mt-1 block h-display text-[0.95rem] text-ink">Khushi</span>
                <span className="block font-sans text-[0.6rem] tracking-[0.18em] uppercase text-ink2">the sun</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------- the read-out ---------------- */}
        <div className="relative min-h-[19rem]">
          <AnimatePresence mode="wait">
            {hot ? (
              <motion.div
                key={hot.name}
                initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl px-8 py-8 glass shadow-lift"
              >
                <span className="eyebrow" style={{ color: hot.color }}>
                  {hot.group}
                </span>
                <h3 className="h-display mt-3 text-[clamp(1.7rem,4vw,2.5rem)] text-ink">{hot.name}</h3>

                <div className="mt-6 flex items-baseline justify-between font-sans text-[0.8rem] text-ink2">
                  <span>Confidence</span>
                  <span className="text-ink">{hot.level}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-pink-candy/40">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${hot.color}, #DCCBFF)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${hot.level}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <dl className="mt-7 space-y-4">
                  <div>
                    <dt className="eyebrow text-ink2/70">Time with it</dt>
                    <dd className="mt-1 font-sans text-[0.95rem] text-ink">{hot.years}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink2/70">Where it's been</dt>
                    <dd className="mt-1 font-sans text-[0.95rem] text-ink">{hot.used}</dd>
                  </div>
                </dl>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-dashed border-pink-soft/70 px-8 py-12 text-center"
              >
                <span className="mx-auto block w-fit animate-floaty">
                  <Flower size={34} color="#DCCBFF" />
                </span>
                <p className="mt-5 font-hand text-2xl text-ink2">reach out and touch a planet</p>
                <p className="mx-auto mt-3 max-w-xs text-[0.9rem] leading-relaxed text-ink2/80">
                  Python, SQL, scikit-learn, Power BI, Kotlin, Prompt Engineering, LLM integration and the rest — each one
                  attached to something I actually built with it.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-fwd {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-back {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
