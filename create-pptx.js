const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Panda";
pres.title = "Panda – B2B SaaS Internal Social Networking";

// Brand colors (no # prefix)
const C = {
  orange: "F97316",
  darkOrange: "EA580C",
  dark: "111827",
  lightBg: "FFF7ED",
  white: "FFFFFF",
  gray: "6B7280",
  lightGray: "F3F4F6",
  medGray: "E5E7EB",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 });

// ──────────────────────────────────────────────
// SLIDE 1 – TITLE (dark orange bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkOrange };

  // Decorative circles (top-left)
  slide.addShape(pres.shapes.OVAL, { x: -0.6, y: -0.6, w: 2.2, h: 2.2, fill: { color: C.orange, transparency: 60 }, line: { color: C.orange, transparency: 60 } });
  slide.addShape(pres.shapes.OVAL, { x: -0.2, y: -0.2, w: 1.2, h: 1.2, fill: { color: C.white, transparency: 80 }, line: { color: C.white, transparency: 80 } });

  // Decorative rectangle bottom-right
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.8, y: 3.8, w: 2.8, h: 2.5, fill: { color: C.orange, transparency: 40 }, line: { color: C.orange, transparency: 40 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.4, y: 4.3, w: 2.0, h: 1.8, fill: { color: C.white, transparency: 70 }, line: { color: C.white, transparency: 70 } });

  // Main title
  slide.addText("Panda 🐼", {
    x: 0.6, y: 1.1, w: 8.8, h: 1.5,
    fontSize: 54, fontFace: "Arial Black",
    color: C.white, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Subtitle
  slide.addText("Turn your company into a community", {
    x: 0.6, y: 2.65, w: 8.8, h: 0.7,
    fontSize: 22, fontFace: "Calibri",
    color: C.white,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Divider line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.5, w: 3.0, h: 0.04,
    fill: { color: C.white, transparency: 40 }, line: { color: C.white, transparency: 40 },
  });

  // Tagline
  slide.addText("Smart employee matching  ·  Real activities  ·  HR insights", {
    x: 0.6, y: 3.7, w: 8.8, h: 0.55,
    fontSize: 13, fontFace: "Calibri",
    color: C.white,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ──────────────────────────────────────────────
// SLIDE 2 – THE PROBLEM (white bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.white };

  // Orange top bar accent
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  // Title
  slide.addText("Your employees don't know each other", {
    x: 0.5, y: 0.25, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  // 3 stat boxes
  const boxes = [
    { stat: "68%", desc: "of employees feel disconnected at work" },
    { stat: "3x", desc: "worse since remote & hybrid work became the norm" },
    { stat: "$8.8T", desc: "lost globally per year due to low engagement" },
  ];

  boxes.forEach((b, i) => {
    const x = 0.4 + i * 3.1;
    const bW = 2.85;
    const bH = 2.6;
    const bY = 1.2;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: bY, w: bW, h: bH,
      fill: { color: C.orange },
      line: { color: C.orange },
      shadow: makeShadow(),
    });

    // Large stat number
    slide.addText(b.stat, {
      x, y: bY + 0.2, w: bW, h: 1.1,
      fontSize: 52, fontFace: "Arial Black",
      color: C.white, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Description text
    slide.addText(b.desc, {
      x: x + 0.15, y: bY + 1.35, w: bW - 0.3, h: 1.1,
      fontSize: 12.5, fontFace: "Calibri",
      color: C.white,
      align: "center", valign: "top",
      margin: 0,
    });
  });

  // Bottom italic text
  slide.addText("HR teams have no visibility into who is at risk of leaving — until it's too late.", {
    x: 0.5, y: 4.1, w: 9, h: 0.55,
    fontSize: 13, fontFace: "Calibri",
    color: C.gray, italic: true,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ──────────────────────────────────────────────
// SLIDE 3 – THE SOLUTION (light orange bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.lightBg };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("Panda matches people by what they love", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  const cards = [
    { icon: "🤝", title: "Smart Matching", desc: "AI matches employees by shared hobbies and interests" },
    { icon: "📅", title: "Real Activities", desc: "Soccer, yoga, cooking classes, after-work hangouts" },
    { icon: "💬", title: "1:1 Chat", desc: "Connect directly with your best matches" },
    { icon: "🏆", title: "Coins & Rewards", desc: "Gamified engagement keeps people coming back" },
  ];

  const positions = [
    { x: 0.4, y: 1.15 },
    { x: 5.2, y: 1.15 },
    { x: 0.4, y: 3.05 },
    { x: 5.2, y: 3.05 },
  ];
  const cW = 4.4;
  const cH = 1.7;

  cards.forEach((card, i) => {
    const { x, y } = positions[i];

    // White card
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cW, h: cH,
      fill: { color: C.white },
      line: { color: C.medGray, width: 1 },
      shadow: makeShadow(),
    });

    // Orange icon circle
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.2, y: y + 0.35, w: 0.65, h: 0.65,
      fill: { color: C.orange },
      line: { color: C.orange },
    });

    // Icon emoji
    slide.addText(card.icon, {
      x: x + 0.2, y: y + 0.33, w: 0.65, h: 0.65,
      fontSize: 16, align: "center", valign: "middle", margin: 0,
    });

    // Card title
    slide.addText(card.title, {
      x: x + 1.0, y: y + 0.22, w: cW - 1.15, h: 0.45,
      fontSize: 15, fontFace: "Arial Black",
      color: C.dark, bold: true,
      align: "left", valign: "middle",
      margin: 0,
    });

    // Card description
    slide.addText(card.desc, {
      x: x + 1.0, y: y + 0.68, w: cW - 1.15, h: 0.85,
      fontSize: 12.5, fontFace: "Calibri",
      color: C.gray,
      align: "left", valign: "top",
      margin: 0,
    });
  });
}

// ──────────────────────────────────────────────
// SLIDE 4 – HOW IT WORKS (white bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.white };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("Simple 4-step employee experience", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  const steps = [
    { num: "1", title: "Sign Up", desc: "Pick your hobbies\nand interests" },
    { num: "2", title: "Get Matched", desc: "AI finds your best\ncolleagues" },
    { num: "3", title: "Join Activities", desc: "Soccer, yoga,\ndinners and more" },
    { num: "4", title: "Earn Rewards", desc: "Coins, badges,\nand real perks" },
  ];

  steps.forEach((step, i) => {
    const x = 0.5 + i * 2.35;
    const y = 1.3;
    const sW = 1.95;
    const sH = 2.8;

    // Step card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: sW, h: sH,
      fill: { color: C.lightGray },
      line: { color: C.medGray, width: 1 },
      shadow: makeShadow(),
    });

    // Orange number circle
    slide.addShape(pres.shapes.OVAL, {
      x: x + (sW - 0.7) / 2, y: y + 0.2, w: 0.7, h: 0.7,
      fill: { color: C.orange },
      line: { color: C.orange },
    });

    // Number
    slide.addText(step.num, {
      x: x + (sW - 0.7) / 2, y: y + 0.2, w: 0.7, h: 0.7,
      fontSize: 20, fontFace: "Arial Black",
      color: C.white, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Step title
    slide.addText(step.title, {
      x: x + 0.1, y: y + 1.05, w: sW - 0.2, h: 0.45,
      fontSize: 14, fontFace: "Arial Black",
      color: C.dark, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Step description
    slide.addText(step.desc, {
      x: x + 0.1, y: y + 1.5, w: sW - 0.2, h: 1.1,
      fontSize: 12, fontFace: "Calibri",
      color: C.gray,
      align: "center", valign: "top",
      margin: 0,
    });

    // Orange arrow between steps
    if (i < 3) {
      const arrowX = x + sW + 0.08;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: arrowX, y: y + sH / 2 - 0.04, w: 0.22, h: 0.08,
        fill: { color: C.orange }, line: { color: C.orange },
      });
      // Arrowhead (triangle via text)
      slide.addText("▶", {
        x: arrowX + 0.15, y: y + sH / 2 - 0.18, w: 0.2, h: 0.36,
        fontSize: 14, color: C.orange,
        align: "center", valign: "middle", margin: 0,
      });
    }
  });
}

