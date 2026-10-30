// Small WCAG contrast helpers. The site uses a different accent colour per calculator
// (NI green, overtime orange, vehicle-tax amber...) for stat cards and share buttons, and
// plenty of those raw brand colours don't actually have enough contrast against the pale
// tinted backgrounds or white button fills they're used on. Rather than hand-picking a
// darker shade for every one of the ~19 colours (and re-checking it by hand every time a
// new tool is added), these two functions work out just enough correction at render time.

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function relLuminance([r, g, b]: [number, number, number]): number {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relLuminance(hexToRgb(hex1));
  const l2 = relLuminance(hexToRgb(hex2));
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

/** `pct`% of `hex`, blended with `(100 - pct)`% of `toward` (white by default) — mirrors the
 *  site's own `color-mix(in srgb, ${hex} ${pct}%, var(--surface))` tint() helper in light mode. */
function mix(hex: string, pct: number, toward: [number, number, number] = [255, 255, 255]): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  const f = pct / 100;
  return [r * f + toward[0] * (1 - f), g * f + toward[1] * (1 - f), b * f + toward[2] * (1 - f)];
}

/** What % of `hex` (the rest blended toward `toward`) is needed to reach `target` contrast
 *  against `bg`. Floors rather than rounds, so the CSS percentage we hand back never shaves
 *  off the last fraction of a point of correction the binary search found was necessary. */
function keepPercent(hex: string, bg: string, target: number, toward: [number, number, number] = [0, 0, 0]): number {
  if (contrastRatio(hex, bg) >= target) return 100;
  let lo = 0, hi = 100; // percentage of `hex` kept, rest blended toward `toward`
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const [cr, cg, cb] = mix(hex, mid, toward);
    const candidate = rgbToHex(cr, cg, cb);
    if (contrastRatio(candidate, bg) >= target) lo = mid; else hi = mid;
  }
  return Math.max(0, Math.floor(lo) - 1);
}

/** Darkening percentage (of `hex`, kept toward black) needed so white text at `opacity`
 *  still clears `target` contrast against the resulting background. */
function keepPercentForOpacity(hex: string, target: number, opacity: number): number {
  if (opacity >= 1) return keepPercent(hex, "#ffffff", target);
  let lo = 0, hi = 100; // percentage of `hex` kept, rest toward black
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const [cr, cg, cb] = mix(hex, mid, [0, 0, 0]);
    const candidateBg = rgbToHex(cr, cg, cb);
    const [er, eg, eb] = mix("#ffffff", opacity * 100, [cr, cg, cb]);
    const effectiveText = rgbToHex(er, eg, eb);
    if (contrastRatio(effectiveText, candidateBg) >= target) lo = mid; else hi = mid;
  }
  return Math.max(0, Math.floor(lo) - 1);
}

/**
 * For brand-coloured text sitting on a pale, theme-aware tinted background (e.g. StatCard's
 * `tint(color, 8)`, which resolves to a near-white background in light mode and a near-black
 * one in dark mode via `var(--surface)`). Checks against the *actual* resolved tint colour
 * (not a bare white guess — an 8% tint is noticeably darker than pure white for some hues,
 * which is exactly why some colours were still failing by a hair after the first pass of this
 * fix). Returns the colour unchanged if it already clears `target`; otherwise returns a
 * `color-mix(...)` string blending it toward `var(--text)` by enough to clear that bar in
 * light mode. Mixing toward `var(--text)` rather than a hardcoded black means the same rule
 * also pulls the colour toward near-white in dark mode, which is the correct direction there.
 */
// Light mode's --text (app/globals.css) — the actual colour `var(--text)` resolves to, used
// here so the binary search darkens by exactly as much as the real color-mix() will.
const TEXT_LIGHT: [number, number, number] = [0x10, 0x23, 0x1a];

export function accessibleText(hex: string, target = 4.5, tintPct = 8): string {
  const [tr, tg, tb] = mix(hex, tintPct);
  const bg = rgbToHex(tr, tg, tb);
  const pct = keepPercent(hex, bg, target, TEXT_LIGHT);
  if (pct >= 100) return hex;
  return `color-mix(in srgb, ${hex} ${pct}%, var(--text))`;
}

/**
 * For a fixed (non-theme-reactive) background colour that white text sits on, such as a
 * share/export button. Darkens toward black just enough that white text clears `target`
 * contrast. Unlike `accessibleText`, this returns a plain hex, since the button's own
 * background isn't theme-reactive in the first place. Pass `textOpacity` for a subtitle
 * line rendered at e.g. 90% opacity (Tailwind's `opacity-90`), since that dims the
 * effective text colour and needs a bit more headroom than full-opacity white would.
 */
export function accessibleBg(hex: string, target = 4.5, textOpacity = 1): string {
  const pct = keepPercentForOpacity(hex, target, textOpacity);
  if (pct >= 100) return hex;
  const [r, g, b] = hexToRgb(hex);
  const dark = pct / 100;
  return rgbToHex(r * dark, g * dark, b * dark);
}
