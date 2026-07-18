/**
 * Content + generated collections for the TEDxBangkok Youth 2026 page.
 * Mirrors the `renderVals()` logic and the editable props from the
 * original Claude Design document.
 */

export const eventInfo = {
  ticketUrl: "#tickets",
  ticketPrice: "TBA",
  eventDate: "TBA",
};

export const navLinks = [
  { href: "#past", label: "งานปีก่อน ๆ" },
  { href: "#club", label: "TED Club" },
  { href: "#speakers", label: "SPEAKERS" },
  { href: "#team", label: "ทีมงาน" },
  { href: "#sponsors", label: "SPONSORS" },
];

type Swatch = { tagColor: string; tagText: string };

const swatches: Swatch[] = [
  { tagColor: "#EF4899", tagText: "#FFFDF7" },
  { tagColor: "#F9EF3E", tagText: "#111D45" },
  { tagColor: "#02AFDA", tagText: "#FFFDF7" },
  { tagColor: "#00A14B", tagText: "#FFFDF7" },
  { tagColor: "#C82227", tagText: "#FFFDF7" },
];

const rots = [-1.5, 1, -0.8, 1.5, -1, 0.8, -1.2, 1.2, -0.6, 1.4, -1.4, 0.6];

const roles = [
  "Curation",
  "Production",
  "Design",
  "Marketing",
  "Partnership",
  "Experience",
  "Curation",
  "Production",
  "Design",
  "Marketing",
  "Partnership",
  "Experience",
];

export const pastEvents = [
  { id: 1, label: "ปี 1 · 20XX", color: "#EF4899", text: "#FFFDF7", rot: -2 },
  { id: 2, label: "ปี 2 · 20XX", color: "#02AFDA", text: "#FFFDF7", rot: 1.5 },
  { id: 3, label: "ปี 3 · 20XX", color: "#F9EF3E", text: "#111D45", rot: -1 },
  { id: 4, label: "ปี 4 · 20XX", color: "#C82227", text: "#FFFDF7", rot: 2 },
  { id: 5, label: "ปี 5 · 20XX", color: "#00A14B", text: "#FFFDF7", rot: -1.5 },
];

export const speakers = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  rot: rots[i],
  ...swatches[i % swatches.length],
}));

export const team = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  rot: rots[i],
  role: roles[i],
  ...swatches[i % swatches.length],
}));

export const sponsors = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  rot: rots[i] * 0.5,
}));
