const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Panda HR";
pres.title = "Panda HR Analytics";

// ─── SLIDE 1 ─────────────────────────────────────────────────────────────────
{
  let slide = pres.addSlide();
  slide.background = { color: "0F172A" };

  // Title
  slide.addText("Workforce Engagement Snapshot", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontFace: "Arial Black", fontSize: 30, color: "FFFFFF", bold: true, margin: 0,
    shrinkText: true
  });

  // Subtitle
  slide.addText("Real-Time HR Visibility — Powered by Panda", {
    x: 0.5, y: 0.78, w: 9, h: 0.3,
    fontFace: "Calibri", fontSize: 15, color: "F97316", margin: 0
  });

  // LEFT SECTION — Donut simulation
  // Large circle background (dark card)
  slide.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 1.35, w: 2.8, h: 2.8,
    fill: { color: "1E293B" }, line: { color: "1E293B" }
  });

  // "68%" text
  slide.addText("68%", {
    x: 0.7, y: 2.2, w: 2.6, h: 0.8,
    fontFace: "Arial Black", fontSize: 44, color: "FFFFFF", bold: true,
    align: "center", margin: 0
  });

  // "Active" text
  slide.addText("Active", {
    x: 0.7, y: 3.0, w: 2.6, h: 0.3,
    fontFace: "Calibri", fontSize: 13, color: "6B7280",
    align: "center", margin: 0
  });

  // Legend items
  // Green square
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.52, w: 0.18, h: 0.18,
    fill: { color: "10B981" }, line: { color: "10B981" }
  });
  slide.addText("68% Active Employees", {
    x: 0.85, y: 3.5, w: 2.3, h: 0.25,
    fontFace: "Calibri", fontSize: 11, color: "FFFFFF", margin: 0
  });

  // Yellow square
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.87, w: 0.18, h: 0.18,
    fill: { color: "F59E0B" }, line: { color: "F59E0B" }
  });
  slide.addText("22% Moderately Engaged", {
    x: 0.85, y: 3.85, w: 2.5, h: 0.25,
    fontFace: "Calibri", fontSize: 11, color: "FFFFFF", margin: 0
  });

  // Red square
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.22, w: 0.18, h: 0.18,
    fill: { color: "EF4444" }, line: { color: "EF4444" }
  });
  slide.addText("10% At Risk", {
    x: 0.85, y: 4.2, w: 2.3, h: 0.25,
    fontFace: "Calibri", fontSize: 11, color: "FFFFFF", margin: 0
  });

  // RIGHT SECTION — Bar chart card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.7, y: 1.35, w: 5.8, h: 2.8,
    fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }
  });

  // Section title
  slide.addText("Engagement by Team", {
    x: 3.95, y: 1.5, w: 5.3, h: 0.3,
    fontFace: "Calibri", fontSize: 13, color: "111827", bold: true, margin: 0
  });

  // Bar rows — gray background bars first, then colored bars
  const barRows = [
    { label: "Engineering", pct: "82%", color: "3B82F6", barW: 3.0, y: 1.9 },
    { label: "Product",     pct: "74%", color: "3B82F6", barW: 2.72, y: 2.3 },
    { label: "Marketing",   pct: "61%", color: "F97316", barW: 2.24, y: 2.7 },
    { label: "Operations",  pct: "55%", color: "EF4444", barW: 2.02, y: 3.1 },
  ];

  const barX = 5.3;
  const maxBarW = 3.64;

  barRows.forEach(row => {
    // Label
    slide.addText(row.label, {
      x: 3.95, y: row.y, w: 1.3, h: 0.28,
      fontFace: "Calibri", fontSize: 12, color: "111827",
      valign: "middle", margin: 0
    });

    // Gray background bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: row.y + 0.02, w: maxBarW, h: 0.28,
      fill: { color: "E5E7EB" }, line: { color: "E5E7EB" }
    });

    // Colored bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: row.y + 0.02, w: row.barW, h: 0.28,
      fill: { color: row.color }, line: { color: row.color }
    });

    // Percentage label
    slide.addText(row.pct, {
      x: 9.1, y: row.y, w: 0.4, h: 0.28,
      fontFace: "Calibri", fontSize: 12, color: "111827",
      bold: true, align: "right", valign: "middle", margin: 0
    });
  });

  // BOTTOM SECTION — dark strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.5, w: 10, h: 1.0,
    fill: { color: "1E293B" }, line: { color: "1E293B" }
  });

  // Box 1
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.62, w: 0.06, h: 0.75,
    fill: { color: "F97316" }, line: { color: "F97316" }
  });
  slide.addText("2.3x", {
    x: 0.65, y: 4.62, w: 1.5, h: 0.35,
    fontFace: "Calibri", fontSize: 24, color: "F97316", bold: true, margin: 0
  });
  slide.addText("more likely to stay if 2+ activities/month", {
    x: 0.65, y: 4.95, w: 2.5, h: 0.35,
    fontFace: "Calibri", fontSize: 11, color: "FFFFFF", margin: 0
  });

  // Box 2
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.6, y: 4.62, w: 0.06, h: 0.75,
    fill: { color: "F97316" }, line: { color: "F97316" }
  });
  slide.addText("Early Signal", {
    x: 3.75, y: 4.62, w: 2.0, h: 0.3,
    fontFace: "Calibri", fontSize: 14, color: "F97316", bold: true, margin: 0
  });
  slide.addText("Low activity + low interaction = churn risk", {
    x: 3.75, y: 4.92, w: 2.6, h: 0.35,
    fontFace: "Calibri", fontSize: 11, color: "FFFFFF", margin: 0
  });

  // Box 3
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.7, y: 4.62, w: 0.06, h: 0.75,
    fill: { color: "F97316" }, line: { color: "F97316" }
  });
  slide.addText("Real-Time", {
    x: 6.85, y: 4.62, w: 2.0, h: 0.3,
    fontFace: "Calibri", fontSize: 14, color: "F97316", bold: true, margin: 0
  });
  slide.addText("No more guessing — behavior measured live", {
    x: 6.85, y: 4.92, w: 2.9, h: 0.35,
    fontFace: "Calibri", fontSize: 11, color: "FFFFFF", margin: 0
  });
}

