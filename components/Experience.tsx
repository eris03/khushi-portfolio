"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { stations } from "@/lib/data";
import { SectionHead, Flower } from "./ui";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const trainY = useTransform(progress, [0, 1], ["0%", "100%"]);
  const lineScale = useTransform(progress, [0, 1], [0, 1]);
  const tilt = useTransform(progress, [0, 0.5, 1], [-3, 0, 3]);

  return (
    <section id="experience" ref={ref} className="section relative z-10">
      <SectionHead
        eyebrow="Chapter six"
        title="The line I'm riding"
        sub="Two stations behind me, one still ahead. The train moves as you scroll."
      />

      <div className="relative mx-auto mt-20 max-w-4xl pl-14 sm:pl-20">
        {/* the track */}
        <div className="absolute bottom-10 left-5 top-4 w-[3px] rounded-full bg-pink-candy/50 sm:left-8">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top rounded-full"
            style={{
              scaleY: lineScale,
              height: "100%",
              background: "linear-gradient(180deg,#F7AFC9,#DCCBFF 50%,#CFF5E7)",
            }}
          />
        </div>

        {/* the little train */}
        <motion.div
          className="pointer-events-none absolute left-5 top-4 z-20 h-[calc(100%-3.5rem)] sm:left-8"
          style={{ y: trainY }}
        >
          <motion.div className="-translate-x-1/2 -translate-y-1/2" style={{ rotate: tilt }}>
            <svg width="46" height="34" viewBox="0 0 46 34" aria-hidden style={{ filter: "drop-shadow(0 6px 14px rgba(247,175,201,0.6))" }}>
              <rect x="8" y="6" width="30" height="20" rx="8" fill="#FFFDFD" stroke="#F7AFC9" strokeWidth="1.6" />
              <rect x="12.5" y="10" width="9" height="7" rx="2.4" fill="#CFE8FF" />
              <rect x="24.5" y="10" width="9" height="7" rx="2.4" fill="#DCCBFF" />
              <circle cx="16" cy="27.5" r="3.4" fill="#6D6D6D" opacity="0.55" />
              <circle cx="30" cy="27.5" r="3.4" fill="#6D6D6D" opacity="0.55" />
              <path d="M12 6 v-3 h6 v3" fill="none" stroke="#F7AFC9" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="41" cy="16" r="2.4" fill="#FFD8BE">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </motion.div>
        </motion.div>

        {/* the stations */}
        <ol className="space-y-16">
          {stations.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: 44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* the station dot */}
              <span
                className="absolute -left-[2.45rem] top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-canvas2 shadow-soft sm:-left-[3.2rem]"
                style={{ outline: `3px solid ${s.color}`, outlineOffset: -1 }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              </span>

              <div className="rounded-3xl px-7 py-7 glass shadow-soft transition-shadow duration-500 hover:shadow-lift sm:px-9" data-cursor="card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="eyebrow" style={{ color: s.color === "#CFF5E7" ? "#7FBFA7" : s.color }}>
                    {s.period}
                  </span>
                  <Flower size={15} color={s.color} />
                </div>

                <h3 className="h-display mt-3 text-[clamp(1.4rem,3.4vw,2.15rem)] text-ink">{s.role}</h3>
                <p className="mt-1.5 font-sans text-[0.98rem] text-ink">{s.org}</p>
                <p className="mt-0.5 font-sans text-[0.82rem] text-ink2">{s.meta}</p>

                <ul className="mt-5 space-y-3">
                  {s.bullets.map((b, k) => (
                    <motion.li
                      key={k}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 + k * 0.1 }}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-ink2"
                    >
                      <span className="mt-[0.55rem] block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.color }} />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {i === stations.length - 1 && (
                <p className="mt-6 pl-1 font-hand text-xl text-pink-dusty">…this stop is still being built.</p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
