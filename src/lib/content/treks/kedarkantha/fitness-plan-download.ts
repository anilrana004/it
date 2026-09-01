import { CONTACT } from '@/lib/contact';
import { SITE_LOGO_URL } from '@/lib/brand-assets';
import type { FitnessAssessmentResult } from '@/lib/content/treks/kedarkantha/fitness-calculator';

const TREK_TITLE = 'Kedarkantha Trek';
const GENERATED_LABEL = 'Indian Treks — Personal Fitness Preparation Plan';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildKedarkanthaFitnessPlanHtml(result: FitnessAssessmentResult): string {
  const { level, score, tips } = result;
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const office = CONTACT.offices[0];

  const planRows = level.weeklyPlan
    .map((row) => `<li>${escapeHtml(row)}</li>`)
    .join('');
  const focusRows = level.focusAreas.map((row) => `<li>${escapeHtml(row)}</li>`).join('');
  const warningRows = level.warnings.map((row) => `<li>${escapeHtml(row)}</li>`).join('');
  const tipRows = tips.map((row) => `<li>${escapeHtml(row)}</li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(TREK_TITLE)} — Fitness Plan (${escapeHtml(level.label)})</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      line-height: 1.55;
    }
    .page {
      max-width: 820px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #e2e8f0;
    }
    .header {
      padding: 28px 32px 22px;
      background: linear-gradient(135deg, #064e3b 0%, #15803d 55%, #16a34a 100%);
      color: #fff;
    }
    .header img {
      height: 42px;
      width: auto;
      display: block;
      margin-bottom: 18px;
      filter: brightness(0) invert(1);
    }
    .header h1 {
      margin: 0 0 6px;
      font-size: 26px;
      letter-spacing: -0.02em;
    }
    .header p {
      margin: 0;
      opacity: 0.92;
      font-size: 14px;
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding: 18px 32px;
      background: #f0fdf4;
      border-bottom: 1px solid #bbf7d0;
    }
    .meta div {
      padding: 12px 14px;
      border-radius: 12px;
      background: #fff;
      border: 1px solid #dcfce7;
    }
    .meta strong {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #15803d;
      margin-bottom: 4px;
    }
    .meta span { font-size: 14px; font-weight: 700; }
    .body { padding: 28px 32px 36px; }
    h2 {
      margin: 28px 0 10px;
      font-size: 17px;
      color: #065f46;
    }
    h2:first-child { margin-top: 0; }
    p { margin: 0 0 12px; color: #334155; font-size: 14px; }
    ul {
      margin: 0 0 16px;
      padding-left: 20px;
      color: #334155;
      font-size: 14px;
    }
    li { margin-bottom: 6px; }
    .score-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534;
      font-weight: 800;
      font-size: 13px;
    }
    .footer {
      padding: 20px 32px 28px;
      border-top: 1px solid #e2e8f0;
      background: #f8fafc;
      font-size: 12px;
      color: #64748b;
    }
    .footer strong { color: #0f172a; display: block; margin-bottom: 6px; }
    @media print {
      body { background: #fff; }
      .page { border: 0; max-width: none; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">
      <img src="${SITE_LOGO_URL}" alt="${escapeHtml(CONTACT.brand)}" />
      <h1>${escapeHtml(TREK_TITLE)}</h1>
      <p>${escapeHtml(GENERATED_LABEL)}</p>
    </header>

    <div class="meta">
      <div><strong>Fitness level</strong><span>${escapeHtml(level.label)}</span></div>
      <div><strong>Assessment score</strong><span>${score} / 100</span></div>
      <div><strong>Plan duration</strong><span>${escapeHtml(level.weeksRecommended)}</span></div>
    </div>

    <div class="body">
      <p><span class="score-badge">${escapeHtml(level.label)}</span></p>
      <p>${escapeHtml(level.summary)}</p>
      <p>${escapeHtml(level.readiness)}</p>

      <h2>Your weekly preparation plan</h2>
      <ul>${planRows}</ul>

      <h2>Priority focus areas</h2>
      <ul>${focusRows}</ul>

      <h2>Personal tips from your assessment</h2>
      <ul>${tipRows}</ul>

      <h2>Important notes</h2>
      <ul>${warningRows}</ul>

      <h2>General Kedarkantha fitness guidelines</h2>
      <ul>
        <li>Cardio: running, cycling, swimming, or stair climbing 4–5 days/week</li>
        <li>Strength: squats, lunges, step-ups, planks — 3 sets of 15 reps</li>
        <li>Flexibility: 10–15 min daily stretching or yoga</li>
        <li>Hydration: 3–4 litres of water daily during training; avoid alcohol before the trek</li>
        <li>Altitude: practise gradual ascent hikes above 8,000 ft where possible</li>
      </ul>
    </div>

    <footer class="footer">
      <strong>${escapeHtml(CONTACT.brand)}</strong>
      ${escapeHtml(office.line1)}, ${escapeHtml(office.line2)}<br />
      Phone: ${escapeHtml(CONTACT.phoneDisplay)} · Email: ${escapeHtml(CONTACT.email)}<br />
      Generated on ${escapeHtml(date)} · Dehradun to Dehradun · Max altitude 12,500 ft
    </footer>
  </div>
</body>
</html>`;
}

export function downloadKedarkanthaFitnessPlan(result: FitnessAssessmentResult): void {
  const html = buildKedarkanthaFitnessPlanHtml(result);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `indian-treks-kedarkantha-fitness-${result.level.id}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function printKedarkanthaFitnessPlan(result: FitnessAssessmentResult): void {
  const html = buildKedarkanthaFitnessPlanHtml(result);
  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
  };
}
