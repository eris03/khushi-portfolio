/**
 * Deterministic pseudo-random generator.
 * Used everywhere particles are laid out so the server render and the client
 * render agree exactly — no hydration mismatch, no flicker.
 */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
