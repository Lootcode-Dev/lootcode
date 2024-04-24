type Enemies = Record<string, Enemy>;

export interface Enemy {
  name: string;
  health: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
}

const enemies: Enemies = {
  Rat: {
    name: "Rat",
    health: 25,
    critChance: 1,
    strength: 2,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Goblin: {
    name: "Goblin",
    health: 25,
    critChance: 1,
    strength: 2,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Typo: {
    name: "Typo",
    health: 15,
    critChance: 5,
    strength: 1,
    armor: 1,
    magic: 1,
    resist: 1,
  },
  Cultist: {
    name: "Cultist",
    health: 75,
    critChance: 2,
    strength: 0,
    armor: 1,
    magic: 4,
    resist: 3,
  },
  Pointar: {
    name: "Chief Pointar",
    health: 90,
    critChance: 1,
    strength: 5,
    armor: 3,
    magic: 0,
    resist: -2
  },
  Homeowner: {
    name: "Homeowner",
    health: 25,
    critChance: 1,
    strength: 1,
    armor: 0,
    magic: 1,
    resist: 1
  },
  Leak: {
    name: "Leak",
    health: 35,
    critChance: 1,
    strength: 0,
    armor: -1,
    magic: 4,
    resist: 5,
  },
  Duelist: {
    name: "Duelist",
    health: 50,
    critChance: 4,
    strength: 1,
    armor: 2,
    magic: 1,
    resist: 2
  },
  Minion: {
    name: "Minion",
    critChance: 0,
    health: 10,
    strength: 1,
    armor: 1,
    magic: 0,
    resist: -1
  },
  Rocko: {
    name: "Rocko",
    critChance: 0,
    health: 100,
    strength: 2,
    armor: -5,
    magic: 0,
    resist: 3
  },
  Pebble: {
    name: "Pebble",
    critChance: 5,
    health: 20,
    strength: 2,
    armor: -2,
    magic: 0,
    resist: 3
  },
  Hooligan: {
    name: "Hooligan",
    critChance: 1,
    health: 25,
    strength: 1,
    armor: 1,
    magic: 2,
    resist: 1
  },
  Oh_rangutang: {
    name: "Oh-rangutang",
    critChance: 4,
    health: 15,
    strength: 3,
    armor: 0,
    magic: 0,
    resist: -1
  },
  Spider: {
    name: "Spider",
    critChance: 1,
    health: 5,
    strength: 0,
    armor: 0,
    magic: 6,
    resist: 0
  },
  Beaver: {
    name: "Beaver",
    critChance: 0,
    health: 25,
    strength: 2,
    armor: 5,
    magic: 0,
    resist: -3
  }
};

export default enemies;
