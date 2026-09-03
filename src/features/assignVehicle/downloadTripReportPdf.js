import { jsPDF } from "jspdf";
import logoUrl from "../../assets/images/Logo.svg";

const PAGE_W = 297;
const PAGE_H = 210;
const MARGIN_X = 20;
const TABLE_MARGIN_X = MARGIN_X;
const TABLE_W = PAGE_W - TABLE_MARGIN_X * 2;
const TABLE_FONT_SIZE = 9.5;

const COLOR = {
  black: [0, 0, 0],
  white: [255, 255, 255],
  yellow: [253, 185, 20],
  text: [17, 17, 17],
  label: [115, 115, 115],
  subtitle: [120, 120, 120],
  border: [220, 220, 220],
  headerBg: [245, 245, 245],
  headerMuted: [180, 180, 180],
  green: [22, 163, 74],
  blue: [59, 130, 246],
  red: [248, 113, 113],
  muted: [82, 82, 91],
};

const DUMMY_STOPS = [
  { name: "Mumbai Pav Pickup (Start Point)" },
  { name: "MUMBAI PAV GANDHI BAZAR" },
  { name: "MUMBAI PAV JUHU BEACH" },
  { name: "MUMBAI PAV BANDRA FORT" },
  { name: "MUMBAI PAV WORLI SEA FACE" },
  { name: "Mumbai Pav Pickup (End Point)" },
];

const IN_FRACTIONS = [0, 55 / 255, 116 / 255, 148 / 255, 191 / 255, 1];
const OUT_FRACTIONS = [0, 94 / 255, 135 / 255, 172 / 255, 226 / 255, 1];
const DWELL_SECONDS = [9, 38 * 60 + 59, 19 * 60 + 8, 24 * 60 + 6, 34 * 60 + 52, null];
const DISTANCES_KM = [null, 8.75, 8.64, 4.57, 11.56, 14.72];

function parseTimeToMinutes(value) {
  const match = String(value || "")
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 8 * 60 + 25;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const mer = match[3].toUpperCase();
  if (mer === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }
  return hours * 60 + minutes;
}

