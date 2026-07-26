"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, type Skill } from "@/lib/data";
import { asset } from "@/lib/asset";
import { SectionHead, Flower } from "./ui";

/**
 * Three orbits, biggest skills closest in.
 * Counts are deliberately low on the inner rings — arc length there is short,
 * and crowding is what made the labels collide.
 */
const RINGS = [
  { r: 21, dur: 52, items: skills.slice(0, 4) },
  { r: 33, dur: 74, items: skills.slice(4, 9) },
  { r: 45, dur: 96, items: skills.slice(9) },
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
  const size = 30 + (s.level - 75) * 0.6;

  /*
   * Position with left/top percentages, NOT `translate(radius%)`.
   * A percentage translate resolves against the element's OWN width, so the
   * planets were all collapsing onto the centre and hiding behind the core.
   * Trig against the square container puts them on the actual orbit.
   */
  const rad = (angle * Math.PI) / 180;
  const left = 50 + radius * Math.cos(rad);
  const top = 50 + radius * Math.sin(rad);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%`, top: `${top}%` }}>
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
          className="group relative grid place-items-center rounded-full transition-transform duration-500 ease-silk"
          style={{
            width: size,
            height: size,
            transform: `scale(${active ? 1.5 : 1})`,
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

          <span
            className="pointer-events-none absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-canvas2/85 px-2 py-0.5 font-sans text-[0.63rem] font-medium tracking-wide text-ink shadow-sm backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: active ? 0 : 1 }}
          >
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
          className="relative mx-auto aspect-square w-[min(88vw,660px)]"
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

          {/* the core — a small neural net, always firing */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid h-[clamp(108px,19vw,152px)] w-[clamp(108px,19vw,152px)] place-items-center rounded-full glass shadow-lift">
              <div
                className="absolute inset-0 animate-breathe rounded-full"
                style={{ background: "radial-gradient(circle,rgba(248,200,220,0.55),transparent 68%)" }}
              />

              {/* pulse rings radiating out */}
              {[0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  className="absolute rounded-full border border-pink-quartz/50"
                  style={{ inset: 0 }}
                  animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: k, ease: "easeOut" }}
                />
              ))}

              {/* the animated illustration, at the centre of the orbit */}
              <div className="absolute inset-[7%] overflow-hidden rounded-full bg-white">
                <video
                  className="avatar-blend h-full w-full scale-[1.3] object-cover"
                  src={asset("/avatar.mp4")}
                  poster={asset("/avatar-poster.png")}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Animated illustration of Khushi Yadav"
                />
              </div>

              <span className="absolute inset-x-0 -bottom-9 text-center">
                <span className="block h-display text-[0.95rem] text-ink">Khushi</span>
                <span className="block font-sans text-[0.55rem] tracking-[0.18em] uppercase text-ink2">the core</span>
              </span>
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
                className="rounded-3xl px-8 py-12 text-center glass shadow-soft"
              >
                <span className="mx-auto block w-fit animate-floaty">
                  <Flower size={34} color="#DCCBFF" />
                </span>
                <p className="mt-5 font-display italic text-[1.15rem] text-ink">hover a planet to explore</p>
                <p className="mx-auto mt-3 max-w-xs text-[0.9rem] leading-relaxed text-ink2">
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
