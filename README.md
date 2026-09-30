# CIPHER // MITAOE IT Students Executive Council

A bespoke, high-end interactive portal for the Department of Information Technology Student Council at MITAOE. Designed with a collegiate collaborative corkboard aesthetic, featuring modern 3D WebGL, inertia smooth scroll, tactile spring physics, and modular data architecture.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 + Vite + TypeScript (Chosen for maximum ease of maintenance and extensibility)
- **Styling**: Tailwind CSS with custom design tokens from `DESIGN.md`
- **3D Web Experience**: Three.js WebGL with geometric innovation prism and smooth cursor parallax (`/3d-web-experience`)
- **Animation & Motion**:
  - **Anime.js**: Spring-physics micro-interactions, organic stagger, and SVG draw-ins (`/animejs-animation`)
  - **GSAP + ScrollTrigger**: Scroll-linked 24H timeline tracking and scrubbed reveals
  - **Lenis**: Inertia-based 60+ FPS smooth scroll
- **Design Intelligence & UX**:
  - `ui-ux-pro-max`: Consistent SVG vector icons (no emojis), 44x44px minimum touch targets, accessible contrast, zero layout shifts
  - `angular-ui-patterns`: Component state architecture (active/disabled states, loading indicators, department filter tabs, instant search with empty states, and registration feedback)
- **Audio Feedback**: Web Audio API tactile mechanical audio synthesizer (user toggleable)

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Opens the live development server with Hot Module Replacement (HMR) at `http://localhost:3000` (or `http://localhost:5173`).

### 2. Build for Production
```bash
npm run build
```
Creates an optimized, tree-shaken static production build in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```
Runs a local preview of the production build at `http://localhost:5173/`.

---

## 📝 How to Modify & Add Content Easily

All dynamic content is cleanly isolated in `src/data/`:

### Adding or Modifying Council Members
Open [`src/data/council.ts`](./src/data/council.ts):
```typescript
{
  id: 'op-10',
  code: 'AI-01',
  name: 'New Member Name',
  role: 'AI & RESEARCH LEAD',
  departmentCategory: 'tech', // 'exec' | 'tech' | 'ops' | 'design'
  status: 'PYTORCH_CUDA',
  quote: '"Training models while you sleep."',
  tilt: -1.5,
  tapeColor: 'yellow', // 'yellow' | 'pink' | 'lime'
  pinColor: '#C6FF3D'
}
```

### Adding or Modifying Events
Open [`src/data/events.ts`](./src/data/events.ts) to update the 24-Hour Velora Hackathon timeline milestones or add new workshops/symposiums.

### Adding or Modifying FAQs
Open [`src/data/faq.ts`](./src/data/faq.ts) to add or edit questions, answers, and search keywords.

---

## 🎨 Design System Adherence

- **Canvas Ground**: `#0A0E17`
- **Surface Dark**: `#121826`
- **Paper Corkboard**: `#F3EFE3`
- **Primary Signal (Acid Lime)**: `#C6FF3D`
- **Secondary Accent (Hot Pink)**: `#FF4FA3`
- **Washi Tape Yellow**: `#FFD84D`
- **Muted Ash**: `#A8AFC0`
- **Typography**: Space Grotesk (Headlines), Inter (Body), JetBrains Mono (Code/Metadata), Caveat (Handwritten marginalia)
- **Shadows**: Hard-offset only (`4px 4px 0px #000000`, `8px 8px 0px #000000`), zero soft blurs
