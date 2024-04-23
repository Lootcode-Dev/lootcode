type Encounters = Record<string, string[]>;

const encounters: Encounters = {
  fanatic: ["Cultist"],
  typos:["Typo", "Typo"],
  test: ["Rat", "Goblin"],
  coup: ["Pointar"],
  eviction: ["Homeowner", "Homeowner", "Homeowner"],
  leaks: ["Leak", "Leak"],
  mob_stacking: ["Minion", "Minion", "Minion", "Minion", "Duelist"],
  avalanche:  ["Pebble", "Rocko"],
  hooliga_n_s: ["Hooligan", "Hooligan", "Hooligan"]
};

export default encounters;
