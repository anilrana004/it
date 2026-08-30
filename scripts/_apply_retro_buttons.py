from pathlib import Path

root = Path(__file__).resolve().parents[1] / "src" / "app"

retro = (Path(__file__).parent / "_retro_buttons.css.txt").read_text(encoding="utf-8")
(root / "retro-buttons.css").write_text(retro, encoding="utf-8")

layout = root / "layout.tsx"
text = layout.read_text(encoding="utf-8")
if "retro-buttons.css" not in text:
    text = text.replace('import "./globals.css";', 'import "./globals.css";\nimport "./retro-buttons.css";')
    layout.write_text(text, encoding="utf-8")

globals_path = root / "globals.css"
g = globals_path.read_text(encoding="utf-8")
old_marker = "/* ====== Button Base ====== */"
new_marker = "/* ====== Button Base (retro offset shadow via retro-buttons.css) ====== */"
if old_marker in g:
    start = g.index(old_marker)
    end = g.index("/* ====== Input Base ====== */")
    new_btn = (Path(__file__).parent / "_globals_btn_block.css.txt").read_text(encoding="utf-8")
    g = g[:start] + new_btn + g[end:]
    globals_path.write_text(g, encoding="utf-8")
    print("globals.css updated")
else:
    print("globals.css already updated or marker missing")

print("Done: retro-buttons.css + layout import")
