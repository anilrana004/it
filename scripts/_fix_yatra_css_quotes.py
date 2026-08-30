from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "components" / "yatra" / "sacred-yatra.css"
text = p.read_text(encoding="utf-8")

text = text.replace(
    'url(\\"data:image/svg+xml',
    'url("data:image/svg+xml',
)
text = text.replace(
    "%3E%3C/svg%3E\\");",
    '%3E%3C/svg%3E");',
)

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
print("Fixed", p)
