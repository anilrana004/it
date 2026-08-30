from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "components" / "yatra" / "sacred-yatra.css"
text = p.read_text(encoding="utf-8")

replacements = [
    (
        """.it-sy__hero--premium .it-sy__btn--premium-ghost {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 48%, #fed7aa 100%) !important;
  color: #431407 !important;
  border: 2px solid #ff9933 !important;
  box-shadow: 4px 4px 0 0 #7c2d12 !important;
  font-weight: 600;
  transition:
    transform 0.14s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.14s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.2s ease !important;
}

.it-sy__hero--premium .it-sy__btn--premium-ghost:hover {
  background: linear-gradient(135deg, #fffbeb 0%, #fde68a 52%, #fdba74 100%) !important;
  transform: translate(2px, 2px) !important;
  box-shadow: 2px 2px 0 0 #7c2d12 !important;
}""",
        """.it-sy__hero--premium .it-sy__btn--premium-ghost {
  background: linear-gradient(135deg, #166534 0%, #15803d 48%, #14532d 100%) !important;
  color: #fff !important;
  border: 2px solid #ff9933 !important;
  box-shadow: 4px 4px 0 0 #431407 !important;
  font-weight: 600;
  transition:
    transform 0.14s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.14s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.2s ease !important;
}

.it-sy__hero--premium .it-sy__btn--premium-ghost:hover {
  background: linear-gradient(135deg, #15803d 0%, #16a34a 52%, #166534 100%) !important;
  transform: translate(2px, 2px) !important;
  box-shadow: 2px 2px 0 0 #431407 !important;
}""",
    ),
    (
        """.it-sy__hero--premium .it-sy__btn--premium-ghost:active {
  transform: translate(4px, 4px) !important;
  box-shadow: 0 0 0 0 #7c2d12 !important;
}

.it-sy__hero--premium .it-sy__btn--premium-ghost svg {
  color: #15803d;
}""",
        """.it-sy__hero--premium .it-sy__btn--premium-ghost:active {
  transform: translate(4px, 4px) !important;
  box-shadow: 0 0 0 0 #431407 !important;
}

.it-sy__hero--premium .it-sy__btn--premium-ghost svg {
  color: #bbf7d0;
}""",
    ),
    (
        """.it-sy__hero--premium .it-sy__btn-ghost-copy strong {
  color: #431407;
}

.it-sy__btn-ghost-copy span {
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.62);
}

.it-sy__hero--premium .it-sy__btn-ghost-copy span {
  color: #9a3412;
  opacity: 0.82;
}""",
        """.it-sy__hero--premium .it-sy__btn-ghost-copy strong {
  color: #fff;
}

.it-sy__btn-ghost-copy span {
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.62);
}

.it-sy__hero--premium .it-sy__btn-ghost-copy span {
  color: rgba(255, 237, 213, 0.88);
  opacity: 1;
}

.it-sy__hero--premium .it-sy__btn:hover {
  transform: none;
}""",
    ),
]

for old, new in replacements:
    if old not in text:
        raise SystemExit(f"block not found:\n{old[:80]}...")
    text = text.replace(old, new, 1)

p.write_text(text, encoding="utf-8")
print("Patched", p)
