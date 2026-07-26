"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { SectionHead, Tilt, Flower } from "./ui";
import ProjectArt from "./ProjectArt";

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const chapters: { label: string; text: string }[] = [
    { label: "The problem", text: p.problem },
    { label: "What I built", text: p.solution },
    { label: "The hard part", text: p.challenge },
    { label: "Where it landed", text: p.result },
  ];

  /*
   * Rendered through a portal onto <body>. Every section carries `relative z-10`,
   * which creates its own stacking context — so a modal left inside <Projects>
   * gets painted over by any later section no matter how high its z-index.
   */
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[160] flex items-start justify-center overflow-y-auto p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
    >
      <div className="fixed inset-0 bg-[#2B2742]/35 backdrop-blur-md" onClick={onClose} />

      <motion.article
        layoutId={`card-${p.id}`}
        className="relative my-4 w-full max-w-4xl overflow-hidden rounded-[2rem] bg-canvas2 shadow-lift"
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* the painting, full width */}
        <div className="relative h-[clamp(200px,32vh,320px)]">
          <ProjectArt p={p} alive />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas2 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink shadow-soft transition-transform duration-300 hover:rotate-90 hover:scale-110"
          >
            ✕
          </button>
        </div>

        <div className="relative px-6 pb-10 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow text-pink-dusty">{p.kind}</span>
            <h3 className="h-display mt-3 text-[clamp(2rem,5.5vw,3.4rem)] text-ink">{p.name}</h3>
            <p className="mt-4 max-w-2xl font-display italic text-[clamp(1.05rem,2vw,1.3rem)] text-ink2">{p.blurb}</p>
          </motion.div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2">
                  <Flower size={13} color={p.palette[i % 3]} />
                  <h4 className="eyebrow text-ink2">{ch.label}</h4>
                </div>
                <p className="mt-3 text-[0.97rem] leading-[1.8] text-ink2">{ch.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10"
          >
            <h4 className="eyebrow text-ink2">Built with</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3.5 py-1.5 font-sans text-[0.78rem] text-ink"
                  style={{ background: `linear-gradient(140deg, ${p.palette[0]}, rgba(255,255,255,0.7))` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-sans text-sm text-white transition-transform duration-300 hover:scale-[1.04]"
            >
              View the code
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M5 11L11 5M11 5H6M11 5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans text-sm text-ink glass shadow-soft transition-transform duration-300 hover:scale-[1.04]"
              >
                Open the live demo
              </a>
            )}
          </motion.div>
        </div>
      </motion.article>
    </motion.div>,
    document.body
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [hot, setHot] = useState<string | null>(null);

  return (
    <section id="projects" className="section relative z-10">
      <SectionHead
        eyebrow="Chapter four"
        title="The gallery"
        sub="Four rooms. Every painting moves when you look at it — and opens into the whole story if you ask."
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-7 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 70, rotate: i % 2 ? 1.5 : -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.95, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt max={7}>
              <motion.button
                layoutId={`card-${p.id}`}
                type="button"
                onClick={() => setOpen(p)}
                onMouseEnter={() => setHot(p.id)}
                onMouseLeave={() => setHot(null)}
                className="group relative block w-full overflow-hidden rounded-[1.9rem] text-left shadow-lift"
                aria-label={`Open ${p.name}`}
              >
                {/* the frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.9rem] border-[10px] border-white/85">
                  <ProjectArt p={p} alive={hot === p.id} />

                  {/* the little museum label */}
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl px-5 py-4 glass transition-all duration-500 ease-silk group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-2 sm:opacity-95">
                    <span className="eyebrow text-ink2">{p.kind}</span>
                    <h3 className="h-display mt-1.5 text-[clamp(1.25rem,2.8vw,1.7rem)] text-ink">{p.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[0.86rem] leading-snug text-ink2">{p.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-[0.76rem] text-pink-dusty">
                      Read the story
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>

                  {/* gallery plaque number */}
                  <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/80 font-display text-sm text-ink shadow-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.button>
            </Tilt>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
