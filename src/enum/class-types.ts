export const charClasses: CharClass[] = [
  { className: "Barbarian", classID: 1 },
  { className: "Bard", classID: 2 },
  { className: "Cleric", classID: 3 },
  { className: "Druid", classID: 4 },
  { className: "Fighter", classID: 5 },
  { className: "Magus", classID: 14 },
  { className: "Monk", classID: 6 },
  { className: "Paladin", classID: 7 },
  { className: "Ranger", classID: 8 },
  { className: "Rogue", classID: 9 },
  { className: "Sorcerer", classID: 10 },
  { className: "Sorceress", classID: 13 },
  { className: "Wizard", classID: 11 },
  { className: "Animal", classID: 12 },
];

export interface CharClass {
  classID: number;
  className: string;
}
