import re
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "src"
broken_files = []

for p in root.rglob("*.css"):
    text = p.read_text(encoding="utf-8")
    if text.count("{") != text.count("}"):
        broken_files.append((p, "brace mismatch"))
        continue
    for m in re.finditer(r"([^{}@/][^{}]*?)\{\s*(?=\n\s*[.#\[:@])", text, re.MULTILINE):
        broken_files.append((p, m.group(1).strip()[:80]))
        break

for p, reason in broken_files:
    print(f"{p.relative_to(root.parent)}: {reason}")

print(f"total: {len(broken_files)}")