// ─── SLIDE 2 ─────────────────────────────────────────────────────────────────
{
  let slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  // Title
  slide.addText("AI-Powered Retention Risk Detection", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontFace: "Arial Black", fontSize: 30, color: "111827", bold: true, margin: 0,
    shrinkText: true
  });

  // Subtitle
  slide.addText("Identify flight risk employees 3-6 months before they leave", {
    x: 0.5, y: 0.78, w: 9, h: 0.3,
    fontFace: "Calibri", fontSize: 14, color: "6B7280", margin: 0
  });

  // LEFT — Risk funnel (3 stacked rects)
  // Rect 1 RED
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 2.8, h: 0.72,
    fill: { color: "EF4444" }, line: { color: "EF4444" }
  });
  slide.addText("HIGH RISK — 12%", {
    x: 0.5, y: 1.3, w: 2.8, h: 0.72,
    fontFace: "Calibri", fontSize: 14, color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0
  });

  // Rect 2 YELLOW
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 2.1, w: 2.4, h: 0.72,
    fill: { color: "F59E0B" }, line: { color: "F59E0B" }
  });
  slide.addText("MEDIUM RISK — 27%", {
    x: 0.7, y: 2.1, w: 2.4, h: 0.72,
    fontFace: "Calibri", fontSize: 13, color: "111827", bold: true,
    align: "center", valign: "middle", margin: 0
  });

  // Rect 3 GREEN
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.9, y: 2.9, w: 2.0, h: 0.72,
    fill: { color: "10B981" }, line: { color: "10B981" }
  });
  slide.addText("LOW RISK — 61%", {
    x: 0.9, y: 2.9, w: 2.0, h: 0.72,
    fontFace: "Calibri", fontSize: 13, color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0
  });

  // RIGHT — Card 1: Warning Patterns
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.7, y: 1.3, w: 5.8, h: 1.5,
    fill: { color: "FFFFFF" }, line: { color: "E5E7EB", width: 1 }
  });
  // Red left border
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.7, y: 1.3, w: 0.07, h: 1.5,
    fill: { color: "EF4444" }, line: { color: "EF4444" }
  });
  slide.addText("Employees Likely to Leave Show:", {
    x: 3.9, y: 1.38, w: 5.5, h: 0.28,
    fontFace: "Calibri", fontSize: 13, color: "111827", bold: true, margin: 0
  });
  slide.addText([
    { text: "\u2193 40% drop in activity participation", options: { color: "EF4444", breakLine: true } },
    { text: "\u2193 Fewer than 2 meaningful connections", options: { color: "EF4444", breakLine: true } },
    { text: "\u2193 No cross-team interactions in 30 days", options: { color: "EF4444" } }
  ], {
    x: 3.9, y: 1.65, w: 5.5, h: 1.0,
    fontFace: "Calibri", fontSize: 12, margin: 0
  });

  // RIGHT — Card 2: Business Impact
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.7, y: 2.9, w: 5.8, h: 1.4,
    fill: { color: "FFFFFF" }, line: { color: "E5E7EB", width: 1 }
  });
  // Orange left border
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.7, y: 2.9, w: 0.07, h: 1.4,
    fill: { color: "F97316" }, line: { color: "F97316" }
  });
  slide.addText("The Cost of Missing This:", {
    x: 3.9, y: 2.98, w: 5.5, h: 0.28,
    fontFace: "Calibri", fontSize: 13, color: "111827", bold: true, margin: 0
  });

  // Left stat
  slide.addText("6-9 months", {
    x: 3.9, y: 3.22, w: 2.5, h: 0.35,
    fontFace: "Calibri", fontSize: 22, color: "F97316", bold: true, margin: 0
  });
  slide.addText("salary to replace one employee", {
    x: 3.9, y: 3.55, w: 2.5, h: 0.3,
    fontFace: "Calibri", fontSize: 11, color: "6B7280", margin: 0
  });

  // Right stat
  slide.addText("3-6 months", {
    x: 6.5, y: 3.22, w: 2.9, h: 0.35,
    fontFace: "Calibri", fontSize: 22, color: "10B981", bold: true, margin: 0
  });
  slide.addText("earlier detection with Panda AI", {
    x: 6.5, y: 3.55, w: 2.9, h: 0.3,
    fontFace: "Calibri", fontSize: 11, color: "6B7280", margin: 0
  });

  // BOTTOM BANNER
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.75, w: 10, h: 0.65,
    fill: { color: "F97316" }, line: { color: "F97316" }
  });
  slide.addText("We don\u2019t just track churn \u2014 we predict and prevent it.", {
    x: 0.5, y: 4.88, w: 9, h: 0.4,
    fontFace: "Calibri", fontSize: 15, color: "FFFFFF",
    bold: true, italic: true, align: "center", margin: 0
  });
}

