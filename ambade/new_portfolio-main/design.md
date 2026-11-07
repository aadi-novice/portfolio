# Design: Aadi.dev portfolio

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Index-First (the home hero is the index of work and writing)
- Theme: Editorial (catalog)
- Axes: light/display-condensed/chromatic-green · posture: restrained

## Tokens
`src/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(97% 0.007 86);  --color-paper-2: oklch(94% 0.010 86);  --color-paper-3: oklch(91% 0.012 84);
  --color-ink: oklch(16% 0.012 280);  --color-ink-2: oklch(29% 0.011 280);  --color-muted: oklch(48% 0.010 75);  --color-rule: oklch(85% 0.009 85);  --color-rule-2: oklch(64% 0.010 80);
  --color-accent: oklch(49% 0.130 152);  --color-accent-ink: oklch(98% 0.005 88);  --color-focus: oklch(52% 0.135 152);
  --font-display: "Bricolage Grotesque", ui-sans-serif, sans-serif;  --font-body: "Source Serif 4", ui-serif, Georgia, serif;
  --radius-card: 0;  --radius-pill: 0;  --rule-hair: 1px;  --rule-heavy: 4px;  --shadow-card: none;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `src/tokens.css`. Page compositions live in `src/site.css` (imported into the components layer, so Tailwind utilities on the Admin screen still win there).

## Type
- Heads: Bricolage Grotesque 800 at `"wdth" 75, "opsz" 96`, sentence case, roman, one weight and one colour.
- Reading text and standfirsts: Source Serif 4 400, 18px body, ink-2.
- Labels, nav, captions, controls: Bricolage Grotesque 500 at `"wdth" 100, "opsz" 12`, a step smaller, sentence case, untracked. No mono, no tracked capitals.

## Controls
- Primary: ink fill, paper text, square, 48px (`.btn`)
- Secondary: 1px ink outline, transparent, same radius and height (`.btn--quiet`); text links carry a hairline underline that turns green on hover (`.link`)
- Inputs: square, 52px, 1px muted border, focus is an inset green outline

## Surfaces
- A 4px ink rule opens a section (`.opens`); 1px hairlines part rows. Nothing boxed, nothing shadowed.
- Bands: one paper-2 well (`.band--well`) and one ink band (`.band--ink`) a page at most.
- Photographs: the owner's own (Sanity covers, the portrait), square-cornered, an 8% ink outline.

## Motion
- Character: still. State only (a link underline, a button darkening); no reveals; under reduced motion everything ends at once.

## Exports
`src/tokens.css` (Tailwind 4 `@theme static` plus `:root`). shadcn/ui variables are mapped onto these tokens in `src/index.css` (export-formats.md § shadcn/ui).
