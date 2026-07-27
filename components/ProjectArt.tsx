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

      {/* ---------------- retrieval / RAG ---------------- */}
      {p.visual === "rag" && (
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* the corpus: documents that light up when retrieved */}
          {[
            { x: 26, y: 40, hit: false },
            { x: 26, y: 92, hit: true },
            { x: 26, y: 144, hit: false },
            { x: 74, y: 66, hit: true },
            { x: 74, y: 118, hit: false },
          ].map((d, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0.4 }}
              animate={alive ? { opacity: d.hit ? [0.4, 1, 1] : 0.35 } : { opacity: 0.4 }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.09 }}
            >
              <rect x={d.x} y={d.y} width="30" height="38" rx="4" fill="#FFFFFF" fillOpacity={d.hit ? 0.95 : 0.5} />
              {[0, 1, 2].map((l) => (
                <rect key={l} x={d.x + 5} y={d.y + 8 + l * 8} width={20 - l * 4} height="2.6" rx="1.3" fill="#2A2A2A" fillOpacity="0.28" />
              ))}
            </motion.g>
          ))}

          {/* retrieval beams into the answer */}
          {[
            { y: 111, d: 0.5 },
            { y: 85, d: 0.7 },
          ].map((b, i) => (
            <motion.path
              key={i}
              d={`M108 ${b.y} C150 ${b.y}, 160 100, 196 100`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={alive ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: b.d }}
            />
          ))}

          {/* the cited answer */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={alive ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.96 }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: "240px 100px" }}
          >
            <rect x="200" y="62" width="80" height="76" rx="10" fill="#FFFFFF" fillOpacity="0.92" />
            {[0, 1, 2, 3].map((l) => (
              <rect key={l} x="210" y={76 + l * 11} width={l === 3 ? 34 : 60} height="3.4" rx="1.7" fill="#2A2A2A" fillOpacity="0.3" />
            ))}
            {/* the citation chips */}
            {[0, 1].map((c) => (
              <rect key={c} x={210 + c * 20} y="122" width="16" height="7" rx="3.5" fill="#2A2A2A" fillOpacity="0.55" />
            ))}
          </motion.g>
        </svg>
      )}

      {/* ---------------- guardrails ---------------- */}
      {p.visual === "shield" && (
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* hostile prompts flying in */}
          {[
            { y: 58, d: 0 },
            { y: 100, d: 0.35 },
            { y: 142, d: 0.7 },
          ].map((a, i) => (
            <motion.g key={i}>
              <motion.rect
                x="6"
                y={a.y - 7}
                width="44"
                height="14"
                rx="7"
                fill="#2A2A2A"
                fillOpacity="0.45"
                initial={{ x: 6, opacity: 0 }}
                animate={alive ? { x: [6, 78, 78], opacity: [0, 1, 0] } : { opacity: 0 }}
                transition={{ duration: 1.5, delay: a.d, repeat: alive ? Infinity : 0, repeatDelay: 0.9 }}
              />
            </motion.g>
          ))}

          {/* the shield, deflecting */}
          <motion.g
            animate={alive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={{ duration: 1.5, repeat: alive ? Infinity : 0, repeatDelay: 0.9 }}
            style={{ transformOrigin: "150px 100px" }}
          >
            <path
              d="M150 44 L192 60 V104 C192 132 172 148 150 158 C128 148 108 132 108 104 V60 Z"
              fill="#FFFFFF"
              fillOpacity="0.9"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <motion.path
              d="M133 100 L145 113 L169 88"
              fill="none"
              stroke="#2A2A2A"
              strokeOpacity="0.6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={alive ? { pathLength: 1 } : { pathLength: 0.4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.g>

          {/* clean output continuing on */}
          <motion.path
            d="M198 100 H288"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={alive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          />
        </svg>
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
