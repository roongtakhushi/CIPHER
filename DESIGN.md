---
name: Hacker Corkboard
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c3c9ae'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#8d937b'
  outline-variant: '#434934'
  surface-tint: '#a2d801'
  primary: '#ffffff'
  on-primary: '#263500'
  primary-container: '#bdf532'
  on-primary-container: '#516e00'
  inverse-primary: '#4c6700'
  secondary: '#ffb0cc'
  on-secondary: '#640038'
  secondary-container: '#b7046c'
  on-secondary-container: '#ffcbdb'
  tertiary: '#ffffff'
  on-tertiary: '#3b2f00'
  tertiary-container: '#ffe07e'
  on-tertiary-container: '#796200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bdf532'
  primary-fixed-dim: '#a2d801'
  on-primary-fixed: '#141f00'
  on-primary-fixed-variant: '#384e00'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cc'
  on-secondary-fixed: '#3e0021'
  on-secondary-fixed-variant: '#8d0051'
  tertiary-fixed: '#ffe07e'
  tertiary-fixed-dim: '#e9c339'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#564500'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
spacing:
  gutter: 1.5rem
  margin: 2rem
  gutter-mobile: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the intersection of a tactical late-night Linux terminal and a frantic physical evidence corkboard. Tailored for an elite student engineering council orchestrating 24-hour hackathons and shipping production code, the visual direction merges brutalist software utilitarianism with the tactile chaos of student hacker culture.

### Aesthetic Principles
- **Terminal Precision vs. Tangible Chaos:** Crisp, high-contrast monospace metadata and terminal borders anchor the interface, overlaid with skewing index cards, washi tape joints, and handwritten marker marginalia.
- **Physicality in the Digital Workspace:** UI containers alternate between dark console viewports (`#0A0E17`) and high-friction cream index cards (`#F3EFE3`), conveying an investigative, lab-notebook ethos.
- **Electric Accent Signals:** High-saturation acid lime and hot pink function as active operational signals, debugger highlights, and badge accents against deep navy grounds.
- **Irreverence Built on Technical Competence:** Components maintain strict information hierarchy, keyboard accessibility, and legible code structures, punctuated by playful badge overlays, terminal prompts (`$ cipher --run`), and marker callouts.

## Colors

The palette establishes a high-contrast dark environment punctured by physical paper surfaces and electric fluorescent accents.

### Palette Architecture
- **Terminal Base (Ink):** `#0A0E17` serves as the canvas ground and deep background.
- **Dark Surface:** `#121826` forms secondary system containers, code panes, and structural frames.
- **Surface Elevation (Paper):** `#F3EFE3` provides high-contrast index cards, sticky notes, and corkboard placards, using dark ink typography (`#0A0E17`) for deep tactile contrast.
- **Primary Signal (Acid Lime):** `#C6FF3D` is reserved for core primary actions, system status, active execution states, and terminal cursor indicators.
- **Secondary Accent (Hot Pink):** `#FF4FA3` drives badges, security tags, alerts, sticker borders, and critical action states.
- **Tape / Marker Yellow:** `#FFD84D` delivers washi tape anchor straps, highlight markers, and tertiary tags.
- **Ash / Muted Neutral:** `#A8AFC0` provides secondary copy on dark surfaces, border delimiters, and inactive status indicators.

### Application Rules
- Paper-ground elements (`#F3EFE3`) flip foreground typography strictly to `#0A0E17` or deep navy tints; never use lime or yellow text on light paper grounds.
- Acid Lime (`#C6FF3D`) actions always utilize `#0A0E17` for foreground label text to preserve WCAG AAA contrast.
- Hot Pink (`#FF4FA3`) elements take either `#0A0E17` or `#FFFFFF` depending on the surrounding bounding box luminance.

## Typography

The typographic hierarchy establishes clear roles for structure, sustained reading, and computational metadata.

### Type System Roles
- **Display & Headlines (Space Grotesk):** Provides mechanical, proportional punch to major section headings, event identities, and hacker milestone announcements.
- **Reading & Interface Body (Inter):** Ensures legibility across lengthy technical documentation, community guidelines, and narrative context.
- **System, Code & Data (JetBrains Mono):** Drives timestamps, hash digests, hardware stats, tags, commands, buttons, and system status indicators.
- **Marker Doodles (Caveat):** Applied contextually for marginal notes, rotated callouts, arrows, and handwritten hackathon checklist annotations. Hand-drawn annotations must remain non-critical display elements and never replace core interactive text.

## Layout & Spacing

The layout is built on a responsive 12-column grid that accommodates both orderly command consoles and deliberately staggered "corkboard" compositions.

### Layout Mechanics
- **Desktop (1024px+):** 12 columns with a 24px (`1.5rem`) gutter and 32px (`2rem`) outer margin. Maximum canvas constraint is 1320px for primary content.
- **Tablet (768px - 1023px):** 8 columns with a 20px (`1.25rem`) gutter and 24px (`1.5rem`) margin.
- **Mobile (< 768px):** 4 columns with a 16px (`1rem`) gutter and 16px (`1rem`) margin. Index cards drop their desktop rotation and align flush to the active column tracks.

