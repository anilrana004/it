from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "components" / "yatra" / "sacred-yatra.css"
text = p.read_text(encoding="utf-8")

old = """.it-sy {
  --bp-green: #16a34a;
  --bp-green-dark: #15803d;
  --bp-green-deep: #166534;
  --bp-gold: #d4a853;
  --bp-gold-soft: #f5dfa0;
  --bp-ink: #102018;
  --bp-muted: #5b6a62;
  --bp-line: #e4ebe6;
  --bp-bg: #f6f8f6;
  --bp-card: #ffffff;
  color: var(--bp-ink);
  background: var(--bp-bg);
  font-family: var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif;
  padding-bottom: 4rem;
}"""

om_svg = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' "
    "viewBox='0 0 96 96'%3E%3Ctext x='48' y='58' font-size='34' fill='%23ff9933' "
    "fill-opacity='0.08' text-anchor='middle' dominant-baseline='middle' "
    "font-family='Noto Sans Devanagari, Arial Unicode MS, serif'%3E%E0%A5%90%3C/text%3E%3C/svg%3E"
)

new = f""".it-sy {{
  --bp-green: #16a34a;
  --bp-green-dark: #15803d;
  --bp-green-deep: #166534;
  --bp-gold: #d4a853;
  --bp-gold-soft: #f5dfa0;
  --bp-saffron: #ff9933;
  --bp-saffron-soft: #fff4e6;
  --bp-saffron-wash: #ffe8cc;
  --bp-maroon: #7c2d12;
  --bp-ink: #431407;
  --bp-muted: #78716c;
  --bp-line: rgba(255, 153, 51, 0.22);
  --bp-bg: #fff7ed;
  --bp-card: #ffffff;
  position: relative;
  color: var(--bp-ink);
  background:
    linear-gradient(165deg, #fff8f0 0%, var(--bp-saffron-soft) 32%, var(--bp-saffron-wash) 100%);
  font-family: var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif;
  padding-bottom: 4rem;
  overflow-x: clip;
}}

.it-sy::before {{
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: url("{om_svg}");
  background-size: 96px 96px;
}}

.it-sy > * {{
  position: relative;
  z-index: 1;
}}"""

if old not in text:
    raise SystemExit("old .it-sy block not found")
text = text.replace(old, new, 1)

wash_old = """.it-sy__section--wash {
  background:
    radial-gradient(circle at top right, rgba(74, 222, 128, 0.14), transparent 26rem),
    linear-gradient(180deg, #f5faf6, #f1f6f2);
}

.it-sy__section--soft {
  background: #fbfcfb;
}"""

wash_new = """.it-sy__section--wash {
  background:
    radial-gradient(circle at top right, rgba(255, 153, 51, 0.16), transparent 26rem),
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 244, 230, 0.92));
}

.it-sy__section--soft {
  background: rgba(255, 255, 255, 0.55);
}"""

if wash_old in text:
    text = text.replace(wash_old, wash_new, 1)

p.write_text(text, encoding="utf-8")
print("Updated", p)
