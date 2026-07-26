"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";
import { seeded } from "@/lib/rng";
import { asset } from "@/lib/asset";
import { Flower } from "./ui";

const rand = seeded(90210);
const FIREFLIES = Array.from({ length: 22 }, () => ({
  left: rand() * 100,
  top: 18 + rand() * 76,
  dur: 7 + rand() * 9,
  delay: -rand() * 12,
  size: 3 + rand() * 4,
}));
const STARS = Array.from({ length: 46 }, () => ({
  left: rand() * 100,
  top: rand() * 62,
  dur: 2.6 + rand() * 4,
  delay: -rand() * 6,
  size: 1.2 + rand() * 2.2,
}));

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [flying, setFlying] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  /**
   * Posts straight to FormSubmit, which forwards the message to khushi392004yadav@gmail.com.
   * No backend, no API key, works on a static host. The very first message triggers a
   * one-time confirmation email — click the link in it and every message after that
   * lands in the inbox automatically.
   */
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (flying) return;
    setFlying(true);
    setFailed(false);

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("message", form.message);
    payload.append("_subject", `Portfolio — ${form.name || "new message"}`);
    payload.append("_template", "table");
    payload.append("_captcha", "false");

    // let the paper plane finish its flight no matter how fast the network is
    const flight = new Promise((r) => window.setTimeout(r, 1900));

    try {
      const [res] = await Promise.all([
        fetch(`https://formsubmit.co/ajax/${profile.email}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: payload,
        }),
        flight,
      ]);
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      await flight;
      setFailed(true);
    } finally {
      setFlying(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  const field =
    "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 font-sans text-[0.95rem] text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-pink-soft/70 focus:bg-white/[0.11]";

  return (
    <section id="contact" className="relative z-10 overflow-hidden">
      {/* the sky turns to night */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#FFF8F6 0%,#6E6389 18%,#2B2742 46%,#1E1B2E 100%)" }} />

      {/* stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* the moon */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[8%] top-[14%] h-[clamp(90px,15vw,170px)] w-[clamp(90px,15vw,170px)]"
        aria-hidden
      >
        <div className="absolute inset-[-60%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,253,253,0.45),transparent 62%)" }} />
        <div className="relative h-full w-full rounded-full" style={{ background: "radial-gradient(circle at 36% 32%,#FFFDFD,#F0E6EE 60%,#DCCBFF)" }}>
          <span className="absolute left-[26%] top-[32%] h-[13%] w-[13%] rounded-full bg-[#E4D6E6]" />
          <span className="absolute left-[56%] top-[24%] h-[9%] w-[9%] rounded-full bg-[#E4D6E6]" />
          <span className="absolute left-[46%] top-[58%] h-[16%] w-[16%] rounded-full bg-[#E4D6E6]" />
        </div>
      </motion.div>

      {/* fireflies */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FIREFLIES.map((f, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.size,
              height: f.size,
              background: "#FFD8BE",
              boxShadow: "0 0 12px 3px rgba(255,216,190,0.75)",
              animation: `firefly ${f.dur}s ease-in-out ${f.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(6rem,12vh,9rem)] pt-[clamp(9rem,20vh,14rem)]">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ---------------- the invitation ---------------- */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-pink-candy/85"
            >
              Last chapter
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="h-display mt-4 text-[clamp(2.1rem,5.4vw,3.9rem)] text-white"
            >
              Write to me
              <br />
              after dark.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-sm leading-relaxed text-white/60"
            >
              Available for immediate joining, based in Bengaluru, and genuinely quick to reply. Press send and the note
              becomes a paper plane.
            </motion.p>

            <div className="mt-10 space-y-3.5">
              {[
                { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                { label: "LinkedIn", value: "in/khudav03", href: profile.linkedin },
                { label: "GitHub", value: "eris03", href: profile.github },
                { label: "Location", value: profile.location },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="w-20 shrink-0 font-sans text-[0.68rem] tracking-[0.2em] uppercase text-white/35">
                    {row.label}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                      className="font-sans text-[0.95rem] text-white/85 underline decoration-pink-soft/40 underline-offset-4 transition-colors hover:text-pink-candy"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="font-sans text-[0.95rem] text-white/70">{row.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href={asset("/Khushi-Yadav-Resume.pdf")}
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-sans text-[0.8rem] text-ink transition-transform duration-300 hover:scale-[1.04]"
              >
                Download résumé (PDF)
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5v9m0 0 3.5-3.5M8 10.5 4.5 7M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-sans text-[0.8rem] text-white glass-dark transition-transform duration-300 hover:scale-[1.04]"
              >
                {copied ? "copied to your clipboard ✿" : "copy my email"}
              </button>
            </div>
          </div>

          {/* ---------------- the note ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] p-8 glass-dark shadow-lift sm:p-10" data-cursor="card">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex min-h-[22rem] flex-col items-center justify-center gap-5 text-center"
                  >
                    <span className="animate-floaty">
                      <Flower size={44} color="#FFD6E8" />
                    </span>
                    <h3 className="h-display text-2xl text-white">It&apos;s in the air.</h3>
                    <p className="max-w-xs text-[0.95rem] leading-relaxed text-white/60">
                      Your message is on its way to my inbox. I read everything, and I reply quickly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-2 rounded-full px-5 py-2.5 font-sans text-[0.8rem] text-white/80 glass-dark"
                    >
                      write another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={send}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-sans text-[0.68rem] tracking-[0.2em] uppercase text-white/40">
                          Your name
                        </span>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={field}
                          placeholder="Who's writing?"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block font-sans text-[0.68rem] tracking-[0.2em] uppercase text-white/40">
                          Your email
                        </span>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={field}
                          placeholder="where I write back"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-2 block font-sans text-[0.68rem] tracking-[0.2em] uppercase text-white/40">
                        Your note
                      </span>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${field} resize-none`}
                        placeholder="A role, a project, an idea, or just hello."
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={flying}
                      className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-white px-6 py-4 font-sans text-[0.92rem] text-ink transition-transform duration-300 hover:scale-[1.02] disabled:cursor-wait"
                    >
                      <span
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: "linear-gradient(100deg,#FFD6E8,#DCCBFF,#CFE8FF)" }}
                      />
                      <span className="relative inline-flex items-center gap-2.5">
                        {flying ? "folding your note…" : "Send it into the sky"}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M14.5 1.5 L7 9M14.5 1.5 L10 14.5 L7 9 L1.5 6 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>

                    {failed && (
                      <p className="rounded-2xl border border-pink-quartz/40 bg-pink-quartz/10 px-4 py-3 text-center text-[0.85rem] text-white/80">
                        That didn&apos;t send. Please email me directly at{" "}
                        <a href={`mailto:${profile.email}`} className="underline decoration-pink-soft/60 underline-offset-4">
                          {profile.email}
                        </a>
                        .
                      </p>
                    )}

                    <p className="pt-1 text-center font-sans text-[0.72rem] tracking-wide text-white/40">
                      Delivered straight to my inbox — no account, no newsletter, no spam.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* the paper plane */}
            <AnimatePresence>
              {flying && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 bottom-16 z-30"
                  initial={{ x: "-50%", y: 0, opacity: 0, scale: 0.6, rotate: 0 }}
                  animate={{
                    x: ["-50%", "20%", "180%"],
                    y: [0, -180, -460],
                    opacity: [0, 1, 0],
                    scale: [0.6, 1, 0.35],
                    rotate: [0, -18, -34],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.9, ease: [0.3, 0.7, 0.4, 1] }}
                  aria-hidden
                >
                  <svg width="54" height="54" viewBox="0 0 54 54" style={{ filter: "drop-shadow(0 6px 18px rgba(255,214,232,0.7))" }}>
                    <path d="M50 4 L4 24 L22 30 L28 48 Z" fill="#FFFDFD" />
                    <path d="M50 4 L22 30 L28 48 Z" fill="#FFD6E8" />
                    <path d="M50 4 L22 30" stroke="#DCCBFF" strokeWidth="1" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* sparkle burst behind the plane */}
            <AnimatePresence>
              {flying &&
                Array.from({ length: 12 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="pointer-events-none absolute left-1/2 bottom-20 h-1.5 w-1.5 rounded-full bg-white"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: (i - 6) * 26,
                      y: -80 - i * 14,
                      scale: [0, 1.2, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.05 }}
                    style={{ boxShadow: "0 0 10px #FFD6E8" }}
                    aria-hidden
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes firefly {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          25% { transform: translate(26px, -30px); opacity: 1; }
          50% { transform: translate(-18px, -54px); opacity: 0.5; }
          75% { transform: translate(30px, -22px); opacity: 0.95; }
        }
      `}</style>
    </section>
  );
}