// ──────────────────────────────────────────────
// SLIDE 5 – HR DASHBOARD (white bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.white };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("HR gets full visibility", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  // Left side: 4 metric cards (2x2)
  const metrics = [
    { value: "47", label: "Total Employees" },
    { value: "32", label: "Active This Week (68%)" },
    { value: "8", label: "Activities This Month" },
    { value: "78%", label: "Avg Engagement Score" },
  ];
  const mPositions = [
    { x: 0.4, y: 1.15 },
    { x: 2.65, y: 1.15 },
    { x: 0.4, y: 2.9 },
    { x: 2.65, y: 2.9 },
  ];

  metrics.forEach((m, i) => {
    const { x, y } = mPositions[i];
    const mW = 1.95;
    const mH = 1.55;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: mW, h: mH,
      fill: { color: C.white },
      line: { color: C.medGray, width: 1.5 },
      shadow: makeShadow(),
    });

    // Orange accent left bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.07, h: mH,
      fill: { color: C.orange }, line: { color: C.orange },
    });

    // Metric value
    slide.addText(m.value, {
      x: x + 0.15, y: y + 0.15, w: mW - 0.2, h: 0.7,
      fontSize: 32, fontFace: "Arial Black",
      color: C.dark, bold: true,
      align: "left", valign: "middle",
      margin: 0,
    });

    // Metric label
    slide.addText(m.label, {
      x: x + 0.15, y: y + 0.88, w: mW - 0.2, h: 0.55,
      fontSize: 11, fontFace: "Calibri",
      color: C.gray,
      align: "left", valign: "top",
      margin: 0,
    });
  });

  // Divider
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.85, y: 1.1, w: 0.04, h: 3.5,
    fill: { color: C.medGray }, line: { color: C.medGray },
  });

  // Right side: bullet points
  const bullets = [
    "See who is engaged vs at risk",
    "Track activity participation in real time",
    "Identify disengaged employees early",
    "Monthly engagement reports (PDF export)",
    "Zero extra effort from HR team",
  ];

  bullets.forEach((b, i) => {
    const bY = 1.25 + i * 0.72;

    // Orange checkmark circle
    slide.addShape(pres.shapes.OVAL, {
      x: 5.1, y: bY + 0.03, w: 0.38, h: 0.38,
      fill: { color: C.orange }, line: { color: C.orange },
    });

    slide.addText("✓", {
      x: 5.1, y: bY + 0.03, w: 0.38, h: 0.38,
      fontSize: 13, color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    slide.addText(b, {
      x: 5.6, y: bY, w: 4.0, h: 0.45,
      fontSize: 13.5, fontFace: "Calibri",
      color: C.dark,
      align: "left", valign: "middle",
      margin: 0,
    });
  });
}

// ──────────────────────────────────────────────
// SLIDE 6 – ACTIVITIES (light orange bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.lightBg };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("Real activities, real connections", {
    x: 0.5, y: 0.15, w: 9, h: 0.7,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  const activities = [
    { icon: "⚽", title: "5-a-Side Soccer", detail: "Riverside Park · In 3 days · 5/10 going" },
    { icon: "🎾", title: "Tennis Tournament", detail: "Central Park · In 5 days · 9/16 going" },
    { icon: "🧘", title: "Morning Yoga", detail: "Office Rooftop · In 8 days · 4/15 going" },
    { icon: "🍺", title: "After-Work Drinks", detail: "The Rooftop Bar · In 4 days · 17/30 going" },
    { icon: "🎲", title: "Board Games Night", detail: "The Game Lounge · In 11 days · 3/12 going" },
    { icon: "🍝", title: "Cooking Class", detail: "Kitchen Studio · In 14 days · 3/12 going" },
  ];

  // 2 columns, 3 rows
  activities.forEach((act, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.05 + row * 1.5;
    const aW = 4.4;
    const aH = 1.3;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: aW, h: aH,
      fill: { color: C.white },
      line: { color: C.medGray, width: 1 },
      shadow: makeShadow(),
    });

    // Icon circle
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.18, y: y + 0.25, w: 0.65, h: 0.65,
      fill: { color: C.orange }, line: { color: C.orange },
    });

    slide.addText(act.icon, {
      x: x + 0.18, y: y + 0.23, w: 0.65, h: 0.65,
      fontSize: 18, align: "center", valign: "middle", margin: 0,
    });

    // Activity title
    slide.addText(act.title, {
      x: x + 1.0, y: y + 0.12, w: aW - 1.15, h: 0.45,
      fontSize: 14, fontFace: "Arial Black",
      color: C.dark, bold: true,
      align: "left", valign: "middle",
      margin: 0,
    });

    // Activity detail
    slide.addText(act.detail, {
      x: x + 1.0, y: y + 0.6, w: aW - 1.15, h: 0.55,
      fontSize: 11.5, fontFace: "Calibri",
      color: C.gray,
      align: "left", valign: "top",
      margin: 0,
    });
  });
}

