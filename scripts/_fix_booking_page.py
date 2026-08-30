from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
page = ROOT / "src/app/booking/[id]/page.tsx"
t = page.read_text(encoding="utf-8")

if "addOns" not in t:
    t = t.replace(
        "import { whatsappUrl } from '@/lib/contact';",
        "import { whatsappUrl } from '@/lib/contact';\nimport { addOns } from '@/lib/trek-detail-content';",
    )

old_form = """  const [form, setForm] = useState({
    name: '', email: '', phone: '', persons: '1', date: sp.get('date') || '',
    pkg: sp.get('pkg') || 'Standard', payment: 'deposit', notes: ''
  });"""

new_form = """  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    persons: sp.get('persons') || '1',
    men: sp.get('men') || sp.get('persons') || '1',
    women: sp.get('women') || '0',
    date: sp.get('date') || '',
    pkg: sp.get('pkg') || 'Standard',
    pickup: sp.get('pickup') || '',
    payment: 'deposit',
    notes: '',
  });"""

if old_form in t:
    t = t.replace(old_form, new_form)

old_calc = """  const selectedPkg = trek.pricing.find(p => p.name === form.pkg) || trek.pricing[0];
  const tripTotal = selectedPkg.price * parseInt(form.persons);
  const total = tripTotal + gearTotal;
  const depositAmt = selectedPkg.deposit * parseInt(form.persons);
  const payableNow = form.payment === 'deposit' ? depositAmt : form.payment === 'full' ? total : Math.ceil(tripTotal / 2) + gearTotal;"""

new_calc = """  const selectedPkg = trek.pricing.find(p => p.name === form.pkg) || trek.pricing[0];
  const personCount = Math.max(1, parseInt(form.persons, 10) || 1);
  const pickupFee = Math.max(0, parseInt(sp.get('pickupFee') || '0', 10) || 0);
  const selectedAddonIds = (sp.get('addons') || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  const selectedAddons = addOns.filter((addon) => selectedAddonIds.includes(addon.id));
  const addOnPerPerson = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const unitPrice = selectedPkg.price + pickupFee;
  const tripTotal = unitPrice * personCount + addOnPerPerson * personCount;
  const urlTotal = parseInt(sp.get('total') || '0', 10);
  const total = urlTotal > 0 ? urlTotal : tripTotal + gearTotal;
  const depositAmt = selectedPkg.deposit * personCount;
  const payableNow = form.payment === 'deposit' ? depositAmt : form.payment === 'full' ? total : Math.ceil(tripTotal / 2) + gearTotal;"""

if old_calc in t:
    t = t.replace(old_calc, new_calc)

old_msg = """    const gearNote = gearLines.length ? `\\n*Rental gear:* ${formatGearLines(gearLines)}\\n*Gear total:* ₹${gearTotal.toLocaleString()}` : '';
    const msg = `*New Booking - Indian Treks*\\n\\n*Trek:* ${trek.title}\\n*Duration:* ${trek.duration}\\n*Package:* ${form.pkg}\\n*Persons:* ${form.persons}\\n*Date:* ${form.date}\\n*Payment:* ${form.payment === 'deposit' ? 'Advance Deposit' : form.payment === 'full' ? 'Full Payment' : '50% Now'}\\n*Amount:* ₹${payableNow.toLocaleString()}${gearNote}\\n*Name:* ${form.name}\\n*Email:* ${form.email}\\n*Phone:* ${form.phone}\\n${form.notes ? `*Notes:* ${form.notes}` : ''}`;"""

new_msg = """    const gearNote = gearLines.length ? `\\n*Rental gear:* ${formatGearLines(gearLines)}\\n*Gear total:* ₹${gearTotal.toLocaleString()}` : '';
    const addonNote = selectedAddons.length
      ? `\\n*Add-ons:* ${selectedAddons.map((addon) => `${addon.name} (₹${(addon.price * personCount).toLocaleString()})`).join(', ')}`
      : '';
    const pickupNote = form.pickup ? `\\n*Pickup:* ${form.pickup}${pickupFee ? ` (+₹${pickupFee.toLocaleString()}/person)` : ''}` : '';
    const travellerNote = `\\n*Travellers:* ${personCount} (Men ${form.men}, Women ${form.women})`;
    const msg = `*New Booking - Indian Treks*\\n\\n*Trek:* ${trek.title}\\n*Duration:* ${trek.duration}\\n*Package:* ${form.pkg}${pickupNote}${travellerNote}\\n*Date:* ${form.date}${addonNote}\\n*Payment:* ${form.payment === 'deposit' ? 'Advance Deposit' : form.payment === 'full' ? 'Full Payment' : '50% Now'}\\n*Trip total:* ₹${total.toLocaleString()}\\n*Pay now:* ₹${payableNow.toLocaleString()}${gearNote}\\n*Name:* ${form.name}\\n*Email:* ${form.email}\\n*Phone:* ${form.phone}\\n${form.notes ? `*Notes:* ${form.notes}` : ''}`;"""

