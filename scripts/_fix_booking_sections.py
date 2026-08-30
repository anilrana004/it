"""Patch trek-detail.css: booking dates, offer price, share button styles."""
from pathlib import Path

CSS = Path(__file__).resolve().parents[1] / "src" / "components" / "trek-detail.css"
text = CSS.read_text(encoding="utf-8")

replacements = [
    (
        """.kg-share {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.98);
  color: #444444;
  font-size: 17px;
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.1);
  cursor: pointer;
}""",
        """.kg-share {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(22, 163, 74, 0.42);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.98);
  color: var(--primary-dark);
  font-size: 17px;
  box-shadow: 3px 3px 0 0 #bbf7d0;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.kg-share:hover {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 0 #bbf7d0;
  border-color: var(--primary);
  background: #fff;
}

.kg-share:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 0 #bbf7d0;
}

.kg-share:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}""",
    ),
    (
        """.bk-offer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.bk-offer-label {
  margin: 0;
  font-size: 11px;
  color: #5f7a6d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 900;
}

.bk-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}""",
        """.bk-offer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: nowrap;
  margin-bottom: 6px;
}

.bk-offer-label {
  margin: 0;
  font-size: 11px;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 900;
}

.bk-price-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}""",
    ),
    (
        """.bk-dates {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid #edf0f5;
  border-radius: 16px;
  background:
    linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: hidden;
}""",
        """.bk-dates {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1.5px solid #dde3ee;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 3px 3px 0 0 #e2e8f0;
  position: relative;
  overflow: visible;
}""",
    ),
    (
        """.bk-date-row {
  position: relative;
  z-index: 1;
  min-width: 0;
  width: 100%;
  overflow: hidden;
}""",
        """.bk-date-row {
  position: relative;
  z-index: 1;
  min-width: 0;
  width: 100%;
  overflow: visible;
}""",
    ),
    (
        """.bk-month-pill {
  flex-shrink: 0;
  border: 1.5px solid #dde3ee;
  border-radius: 999px;
  min-width: 74px;
  padding: 9px 14px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #667085;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(16, 24, 40, 0.03);
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.bk-month-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.bk-month-pill.bk-active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-color: var(--primary);
  color: #fff;
}

.bk-date-pill {
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 48px;
  border: 1.5px solid #dde3ee;
  border-radius: 12px;
  padding: 8px 8px 7px;
  text-align: center;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 1px 0 rgba(16, 24, 40, 0.03);
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.bk-date-pill:hover {
  border-color: var(--primary);
}""",
        """.bk-month-pill {
  flex-shrink: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 2px solid #dde3ee;
  border-radius: 14px;
  min-width: 58px;
  min-height: 46px;
  padding: 7px 12px 6px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #475569;
  background: #fff;
  cursor: pointer;
  box-shadow: 3px 3px 0 0 #e2e8f0;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.bk-month-pill__label {
  display: block;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0.02em;
}

.bk-month-pill__year {
  display: block;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #94a3b8;
  line-height: 1;
}

.bk-month-pill:hover:not(.bk-active) {
  border-color: var(--primary);
  color: var(--primary-dark);
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 0 #bbf7d0;
}

.bk-month-pill:hover:not(.bk-active) .bk-month-pill__year {
  color: #64748b;
}

.bk-month-pill.bk-active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-color: var(--primary-dark);
  color: #fff;
  box-shadow: 3px 3px 0 0 #bbf7d0;
}

.bk-month-pill.bk-active .bk-month-pill__year {
  color: rgba(255, 255, 255, 0.82);
}

.bk-date-pill {
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 52px;
  border: 2px solid #dde3ee;
  border-radius: 12px;
  padding: 8px 8px 7px;
  text-align: center;
  cursor: pointer;
  background: #fff;
  box-shadow: 3px 3px 0 0 #e2e8f0;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.bk-date-pill:hover:not(.bk-active):not(.bk-closed) {
  border-color: var(--primary);
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 0 #bbf7d0;
}""",
    ),
    (
        """.bk-pill {
  flex: 1;
  min-width: 70px;
  text-align: center;
  border: 1.5px solid #dde3ee;
  border-radius: 999px;
  padding: 9px 12px;
  font-size: 12px;
  font-weight: 800;
  color: #3a3d52;
  cursor: pointer;
  background: #fff;
  transition: all 0.15s;
  white-space: nowrap;
  line-height: 1.2;
}""",
        """.bk-pill {
  flex: 1;
  min-width: 70px;
  text-align: center;
  border: 2px solid #dde3ee;
  border-radius: 999px;
  padding: 9px 12px;
  font-size: 12px;
  font-weight: 800;
  color: #3a3d52;
  cursor: pointer;
  background: #fff;
  box-shadow: 3px 3px 0 0 #e2e8f0;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;
  line-height: 1.2;
}""",
    ),
    (
        """.bk-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.bk-pill.bk-active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-color: var(--primary);
  color: #fff;
}""",
        """.bk-pill:hover:not(.bk-active) {
  border-color: var(--primary);
  color: var(--primary-dark);
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 0 #bbf7d0;
}

.bk-pill.bk-active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-color: var(--primary-dark);
  color: #fff;
  box-shadow: 3px 3px 0 0 #bbf7d0;
}""",
    ),
    (
        """.bk-date-pill.bk-active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-color: var(--primary);
}""",
        """.bk-date-pill.bk-active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-color: var(--primary-dark);
  box-shadow: 3px 3px 0 0 #bbf7d0;
  color: #fff;
}""",
    ),
]

append_block = """

/* —— Booking chip guard: keep selection pills off retro CTA overrides —— */
.bk-month-pill,
.bk-date-pill,
.bk-pill,
.kg-page .fd-studio__month,
.kg-page .fd-studio__tile {
  -webkit-tap-highlight-color: transparent;
}

.kg-page .fd-studio__month {
  border: 2px solid rgba(16, 24, 40, 0.08);
  box-shadow: 3px 3px 0 0 #e2e8f0;
}

.kg-page .fd-studio__month.is-active {
  border-color: rgba(22, 163, 74, 0.45);
  box-shadow: 3px 3px 0 0 #bbf7d0;
}

.kg-page .fd-studio__tile {
  border: 2px solid rgba(16, 24, 40, 0.08);
  box-shadow: 3px 3px 0 0 #e2e8f0;
}

.kg-page .fd-studio__tile.is-selected {
  box-shadow:
    3px 3px 0 0 #bbf7d0,
    0 0 0 2px rgba(16, 185, 129, 0.28);
}

.kg-page .fd-toast--share {
  max-width: min(420px, calc(100vw - 24px));
}
"""

for old, new in replacements:
    if old not in text:
        raise SystemExit(f"Missing expected block:\n{old[:120]}...")
    text = text.replace(old, new, 1)

if "fd-toast--share" not in text:
    text = text.rstrip() + append_block + "\n"

CSS.write_text(text, encoding="utf-8")
print("Updated", CSS)
