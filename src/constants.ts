/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ── SEGMENTS (Question C) ──────────────────────────────────────────────────
// "Industries" | "Government" | "Builders" | "CHS" | "Social" |
// "Commercial & Residential Infrastructure"

// ── CATEGORIES (Question D) ───────────────────────────────────────────────
// "Flooring" | "Waterproofing" | "Admixtures" | "Powder Repair" |
// "Special Repair" | "Tile Adhesives" | "Wood Coatings"

// Key format: `{Segment}__{Category}` (double underscore to avoid clashes)

export const PDF_MAPPING: Record<string, string> = {

  // ── Industries ────────────────────────────────────────────────────────────
  "Industries__Flooring":        "https://example.com/pdfs/one.pdf",
  "Industries__Waterproofing":   "https://example.com/pdfs/one.pdf",
  "Industries__Admixtures":      "https://example.com/pdfs/two.pdf",
  "Industries__Powder Repair":   "https://example.com/pdfs/two.pdf",
  "Industries__Special Repair":  "https://example.com/pdfs/three.pdf",
  "Industries__Tile Adhesives":  "https://example.com/pdfs/three.pdf",
  "Industries__Wood Coatings":   "https://example.com/pdfs/four.pdf",

  // ── Government ───────────────────────────────────────────────────────────
  "Government__Flooring":        "https://example.com/pdfs/one.pdf",
  "Government__Waterproofing":   "https://example.com/pdfs/two.pdf",
  "Government__Admixtures":      "https://example.com/pdfs/two.pdf",
  "Government__Powder Repair":   "https://example.com/pdfs/three.pdf",
  "Government__Special Repair":  "https://example.com/pdfs/three.pdf",
  "Government__Tile Adhesives":  "https://example.com/pdfs/four.pdf",
  "Government__Wood Coatings":   "https://example.com/pdfs/four.pdf",

  // ── Builders ─────────────────────────────────────────────────────────────
  "Builders__Flooring":          "https://example.com/pdfs/two.pdf",
  "Builders__Waterproofing":     "https://example.com/pdfs/two.pdf",
  "Builders__Admixtures":        "https://example.com/pdfs/three.pdf",
  "Builders__Powder Repair":     "https://example.com/pdfs/three.pdf",
  "Builders__Special Repair":    "https://example.com/pdfs/four.pdf",
  "Builders__Tile Adhesives":    "https://example.com/pdfs/four.pdf",
  "Builders__Wood Coatings":     "https://example.com/pdfs/one.pdf",

  // ── CHS ───────────────────────────────────────────────────────────────────
  "CHS__Flooring":               "https://example.com/pdfs/three.pdf",
  "CHS__Waterproofing":          "https://example.com/pdfs/three.pdf",
  "CHS__Admixtures":             "https://example.com/pdfs/four.pdf",
  "CHS__Powder Repair":          "https://example.com/pdfs/four.pdf",
  "CHS__Special Repair":         "https://example.com/pdfs/one.pdf",
  "CHS__Tile Adhesives":         "https://example.com/pdfs/one.pdf",
  "CHS__Wood Coatings":          "https://example.com/pdfs/two.pdf",

  // ── Social ────────────────────────────────────────────────────────────────
  "Social__Flooring":            "https://example.com/pdfs/four.pdf",
  "Social__Waterproofing":       "https://example.com/pdfs/four.pdf",
  "Social__Admixtures":          "https://example.com/pdfs/one.pdf",
  "Social__Powder Repair":       "https://example.com/pdfs/one.pdf",
  "Social__Special Repair":      "https://example.com/pdfs/two.pdf",
  "Social__Tile Adhesives":      "https://example.com/pdfs/two.pdf",
  "Social__Wood Coatings":       "https://example.com/pdfs/three.pdf",

  // ── Commercial & Residential Infrastructure ───────────────────────────────
  "Commercial & Residential Infrastructure__Flooring":       "https://example.com/pdfs/one.pdf",
  "Commercial & Residential Infrastructure__Waterproofing":  "https://example.com/pdfs/two.pdf",
  "Commercial & Residential Infrastructure__Admixtures":     "https://example.com/pdfs/three.pdf",
  "Commercial & Residential Infrastructure__Powder Repair":  "https://example.com/pdfs/four.pdf",
  "Commercial & Residential Infrastructure__Special Repair": "https://example.com/pdfs/one.pdf",
  "Commercial & Residential Infrastructure__Tile Adhesives": "https://example.com/pdfs/two.pdf",
  "Commercial & Residential Infrastructure__Wood Coatings":  "https://example.com/pdfs/three.pdf",
};

// Uses the FIRST selected segment × FIRST selected category to pick the PDF
export const getPdfUrl = (c: string | null, d: string | null): string => {
  if (!c || !d) return "#";
  const key = `${c}__${d}`;
  return PDF_MAPPING[key] ?? "/pdfs/default.pdf";
};