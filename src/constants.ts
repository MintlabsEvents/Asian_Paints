// Agenda option values from FormPage match these keys EXACTLY
export const AGENDA_PDF_MAPPING: Record<string, string> = {
  "Dealer Profitability":
    "https://drive.google.com/uc?export=download&id=1ORooinf6m7eMgx1imIIZYI6ZZNYy0cUX",

  "Expand Contractor Network":
    "https://drive.google.com/uc?export=download&id=1jTowox389VK34H2ehhSPJV4gDdKTAkBO",

  "Expand Dealer Network":
    "https://drive.google.com/uc?export=download&id=1sog1htnU9Dq6Kum2dohCLQCjt1uRP-dE",

  "Surface Share Gain":
    "https://drive.google.com/uc?export=download&id=1b5uUhR9wQLPrun_C-_04ZyCHcqLVkKtQ",

  "Engage Network":
    "https://drive.google.com/uc?export=download&id=1CWhPgacVzIDF_yVMtE5dukxQ2F25Ixok",
};

// Takes the agenda value directly (e.g. "Dealer Profitability")
export const getPdfUrl = (agenda: string | null | undefined): string => {
  if (!agenda) return "#";
  return AGENDA_PDF_MAPPING[agenda] || "#";
};