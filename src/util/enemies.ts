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
    strength: 3,
    armor: 3,
    magic: 0,
    resist: -2
  }
};

export default enemies;
