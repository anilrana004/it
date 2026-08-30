from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/treks/TrekRouteMapbox.tsx"
t = p.read_text(encoding="utf-8")
t = t.replace(
    "      attributionControl: { compact: true },\n    });\n\n    mapRef.current = map;",
    "      attributionControl: false,\n    });\n\n    mapRef.current = map;\n    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');",
)
p.write_text(t, encoding="utf-8")
print("ok")