if old_msg in t:
    t = t.replace(old_msg, new_msg)

# Selection summary after subtitle
if "Your trek selections" not in t:
    t = t.replace(
        """          <p className="text-gray-500 text-sm mt-1">{trek.title} &middot; {trek.duration} &middot; {trek.location}</p>
        </div>""",
        """          <p className="text-gray-500 text-sm mt-1">{trek.title} &middot; {trek.duration} &middot; {trek.location}</p>
          {(form.pickup || selectedAddons.length > 0 || gearLines.length > 0) && (
            <div className="mt-4 rounded-2xl border border-[#16a34a]/15 bg-[#16a34a]/5 p-4 text-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#15803d] mb-2">Your trek selections</p>
              <ul className="space-y-1.5 text-gray-700">
                <li><span className="text-gray-500">Occupancy:</span> <strong>{form.pkg}</strong></li>
                {form.pickup ? <li><span className="text-gray-500">Pickup:</span> <strong>{form.pickup}{pickupFee ? ` (+₹${pickupFee.toLocaleString()}/person)` : ''}</strong></li> : null}
                <li><span className="text-gray-500">Travellers:</span> <strong>{personCount} (Men {form.men}, Women {form.women})</strong></li>
                {form.date ? <li><span className="text-gray-500">Date:</span> <strong>{form.date}</strong></li> : null}
                {selectedAddons.map((addon) => (
                  <li key={addon.id}><span className="text-gray-500">{addon.name}:</span> <strong>+₹{(addon.price * personCount).toLocaleString()}</strong></li>
                ))}
                {gearLines.length > 0 ? <li><span className="text-gray-500">Rental gear:</span> <strong>{formatGearLines(gearLines)}</strong></li> : null}
              </ul>
              <div className="mt-3 flex justify-between border-t border-[#16a34a]/10 pt-3 font-semibold">
                <span>Estimated total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>""",
    )

# Review step extras
if "Pickup point" not in t:
    t = t.replace(
        """                    <div className="flex justify-between"><span className="text-gray-500">Persons</span><span className="font-semibold">{form.persons}</span></div>""",
        """                    <div className="flex justify-between"><span className="text-gray-500">Persons</span><span className="font-semibold">{personCount} (Men {form.men}, Women {form.women})</span></div>
                    {form.pickup ? <div className="flex justify-between"><span className="text-gray-500">Pickup</span><span className="font-semibold">{form.pickup}{pickupFee ? ` (+₹${pickupFee.toLocaleString()}/person)` : ''}</span></div> : null}
                    {selectedAddons.map((addon) => (
                      <div key={addon.id} className="flex justify-between gap-3">
                        <span className="text-gray-500">{addon.name}</span>
                        <span className="font-semibold">+₹{(addon.price * personCount).toLocaleString()}</span>
                      </div>
                    ))}""",
    )

# Sidebar breakdown
if "Add-ons total" not in t:
    t = t.replace(
        """                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">₹{tripTotal.toLocaleString()}</span>
                  </div>""",
        """                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Trip ({personCount} × ₹{unitPrice.toLocaleString()})</span>
                    <span className="font-semibold">₹{(unitPrice * personCount).toLocaleString()}</span>
                  </div>
                  {pickupFee > 0 ? (
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span>Includes pickup surcharge</span>
                      <span>+₹{(pickupFee * personCount).toLocaleString()}</span>
                    </div>
                  ) : null}
                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between items-center text-xs text-gray-600">
                      <span>{addon.name}</span>
                      <span>+₹{(addon.price * personCount).toLocaleString()}</span>
                    </div>
                  ))}""",
    )

page.write_text(t, encoding="utf-8")
print("Updated booking page")
