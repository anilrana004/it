"""Revert typography + welcome splash changes; keep retro buttons and other work."""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

for rel in (
    "src/components/WelcomeSplash.tsx",
    "src/components/welcome-splash.css",
):
    p = ROOT / rel
    if p.exists():
        p.unlink()
        print(f"deleted {rel}")

layout = ROOT / "src/app/layout.tsx"
lt = layout.read_text(encoding="utf-8")
lt = lt.replace(
    'import { Inter, Nunito, Playfair_Display, Poppins } from "next/font/google";\n',
    'import { Nunito, Playfair_Display, Poppins } from "next/font/google";\n',
)
lt = lt.replace('import WelcomeSplash from "@/components/WelcomeSplash";\n\n', "")
lt = lt.replace(
    "/** Primary UI — Neue Haas Grotesk Display substitute (Helvetica-class grotesk). */\n"
    "const display = Inter({\n"
    '  subsets: ["latin"],\n'
    '  weight: ["400", "500", "600", "700"],\n'
    '  variable: "--font-display",\n'
    '  display: "swap",\n'
    "});\n\n",
    "",
)
lt = lt.replace(
    "className={`${display.variable} ${poppins.variable} ${playfair.variable} ${nunito.variable}`}",
    "className={`${poppins.variable} ${playfair.variable} ${nunito.variable}`}",
)
lt = lt.replace("        <WelcomeSplash />\n        ", "")
layout.write_text(lt, encoding="utf-8")
print("reverted layout.tsx")

gpath = ROOT / "src/app/globals.css"
g = gpath.read_text(encoding="utf-8")
g = g.replace(
    "  --font-sans: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n"
    "  --font-heading: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n"
    "  --font-button: 'Times New Roman', Times, Georgia, 'Liberation Serif', serif;\n"
    "  --font-popup: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
    "  --font-sans: var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif;\n"
    "  --font-heading: var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif;",
)
g = g.replace(
    "  background: var(--ih-bg);\n"
    "  font-size: 16px;\n"
    "  line-height: 1.125;\n"
    "  font-weight: 500;\n"
    "  color: rgb(33, 33, 33);",
    "  color: var(--ih-text);\n"
    "  background: var(--ih-bg);\n"
    "  font-size: 14px;\n"
    "  line-height: 1.6;\n"
    "  font-weight: 400;",
)
typography_block = """
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
g = g.replace(typography_block, "")
gpath.write_text(g, encoding="utf-8")
print("reverted globals.css fonts")

td = ROOT / "src/components/trek-detail.css"
t = td.read_text(encoding="utf-8")
t = t.replace(
    "--font-head: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "--font-head: var(--font-playfair), 'Playfair Display', serif;",
)
t = t.replace(
    "--font-body: var(--font-display), 'Neue Haas Grotesk Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "--font-body: var(--font-nunito), 'Nunito', sans-serif;",
)
td.write_text(t, encoding="utf-8")
print("reverted trek-detail.css")

rb = ROOT / "src/app/retro-buttons.css"
if rb.exists():
    r = rb.read_text(encoding="utf-8")
    r = r.replace("  font-family: var(--font-button);\n", "")
    rb.write_text(r, encoding="utf-8")
    print("reverted retro-buttons.css fonts")

SYNC_FILES = [
    "src/components/backpacking/backpacking-trips.css",
    "src/components/biking/biking-trips.css",
    "src/components/careers/careers-page.css",
    "src/components/contact/contact-page.css",
    "src/components/corporate/corporate-hub.css",
    "src/components/corporate/corporate-team-building.css",
    "src/components/domestic/domestic-tours.css",
    "src/components/faqs/faqs-page.css",
    "src/components/home/home-faq.css",
    "src/components/home/video-gallery.css",
    "src/components/international/international-getaways.css",
    "src/components/landing/group-journey-hero.css",
    "src/components/landing/landing-reviews-blog.css",
    "src/components/prep/prep-guides.css",
    "src/components/rental/gear-rental.css",
    "src/components/special-programs/senior-citizen-treks.css",
    "src/components/special-programs/special-program-landing.css",
    "src/components/special-programs/special-programs-hub.css",
    "src/components/support/reviews-page.css",
    "src/components/support/support-hub.css",
    "src/components/treks/treks-explorer.css",
    "src/components/trending/trending-landing.css",
    "src/components/yatra/sacred-yatra.css",
]

subprocess.run(
    ["git", "checkout", "HEAD", "--", *SYNC_FILES],
    cwd=ROOT,
    check=True,
)
print(f"restored {len(SYNC_FILES)} page css files from git")
print("undo complete")
