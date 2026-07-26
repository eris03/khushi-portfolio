"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, Flower, Reveal } from "./ui";

type Page = {
  chapter: string;
  title: string;
  hand: string;
  body: string;
  doodle: "pencil" | "gears" | "spark" | "chart" | "ship" | "seed";
  tint: string;
};

const PAGES: Page[] = [
  {
    chapter: "01",
    title: "Artist",
    hand: "before anything else, I drew.",
    body: "School notebooks with more faces in the margins than notes on the page. Nobody taught me composition — I learned it by staring at things until I understood why they worked. That habit never left.",
    doodle: "pencil",
    tint: "#FFD6E8",
  },
  {
    chapter: "02",
    title: "Engineering Student",
    hand: "VTU. eight-point-three.",
    body: "Computer Science with the AI & ML specialisation at Vijaya Vittala Institute of Technology. Four years learning that a system is just a composition you can run. Also: Technical Events Lead, 20+ volunteers, 300+ participants.",
    doodle: "gears",
    tint: "#DCCBFF",
  },
  {
    chapter: "03",
    title: "AI Enthusiast",
    hand: "the moment it clicked.",
    body: "MindMatrix, Kotlin, Google AI Studio, Cloud Labs. Generative AI stopped being a lecture topic and became something I could put my hands on. Rated Excellent — but the rating mattered less than the switch flipping.",
    doodle: "spark",
    tint: "#CFE8FF",
  },
  {
    chapter: "04",
    title: "Data Analyst",
    hand: "make it readable, then make it true.",
    body: "Python, SQL, Advanced Excel, Power BI, Tableau. Pivot tables and Power Query at one end; Holt-Winters and gradient boosting at the other. The unglamorous cleaning work is where the trust comes from.",
    doodle: "chart",
    tint: "#CFF5E7",
  },
  {
    chapter: "05",
    title: "AI Developer",
    hand: "shipping, not sketching.",
    body: "At RK Developers: two Android apps, two company websites, internal dashboards, LLM features in production. Full-time, full ownership — UI design through deployment. Four of my projects are live and in use today.",
    doodle: "ship",
    tint: "#FFD8BE",
  },
  {
    chapter: "06",
    title: "Future Innovator",
    hand: "the page still being drawn.",
    body: "Looking for a team that treats creative instinct as an engineering asset. Where the person training the model is also allowed to care what it looks like — because I have never been able to do one without the other.",
    doodle: "seed",
    tint: "#F8C8DC",
  },
];

function Doodle({ kind, tint }: { kind: Page["doodle"]; tint: string }) {
  const stroke = "#6D6D6D";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const draw = (d: string, i: number) => (
    <motion.path
      key={d}
      d={d}
      {...common}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.72 }}
      transition={{ duration: 1.1, delay: 0.15 + i * 0.16, ease: "easeInOut" }}
    />
  );

  const sets: Record<Page["doodle"], string[]> = {
    pencil: ["M18 74 L58 24 L70 34 L30 84 L14 88 Z", "M58 24 L70 34", "M20 80 L24 84"],
    gears: ["M40 40 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0", "M40 18 v-8 M40 62 v8 M18 40 h-8 M62 40 h8", "M66 68 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0"],
    spark: ["M44 12 L52 40 L80 48 L52 56 L44 84 L36 56 L8 48 L36 40 Z", "M74 14 L77 22 L85 25 L77 28 L74 36 L71 28 L63 25 L71 22 Z"],
    chart: ["M14 84 V16", "M14 84 H86", "M22 70 L38 50 L52 60 L70 26", "M22 70 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0", "M70 26 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0"],
    ship: ["M18 62 H78 L68 82 H28 Z", "M48 62 V18", "M48 22 L74 36 L48 46 Z", "M12 86 q12 -6 24 0 t24 0 t24 0"],
    seed: ["M50 84 V52", "M50 52 C34 48 28 34 34 22 C48 24 54 38 50 52", "M50 52 C66 46 72 32 66 20 C52 24 46 38 50 52", "M34 86 q16 -8 32 0"],
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full blur-2xl opacity-60" style={{ background: tint }} />
      <svg viewBox="0 0 100 100" className="relative h-[clamp(110px,20vw,180px)] w-[clamp(110px,20vw,180px)]">
        {sets[kind].map(draw)}
      </svg>
    </div>
  );
}

