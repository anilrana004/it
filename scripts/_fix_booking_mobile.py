from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# --- TrekDetailContent.tsx ---
tsx = ROOT / "src/components/TrekDetailContent.tsx"
t = tsx.read_text(encoding="utf-8")

t = t.replace(
    """                <div className="bk-price-row">
                  <span className="bk-price-main" id="bk-pmain">
                    {inr(unitPrice)}
                  </span>
                </div>""",
    """                <div className="bk-price-row">
                  <span className="bk-price-main" id="bk-pmain">
                    {inr(total)}
                  </span>
                  {(persons > 1 || addOnTotal > 0 || gearTotal > 0 || pickupSurcharge > 0) && (
                    <span className="bk-price-sub">{inr(unitPrice)} / person</span>
                  )}
                </div>""",
)

t = t.replace(
    """  const bookingHref = () => {
    const params = new URLSearchParams({ pkg: tierName });
    if (selectedBatch) params.set('date', selectedBatch.startDate);
    params.set('persons', String(persons));
    params.set('pickup', pickup);
    if (pickupSurcharge) params.set('pickupFee', String(pickupSurcharge));
    if (picked.size) params.set('addons', [...picked].join(','));
    if (gearLines.length) params.set('gear', encodeGearQuery(gearLines));
    return `/booking/${trek.id}?${params.toString()}`;
  };""",
    """  const bookingHref = () => {
    const params = new URLSearchParams({ pkg: tierName });
    if (selectedBatch) params.set('date', selectedBatch.startDate);
    params.set('persons', String(persons));
    params.set('men', String(men));
    params.set('women', String(women));
    params.set('pickup', pickup);
    if (pickupSurcharge) params.set('pickupFee', String(pickupSurcharge));
    if (picked.size) params.set('addons', [...picked].join(','));
    if (gearLines.length) params.set('gear', encodeGearQuery(gearLines));
    params.set('total', String(total));
    return `/booking/${trek.id}?${params.toString()}`;
  };""",
)

t = t.replace(
    """          <strong>{inr(selectedBatch ? unitPrice : startingPrice)}</strong>
          <span>
            {selectedBatch
              ? `${selectedBatch.weekday}, ${selectedBatch.label}`
              : 'Starting price · tap to pick a date'}
          </span>""",
    """          <strong>{inr(total)}</strong>
          <span>
            {occupancyLabel(tierName)}
            {persons > 0 ? ` · ${persons} traveller${persons === 1 ? '' : 's'}` : ''}
            {selectedBatch ? ` · ${selectedBatch.label}` : ''}
          </span>""",
)

tsx.write_text(t, encoding="utf-8")
print("Updated TrekDetailContent")

# --- trek-detail.css append ---
css = ROOT / "src/components/trek-detail.css"
extra = """

.bk-price-sub {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

@media (max-width: 767px) {
  .kg-booking-sticky .bk-card {
    margin-bottom: 4px;
  }

  .kg-booking-sticky .bk-addon-strip {
    padding-bottom: 8px;
    margin-bottom: 12px;
    -webkit-overflow-scrolling: touch;
  }

  .kg-booking-sticky .bk-addon-tab {
    min-height: 88px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(22, 163, 74, 0.12);
  }

  .kg-booking-sticky .bk-addon-tab.bk-active {
    transform: none;
  }

  .kg-booking-sticky .bk-breakdown {
    gap: 6px;
    margin-bottom: 8px;
  }

  .kg-booking-sticky .bk-total {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px dashed rgba(21, 128, 61, 0.14);
  }

  .kg-booking-sticky .bk-gear-box {
    margin-bottom: 12px;
  }

  .kg-content > .kg-section:first-of-type {
    margin-top: 0;
    padding-top: 12px;
  }
}
"""
with css.open("a", encoding="utf-8") as f:
    f.write(extra)
print("Appended CSS")
