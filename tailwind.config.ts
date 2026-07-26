import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FFF8F6",
        canvas2: "#FFFDFD",
        pink: {
          soft: "#F8C8DC",
          candy: "#FFD6E8",
          quartz: "#F7AFC9",
          dusty: "#F4A7C5",
        },
        lavender: "#DCCBFF",
        peach: "#FFD8BE",
        sky: "#CFE8FF",
        mint: "#CFF5E7",
        ink: "#343434",
        ink2: "#6D6D6D",
        night: "#1E1B2E",
        night2: "#2B2742",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(244,167,197,0.35)",
        lift: "0 30px 80px -30px rgba(120,90,140,0.35)",
        glow: "0 0 60px rgba(248,200,220,0.55)",
      },
      backdropBlur: { xs: "2px" },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