// ──────────────────────────────────────────────
// SLIDE 7 – MATCHING ALGORITHM (white bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.white };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("Smart matching, not random pairing", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  // Left box: Employee A
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.1, w: 2.6, h: 2.4,
    fill: { color: C.lightBg },
    line: { color: C.medGray, width: 1 },
    shadow: makeShadow(),
  });

  slide.addText([
    { text: "👤 Employee A", options: { bold: true, breakLine: true, fontSize: 14, fontFace: "Arial Black", color: C.dark } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Tennis · Yoga · Travel · Photography", options: { fontSize: 12, fontFace: "Calibri", color: C.gray } },
  ], { x: 0.5, y: 1.2, w: 2.4, h: 2.2, valign: "top", margin: 0 });

  // Center box: Panda AI
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.4, y: 1.1, w: 3.2, h: 2.4,
    fill: { color: C.orange },
    line: { color: C.orange },
    shadow: makeShadow(),
  });

  slide.addText([
    { text: "🐼 Panda AI", options: { bold: true, breakLine: true, fontSize: 15, fontFace: "Arial Black", color: C.white } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Embedding similarity + shared hobbies + cross-team bonus", options: { fontSize: 12, fontFace: "Calibri", color: C.white } },
  ], { x: 3.5, y: 1.2, w: 3.0, h: 2.2, valign: "top", margin: 0 });

  // Right box: Employee B
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7.0, y: 1.1, w: 2.6, h: 2.4,
    fill: { color: C.lightBg },
    line: { color: C.medGray, width: 1 },
    shadow: makeShadow(),
  });

  slide.addText([
    { text: "👤 Employee B", options: { bold: true, breakLine: true, fontSize: 14, fontFace: "Arial Black", color: C.dark } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Hiking · Yoga · Travel · Art", options: { fontSize: 12, fontFace: "Calibri", color: C.gray } },
  ], { x: 7.1, y: 1.2, w: 2.4, h: 2.2, valign: "top", margin: 0 });

  // Arrows between boxes
  slide.addText("→", { x: 3.05, y: 2.05, w: 0.4, h: 0.5, fontSize: 28, color: C.orange, align: "center", valign: "middle", margin: 0 });
  slide.addText("→", { x: 6.6, y: 2.05, w: 0.4, h: 0.5, fontSize: 28, color: C.orange, align: "center", valign: "middle", margin: 0 });

  // Match score
  slide.addText("87% match score", {
    x: 1.0, y: 3.7, w: 8.0, h: 0.72,
    fontSize: 44, fontFace: "Arial Black",
    color: C.orange, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Small subtext
  slide.addText("Powered by OpenAI embeddings — understands meaning, not just keywords", {
    x: 1.0, y: 4.5, w: 8.0, h: 0.45,
    fontSize: 12, fontFace: "Calibri",
    color: C.gray, italic: true,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ──────────────────────────────────────────────
// SLIDE 8 – TRACTION (light gray bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.lightGray };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("Built for companies like yours", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  // Company placeholder boxes
  const companies = [
    { name: "TechCorp", icon: "🏢" },
    { name: "StartupXYZ", icon: "🚀" },
    { name: "EnterpriseABC", icon: "📊" },
  ];

  companies.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    const cW = 2.7;
    const cH = 1.2;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.1, w: cW, h: cH,
      fill: { color: C.white },
      line: { color: C.medGray, width: 1.5 },
      shadow: makeShadow(),
    });

    slide.addText(co.icon + "  " + co.name, {
      x, y: 1.1, w: cW, h: cH,
      fontSize: 16, fontFace: "Arial Black",
      color: C.dark, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });
  });

  // 3 metric boxes
  const metrics = [
    { value: "↑ 34%", label: "avg engagement lift after 30 days" },
    { value: "71%", label: "of matches lead to real meetups" },
    { value: "12hrs", label: "HR hours saved per month" },
  ];

  metrics.forEach((m, i) => {
    const x = 0.5 + i * 3.1;
    const mW = 2.7;
    const mH = 1.7;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.55, w: mW, h: mH,
      fill: { color: C.orange },
      line: { color: C.orange },
      shadow: makeShadow(),
    });

    slide.addText(m.value, {
      x, y: 2.62, w: mW, h: 0.8,
      fontSize: 38, fontFace: "Arial Black",
      color: C.white, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    slide.addText(m.label, {
      x: x + 0.1, y: 3.42, w: mW - 0.2, h: 0.7,
      fontSize: 11.5, fontFace: "Calibri",
      color: C.white,
      align: "center", valign: "top",
      margin: 0,
    });
  });

  // Footer note
  slide.addText("*Based on pilot data", {
    x: 0.5, y: 4.45, w: 9, h: 0.4,
    fontSize: 11, fontFace: "Calibri",
    color: C.gray, italic: true,
    align: "left", valign: "middle",
    margin: 0,
  });
}

