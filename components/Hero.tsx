"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { profile } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Flower, Magnetic } from "./ui";

/** Ideas that lift off the sketchbook as she draws. */
const IDEAS = [
  { label: "Python", x: -46, y: -30, d: 2.4, c: "#F8C8DC" },
  { label: "Neural Networks", x: 42, y: -38, d: 2.7, c: "#DCCBFF" },
  { label: "Prompt Engineering", x: 50, y: 6, d: 3.0, c: "#CFE8FF" },
  { label: "Forecasting", x: -52, y: 12, d: 3.3, c: "#CFF5E7" },
  { label: "Kotlin", x: -34, y: 36, d: 3.6, c: "#FFD8BE" },
  { label: "Power BI", x: 36, y: 40, d: 3.9, c: "#F7AFC9" },
];

const WORDS = [
  { t: "Hello.", cls: "text-ink/70 text-[clamp(1rem,2.2vw,1.35rem)] font-sans tracking-[0.3em] uppercase" },
  { t: "I'm Khushi Yadav.", cls: "h-display text-[clamp(2.4rem,7.2vw,5.6rem)] text-ink" },
];

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 22 });
  const py = useSpring(my, { stiffness: 90, damping: 22 });
  const tiltY = useTransform(px, [-1, 1], [7, -7]);
  const tiltX = useTransform(py, [-1, 1], [-5, 5]);
  const driftX = useTransform(px, [-1, 1], [-22, 22]);
  const driftY = useTransform(py, [-1, 1], [-14, 14]);

  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden px-[clamp(1.25rem,5vw,5rem)] pb-16 pt-28">
      <motion.div style={{ y, opacity: fade, scale }} className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ------------------ text ------------------ */}
        <div className="order-2 lg:order-1">
          {WORDS.map((w, li) => (
            <div key={w.t} className="overflow-hidden">
              <motion.p
                initial={{ y: "115%", opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 + li * 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`${w.cls} ${li === 0 ? "mb-3" : "mb-5"}`}
              >
                {w.t}
              </motion.p>
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-2"
          >
            {profile.roles.map((r, i) => (
              <span key={r} className="flex items-center gap-2.5">
                <span className="font-display text-[clamp(1.1rem,2.4vw,1.55rem)] font-semibold text-ink">{r}</span>
                {i < profile.roles.length - 1 && <span className="h-1 w-1 rounded-full bg-ink/30" />}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.95 }}
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink"
          >
            AI Developer at RK Developers, Bengaluru — shipping forecasting systems, LLM applications and Android
            products that people actually use.{" "}
            <span className="text-ink/60">{profile.tagline}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 2.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic href="#projects">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-sans text-sm text-white shadow-lift">
                Walk the gallery
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Magnetic>
            <Magnetic href="#contact">
              <span className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans text-sm text-ink glass shadow-soft">
                Send a paper plane
              </span>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 font-sans text-[0.75rem] tracking-[0.15em] uppercase text-ink2/80"
          >
            <span>B.E. CSE (AI &amp; ML) · 8.3 CGPA</span>
            <span>10+ projects · 4 live</span>
            <span>Bengaluru, India</span>
          </motion.div>
        </div>

        {/* ------------------ the illustration ------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 40 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
          style={{ perspective: 1400 }}
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, x: driftX, y: driftY, transformStyle: "preserve-3d" }}
            className="relative mx-auto aspect-square w-[min(84vw,480px)]"
          >
            {/* watercolour halo */}
            <div className="absolute inset-[-14%] rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle,#FFD6E8,#DCCBFF 45%,transparent 70%)" }} />

            {/* the sketchbook page she lives on */}
            <div className="absolute inset-0 rounded-[2.6rem] glass shadow-lift" style={{ transform: "translateZ(-30px)" }} />
            <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] border border-white/70" />

            {/* faint sketch grid, as if drawn on graph paper */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full rounded-[2.6rem] opacity-[0.35]" aria-hidden>
              <defs>
                <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
                  <path d="M26 0H0V26" fill="none" stroke="#F8C8DC" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" rx="42" />
            </svg>

            {/* the animated illustration of me */}
            <div className="absolute inset-[6%] overflow-hidden rounded-[2rem]">
              {videoOk ? (
                <video
                  className="avatar-blend h-full w-full scale-[1.22] object-cover"
                  src={asset("/avatar.mp4")}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Animated illustration of Khushi Yadav"
                  onError={() => setVideoOk(false)}
                />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  <Flower size={90} />
                </div>
              )}
            </div>

            {/* ideas lifting off the page */}
            {IDEAS.map((idea, i) => (
              <motion.div
                key={idea.label}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idea.d, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute"
                style={{
                  left: `${50 + idea.x}%`,
                  top: `${50 + idea.y}%`,
                  transform: "translate(-50%,-50%) translateZ(50px)",
                }}
              >
                <span
                  className="block whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-[0.68rem] tracking-wide shadow-soft"
                  style={{
                    background: `linear-gradient(140deg, ${idea.c}, rgba(255,255,255,0.86))`,
                    color: "#2A2A2A",
                    animation: `floaty ${5 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
                  }}
                >
                  {idea.label}
                </span>
              </motion.div>
            ))}

            {/* a neural sketch, drawn in */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden style={{ transform: "translateZ(30px)" }}>
              <g stroke="#DCCBFF" strokeWidth="0.35" fill="none" opacity="0.85">
                {[
                  "M12 30 L30 22 L48 30",
                  "M12 30 L30 46 L48 30",
                  "M52 70 L70 62 L88 70",
                  "M52 70 L70 78 L88 70",
                ].map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    initial={{ pathLength: 0 }}
                    animate={ready ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.6, delay: 2.8 + i * 0.2 }}
                  />
                ))}
              </g>
              {[
                [12, 30],
                [30, 22],
                [30, 46],
                [48, 30],
                [52, 70],
                [70, 62],
                [70, 78],
                [88, 70],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="1.1"
                  fill="#F7AFC9"
                  initial={{ opacity: 0 }}
                  animate={ready ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 2.6, delay: 3 + i * 0.12, repeat: Infinity }}
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 3.2, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2"
      >
        <span className="eyebrow text-ink2/70">scroll gently</span>
        <span className="relative block h-9 w-[1.5px] overflow-hidden rounded bg-pink-candy">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scrollhint_2.2s_ease-in-out_infinite] rounded bg-pink-quartz" />
        </span>
      </motion.div>

      <style jsx global>{`
        @keyframes scrollhint {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
