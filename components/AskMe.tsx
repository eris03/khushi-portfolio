"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { answerFor, FALLBACK, SUGGESTIONS } from "@/lib/knowledge";
import { asset } from "@/lib/asset";

type Msg = { id: number; from: "me" | "her"; text: string; chips?: string[] };

const GREETING: Msg = {
  id: 0,
  from: "her",
  text: "Hi — I'm Khushi's assistant. Ask me anything about her work, projects or availability and I'll answer from her résumé.",
  chips: SUGGESTIONS.slice(0, 3),
};

export default function AskMe({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const idRef = useRef(1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* a single, gentle nudge so people notice it exists */
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setNudge(true), 6000);
    const t2 = setTimeout(() => setNudge(false), 13000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [ready]);

  useEffect(() => {
    if (open) {
      setNudge(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;

    setMsgs((m) => [...m, { id: idRef.current++, from: "me", text: q }]);
    setDraft("");
    setTyping(true);

    // a beat of "thinking" — instant answers feel canned
    window.setTimeout(() => {
      const hit = answerFor(q);
      setMsgs((m) => [
        ...m,
        {
          id: idRef.current++,
          from: "her",
          text: hit ? hit.answer : FALLBACK,
          chips: hit?.followUps ?? SUGGESTIONS.slice(0, 2),
        },
      ]);
      setTyping(false);
    }, 520 + Math.random() * 380);
  };

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.94 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[6.5rem] right-4 z-[175] flex h-[min(31rem,72vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.6rem] shadow-lift sm:right-6"
          style={{ background: "linear-gradient(160deg,#FFFDFD,#FFF8F6)" }}
          role="dialog"
          aria-label="Ask about Khushi's work"
        >
          {/* header */}
          <div className="flex items-center gap-3 border-b border-pink-soft/40 px-4 py-3" style={{ background: "linear-gradient(120deg,#FFD6E8,#DCCBFF)" }}>
            <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/avatar-poster.png")} alt="" className="h-full w-full scale-[1.35] object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-sans text-[0.85rem] font-semibold text-ink">Ask about my work</span>
              <span className="block font-sans text-[0.68rem] text-ink2">Answers from Khushi&apos;s résumé</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/70 text-ink transition-transform duration-300 hover:rotate-90"
            >
              ✕
            </button>
          </div>

          {/* transcript */}
          <div ref={bodyRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {msgs.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[0.86rem] leading-relaxed ${
                    m.from === "me" ? "ml-auto bg-ink text-white" : "bg-white text-ink shadow-soft"
                  }`}
                >
                  {m.text}
                </div>

                {m.from === "her" && m.chips && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.chips.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => ask(c)}
                        className="rounded-full border border-pink-soft/70 bg-white/80 px-3 py-1.5 text-left font-sans text-[0.72rem] text-ink transition-colors hover:bg-pink-candy/50"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {typing && (
              <div className="flex w-fit gap-1.5 rounded-2xl bg-white px-3.5 py-3 shadow-soft">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-ink/40"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
            className="flex items-center gap-2 border-t border-pink-soft/40 bg-white/70 px-3 py-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about her projects, skills…"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-full border border-pink-soft/60 bg-white px-4 py-2.5 font-sans text-[0.84rem] text-ink outline-none transition-colors placeholder:text-ink2/60 focus:border-pink-quartz"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim() || typing}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 hover:scale-105 disabled:opacity-35"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M14.5 1.5 L7 9M14.5 1.5 L10 14.5 L7 9 L1.5 6 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const launcher = (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 3.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed bottom-5 right-4 z-[176] flex items-center gap-3 sm:right-6"
    >
      <AnimatePresence>
        {nudge && !open && (
          <motion.span
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden whitespace-nowrap rounded-full px-4 py-2.5 font-sans text-[0.78rem] text-ink glass shadow-soft sm:block"
          >
            Curious? Ask me anything about her work.
          </motion.span>
        )}
      </AnimatePresence>

      <button
        type="button"
        data-cursor="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the assistant" : "Ask about Khushi's work"}
        aria-expanded={open}
        className="relative grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full transition-transform duration-500 ease-silk hover:scale-105"
      >
        {/* halo */}
        <span
          className="absolute inset-0 rounded-full blur-md"
          style={{ background: "radial-gradient(circle,rgba(248,200,220,0.95),rgba(220,203,255,0.5) 60%,transparent 72%)" }}
        />
        {!open && (
          <span
            className="absolute inset-0 rounded-full border border-pink-quartz/60"
            style={{ animation: "askme-pulse 2.8s ease-out infinite" }}
          />
        )}

        {/* her animated illustration, as the launcher */}
        <span className="relative block h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full bg-white shadow-lift">
          <video
            className="h-full w-full scale-[1.4] object-cover"
            src={asset("/avatar.mp4")}
            poster={asset("/avatar-poster.png")}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        </span>

        {/* little chat dot */}
        <span className="absolute -right-0.5 -top-0.5 grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.62rem] text-white shadow-soft">
          {open ? "✕" : "?"}
        </span>
      </button>

      <style jsx global>{`
        @keyframes askme-pulse {
          0% { transform: scale(1); opacity: 0.75; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      {panel}
      {launcher}
    </>,
    document.body
  );
}