function formatMinutes(total) {
  const normalized = ((Math.round(total) % (24 * 60)) + 24 * 60) % (24 * 60);
  let hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const mer = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  if (hours === 0) hours = 12;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${mer}`;
}

function formatTimeSpent(seconds) {
  if (seconds == null) return "-";
  if (seconds < 60) return `${seconds} sec`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function formatTripDate(value) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value || "-";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(parsed));
}

function formatDuration(startMin, endMin) {
  const mins = Math.max(Math.round(endMin - startMin), 0);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  if (hours === 0) return `${minutes} minutes`;
  if (hours === 1) return `1 hour ${minutes} minutes`;
  return `${hours} hours ${minutes} minutes`;
}

function getReportStatus(status) {
  const key = String(status || "").toLowerCase().trim();
  if (key === "ongoing") return { label: "Ongoing", color: COLOR.blue };
  if (key === "delivered" || key === "completed") {
    return { label: "Delivered", color: COLOR.yellow };
  }
  if (key === "expired") return { label: "Expired", color: COLOR.red };
  return { label: "Upcoming", color: COLOR.green };
}

function fitText(pdf, text, maxWidth) {
  const value = String(text ?? "");
  if (pdf.getTextWidth(value) <= maxWidth) return value;
  let next = value;
  while (next.length > 1 && pdf.getTextWidth(`${next}...`) > maxWidth) {
    next = next.slice(0, -1);
  }
  return `${next}...`;
}

export function buildDummyTripReport(item) {
  const startMin = parseTimeToMinutes(item.pickupTime);
  const parsedEnd = parseTimeToMinutes(item.deliveryTime);
  const endMin = parsedEnd > startMin ? parsedEnd : startMin + 4 * 60 + 15;
  const durationMin = endMin - startMin;

  const checkpoints = DUMMY_STOPS.map((stop, index) => {
    const distance = DISTANCES_KM[index];
    return {
      index: index + 1,
      checkpoint: stop.name,
      inTime: formatMinutes(startMin + IN_FRACTIONS[index] * durationMin),
      outTime: formatMinutes(startMin + OUT_FRACTIONS[index] * durationMin),
      timeSpent: formatTimeSpent(DWELL_SECONDS[index]),
      distance: distance == null ? "-" : `${distance.toFixed(2)} km`,
    };
  });

  return {
    tripId: item.tripId || "-",
    tripDate: formatTripDate(item.pickupDate),
    vehicle: item.vehicleNumber || "-",
    driver: item.driverName || "Unassigned",
    status: getReportStatus(item.status),
    start: formatMinutes(startMin),
    end: formatMinutes(endMin),
    checkpoints,
    totalDistance: "48.23 km",
    totalDuration: formatDuration(startMin, endMin),
    checkpointCount: String(checkpoints.length),
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function getLogoDataUrl() {
  const img = await loadImage(logoUrl);
  const canvas = document.createElement("canvas");
  const scale = 4;
  canvas.width = Math.max(img.naturalWidth * scale, 1);
  canvas.height = Math.max(img.naturalHeight * scale, 1);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return {
    dataUrl: canvas.toDataURL("image/png"),
    ratio: img.naturalWidth / img.naturalHeight,
  };
}

function drawHeader(pdf, logo) {
  const headerH = 17;
  const padX = 20;
  pdf.setFillColor(...COLOR.black);
  pdf.rect(0, 0, PAGE_W, headerH, "F");

  if (logo?.dataUrl) {
    const logoH = 5.2;
    const logoW = logoH * logo.ratio;
    pdf.addImage(logo.dataUrl, "PNG", padX, (headerH - logoH) / 2, logoW, logoH);
  } else {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...COLOR.white);
    pdf.text("Safar", padX, headerH / 2 + 2);
    pdf.setTextColor(...COLOR.yellow);
    pdf.text("Trak", padX + pdf.getTextWidth("Safar"), headerH / 2 + 2);
  }

  return headerH;
}

function drawTitleBlock(pdf, report, y) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(...COLOR.black);
  pdf.text("Trip Report", MARGIN_X, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(...COLOR.subtitle);
  pdf.text("Trip execution and checkpoint movement summary", MARGIN_X, y + 6);

  const metaX = PAGE_W - MARGIN_X;
  const dateText = String(report.tripDate || "-");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...COLOR.black);
  const dateW = pdf.getTextWidth(dateText);
  pdf.text(dateText, metaX, y, { align: "right" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...COLOR.subtitle);
  pdf.text("TRIP DATE : ", metaX - dateW, y, { align: "right" });

  return y + 6;
}

function drawMetricCards(pdf, report, y) {
  // const cols = [
  //   { label: "TRIP ID", value: String(report.tripId).toUpperCase() },
  //   { label: "VEHICLE", value: report.vehicle },
  //   { label: "DRIVER", value: report.driver },
  //   { label: "TRIP DATE", value: report.tripDate },
  //   { label: "STATUS", value: report.status.label },
  // ];
  // const colW = TABLE_W / cols.length;
  // const headerH = 9;
  // const valueH = 10;
  // const padX = 5;
  // const tableH = headerH + valueH;
  //
  // pdf.setDrawColor(...COLOR.border);
  // pdf.setLineWidth(0.3);
  // pdf.setFillColor(...COLOR.headerBg);
  // pdf.rect(TABLE_MARGIN_X, y, TABLE_W, headerH, "FD");
  // pdf.rect(TABLE_MARGIN_X, y + headerH, TABLE_W, valueH, "S");
  //
  // cols.forEach((col, index) => {
  //   const x = TABLE_MARGIN_X + index * colW;
  //   if (index > 0) {
  //     pdf.line(x, y, x, y + tableH);
  //   }
  //
  //   pdf.setFont("helvetica", "normal");
  //   pdf.setFontSize(TABLE_FONT_SIZE);
  //   pdf.setTextColor(...COLOR.black);
  //   pdf.text(col.label, x + padX, y + 6);
  //
  //   pdf.setFont("helvetica", "bold");
  //   pdf.setFontSize(TABLE_FONT_SIZE);
  //   pdf.setTextColor(...COLOR.black);
  //   pdf.text(fitText(pdf, col.value, colW - padX * 2), x + padX, y + headerH + 6.5);
  // });
  //
  // return y + tableH;

  const cards = [
    { label: "TRIP ID", value: String(report.tripId).toUpperCase() },
    { label: "VEHICLE", value: report.vehicle },
    { label: "DRIVER", value: report.driver },
    { label: "START TIME", value: report.start },
    { label: "END TIME", value: report.end },
    { label: "STATUS", value: report.status.label, color: report.status.color },
  ];
  const gap = 2.6;
  const cardW = (TABLE_W - gap * (cards.length - 1)) / cards.length;
  const cardH = 18;
  const padX = 4.2;

  cards.forEach((card, index) => {
    const x = TABLE_MARGIN_X + index * (cardW + gap);

    pdf.setFillColor(...COLOR.white);
    pdf.setDrawColor(...COLOR.border);
    pdf.setLineWidth(0.3);
    pdf.rect(x, y, cardW, cardH, "FD");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(TABLE_FONT_SIZE);
    pdf.setTextColor(...COLOR.label);
    pdf.text(card.label, x + padX, y + 6);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(TABLE_FONT_SIZE);
    pdf.setTextColor(...(card.color || COLOR.text));
    pdf.text(fitText(pdf, card.value, cardW - padX * 2), x + padX, y + 13.2);
  });

  return y + cardH;
}

function drawSectionTitle(pdf, title, y) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(...COLOR.black);
  pdf.text(title, MARGIN_X, y);
  return y + 4;
}

function drawCheckpointsTable(pdf, checkpoints, y) {
  const indexW = 18;
  const timeW = (TABLE_W - indexW - 88) / 4;
  const cols = [
    { key: "index", label: "#", width: indexW, align: "center" },
    { key: "checkpoint", label: "Checkpoint", width: 88, align: "left" },
    { key: "inTime", label: "In Time", width: timeW, align: "center" },
    { key: "outTime", label: "Out Time", width: timeW, align: "center" },
    { key: "timeSpent", label: "Time Spent", width: timeW, align: "center" },
    { key: "distance", label: "Distance", width: timeW, align: "right" },
  ];
  const headerH = 9;
  const rowH = 10;
  const padX = 5;
  const fontSize = TABLE_FONT_SIZE;

  function cellTextX(colX, width, align) {
    if (align === "right") return colX + width - padX;
    if (align === "center") return colX + width / 2;
    return colX + padX;
  }

  pdf.setFillColor(...COLOR.black);
  pdf.rect(TABLE_MARGIN_X, y, TABLE_W, headerH, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(fontSize);
  pdf.setTextColor(...COLOR.white);
  let x = TABLE_MARGIN_X;
  cols.forEach((col, colIndex) => {
    if (colIndex > 0) {
      pdf.setDrawColor(...COLOR.white);
      pdf.setLineWidth(0.2);
      pdf.line(x, y, x, y + headerH);
    }
    pdf.text(col.label, cellTextX(x, col.width, col.align), y + 6, {
      align: col.align,
    });
    x += col.width;
  });

  let rowY = y + headerH;
  checkpoints.forEach((row) => {
    pdf.setDrawColor(...COLOR.border);
    pdf.setLineWidth(0.25);
    pdf.rect(TABLE_MARGIN_X, rowY, TABLE_W, rowH);

    x = TABLE_MARGIN_X;
    cols.forEach((col, colIndex) => {
      if (colIndex > 0) pdf.line(x, rowY, x, rowY + rowH);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(fontSize);
      pdf.setTextColor(...COLOR.text);
      const value = fitText(pdf, row[col.key], col.width - padX * 2);
      pdf.text(value, cellTextX(x, col.width, col.align), rowY + 6.5, {
        align: col.align,
      });
      x += col.width;
    });

    rowY += rowH;
  });

  return rowY;
}

function drawSummary(pdf, report, y) {
  // const cols = [
  //   { label: "Total Distance", value: report.totalDistance },
  //   { label: "Total Duration", value: report.totalDuration },
  //   { label: "Checkpoints", value: report.checkpointCount },
  // ];
  // const colW = TABLE_W / cols.length;
  // const headerH = 9;
  // const valueH = 10;
  // const padX = 5;
  // const tableH = headerH + valueH;
  //
  // pdf.setDrawColor(...COLOR.border);
  // pdf.setLineWidth(0.3);
  // pdf.setFillColor(...COLOR.headerBg);
  // pdf.rect(TABLE_MARGIN_X, y, TABLE_W, headerH, "FD");
  // pdf.rect(TABLE_MARGIN_X, y + headerH, TABLE_W, valueH, "S");
  //
  // cols.forEach((col, index) => {
  //   const x = TABLE_MARGIN_X + index * colW;
  //   if (index > 0) {
  //     pdf.line(x, y, x, y + tableH);
  //   }
  //
  //   pdf.setFont("helvetica", "normal");
  //   pdf.setFontSize(TABLE_FONT_SIZE);
  //   pdf.setTextColor(...COLOR.black);
  //   pdf.text(col.label, x + padX, y + 6);
  //
  //   pdf.setFont("helvetica", "bold");
  //   pdf.setFontSize(TABLE_FONT_SIZE);
  //   pdf.setTextColor(...COLOR.text);
  //   pdf.text(fitText(pdf, col.value, colW - padX * 2), x + padX, y + headerH + 6.5);
  // });

  const colW = TABLE_W / 3;
  const cols = [
    { label: "Total Distance", value: report.totalDistance, width: colW, align: "left" },
    { label: "Total Duration", value: report.totalDuration, width: colW, align: "left" },
    { label: "Checkpoints", value: report.checkpointCount, width: colW, align: "left" },
  ];
  const headerH = 9;
  const rowH = 10;
  const padX = 5;
  const fontSize = TABLE_FONT_SIZE;

  function cellTextX(colX, width, align) {
    if (align === "right") return colX + width - padX;
    if (align === "center") return colX + width / 2;
    return colX + padX;
  }

  pdf.setFillColor(...COLOR.black);
  pdf.rect(TABLE_MARGIN_X, y, TABLE_W, headerH, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(fontSize);
  pdf.setTextColor(...COLOR.white);
  let x = TABLE_MARGIN_X;
  cols.forEach((col, colIndex) => {
    if (colIndex > 0) {
      pdf.setDrawColor(...COLOR.white);
      pdf.setLineWidth(0.2);
      pdf.line(x, y, x, y + headerH);
    }
    pdf.text(col.label, cellTextX(x, col.width, col.align), y + 6, {
      align: col.align,
    });
    x += col.width;
  });

  const rowY = y + headerH;
  pdf.setDrawColor(...COLOR.border);
  pdf.setLineWidth(0.25);
  pdf.rect(TABLE_MARGIN_X, rowY, TABLE_W, rowH);

  x = TABLE_MARGIN_X;
  cols.forEach((col, colIndex) => {
    if (colIndex > 0) pdf.line(x, rowY, x, rowY + rowH);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...COLOR.text);
    const value = fitText(pdf, col.value, col.width - padX * 2);
    pdf.text(value, cellTextX(x, col.width, col.align), rowY + 6.5, {
      align: col.align,
    });
    x += col.width;
  });

  return rowY + rowH;
}

function drawFooter(pdf, pageNumber = 1) {
  const lineY = PAGE_H - 10;
  const textY = PAGE_H - 6.2;

  pdf.setDrawColor(...COLOR.border);
  pdf.setLineWidth(0.25);
  pdf.line(MARGIN_X, lineY, PAGE_W - MARGIN_X, lineY);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.3);
  pdf.setTextColor(...COLOR.headerMuted);
  pdf.text(`SafarTrak ${String.fromCharCode(183)} Trip Report`, MARGIN_X, textY);
  pdf.text(`Page ${pageNumber}`, PAGE_W - MARGIN_X, textY, { align: "right" });
}

export async function downloadTripReportPdf(item) {
  const report = buildDummyTripReport(item);
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  let logo = null;
  try {
    logo = await getLogoDataUrl();
  } catch {
    logo = null;
  }

  const headerH = drawHeader(pdf, logo);
  let y = headerH + 14;
  y = drawTitleBlock(pdf, report, y);
  y = drawMetricCards(pdf, report, y + 4);
  y = drawSectionTitle(pdf, "Trip Checkpoints", y + 12);
  y = drawCheckpointsTable(pdf, report.checkpoints, y);
  y = drawSectionTitle(pdf, "Trip Summary", y + 10);
  drawSummary(pdf, report, y);
  drawFooter(pdf, pdf.getNumberOfPages());

  pdf.save(`trip-report-${report.tripId || "export"}.pdf`);
}
