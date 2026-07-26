"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { certs } from "@/lib/data";
import { SectionHead, Flower } from "./ui";

export default function Certifications() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="certifications" className="section relative z-10">
      <SectionHead
        eyebrow="Chapter seven"
        title="The pastel wall"
        sub="Six certificates, pinned up. Click one — the back is where I wrote what it actually taught me."
      />

      <div className="mx-auto mt-16 max-w-6xl">
        {/* the string they hang from */}
        <svg className="mx-auto -mb-6 hidden h-10 w-full max-w-5xl md:block" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden>
          <path d="M0 8 Q250 34 500 14 T1000 8" fill="none" stroke="#F8C8DC" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => {
            const on = flipped === i;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2.5 : -2.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.2 : -1.2 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotate: 0, y: -8 }}
                style={{ perspective: 1400 }}
                className="relative"
              >
                {/* the pin */}
                <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
                  <span className="block h-5 w-5 rounded-full shadow-soft" style={{ background: `radial-gradient(circle at 32% 30%, #FFFFFF, ${c.color})` }} />
                </span>

                <button
                  type="button"
                  data-cursor="card"
                  onClick={() => setFlipped(on ? null : i)}
                  aria-label={`${c.name} — ${on ? "hide" : "show"} details`}
                  aria-pressed={on}
                  className="relative block h-[15.5rem] w-full text-left"
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={{ rotateY: on ? 180 : 0 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* front */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between rounded-3xl px-6 py-7 shadow-lift"
                      style={{
                        backfaceVisibility: "hidden",
                        background: `linear-gradient(150deg, ${c.color}, #FFFDFD 78%)`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="eyebrow text-ink2">{c.issuer}</span>
                        <Flower size={16} color="#FFFFFF" />
                      </div>
                      <div>
                        <h3 className="h-display text-[1.2rem] leading-tight text-ink">{c.name}</h3>
                        <p className="mt-2 font-sans text-[0.78rem] text-ink2">{c.date}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="h-px w-14 bg-ink/20" />
                        <span className="font-hand text-lg text-ink2">flip me</span>
                      </div>
                    </div>

                    {/* back */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-canvas2 px-6 py-7 shadow-lift"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", border: `1.5px solid ${c.color}` }}
                    >
                      <span className="eyebrow" style={{ color: "#5C5C5C" }}>
                        what it taught me
                      </span>
                      <p className="text-[0.92rem] leading-relaxed text-ink2">{c.back}</p>
                      <div className="flex items-center gap-2">
                        <Flower size={14} color={c.color} />
                        <span className="font-sans text-[0.72rem] tracking-wide text-ink2">
                          {c.issuer} · {c.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
