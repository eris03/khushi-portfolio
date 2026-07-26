"use client";

import { useEffect, useState } from "react";
import { seeded, range } from "@/lib/rng";

const rand = seeded(20260726);
const petals = range(26).map((i) => ({
  i,
  left: rand() * 100,
  delay: -rand() * 26,
  dur: 16 + rand() * 18,
  size: 8 + rand() * 12,
  drift: (rand() - 0.5) * 20,
  hue: ["#F8C8DC", "#FFD6E8", "#F7AFC9", "#FFD8BE"][Math.floor(rand() * 4)],
  spin: rand() * 360,
  op: 0.35 + rand() * 0.45,
}));

const sparkles = range(34).map(() => ({
  left: rand() * 100,
  top: rand() * 100,
  dur: 3 + rand() * 5,
  delay: -rand() * 8,
  size: 2 + rand() * 3,
}));

const butterflies = range(4).map((i) => ({
  i,
  left: 8 + rand() * 70,
  top: 12 + rand() * 66,
  dur: 34 + rand() * 22,
  delay: -rand() * 20,
  scale: 0.55 + rand() * 0.5,
  hue: ["#DCCBFF", "#F7AFC9", "#CFE8FF", "#FFD8BE"][i % 4],
}));

function Butterfly({ hue }: { hue: string }) {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" style={{ overflow: "visible" }}>
      <g style={{ transformOrigin: "13px 11px", animation: "wingL .28s ease-in-out infinite" }}>
        <path d="M13 11 C7 1, 0 3, 2 9 C3.4 13.6, 9 13, 13 11 Z" fill={hue} opacity="0.85" />
        <path d="M13 11 C8 15, 3 18, 3.4 13.6 C4 11, 9.6 10.4, 13 11 Z" fill={hue} opacity="0.6" />
      </g>
      <g style={{ transformOrigin: "13px 11px", animation: "wingR .28s ease-in-out infinite" }}>
        <path d="M13 11 C19 1, 26 3, 24 9 C22.6 13.6, 17 13, 13 11 Z" fill={hue} opacity="0.85" />
        <path d="M13 11 C18 15, 23 18, 22.6 13.6 C22 11, 16.4 10.4, 13 11 Z" fill={hue} opacity="0.6" />
      </g>
      <ellipse cx="13" cy="11" rx="1.1" ry="4.4" fill="#6D6D6D" opacity="0.5" />
    </svg>
  );
}

/**
 * The sky the whole site sits inside: liquid gradient blobs, drifting clouds,
 * cherry blossom, sparkle dust and a few butterflies. Everything is decorative,
 * fixed-position, and pointer-events-none.
 */
export default function Atmosphere() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* base wash */}
      <div className="absolute inset-0 bg-canvas" />

      {/* liquid gradient blobs */}
      <div
        className="absolute -left-[18vw] top-[-12vh] h-[62vw] w-[62vw] rounded-full opacity-[0.55] blur-[90px] animate-drift"
        style={{ background: "radial-gradient(circle at 35% 35%, #FFD6E8, transparent 68%)" }}
      />
      <div
        className="absolute right-[-16vw] top-[8vh] h-[56vw] w-[56vw] rounded-full opacity-50 blur-[100px] animate-drift"
        style={{ background: "radial-gradient(circle at 60% 40%, #DCCBFF, transparent 68%)", animationDelay: "-9s" }}
      />
      <div
        className="absolute left-[16vw] top-[52vh] h-[48vw] w-[48vw] rounded-full opacity-45 blur-[100px] animate-drift"
        style={{ background: "radial-gradient(circle at 45% 55%, #CFE8FF, transparent 68%)", animationDelay: "-16s" }}
      />
      <div
        className="absolute right-[8vw] bottom-[-14vh] h-[50vw] w-[50vw] rounded-full opacity-40 blur-[100px] animate-drift"
        style={{ background: "radial-gradient(circle at 50% 50%, #CFF5E7, transparent 68%)", animationDelay: "-22s" }}
      />

      {/* soft clouds */}
      <svg className="absolute inset-x-0 top-[6vh] w-full opacity-70" viewBox="0 0 1200 240" preserveAspectRatio="none">
        <defs>
          <filter id="cloud-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <g filter="url(#cloud-blur)" fill="#FFFDFD">
          <ellipse cx="200" cy="110" rx="180" ry="52">
            {!reduce && <animate attributeName="cx" values="200;280;200" dur="46s" repeatCount="indefinite" />}
          </ellipse>
          <ellipse cx="640" cy="70" rx="150" ry="42" opacity="0.85">
            {!reduce && <animate attributeName="cx" values="640;560;640" dur="58s" repeatCount="indefinite" />}
          </ellipse>
          <ellipse cx="1010" cy="140" rx="200" ry="56" opacity="0.9">
            {!reduce && <animate attributeName="cx" values="1010;930;1010" dur="52s" repeatCount="indefinite" />}
          </ellipse>
        </g>
      </svg>

      {/* paper / watercolour grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.055] mix-blend-multiply">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {!reduce && (
        <>
          {/* sparkle dust */}
          {sparkles.map((s, i) => (
            <span
              key={`s${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                boxShadow: "0 0 8px rgba(255,255,255,0.9)",
                animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}

          {/* cherry blossom */}
          {petals.map((p) => (
            <svg
              key={`p${p.i}`}
              className="absolute top-0"
              width={p.size}
              height={p.size}
              viewBox="0 0 12 12"
              style={
                {
                  left: `${p.left}%`,
                  opacity: p.op,
                  "--drift": `${p.drift}vw`,
                  animation: `fall ${p.dur}s linear ${p.delay}s infinite`,
                } as React.CSSProperties
              }
            >
              <path d="M6 0C8.6 3 9.2 6.6 6 12 2.8 6.6 3.4 3 6 0Z" fill={p.hue} transform={`rotate(${p.spin} 6 6)`} />
            </svg>
          ))}

          {/* butterflies */}
          {butterflies.map((b) => (
            <div
              key={`b${b.i}`}
              className="absolute"
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                transform: `scale(${b.scale})`,
                animation: `flutter ${b.dur}s ease-in-out ${b.delay}s infinite`,
                opacity: 0.75,
              }}
            >
              <Butterfly hue={b.hue} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