export default function About() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const page = PAGES[i];

  const go = (next: number) => {
    setDir(next > i ? 1 : -1);
    setI((next + PAGES.length) % PAGES.length);
  };

  return (
    <section id="about" className="section relative z-10">
      <SectionHead
        eyebrow="Chapter one"
        title="A sketchbook, opened"
        sub="Six pages, in order. Flip them yourself — the handwriting is the honest part."
      />

      <div className="mx-auto mt-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1600 }}
          className="animate-floaty"
        >
          <div className="relative overflow-hidden rounded-[2rem] glass shadow-lift" data-cursor="card">
            {/* the spine */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-8 -translate-x-1/2 md:block"
              style={{ background: "linear-gradient(90deg,transparent,rgba(180,150,170,0.16),transparent)" }}
            />

            <div className="grid gap-0 md:grid-cols-2">
              {/* left leaf — the drawing */}
              <div className="relative flex flex-col items-center justify-center gap-6 border-b border-white/60 px-8 py-14 md:border-b-0 md:border-r">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`d-${i}`}
                    initial={{ opacity: 0, scale: 0.85, rotate: dir * -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: dir * 6 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Doodle kind={page.doodle} tint={page.tint} />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`h-${i}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="text-center font-hand text-[clamp(1.3rem,3.4vw,1.9rem)] text-ink2"
                  >
                    “{page.hand}”
                  </motion.p>
                </AnimatePresence>

                {/* flowers bloom around the important moment */}
                {[
                  { x: 12, y: 18 },
                  { x: 82, y: 26 },
                  { x: 20, y: 78 },
                  { x: 88, y: 72 },
                ].map((f, k) => (
                  <motion.span
                    key={`${i}-${k}`}
                    className="pointer-events-none absolute"
                    style={{ left: `${f.x}%`, top: `${f.y}%` }}
                    initial={{ scale: 0, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 0.85, rotate: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + k * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <Flower size={14 + k * 3} color={page.tint} />
                  </motion.span>
                ))}
              </div>

              {/* right leaf — the writing, flipping */}
              <div className="relative min-h-[24rem] px-8 py-12 sm:px-12" style={{ transformStyle: "preserve-3d" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`p-${i}`}
                    initial={{ rotateY: dir * 78, opacity: 0, x: dir * 30 }}
                    animate={{ rotateY: 0, opacity: 1, x: 0 }}
                    exit={{ rotateY: dir * -78, opacity: 0, x: dir * -30 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
                  >
                    <span className="eyebrow text-pink-dusty">page {page.chapter}</span>
                    <h3 className="h-display mt-3 text-[clamp(1.8rem,4.4vw,2.9rem)] text-ink">{page.title}</h3>
                    <div className="mt-5 h-px w-16" style={{ background: page.tint }} />
                    <p className="mt-6 text-[1.02rem] leading-[1.85] text-ink2">{page.body}</p>
                  </motion.div>
                </AnimatePresence>

                {/* ruled lines, faint */}
                <div
                  className="pointer-events-none absolute inset-x-8 bottom-24 top-40 -z-10 opacity-25 sm:inset-x-12"
                  style={{ backgroundImage: "repeating-linear-gradient(transparent 0 30px, #F8C8DC 30px 31px)" }}
                />

                {/* page controls */}
                <div className="absolute inset-x-8 bottom-8 flex items-center justify-between sm:inset-x-12">
                  <div className="flex gap-1.5">
                    {PAGES.map((p, k) => (
                      <button
                        key={p.chapter}
                        type="button"
                        onClick={() => go(k)}
                        aria-label={`Go to page ${p.chapter}: ${p.title}`}
                        className="h-2 rounded-full transition-all duration-500 ease-silk"
                        style={{ width: k === i ? 26 : 8, background: k === i ? p.tint : "rgba(109,109,109,0.22)" }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => go(i - 1)}
                      aria-label="Previous page"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink shadow-soft transition-transform duration-300 hover:scale-110"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => go(i + 1)}
                      aria-label="Next page"
                      className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white shadow-lift transition-transform duration-300 hover:scale-110"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[0.95rem] leading-relaxed text-ink2">
            Artist → Engineering Student → AI Enthusiast → Data Analyst → AI Developer → Future Innovator.
            <span className="mt-2 block font-hand text-lg text-pink-dusty">Same person, six drafts.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
