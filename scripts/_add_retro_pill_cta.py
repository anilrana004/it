from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "app" / "retro-buttons.css"
text = p.read_text(encoding="utf-8")

block = """

/* —— Wide pill banner CTA (Meet the team / Get in touch style) —— */
.it-retro-pill-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 24rem;
  min-height: 48px;
  padding: 0.875rem 2rem;
  border: var(--it-retro-border);
  border-radius: 9999px;
  background: var(--ih-primary, #16a34a);
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  --it-retro-ink: var(--it-retro-ink-deep);
  box-shadow: var(--it-retro-x) var(--it-retro-y) 0 0 var(--it-retro-ink);
  transition:
    transform var(--it-retro-ease),
    box-shadow var(--it-retro-ease),
    background-color var(--it-retro-ease);
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 640px) {
  .it-retro-pill-cta {
    width: auto;
    max-width: none;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}

.it-retro-pill-cta:hover:not(:disabled) {
  background: var(--ih-primary-hover, #15803d);
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 0 var(--it-retro-ink);
}

.it-retro-pill-cta:active:not(:disabled) {
  transform: translate(var(--it-retro-x), var(--it-retro-y));
  box-shadow: 0 0 0 0 var(--it-retro-ink);
}

.it-retro-pill-cta:focus-visible {
  outline: 2px solid var(--ih-primary, #16a34a);
  outline-offset: 3px;
}

.it-retro-pill-cta--case-normal {
  text-transform: none;
  letter-spacing: normal;
}

.it-retro-pill-cta--sm {
  width: auto;
  max-width: none;
  min-height: 40px;
  padding: 0 1rem;
  font-size: 0.8125rem;
  letter-spacing: normal;
  text-transform: none;
}

.it-retro-pill-cta--block {
  width: 100%;
  max-width: none;
}
"""

if "it-retro-pill-cta" not in text:
    text = text.rstrip() + block

replacements = [
    ("  [class*='__btn--lime']\n)", "  [class*='__btn--lime'],\n  [class*='__discover-cta'],\n  .it-retro-pill-cta\n)"),
    ("  [class*='__btn--lime']\n):hover", "  [class*='__btn--lime'],\n  [class*='__discover-cta'],\n  .it-retro-pill-cta\n):hover"),
    ("  [class*='__btn--lime']\n):active", "  [class*='__btn--lime'],\n  [class*='__discover-cta'],\n  .it-retro-pill-cta\n):active"),
]

for old, new in replacements:
    if new.split(",")[0] not in text:
        text = text.replace(old, new)

p.write_text(text, encoding="utf-8")
print("done")
