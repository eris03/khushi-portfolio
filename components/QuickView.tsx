"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { profile, projects, stations, certs, trophies, skills } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Flower } from "./ui";

/**
 * The thirty-second version.
 *
 * The cinematic scroll is the point of this site, but some recruiters have no
 * time for it — and losing them to a scroll animation is a worse outcome than
 * offering an exit. Same palette, same type, none of the choreography.
 */
export default function QuickView({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const topSkills = skills.slice().sort((a, b) => b.level - a.level).slice(0, 10);

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid gap-2 border-t border-pink-soft/40 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <span className="eyebrow pt-1 text-ink2">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[180] overflow-y-auto overscroll-contain"
          /* Lenis hijacks the wheel globally; without this the overlay can't scroll */
          data-lenis-prevent
          style={{ background: "linear-gradient(160deg,#FFF8F6,#FFFDFD 40%,#FFF1F6)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Quick view — one-page summary"
        >
          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14"
          >
            {/* header */}
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white shadow-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset("/avatar-poster.png")} alt="" className="h-full w-full scale-[1.35] object-cover" />
                </span>
                <div>
                  <h2 className="h-display text-[clamp(1.8rem,4.6vw,2.6rem)] text-ink">{profile.name}</h2>
                  <p className="mt-1 font-sans text-[0.95rem] text-ink">{profile.roles.join(" · ")}</p>
                  <p className="mt-0.5 font-sans text-[0.8rem] text-ink2">{profile.location}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-ink px-5 py-2.5 font-sans text-[0.8rem] text-white transition-transform duration-300 hover:scale-105"
              >
                ← Full experience
              </button>
            </div>

            <p className="mt-7 text-[0.98rem] leading-[1.8] text-ink2">{profile.summary}</p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <a
                href={asset("/Khushi-Yadav-Resume.pdf")}
                download
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-sans text-[0.8rem] text-white transition-transform duration-300 hover:scale-105"
              >
                Download résumé (PDF)
              </a>
              <a href={`mailto:${profile.email}`} className="rounded-full px-5 py-2.5 font-sans text-[0.8rem] text-ink glass shadow-soft">
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2.5 font-sans text-[0.8rem] text-ink glass shadow-soft">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2.5 font-sans text-[0.8rem] text-ink glass shadow-soft">
                GitHub
              </a>
            </div>

            {/* headline numbers */}
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trophies.map((t) => (
                <div key={t.title} className="rounded-2xl px-4 py-4 glass shadow-soft">
                  <span className="block h-display text-[1.5rem] text-ink">{t.metric}</span>
                  <span className="mt-1 block font-sans text-[0.72rem] leading-snug text-ink2">{t.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Row label="Experience">
                <ul className="space-y-4">
                  {stations
                    .filter((s) => s.id !== "next")
                    .map((s) => (
                      <li key={s.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <span className="font-sans text-[0.98rem] font-medium text-ink">{s.role}</span>
                          <span className="font-sans text-[0.78rem] text-ink2">{s.period}</span>
                        </div>
                        <p className="font-sans text-[0.85rem] text-ink2">{s.org}</p>
                        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink2">{s.bullets[0]}</p>
                      </li>
                    ))}
                </ul>
              </Row>

              <Row label="Education">
                <p className="font-sans text-[0.95rem] text-ink">B.E. Computer Science &amp; Engineering (AI &amp; ML)</p>
                <p className="font-sans text-[0.85rem] text-ink2">Vijaya Vittala Institute of Technology, VTU · May 2026 · CGPA 8.3 / 10</p>
              </Row>

              <Row label="Projects">
                <ul className="space-y-3">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-sans text-[0.95rem] font-medium text-ink">{p.name}</span>
                        <a href={p.github} target="_blank" rel="noreferrer" className="font-sans text-[0.75rem] text-pink-dusty underline decoration-pink-soft underline-offset-4">
                          code
                        </a>
                      </div>
                      <p className="text-[0.86rem] leading-relaxed text-ink2">{p.blurb}</p>
                      <p className="mt-0.5 font-sans text-[0.72rem] text-ink2/80">{p.tech.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </Row>

              <Row label="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {topSkills.map((s) => (
                    <span key={s.name} className="rounded-full px-3 py-1.5 font-sans text-[0.75rem] text-ink" style={{ background: `${s.color}66` }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </Row>

              <Row label="Certifications">
                <ul className="space-y-1.5">
                  {certs.map((c) => (
                    <li key={c.name} className="text-[0.88rem] text-ink2">
                      <span className="text-ink">{c.name}</span> — {c.issuer}, {c.date}
                    </li>
                  ))}
                </ul>
              </Row>

              <Row label="Availability">
                <p className="text-[0.92rem] text-ink">Available for immediate joining · Bengaluru, India</p>
              </Row>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 border-t border-pink-soft/40 pt-8">
              <Flower size={16} color="#DCCBFF" />
              <button type="button" onClick={onClose} className="font-sans text-[0.85rem] text-ink2 underline decoration-pink-soft underline-offset-4 hover:text-ink">
                See the full experience instead
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
