from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/treks/HighlightIcons.tsx"
t = p.read_text(encoding="utf-8")
t = t.replace(
    "const renderers: Record<string, (uid: string) => ReactNode> = {",
    "const renderers: Record<string, ({ uid }: { uid: string }) => ReactNode> = {",
)
t = t.replace(
    'return <span className="kg-highlight-icon-art">{Render(`hl-${id}`)}</span>;',
    'return <span className="kg-highlight-icon-art">{Render({ uid: `hl-${id}` })}</span>;',
)
p.write_text(t, encoding="utf-8")
print("ok")