// ──────────────────────────────────────────────
// SLIDE 9 – PRICING (white bg)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.white };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });

  slide.addText("Simple, transparent pricing", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: "Arial Black",
    color: C.dark, bold: true,
    align: "left", valign: "middle",
    margin: 0,
  });

  const tiers = [
    {
      name: "FREEMIUM",
      headerColor: "6B7280",
      price: "Free",
      priceSize: 32,
      priceSuffix: "",
      features: "Up to 50 employees\nBasic matching\nActivity feed\nCommunity support",
      cta: "Get Started",
      ctaBg: "6B7280",
      popular: false,
      offset: 0,
    },
    {
      name: "PROFESSIONAL",
      headerColor: C.orange,
      price: "$6",
      priceSize: 44,
      priceSuffix: "/user/month",
      features: "Up to 500 employees\nAI matching\nHR dashboard\nEngagement reports\nPriority support",
      cta: "Start Free Trial",
      ctaBg: C.orange,
      popular: true,
      offset: 0,
    },
    {
      name: "ENTERPRISE",
      headerColor: C.dark,
      price: "Custom",
      priceSize: 28,
      priceSuffix: "",
      features: "Unlimited employees\nCustom integrations\nSSO · Dedicated CSM\nSLA guarantee",
      cta: "Contact Us",
      ctaBg: C.dark,
      popular: false,
      offset: 0,
    },
  ];

  tiers.forEach((tier, i) => {
    const isCenter = i === 1;
    const x = 0.35 + i * 3.15;
    const cardY = isCenter ? 0.95 : 1.2;
    const cW = 2.9;
    const cH = isCenter ? 4.45 : 4.0;

    // Card shadow + border
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cW, h: cH,
      fill: { color: C.white },
      line: { color: isCenter ? C.orange : C.medGray, width: isCenter ? 2 : 1 },
      shadow: makeShadow(),
    });

    // "Most Popular" badge for center
    if (isCenter) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.55, y: cardY - 0.32, w: 1.8, h: 0.35,
        fill: { color: C.orange }, line: { color: C.orange },
      });
      slide.addText("Most Popular", {
        x: x + 0.55, y: cardY - 0.32, w: 1.8, h: 0.35,
        fontSize: 10, fontFace: "Calibri",
        color: C.white, bold: true,
        align: "center", valign: "middle",
        margin: 0,
      });
    }

    // Header bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cW, h: 0.55,
      fill: { color: tier.headerColor }, line: { color: tier.headerColor },
    });

    slide.addText(tier.name, {
      x, y: cardY, w: cW, h: 0.55,
      fontSize: 11, fontFace: "Arial Black",
      color: C.white, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Price
    if (tier.priceSuffix) {
      slide.addText([
        { text: tier.price, options: { fontSize: tier.priceSize, bold: true, fontFace: "Arial Black", color: C.dark } },
        { text: " " + tier.priceSuffix, options: { fontSize: 12, fontFace: "Calibri", color: C.gray } },
      ], {
        x: x + 0.1, y: cardY + 0.6, w: cW - 0.2, h: 0.7,
        align: "center", valign: "middle", margin: 0,
      });
    } else {
      slide.addText(tier.price, {
        x: x + 0.1, y: cardY + 0.6, w: cW - 0.2, h: 0.7,
        fontSize: tier.priceSize, fontFace: "Arial Black",
        color: C.dark, bold: true,
        align: "center", valign: "middle",
        margin: 0,
      });
    }

    // Features
    slide.addText(tier.features, {
      x: x + 0.2, y: cardY + 1.4, w: cW - 0.4, h: 2.1,
      fontSize: 11.5, fontFace: "Calibri",
      color: C.dark,
      align: "left", valign: "top",
      margin: 0,
    });

    // CTA button
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.4, y: cardY + cH - 0.7, w: cW - 0.8, h: 0.42,
      fill: { color: tier.ctaBg }, line: { color: tier.ctaBg },
    });

    slide.addText(tier.cta, {
      x: x + 0.4, y: cardY + cH - 0.7, w: cW - 0.8, h: 0.42,
      fontSize: 12, fontFace: "Calibri",
      color: C.white, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });
  });
}

