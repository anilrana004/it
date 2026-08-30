"""Replace legacy Poppins/Playfair/Nunito CSS stacks with global font tokens."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src"
REPLACEMENTS = [
    (
        "var(--font-heading), var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif",
        "var(--font-heading)",
    ),
    (
        "var(--font-heading), var(--font-poppins), sans-serif",
        "var(--font-heading)",
    ),
    (
        "var(--font-poppins), 'Poppins', ui-sans-serif, system-ui, sans-serif",
        "var(--font-sans)",
    ),
    (
        "var(--font-poppins, 'Poppins'), ui-sans-serif, system-ui, sans-serif",
        "var(--font-sans)",
    ),
    (
        "var(--font-heading, var(--font-poppins, 'Poppins')), ui-sans-serif, system-ui, sans-serif",
        "var(--font-heading)",
    ),
    (
        "var(--font-poppins), 'Poppins', system-ui, sans-serif",
        "var(--font-sans)",
    ),
    (
        "--font-head: var(--font-playfair), 'Playfair Display', serif;",
        "--font-head: var(--font-heading);",
    ),
    (
        "--font-body: var(--font-nunito), 'Nunito', sans-serif;",
        "--font-body: var(--font-sans);",
    ),
    (
        "font-family: var(--font-nunito), 'Nunito', system-ui, sans-serif;",
        "font-family: var(--font-sans);",
    ),
    (
        "font-family: var(--font-playfair), Georgia, serif;",
        "font-family: var(--font-heading);",
    ),
]

changed = 0
for path in ROOT.rglob("*.css"):
    if path.name in {"globals.css", "welcome-splash.css", "retro-buttons.css"}:
        continue
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding="utf-8")
        changed += 1
        print(f"updated {path.relative_to(ROOT.parent)}")

print(f"synced {changed} css files")
