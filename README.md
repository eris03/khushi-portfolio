# Khushi Yadav — an interactive digital exhibition

A portfolio built as a storybook rather than a resume. Next.js 14 (App Router), TypeScript,
Tailwind, Framer Motion, GSAP + Lenis smooth scrolling.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

Node 18.17+ required.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo.
3. Framework preset auto-detects **Next.js**. No env vars needed. Deploy.

Or from the terminal: `npx vercel` (then `npx vercel --prod`).

---

## The rooms

| Section | What happens |
| --- | --- |
| **Preloader** | A watercolour brush paints the letter **K**, the strokes turn into AI circuitry, flowers bloom around it. *Building Creativity → Loading Intelligence → Loading Experiences → Welcome.* |
| **Cursor** | The native pointer is replaced by a small glowing flower that drops petals and sparkles, blooms over buttons and glows over cards. |
| **Atmosphere** | A fixed sky behind everything: liquid gradient blobs, drifting clouds, cherry blossom, sparkle dust, butterflies, paper grain. |
| **Hero** | Your animated illustration on a sketchbook page, tilting toward the cursor, with ideas (Python, Neural Networks, Prompt Engineering…) lifting off it and a neural sketch drawing itself in. |
| **About** | A floating sketchbook with six flippable pages — Artist → Engineering Student → AI Enthusiast → Data Analyst → AI Developer → Future Innovator. Handwritten notes, animated doodles, flowers blooming on each page. |
| **Timeline** | Floating islands with waterfalls and trees, joined by a dashed cloud path that draws itself as you scroll. Birds cross the section. Hover an island to open the memory. |
| **Skills** | A galaxy: you're the sun, sixteen skills orbit on three rings, each with its own dust ring. Hover a planet — the galaxy pauses and the panel shows confidence, years, and where that skill was actually used. |
| **Projects** | An art gallery. Each project is a framed painting that starts moving on hover (forecast chart draws + flags its anomaly, movie posters slide, chatbot types, GPS pins pulse). Click for a full storytelling modal: problem, what I built, the hard part, where it landed, stack, GitHub. |
| **Art × AI** | Two worlds in one frame with a divider that follows your cursor. Watercolour on the left, circuitry and a live neural net on the right. |
| **Experience** | A metro line with a little train that moves down the track as you scroll. Stations: MindMatrix → RK Developers → Next. |
| **Certifications** | A pastel wall of pinned certificates. Click one to flip it; the back says what it actually taught you. |
| **Achievements** | Glass trophies that glow and throw confetti on hover, each revealing its story. |
| **Contact** | The sky turns to night — moon, stars, fireflies. Press send and your note becomes a paper plane that flies off with a sparkle trail, then opens your mail client. |
| **Footer** | A moonlit landscape with hanging lanterns and falling blossom. Optional synthesised ambient piano, **off by default**, with a visible toggle. |

## Structure

```
app/
  layout.tsx        metadata, fonts, global styles
  page.tsx          composes every section
  globals.css       palette, typography, keyframes, reduced-motion
components/
  Preloader  Cursor  SmoothScroll  Atmosphere  Progress  Nav
  Hero  About  Timeline  Skills  Projects  ProjectArt
  ArtAI  Experience  Certifications  Achievements  Contact  Footer
  ui.tsx            SectionHead, Magnetic, Tilt, Reveal, Flower
lib/
  data.ts           all resume content — edit here, the site follows
  rng.ts            seeded randomness (no hydration mismatch)
public/
  avatar.mp4        your animated illustration
```

**All copy lives in `lib/data.ts`.** Changing a project, a date, a skill level or a
certificate means editing that one file — nothing in the components is hardcoded.

## Palette

`#FFF8F6` canvas · `#FFFDFD` canvas2 · `#F8C8DC` soft pink · `#FFD6E8` cotton candy ·
`#F7AFC9` rose quartz · `#F4A7C5` dusty pink · `#DCCBFF` lavender · `#FFD8BE` peach ·
`#CFE8FF` baby blue · `#CFF5E7` mint · `#343434` ink · `#6D6D6D` ink2

Type: **Clash Display** (headings) · **General Sans** (subheads/UI) · **Inter** (body) ·
**Caveat** (handwriting). Loaded from Fontshare and Google Fonts via CSS — no build-time
font fetch, so the build works offline.

## Performance & accessibility

- Animations are transform/opacity only and GPU-composited; heavy per-project animation
  is gated behind `alive` so an idle gallery costs nothing.
- Particle positions come from a seeded PRNG, so SSR and client markup match exactly.
- `prefers-reduced-motion` is respected globally: Lenis is skipped, the preloader shortens,
  and all decorative motion stops.
- The custom cursor only engages on fine pointers — touch devices keep native behaviour.
- Semantic landmarks, real `<button>`/`<a>` elements, `aria-label`/`aria-expanded`,
  visible focus rings, and full keyboard navigation.
- Ambient audio never autoplays.

## Notes

- The contact form has no backend by design — it composes a `mailto:` so nothing is stored
  and nothing can silently fail. Swap in Formspree or a Next route handler if you'd rather
  collect submissions.
- `avatar.mp4` is knocked out of its white background with `mix-blend-mode: multiply`
  (`.avatar-blend` in `globals.css`), which is why it sits on the pastel page rather than
  in a white box. Replacing it with a transparent WebM would also work — drop the class.
- Add live demo URLs by setting `live:` on any project in `lib/data.ts`; the button appears
  automatically.

© 2026 Khushi Yadav · Bengaluru, India
