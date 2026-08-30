from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

splash = ROOT / "src" / "components" / "welcome-splash.css"
splash.write_text(
    """/* Welcome overlay — font role 3: system sans, 300 italic */

.it-welcome {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(5, 46, 22, 0.72);
  backdrop-filter: blur(6px);
  animation: it-welcome-in 0.45s ease forwards;
}

.it-welcome.is-leaving {
  animation: it-welcome-out 0.5s ease forwards;
  pointer-events: none;
}

.it-welcome__panel {
  width: min(100%, 420px);
  padding: 1.75rem 1.5rem 1.6rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(165deg, rgba(6, 33, 15, 0.96) 0%, rgba(22, 101, 52, 0.94) 100%);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
  text-align: center;
}

.it-welcome__logo {
  height: 2rem;
  width: auto;
  max-width: 200px;
  margin: 0 auto 1rem;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.it-welcome__title {
  margin: 0 0 0.65rem;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: #fff;
}

.it-welcome__message {
  margin: 0;
  font-family: var(--font-popup);
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
}

@keyframes it-welcome-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes it-welcome-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .it-welcome, .it-welcome.is-leaving { animation: none; }
}
""",
    encoding="utf-8",
)

gpath = ROOT / "src" / "app" / "globals.css"
g = gpath.read_text(encoding="utf-8")

old_theme = """  --font-sans: var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif;"""

new_theme = """  --font-sans: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-heading: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-button: 'Times New Roman', Times, Georgia, 'Liberation Serif', serif;
  --font-popup: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"""

if old_theme in g:
    g = g.replace(old_theme, new_theme)

g = g.replace(
    "  font-size: 14px;\n  line-height: 1.6;\n  font-weight: 400;",
    "  font-size: 16px;\n  line-height: 1.125;\n  font-weight: 500;\n  color: rgb(33, 33, 33);",
)

heading_block = """
/* —— Typography roles —— */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 500;
  color: rgb(33, 33, 33);
  letter-spacing: -0.01em;
}

button,
input[type='button'],
input[type='submit'],
input[type='reset'],
.btn,
.it-retro-btn,
.it-retro-pill-cta,
.it-uiverse-play,
[class*='__btn'] {
  font-family: var(--font-button);
  font-weight: 400;
  font-style: normal;
}

"""

if "Typography roles" not in g:
    g = g.replace("/* ====== Input Base ====== */", heading_block + "/* ====== Input Base ====== */")

gpath.write_text(g, encoding="utf-8")

td = ROOT / "src" / "components" / "trek-detail.css"
t = td.read_text(encoding="utf-8")
t = t.replace(
    "--font-head: var(--font-playfair), 'Playfair Display', serif;",
    "--font-head: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;",
)
t = t.replace(
    "--font-body: var(--font-nunito), 'Nunito', sans-serif;",
    "--font-body: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;",
)
td.write_text(t, encoding="utf-8")

rb = ROOT / "src" / "app" / "retro-buttons.css"
r = rb.read_text(encoding="utf-8")
if "font-family: var(--font-button)" not in r:
    r = r.replace(".it-retro-btn {", ".it-retro-btn {\n  font-family: var(--font-button);")
    r = r.replace(".it-retro-pill-cta {", ".it-retro-pill-cta {\n  font-family: var(--font-button);")
    rb.write_text(r, encoding="utf-8")

print("fonts updated")
