export const races = [
  { id: 13, value: "Aasimar" },
  { id: 14, value: "Catfolk" },
  { id: 1, value: "Dwarf" },
  { id: 12, value: "Dragonborn" },
  { id: 2, value: "Elf" },
  { id: 3, value: "Gnome" },
  { id: 4, value: "Halfling" },
  { id: 5, value: "Half-elf" },
  { id: 6, value: "Half-orc" },
  { id: 7, value: "Human" },
  { id: 15, value: "Tengu" },
  { id: 22, value: "Tiefling" },
  { id: 10, value: "Bird" },
  { id: 8, value: "Black Bear" },
  { id: 9, value: "Mountain Lion" },
];

export const alignments = [
  { id: 12, value: "Lawful Good" },
  { id: 13, value: "Lawful Neutral" },
  { id: 14, value: "Lawful Evil" },
  { id: 15, value: "Neutral Good" },
  { id: 16, value: "True Neutral" },
  { id: 17, value: "Neutral Evil" },
  { id: 18, value: "Chaotic Good" },
  { id: 19, value: "Chaotic Neutral" },
  { id: 20, value: "Chaotic Evil" },
];

export const getAlignment = (al:string): number => {
  return alignments.find(a => a.value === al)?.id || 0;
}

export const getRaces = (rce:string): number => {
  return races.find(r => r.value === rce)?.id || 0;
}