### Staggered Corkboard Alignment
Elements designated as "pinned cards" may offset up to 4px along the X/Y axes or tilt between `-1.5deg` and `+1.5deg` on desktop viewports. To prevent reflow breakages, this rotation is applied strictly via presentation transforms (`transform: rotate()`) inside isolated grid cells, preserving strict container bounds.

## Elevation & Depth

This design system avoids soft diffuse blurs. Depth is conveyed through raw tactile layering, structural offsets, and high-contrast bounding lines.

### Depth Hierarchy
1. **Level 0 (Canvas Core):** `#0A0E17` base canvas with subtle 24px orthogonal dot grid patterns (`#121826` / 40% opacity).
2. **Level 1 (Sub-systems & Consoles):** `#121826` surfaces with 1px solid borders in `#1F293D`.
3. **Level 2 (Tactile Cards & Index Papers):** `#F3EFE3` index cards resting on the terminal grid. Depth is achieved via a hard, non-blurred edge-cast shadow: `4px 4px 0px #000000` (or `4px 4px 0px #C6FF3D` in focused states).
4. **Level 3 (Washi Tape & Sticky Overlays):** `#FFD84D` tape strips and `#FF4FA3` neon labels overlapping edges of Level 2 cards. Rendered with hard 1px outline definitions and a subtle bottom-offset contact shadow (`0 2px 0 #0A0E17`).
5. **Level 4 (Floating Modals & Run-Terminals):** Elevated system shells with 2px solid `#C6FF3D` borders and an aggressive hard offset: `8px 8px 0px #000000`.

## Shapes

The interface embraces a hard-edged, technical silhouette. Elements are predominantly squared (`roundedness: 0`), reflecting index cards, hardware modules, cut-out paper stock, and terminal viewports.

### Silhouette Rules
- **Structural Bounds:** Index cards, code boxes, inputs, and primary action buttons utilize strict 0px radius corners.
- **Washi Tape Anchors:** Rectangular anchors placed across card corners feature subtle asymmetrical jagged or sheared ends (`clip-path: polygon(...)`) to simulate torn paper adhesive.
- **Sticker Badges:** Event tags and council insignia can adopt circular or pill contours (`border-radius: 9999px`) to visually simulate vinyl die-cut stickers placed over rectangular hardware chassis.

## Components

### Buttons
- **Primary (Terminal Action):** Solid `#C6FF3D` background, `#0A0E17` JetBrains Mono bold text, 0px border radius, 12px 24px padding. Hover: Translate `-2px, -2px` with a persistent hard drop shadow (`3px 3px 0px #FF4FA3`).
- **Secondary (Paper Action):** `#F3EFE3` background, `#0A0E17` text, 2px solid `#0A0E17` border. Hover: `translate(-2px, -2px)` with `3px 3px 0px #C6FF3D`.
- **Ghost / Code Action:** Transparent background, 1px solid `#A8AFC0`, text in `#A8AFC0`. Hover: Border and text turn `#C6FF3D`, background shifts to `#121826`.

### Cards & Evidence Boards
- **Index Card (Paper):** Grounded in `#F3EFE3` with `#0A0E17` typography. Displays a simulated tape bar (`#FFD84D`) at top-center overlapping the outer boundary by 10px. Hard shadow: `4px 4px 0px rgba(0, 0, 0, 0.9)`.
- **Terminal Card:** Background `#121826`, 1px solid `#1F293D`, with an integrated top title bar containing terminal dots and a monospaced title: `sys/velora-24h.log`.

### Input Fields
- Monospaced JetBrains Mono layout.
- Dark theme background `#0A0E17` with a 1px solid `#A8AFC0` border.
- Leading prompt symbol `>` in `#C6FF3D`.
- Active focus state: 2px solid `#C6FF3D`, zero outline glow, and a blinking cursor block.

### Badges & Stickers
- **Die-Cut Sticker:** Displayed in `#FF4FA3` background with bold `#0A0E17` monospaced lettering, rotated between `-3deg` and `+3deg`, finished with a 2px solid `#FFFFFF` border.
- **Status Dot:** 8px square in `#C6FF3D` displaying live status (`ONLINE`, `SYNCING`, `TERMINATED`).

### Checkboxes & Radio Selectors
- **Checkbox:** Square box (18x18px), 1.5px solid `#A8AFC0`, background `#121826`. Checked state: Background `#C6FF3D` with an ink-black `X` or checkmark drawn in 2px strokes.
- **Radio Button:** Square-in-square indicator to maintain the brutalist hardware feel; selected state embeds a solid `#FF4FA3` centered block.

### Lists & Activity Feeds
- Log-structured entries with JetBrains Mono timestamps in `#A8AFC0`, divider rules rendered in dashed 1px `#1F293D`, and action identifiers rendered in `#C6FF3D` or `#FF4FA3`.