"use client";

import { useEffect, useRef, useState } from "react";

type Trail = { id: number; x: number; y: number; kind: "spark" | "petal"; r: number };

/**
 * A tiny glowing flower that replaces the pointer.
 * Blooms on buttons, glows on cards, drops petals and sparkles as it moves.
 * Disabled entirely on coarse pointers and under prefers-reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState<"none" | "button" | "card">("none");
  const [down, setDown] = useState(false);
  const [trail, setTrail] = useState<Trail[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let last = { x: pos.x, y: pos.y };
    let id = 0;
    let lastEmit = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const t = e.timeStamp;
      const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (dist > 26 && t - lastEmit > 55) {
        lastEmit = t;
        last = { x: pos.x, y: pos.y };
        const kind: Trail["kind"] = id % 3 === 0 ? "petal" : "spark";
        const item: Trail = {
          id: id++,
          x: pos.x + (Math.random() - 0.5) * 16,
          y: pos.y + (Math.random() - 0.5) * 16,
          kind,
          r: Math.random() * 360,
        };
        setTrail((prev) => [...prev.slice(-16), item]);
        window.setTimeout(() => setTrail((prev) => prev.filter((p) => p.id !== item.id)), 1100);
      }

      const el = e.target as HTMLElement | null;
      if (el?.closest("a,button,[data-cursor='button']")) setHover("button");
      else if (el?.closest("[data-cursor='card']")) setHover("card");
      else setHover("none");
    };

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px,${ring.y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const petalScale = hover === "button" ? 1.75 : hover === "card" ? 1.28 : 1;
  const spread = hover === "button" ? 9.5 : 6.4;

  return (
    <>
      {/* trailing sparkles + petals */}
      <div className="pointer-events-none fixed inset-0 z-[150]" aria-hidden>
        {trail.map((t) => (
          <span
            key={t.id}
            className="absolute"
            style={{
              left: t.x,
              top: t.y,
              transform: `translate(-50%,-50%) rotate(${t.r}deg)`,
              animation: t.kind === "petal" ? "cursor-petal 1.1s ease-out forwards" : "cursor-spark 1.1s ease-out forwards",
            }}
          >
            {t.kind === "petal" ? (
              <svg width="11" height="11" viewBox="0 0 12 12">
                <path d="M6 0C8.5 3 9 6.5 6 12 3 6.5 3.5 3 6 0Z" fill="#F8C8DC" />
              </svg>
            ) : (
              <svg width="9" height="9" viewBox="0 0 12 12">
                <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" fill="#DCCBFF" />
              </svg>
            )}
          </span>
        ))}
      </div>

      {/* soft glow ring, lagging behind */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[151] rounded-full transition-[width,height,opacity] duration-500 ease-silk"
        aria-hidden
        style={{
          width: hover === "none" ? 34 : 62,
          height: hover === "none" ? 34 : 62,
          background:
            hover === "card"
              ? "radial-gradient(circle, rgba(220,203,255,0.55), rgba(220,203,255,0) 70%)"
              : "radial-gradient(circle, rgba(248,200,220,0.5), rgba(248,200,220,0) 70%)",
        }}
      />

      {/* the flower itself */}
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[152]" aria-hidden>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          className="transition-transform duration-500 ease-silk"
          style={{ transform: `scale(${down ? petalScale * 0.82 : petalScale}) rotate(${hover === "button" ? 36 : 0}deg)` }}
        >
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="15"
              cy={15 - spread}
              rx="3.4"
              ry={spread * 0.86}
              fill={hover === "card" ? "#DCCBFF" : "#F7AFC9"}
              opacity={0.92}
              transform={`rotate(${a} 15 15)`}
              style={{ transition: "all .5s cubic-bezier(0.22,1,0.36,1)" }}
            />
          ))}
          <circle cx="15" cy="15" r="2.4" fill="#FFD8BE" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes cursor-spark {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2) translateY(-14px); }
        }
        @keyframes cursor-petal {
          0% { opacity: 0.95; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translate(-50%, 40px) scale(0.7) rotate(220deg); }
        }
      `}</style>
    </>
  );
}
