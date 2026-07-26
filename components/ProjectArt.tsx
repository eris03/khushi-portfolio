"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { asset } from "@/lib/asset";

/**
 * Each project is a painting. When you hover it, the painting starts moving.
 * `alive` drives every animation so an idle gallery stays cheap to render.
 *
 * If the project has a real screenshot at `p.image`, that is shown instead —
 * and if the file is missing the component falls straight back to the artwork,
 * so the gallery never shows a broken image.
 */
export default function ProjectArt({ p, alive }: { p: Project; alive: boolean }) {
  const [a, b, c] = p.palette;
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = Boolean(p.image) && !imgFailed;

  if (showPhoto) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(p.image!)}
          alt={`${p.name} — ${p.kind}`}
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk"
          style={{ transform: alive ? "scale(1.06)" : "scale(1)" }}
          loading="lazy"
        />
        {/* a wash of the project palette so photos still feel part of the gallery */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-700"
          style={{ background: `linear-gradient(150deg, ${a}, ${c})`, opacity: alive ? 0.25 : 0.5 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* watercolour ground */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${a}, ${b} 55%, ${c})`, opacity: 0.85 }} />
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{ background: "radial-gradient(120% 90% at 20% 10%, #FFFFFF, transparent 60%)" }}
      />

      {/* ---------------- forecast ---------------- */}
      {p.visual === "forecast" && (
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <g stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.7">
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="20" y1={y} x2="285" y2={y} />
            ))}
          </g>
          {/* bars breathing */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.rect
              key={i}
              x={34 + i * 31}
              width="15"
              rx="4"
              fill="#FFFFFF"
              fillOpacity="0.45"
              initial={{ height: 20, y: 160 }}
              animate={alive ? { height: [20, 34 + ((i * 17) % 60), 26], y: [160, 180 - (34 + ((i * 17) % 60)), 154] } : { height: 20, y: 160 }}
              transition={{ duration: 1.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {/* forecast line */}
          <motion.path
            d="M34 130 L65 112 L96 122 L127 88 L158 96 L189 62 L220 74 L251 46 L282 54"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={alive ? { pathLength: 1 } : { pathLength: 0.25 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* the anomaly it caught */}
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={alive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ delay: 1.2, duration: 0.5 }} style={{ transformOrigin: "189px 62px" }}>
            <circle cx="189" cy="62" r="9" fill="none" stroke="#2A2A2A" strokeWidth="1.6" strokeDasharray="3 3" />
            <circle cx="189" cy="62" r="3.4" fill="#2A2A2A" />
          </motion.g>
        </svg>
      )}

      {/* ---------------- movies ---------------- */}
      {p.visual === "movies" && (
        <div className="absolute inset-0 flex items-center">
          <motion.div
            className="flex gap-3 px-5"
            animate={alive ? { x: [-10, -120] } : { x: -10 }}
            transition={{ duration: 5, repeat: alive ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                className="relative h-28 w-[70px] shrink-0 overflow-hidden rounded-lg bg-white/55 shadow-soft"
                animate={alive ? { y: [0, i % 2 ? 8 : -8, 0], rotate: [0, i % 2 ? 2 : -2, 0] } : {}}
                transition={{ duration: 3 + (i % 3), repeat: alive ? Infinity : 0, ease: "easeInOut", delay: i * 0.12 }}
              >
                <div className="absolute inset-x-0 top-0 h-[62%]" style={{ background: `linear-gradient(160deg, ${[a, b, c][i % 3]}, #FFFFFF)` }} />
                <div className="absolute inset-x-2 bottom-3 h-1 rounded bg-ink/20" />
                <div className="absolute inset-x-2 bottom-6 h-1.5 w-8 rounded bg-ink/25" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ---------------- chatbot ---------------- */}
      {p.visual === "chat" && (
        <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-6">
          {[
            { me: false, w: "62%", d: 0 },
            { me: true, w: "48%", d: 0.5 },
            { me: false, w: "74%", d: 1 },
          ].map((m, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl px-3.5 py-2.5 ${m.me ? "self-end bg-ink/85" : "self-start bg-white/75"}`}
              style={{ width: m.w }}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={alive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.35, y: 6, scale: 0.97 }}
              transition={{ duration: 0.45, delay: m.d, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className={`h-1.5 rounded ${m.me ? "bg-white/60" : "bg-ink/25"}`} style={{ width: "88%" }} />
              <div className={`mt-1.5 h-1.5 rounded ${m.me ? "bg-white/40" : "bg-ink/15"}`} style={{ width: "56%" }} />
            </motion.div>
          ))}
          <motion.div
            className="self-start rounded-2xl bg-white/75 px-3.5 py-3"
            initial={{ opacity: 0 }}
            animate={alive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-ink/40"
                  animate={alive ? { y: [0, -4, 0], opacity: [0.4, 1, 0.4] } : {}}
                  transition={{ duration: 0.9, repeat: alive ? Infinity : 0, delay: d * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ---------------- attendance map ---------------- */}
      {p.visual === "map" && (
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <g stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.4" fill="none">
            <path d="M-10 60 Q80 40 150 78 T310 58" />
            <path d="M-10 130 Q90 150 160 118 T310 140" />
            <path d="M70 -10 Q60 90 96 210" />
            <path d="M210 -10 Q222 90 196 210" />
          </g>
          {[
            { x: 92, y: 62, d: 0 },
            { x: 196, y: 118, d: 0.45 },
            { x: 148, y: 88, d: 0.9 },
          ].map((pin, i) => (
            <g key={i}>
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r="4"
                fill="#2A2A2A"
                initial={{ scale: 0 }}
                animate={alive ? { scale: 1 } : { scale: 0.5 }}
                transition={{ delay: pin.d, type: "spring", stiffness: 300, damping: 14 }}
                style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
              />
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r="4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                initial={{ scale: 1, opacity: 0 }}
                animate={alive ? { scale: [1, 4.5], opacity: [0.9, 0] } : { opacity: 0 }}
                transition={{ duration: 1.9, repeat: alive ? Infinity : 0, delay: pin.d }}
                style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
              />
            </g>
          ))}
        </svg>
      )}

      {/* brush-stroke vignette so it reads as a painting, not a screenshot */}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 60px rgba(255,255,255,0.55)" }} />
    </div>
  );
}
