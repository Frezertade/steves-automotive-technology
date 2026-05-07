# Steve's Automotive Technology DESIGN.md

## Style Prompt
Premium Hybrid-Tech Garage: a cinematic automotive diagnostic lab for Lancaster's hybrid battery specialists. The brand should feel precise, trustworthy, engineered, and local — closer to BMW service technology than a generic repair-shop template.

## Design Principles
1. Specialist first: every visual should reinforce hybrid batteries, diagnostics, electrical systems, and advanced repair.
2. Premium but practical: high-end enough to justify expertise, still clear enough for local customers who need a fast repair.
3. Conversion clarity: Call and Book Appointment must remain obvious on every key viewport.
4. Performance matters: use pre-rendered video for the hero instead of heavy live WebGL. Always provide poster image and reduced-motion fallback.
5. Trust over gimmicks: motion should support confidence, not distract from service details.

## Color Tokens

### Core Surfaces
- Carbon Black: #05070A — primary cinematic background.
- Graphite: #0B1120 — section background / nav surface.
- Steel Slate: #172033 — elevated cards and panels.
- Cool Mist: #EAF7F8 — light section background.
- Pure White: #FFFFFF — primary text on dark.

### Brand Accents
- Electric Teal: #10F5D4 — primary technology accent, battery glow, CTA highlights.
- Diagnostic Blue: #38BDF8 — secondary scan/HUD accent.
- Service Amber: #F59E0B — urgency, offers, warnings, select highlights.
- Success Green: #22C55E — confirmations and trust signals.

### Text
- Ink: #07111F — primary text on light.
- Slate Text: #334155 — secondary text on light.
- Muted Steel: #94A3B8 — secondary text on dark.
- Frost: #D8F3F1 — body text on dark.

## Typography
- Primary UI font: Inter or system sans-serif.
- Display style: tight, engineered, uppercase micro-labels with tracking for badges and metadata.
- Hero headlines: large, bold, compressed line-height, maximum 2-3 lines.
- Body copy: readable, calm, no tiny low-contrast text.

## Layout
- Max content width: 1280px.
- Hero: full viewport minimum height, split composition on desktop.
- Desktop hero ratio: 52% copy / 48% cinematic video module.
- Mobile hero: text first, video panel below, no autoplay dependency for comprehension.
- Section spacing: 72px mobile, 96px desktop.
- Cards: glass/steel panels on dark; clean white cards on light sections.

## Shape & Elevation
- Buttons: 14-18px radius, high contrast, strong hover lift.
- Premium panels: 24-32px radius with subtle border and inner glow.
- Avoid overly playful pill-heavy SaaS styling except for small trust badges.
- Shadows should feel like light spill / glow, not generic gray drop-shadows.

## Motion
- Hero video: seamless 8-12 second loop, muted, playsInline, poster fallback.
- Motion vocabulary: diagnostic scan lines, energy pulses, precision parallax, soft light sweeps.
- Avoid fast spinning, chaotic particles, or anything that competes with the CTA.
- Honor prefers-reduced-motion: pause/replace decorative animation when possible.

## Components

### Hero
- Message: Hybrid Battery Repair Without Dealership Prices.
- Proof: Trusted since 2007, Lancaster & Millersville, hybrid specialists.
- CTA 1: Call (717) 330-0041.
- CTA 2: Book Hybrid Diagnostic.
- Visual: pre-rendered 3D-style hybrid battery diagnostic animation.

### Navigation
- Dark glass surface over hero.
- Sticky, high contrast.
- Primary CTA should remain visible.

### Service Cards
- Lead with hybrid battery repair.
- Use sharper icon containers and diagnostic-style accents.
- Include concrete benefits: diagnostics, reconditioning, cell replacement, warranty.

### Trust Sections
- Keep local proof and technician credibility.
- Use stats as premium instrumentation panels, not generic counters.

## Accessibility
- Text contrast must meet WCAG AA.
- CTAs must be keyboard-visible.
- Video must be decorative with aria-hidden when used as a background.
- Do not rely on motion/video to communicate critical service information.

## What Not To Do
- Do not use a generic stock garage background as the primary hero visual.
- Do not make the page feel like a crypto dashboard or gaming UI.
- Do not bury the phone number.
- Do not add heavy live 3D/WebGL unless performance is proven on mobile.
- Do not use still/Ken Burns-style hero media when the direction calls for premium motion.