// ──────────────────────────────────────────────
// SLIDE 10 – CTA (dark orange bg like slide 1)
// ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkOrange };

  // Decorative circles
  slide.addShape(pres.shapes.OVAL, { x: 7.8, y: -0.5, w: 2.5, h: 2.5, fill: { color: C.orange, transparency: 60 }, line: { color: C.orange, transparency: 60 } });
  slide.addShape(pres.shapes.OVAL, { x: -0.7, y: 3.8, w: 2.0, h: 2.0, fill: { color: C.white, transparency: 75 }, line: { color: C.white, transparency: 75 } });

  // Title
  slide.addText("Ready to connect your team?", {
    x: 0.5, y: 0.35, w: 9, h: 1.1,
    fontSize: 40, fontFace: "Arial Black",
    color: C.white, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Subtitle
  slide.addText("Start your free 30-day pilot — no credit card required", {
    x: 0.5, y: 1.4, w: 9, h: 0.6,
    fontSize: 19, fontFace: "Calibri",
    color: C.white,
    align: "center", valign: "middle",
    margin: 0,
  });

  // 3 white cards
  const ctaCards = [
    { icon: "📧", title: "Get in touch", detail: "hello@panda.app" },
    { icon: "🚀", title: "Free Pilot", detail: "30 days, your real employees" },
    { icon: "📊", title: "We Set It Up", detail: "Onboarding done for you" },
  ];

  ctaCards.forEach((card, i) => {
    const x = 0.6 + i * 3.0;
    const cW = 2.7;
    const cH = 1.85;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.15, w: cW, h: cH,
      fill: { color: C.white },
      line: { color: C.white },
      shadow: makeShadow(),
    });

    // Icon
    slide.addText(card.icon, {
      x, y: 2.22, w: cW, h: 0.65,
      fontSize: 28, align: "center", valign: "middle", margin: 0,
    });

    // Card title
    slide.addText(card.title, {
      x: x + 0.1, y: 2.88, w: cW - 0.2, h: 0.45,
      fontSize: 14, fontFace: "Arial Black",
      color: C.dark, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Card detail
    slide.addText(card.detail, {
      x: x + 0.1, y: 3.35, w: cW - 0.2, h: 0.55,
      fontSize: 12, fontFace: "Calibri",
      color: C.gray,
      align: "center", valign: "top",
      margin: 0,
    });
  });

  // Bottom URL text
  slide.addText("panda.app  ·  hello@panda.app", {
    x: 0.5, y: 4.35, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: C.white,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ──────────────────────────────────────────────
// Save
// ──────────────────────────────────────────────
pres.writeFile({ fileName: "C:\\Users\\h.monsonego\\source\\repos\\Panda\\Panda-Demo.pptx" })
  .then(() => console.log("✅ Panda-Demo.pptx created successfully!"))
  .catch(err => { console.error("❌ Error:", err); process.exit(1); });
