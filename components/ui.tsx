"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Section heading — the type animates in word by word.                */
/* ------------------------------------------------------------------ */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const words = title.split(" ");
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={`eyebrow ${dark ? "text-pink-candy/80" : "text-pink-dusty"}`}
      >
        {eyebrow}
      </motion.p>

      <h2 className={`h-display mt-4 text-[clamp(2.1rem,5.4vw,4.2rem)] ${dark ? "text-white" : "text-ink"}`}>
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            className="mr-[0.24em] inline-block"
            initial={{ opacity: 0, y: 32, filter: "blur(10px)", rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={`mt-6 text-[1.02rem] leading-relaxed ${dark ? "text-white/65" : "text-ink2"} ${
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic button — leans toward the cursor, springs back.            */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      animate={{ x: t.x, y: t.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      className={`magnetic ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="inline-block"
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-block">
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt card — 3D lean on hover, with a glass sheen that tracks.       */
/* ------------------------------------------------------------------ */
export function Tilt({
  children,
  className = "",
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tf, setTf] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTf({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100, on: true });
  };

  return (
    <div
      ref={ref}
      data-cursor="card"
      onMouseMove={move}
      onMouseLeave={() => setTf({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })}
      className={`relative transition-transform duration-500 ease-silk ${className}`}
      style={{
        transform: `perspective(1100px) rotateX(${tf.rx}deg) rotateY(${tf.ry}deg) translateZ(0)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: tf.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${tf.gx}% ${tf.gy}%, rgba(255,255,255,0.55), transparent 55%)`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — generic fade/rise on scroll into view.                     */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Small decorative flower used as a punctuation mark throughout.      */
/* ------------------------------------------------------------------ */
export function Flower({ size = 18, color = "#F7AFC9", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="15" cy="8.5" rx="3.6" ry="6.2" fill={color} opacity="0.9" transform={`rotate(${a} 15 15)`} />
      ))}
      <circle cx="15" cy="15" r="2.6" fill="#FFD8BE" />
    </svg>
  );
}
