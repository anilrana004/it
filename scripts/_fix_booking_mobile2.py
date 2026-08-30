from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# --- TrekDetailContent: reliable addon taps + no inline top on phone ---
tsx = ROOT / "src/components/TrekDetailContent.tsx"
t = tsx.read_text(encoding="utf-8")

if "addonTapRef" not in t:
    t = t.replace(
        "  const toggleAddOn = (id: string) =>\n    setPicked((prev) => {\n      const next = new Set(prev);\n      if (next.has(id)) next.delete(id);\n      else next.add(id);\n      return next;\n    });",
        """  const addonTapRef = useRef<{ id: string; x: number; y: number } | null>(null);

  const toggleAddOn = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onAddonPointerDown = (id: string, e: React.PointerEvent<HTMLButtonElement>) => {
    addonTapRef.current = { id, x: e.clientX, y: e.clientY };
  };

  const onAddonPointerUp = (id: string, e: React.PointerEvent<HTMLButtonElement>) => {
    const start = addonTapRef.current;
    addonTapRef.current = null;
    if (!start || start.id !== id) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    if (dx > 12 || dy > 12) return;
    toggleAddOn(id);
  };""",
    )

    t = t.replace(
        """                        onClick={() => toggleAddOn(addon.id)}
                        aria-pressed={active}""",
        """                        onClick={() => toggleAddOn(addon.id)}
                        onPointerDown={(e) => onAddonPointerDown(addon.id, e)}
                        onPointerUp={(e) => onAddonPointerUp(addon.id, e)}
                        onPointerCancel={() => {
                          addonTapRef.current = null;
                        }}
                        aria-pressed={active}""",
    )

t = t.replace(
    """      const booking = bookingStickyRef.current;
      if (booking) {
        const topPx = fixedChromeHeight(nav.offsetHeight) + 18;
        if (window.innerWidth < 901) {
          booking.style.top = window.innerWidth <= 767 ? '' : `${topPx}px`;
          booking.style.removeProperty('--kg-booking-max');
        } else {
          booking.style.top = `${topPx}px`;
          const maxPx = Math.max(360, window.innerHeight - topPx - 24);
          booking.style.setProperty('--kg-booking-max', `${maxPx}px`);
        }
      }""",
    """      const booking = bookingStickyRef.current;
      if (booking) {
        const topPx = fixedChromeHeight(nav.offsetHeight) + 18;
        if (window.innerWidth <= 1023) {
          booking.style.removeProperty('top');
          booking.style.removeProperty('--kg-booking-max');
        } else {
          booking.style.top = `${topPx}px`;
          const maxPx = Math.max(360, window.innerHeight - topPx - 24);
          booking.style.setProperty('--kg-booking-max', `${maxPx}px`);
        }
      }""",
)

tsx.write_text(t, encoding="utf-8")
print("Updated TrekDetailContent touch + scroll")

# --- CSS: overlap + bookbar clearance ---
css = ROOT / "src/components/trek-detail.css"
extra = """

/* Booking card mobile: no sticky offset overlap with Highlight */
@media (max-width: 1023px) {
  .kg-booking-col {
    position: relative;
    z-index: 0;
    margin-bottom: 28px;
    isolation: isolate;
  }

  .kg-booking-sticky {
    position: relative !important;
    top: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  .kg-booking-sticky .bk-card {
    overflow: visible;
  }

  .kg-booking-sticky .bk-card-body,
  .kg-booking-sticky .bk-card-actions {
    overflow: visible;
  }
}

@media (max-width: 767px) {
  .kg-booking-col {
    margin-bottom: 20px;
    padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  }

  .kg-booking-sticky .bk-dates {
    margin-bottom: 24px;
  }

  .kg-booking-sticky .bk-card-actions {
    position: relative;
    z-index: 0;
    box-shadow: none;
    background: transparent;
  }

  .kg-content > .kg-section:first-of-type {
    position: relative;
    z-index: 1;
  }
}
"""
with css.open("a", encoding="utf-8") as f:
    f.write(extra)
print("Appended overlap CSS")