// ─── SLIDE 3 ─────────────────────────────────────────────────────────────────
{
  let slide = pres.addSlide();
  slide.background = { color: "F9FAFB" };

  // Title
  slide.addText("What Actually Keeps Employees Staying", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontFace: "Arial Black", fontSize: 26, color: "111827", bold: true, margin: 0,
    shrinkText: true
  });

  // Subtitle
  slide.addText("Data-driven behavior patterns from 500+ employee interactions", {
    x: 0.5, y: 0.78, w: 9, h: 0.28,
    fontFace: "Calibri", fontSize: 13, color: "6B7280", margin: 0
  });

  // TOP ROW — 3 stat cards
  const statCards = [
    { x: 0.5,  borderColor: "10B981", stat: "71%",    statSize: 40, statColor: "10B981", desc: "of matches lead to real interactions" },
    { x: 3.6,  borderColor: "3B82F6", stat: "30-40%", statSize: 36, statColor: "3B82F6", desc: "retention increase from cross-team relationships" },
    { x: 6.7,  borderColor: "F97316", stat: "30 days", statSize: 36, statColor: "F97316", desc: "early connection = significantly higher retention" },
  ];

  statCards.forEach(card => {
    // White bg
    slide.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 1.25, w: 2.8, h: 1.1,
      fill: { color: "FFFFFF" }, line: { color: "E5E7EB", width: 1 }
    });
    // Top color border
    slide.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 1.25, w: 2.8, h: 0.06,
      fill: { color: card.borderColor }, line: { color: card.borderColor }
    });
    // Stat
    slide.addText(card.stat, {
      x: card.x + 0.1, y: 1.35, w: 2.6, h: 0.5,
      fontFace: "Arial Black", fontSize: card.statSize, color: card.statColor,
      bold: true, align: "center", margin: 0
    });
    // Description
    slide.addText(card.desc, {
      x: card.x + 0.1, y: 1.88, w: 2.6, h: 0.42,
      fontFace: "Calibri", fontSize: 11, color: "6B7280",
      align: "center", margin: 0
    });
  });

  // MIDDLE — Engagement tier table
  // Header row
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 9, h: 0.38,
    fill: { color: "111827" }, line: { color: "111827" }
  });
  slide.addText("Engagement Level", {
    x: 0.7, y: 2.52, w: 2.4, h: 0.3,
    fontFace: "Calibri", fontSize: 12, color: "FFFFFF", bold: true, margin: 0
  });
  slide.addText("Churn Risk", {
    x: 3.2, y: 2.52, w: 2.0, h: 0.3,
    fontFace: "Calibri", fontSize: 12, color: "FFFFFF", bold: true, margin: 0
  });
  slide.addText("Participation", {
    x: 5.3, y: 2.52, w: 2.4, h: 0.3,
    fontFace: "Calibri", fontSize: 12, color: "FFFFFF", bold: true, margin: 0
  });
  slide.addText("Status", {
    x: 7.8, y: 2.52, w: 1.5, h: 0.3,
    fontFace: "Calibri", fontSize: 12, color: "FFFFFF", bold: true, margin: 0
  });

  // Table rows
  const tableRows = [
    { bg: "D1FAE5", y: 2.88, col1: "Highly Engaged (weekly)", col2: "Very Low", col3: "4+ activities/month", col4: "Retained" },
    { bg: "FEF3C7", y: 3.26, col1: "Moderately Engaged",       col2: "Medium",   col3: "1-3 activities/month", col4: "Monitor" },
    { bg: "FEE2E2", y: 3.64, col1: "Disengaged",               col2: "High",     col3: "Less than 1/month",   col4: "At Risk" },
  ];

  tableRows.forEach(row => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: row.y, w: 9, h: 0.38,
      fill: { color: row.bg }, line: { color: row.bg }
    });
    slide.addText(row.col1, { x: 0.7, y: row.y + 0.05, w: 2.4, h: 0.3, fontFace: "Calibri", fontSize: 12, color: "111827", margin: 0 });
    slide.addText(row.col2, { x: 3.2, y: row.y + 0.05, w: 2.0, h: 0.3, fontFace: "Calibri", fontSize: 12, color: "111827", margin: 0 });
    slide.addText(row.col3, { x: 5.3, y: row.y + 0.05, w: 2.4, h: 0.3, fontFace: "Calibri", fontSize: 12, color: "111827", margin: 0 });
    slide.addText(row.col4, { x: 7.8, y: row.y + 0.05, w: 1.5, h: 0.3, fontFace: "Calibri", fontSize: 12, color: "111827", margin: 0 });
  });

  // BOTTOM ROW — 2 insight cards
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.18, w: 4.3, h: 0.75,
    fill: { color: "F97316" }, line: { color: "F97316" }
  });
  slide.addText("Social + Sports activities outperform passive engagement by 3x", {
    x: 0.7, y: 4.3, w: 3.9, h: 0.5,
    fontFace: "Calibri", fontSize: 13, color: "FFFFFF", bold: true, margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 4.18, w: 4.4, h: 0.75,
    fill: { color: "111827" }, line: { color: "111827" }
  });
  slide.addText("Belonging + communication = strongest drivers of retention", {
    x: 5.3, y: 4.3, w: 4.0, h: 0.5,
    fontFace: "Calibri", fontSize: 13, color: "FFFFFF", bold: true, margin: 0
  });

  // Bottom quote
  slide.addText("Retention is not about perks \u2014 it\u2019s about connection, belonging, and participation.", {
    x: 0.5, y: 5.05, w: 9, h: 0.3,
    fontFace: "Calibri", fontSize: 12, color: "F97316", italic: true, margin: 0
  });
}

