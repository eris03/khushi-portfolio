"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { seeded } from "@/lib/rng";
import { Flower } from "./ui";

const rand = seeded(777);
const BLOSSOM = Array.from({ length: 16 }, () => ({
  left: rand() * 100,
  dur: 14 + rand() * 14,
  delay: -rand() * 20,
  size: 7 + rand() * 9,
  drift: (rand() - 0.5) * 16,
}));

/** A soft, sparse ambient piano — synthesised, so there's no audio file to load. */
function useAmbient() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!on) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      const prev = ctxRef.current;
      if (prev && prev.state !== "closed") prev.close().catch(() => {});
      ctxRef.current = null;
      return;
    }

    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.055;
    master.connect(ctx.destination);

    // a gentle pentatonic set — hard to make ugly
    const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
    let step = 0;

    const play = () => {
      const f = notes[Math.floor(Math.random() * notes.length)] * (step % 6 === 0 ? 0.5 : 1);
      step += 1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(1, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + 3.6);
    };

    play();
    timerRef.current = window.setInterval(play, 1900);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (ctx.state !== "closed") ctx.close().catch(() => {});
    };
  }, [on]);

  return [on, setOn] as const;
}

export default function Footer() {
  const [sound, setSound] = useAmbient();
  const year = 2026;

  return (
    <footer className="relative z-10 overflow-hidden" style={{ background: "linear-gradient(180deg,#1E1B2E,#2B2742 55%,#3A3358)" }}>
      {/* falling blossom, lit from below */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {BLOSSOM.map((b, i) => (
          <svg
            key={i}
            className="absolute top-0"
            width={b.size}
            height={b.size}
            viewBox="0 0 12 12"
            style={
              {
                left: `${b.left}%`,
                opacity: 0.5,
                "--drift": `${b.drift}vw`,
                animation: `fall ${b.dur}s linear ${b.delay}s infinite`,
              } as React.CSSProperties
            }
          >
            <path d="M6 0C8.6 3 9.2 6.6 6 12 2.8 6.6 3.4 3 6 0Z" fill="#FFD6E8" />
          </svg>
        ))}
      </div>

      {/* the landscape */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden>
        <path d="M0 210 C140 150 260 200 400 168 C540 136 640 190 780 160 C920 130 1050 186 1200 152 V300 H0 Z" fill="#241F3A" opacity="0.85" />
        <path d="M0 250 C160 208 300 246 450 224 C600 202 720 244 880 218 C1020 196 1110 236 1200 214 V300 H0 Z" fill="#191530" />
      </svg>

      {/* lanterns */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[9%]" aria-hidden>
        {[14, 33, 52, 71, 88].map((x, i) => (
          <div
            key={x}
            className="absolute"
            style={{ left: `${x}%`, animation: `floaty ${5 + i * 0.9}s ease-in-out ${i * 0.5}s infinite` }}
          >
            <div className="h-px w-px" style={{ boxShadow: "0 0 40px 18px rgba(255,216,190,0.28)" }} />
            <svg width="22" height="32" viewBox="0 0 22 32" className="-translate-x-1/2">
              <path d="M11 2 v3" stroke="#FFD8BE" strokeWidth="1" opacity="0.5" />
              <rect x="3" y="5" width="16" height="20" rx="7" fill="#FFD8BE" opacity="0.9" />
              <rect x="3" y="5" width="16" height="20" rx="7" fill="none" stroke="#FFFDFD" strokeWidth="0.7" opacity="0.6" />
              <path d="M6 25 h10 l-2 4 h-6 z" fill="#F7AFC9" opacity="0.75" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative px-[clamp(1.25rem,5vw,5rem)] pb-14 pt-[clamp(6rem,14vh,10rem)]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto mb-8 block w-fit animate-floaty"
          >
            <Flower size={40} color="#FFD6E8" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-display text-[clamp(1.9rem,5.4vw,3.6rem)] text-white"
          >
            Let&apos;s create something
            <br />
            <span className="text-aurora">beautiful together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 font-hand text-[clamp(1.5rem,4vw,2.2rem)] text-pink-candy"
          >
            Khushi Yadav
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Email", href: `mailto:${profile.email}` },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "GitHub", href: profile.github },
              { label: "Back to the top", href: "#hero" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-full px-5 py-2.5 font-sans text-[0.82rem] text-white/80 glass-dark transition-all duration-300 hover:scale-[1.05] hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* the piano */}
          <button
            type="button"
            onClick={() => setSound(!sound)}
            aria-pressed={sound}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-sans text-[0.76rem] text-white/60 glass-dark transition-colors hover:text-white/90"
          >
            <span className="relative flex h-2 w-2">
              {sound && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-candy opacity-75" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${sound ? "bg-pink-candy" : "bg-white/30"}`} />
            </span>
            {sound ? "quiet piano — playing" : "quiet piano — off"}
          </button>

          <div className="mt-14 flex flex-col items-center gap-2 border-t border-white/10 pt-8 font-sans text-[0.74rem] text-white/35 sm:flex-row sm:justify-between">
            <span>© {year} Khushi Yadav · Bengaluru, India</span>
            <span>Designed and built by hand — Next.js, Framer Motion, GSAP, Lenis.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
