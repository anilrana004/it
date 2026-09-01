import { jsPDF } from 'jspdf';
import { CONTACT } from '@/lib/contact';
import type { FitnessAssessmentResult } from '@/lib/treks/fitness-calculator';

export type FitnessPlanMeta = {
  trekTitle: string;
  trekId: string;
  maxAltitude?: string;
  startEndPoint?: string;
};

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_Y = PAGE_HEIGHT - 12;

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed <= FOOTER_Y - 4) return y;
  doc.addPage();
  return MARGIN + 8;
}

function drawSectionHeading(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(6, 95, 70);
  doc.text(title, MARGIN, y);
  doc.setTextColor(15, 23, 42);
  return y + 7;
}

function drawBulletList(doc: jsPDF, items: string[], y: number): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  items.forEach((item) => {
    const bulletLines = doc.splitTextToSize(`• ${item}`, CONTENT_WIDTH - 4) as string[];
    const blockHeight = bulletLines.length * 5 + 2;
    y = ensureSpace(doc, y, blockHeight);
    bulletLines.forEach((line) => {
      doc.text(line, MARGIN + 2, y);
      y += 5;
    });
    y += 1;
  });
  return y + 2;
}

export function buildFitnessPlanPdf(
  result: FitnessAssessmentResult,
  meta: FitnessPlanMeta,
): jsPDF {
  const { level, score, tips } = result;
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const office = CONTACT.offices[0];
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setFillColor(6, 78, 59);
  doc.rect(0, 0, PAGE_WIDTH, 42, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(CONTACT.brand, MARGIN, 16);
  doc.setFontSize(14);
  doc.text(meta.trekTitle, MARGIN, 26);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Personal Fitness Preparation Plan', MARGIN, 34);

  let y = 52;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Fitness level: ${level.label}`, MARGIN, y);
  doc.text(`Score: ${score} / 100`, MARGIN + 70, y);
  doc.text(`Duration: ${level.weeksRecommended}`, MARGIN + 120, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  y = addWrappedText(doc, level.summary, MARGIN, y, CONTENT_WIDTH, 5);
  y += 2;
  y = addWrappedText(doc, level.readiness, MARGIN, y, CONTENT_WIDTH, 5);
  y += 6;

  y = drawSectionHeading(doc, 'Your weekly preparation plan', y);
  y = drawBulletList(doc, level.weeklyPlan, y);

  y = drawSectionHeading(doc, 'Priority focus areas', y);
  y = drawBulletList(doc, level.focusAreas, y);

  y = drawSectionHeading(doc, 'Personal tips from your assessment', y);
  y = drawBulletList(doc, tips, y);

  y = drawSectionHeading(doc, 'Important notes', y);
  y = drawBulletList(doc, level.warnings, y);

  y = drawSectionHeading(doc, 'General fitness guidelines', y);
  y = drawBulletList(
    doc,
    [
      'Cardio: running, cycling, swimming, or stair climbing 4–5 days/week',
      'Strength: squats, lunges, step-ups, planks — 3 sets of 15 reps',
      'Flexibility: 10–15 min daily stretching or yoga',
      'Hydration: 3–4 litres of water daily during training; avoid alcohol before the trek',
      meta.maxAltitude
        ? `Altitude: practise gradual ascent hikes; max altitude on this trek is ${meta.maxAltitude}`
        : 'Altitude: practise gradual ascent hikes where possible',
    ],
    y,
  );

  const footerLines = [
    `${CONTACT.brand} · ${office.line1}, ${office.line2}`,
    `Phone: ${CONTACT.phoneDisplay} · Email: ${CONTACT.email}`,
    `Generated on ${date}${meta.startEndPoint ? ` · ${meta.startEndPoint}` : ''}`,
  ];

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    footerLines.forEach((line, index) => {
      doc.text(line, MARGIN, FOOTER_Y - (footerLines.length - index - 1) * 4);
    });
  }

  return doc;
}

function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isIOS) {
    window.open(url, '_blank', 'noopener,noreferrer');
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    return;
  }

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function downloadFitnessPlanPdf(
  result: FitnessAssessmentResult,
  meta: FitnessPlanMeta,
): void {
  const doc = buildFitnessPlanPdf(result, meta);
  const filename = `indian-treks-${slugify(meta.trekId)}-fitness-${result.level.id}.pdf`;
  const blob = doc.output('blob');
  triggerFileDownload(blob, filename);
}

export function printFitnessPlanPdf(result: FitnessAssessmentResult, meta: FitnessPlanMeta): void {
  const doc = buildFitnessPlanPdf(result, meta);
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (!printWindow) {
    downloadFitnessPlanPdf(result, meta);
    return;
  }
  printWindow.addEventListener('load', () => {
    printWindow.focus();
    printWindow.print();
  });
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}