// ─── SLIDE 4 ─────────────────────────────────────────────────────────────────
{
  let slide = pres.addSlide();
  slide.background = { color: "0F172A" };

  // Title
  slide.addText("From Data \u2192 Action \u2192 ROI", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontFace: "Arial Black", fontSize: 34, color: "FFFFFF", bold: true, margin: 0
  });

  // Subtitle
  slide.addText("Measurable business impact from day one", {
    x: 0.5, y: 0.78, w: 9, h: 0.3,
    fontFace: "Calibri", fontSize: 15, color: "F97316", margin: 0
  });

  // TOP ROW — 3 metric cards
  const metricCards = [
    { x: 0.5,  stat: "34%",   statSize: 44, statColor: "F97316", line1: "Engagement increase", line2: "within 30 days" },
    { x: 3.6,  stat: "3-6 mo", statSize: 40, statColor: "10B981", line1: "Earlier attrition detection", line2: "window" },
    { x: 6.7,  stat: "12 hrs", statSize: 40, statColor: "3B82F6", line1: "HR time saved", line2: "per month" },
  ];

  metricCards.forEach(card => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 1.25, w: 2.8, h: 1.1,
      fill: { color: "1E293B" }, line: { color: "1E293B" }
    });
    slide.addText(card.stat, {
      x: card.x + 0.1, y: 1.3, w: 2.6, h: 0.5,
      fontFace: "Arial Black", fontSize: card.statSize, color: card.statColor,
      bold: true, align: "center", margin: 0
    });
    slide.addText(card.line1, {
      x: card.x + 0.1, y: 1.85, w: 2.6, h: 0.25,
      fontFace: "Calibri", fontSize: 12, color: "FFFFFF",
      align: "center", margin: 0
    });
    slide.addText(card.line2, {
      x: card.x + 0.1, y: 2.05, w: 2.6, h: 0.25,
      fontFace: "Calibri", fontSize: 11, color: "6B7280",
      align: "center", margin: 0
    });
  });

  // MIDDLE — Before vs After

  // LEFT — Before Panda
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.3, h: 1.9,
    fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }
  });
  // Red header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.3, h: 0.38,
    fill: { color: "EF4444" }, line: { color: "EF4444" }
  });
  slide.addText("Before Panda", {
    x: 0.7, y: 2.6, w: 3.9, h: 0.28,
    fontFace: "Calibri", fontSize: 14, color: "FFFFFF", bold: true, margin: 0
  });

  const beforeItems = [
    "Engagement measured by annual surveys",
    "Churn discovered after resignation",
    "HR relies on manager feedback",
    "No visibility into social connections",
  ];
  beforeItems.forEach((item, i) => {
    const y = 3.0 + i * 0.25;
    slide.addText([
      { text: "X  ", options: { color: "EF4444", bold: false } },
      { text: item, options: { color: "111827" } }
    ], {
      x: 0.7, y: y, w: 4.0, h: 0.25,
      fontFace: "Calibri", fontSize: 12, margin: 0
    });
  });

  // RIGHT — With Panda
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 2.5, w: 4.4, h: 1.9,
    fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }
  });
  // Green header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 2.5, w: 4.4, h: 0.38,
    fill: { color: "10B981" }, line: { color: "10B981" }
  });
  slide.addText("With Panda", {
    x: 5.3, y: 2.6, w: 3.9, h: 0.28,
    fontFace: "Calibri", fontSize: 14, color: "FFFFFF", bold: true, margin: 0
  });

  const afterItems = [
    "Real-time behavioral engagement data",
    "Flight risk detected 3-6 months early",
    "Automated insights, zero HR effort",
    "Full social graph & activity analytics",
  ];
  afterItems.forEach((item, i) => {
    const y = 3.0 + i * 0.25;
    slide.addText([
      { text: "\u2713  ", options: { color: "10B981", bold: false } },
      { text: item, options: { color: "111827" } }
    ], {
      x: 5.3, y: y, w: 4.1, h: 0.25,
      fontFace: "Calibri", fontSize: 12, margin: 0
    });
  });

  // BOTTOM — Action strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.52, w: 10, h: 0.8,
    fill: { color: "1E293B" }, line: { color: "1E293B" }
  });

  const actionItems = [
    { x: 0.3,  text: "Target at-risk employees proactively" },
    { x: 2.8,  text: "Launch data-driven activities per team" },
    { x: 5.3,  text: "Improve onboarding in first 30 days" },
    { x: 7.8,  text: "Build stronger cross-team culture" },
  ];

  actionItems.forEach(item => {
    // Orange dot
    slide.addShape(pres.shapes.RECTANGLE, {
      x: item.x, y: 4.75, w: 0.12, h: 0.12,
      fill: { color: "F97316" }, line: { color: "F97316" }
    });
    // Text
    slide.addText(item.text, {
      x: item.x + 0.17, y: 4.68, w: 2.4, h: 0.35,
      fontFace: "Calibri", fontSize: 13, color: "FFFFFF",
      valign: "middle", margin: 0
    });
  });

  // Bottom quote
  slide.addText("This platform turns employee behavior into actionable HR intelligence.", {
    x: 0.5, y: 5.36, w: 9, h: 0.25,
    fontFace: "Calibri", fontSize: 12, color: "F97316",
    bold: true, italic: true, margin: 0
  });
}

// Save
pres.writeFile({ fileName: "C:/Users/h.monsonego/source/repos/Panda/Panda-HR-Analytics.pptx" })
  .then(() => console.log("DONE: Panda-HR-Analytics.pptx saved"))
  .catch(err => { console.error("ERROR:", err); process.exit(1); });
