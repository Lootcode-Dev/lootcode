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
    health: 15,
    critChance: 5,
    strength: 2,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Goblin: {
    name: "Goblin",
    health: 25,
    critChance: 15,
    strength: 2,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Typo: {
    name: "Typo",
    health: 15,
    critChance: 30,
    strength: 1,
    armor: 1,
    magic: 1,
    resist: 1,
  },
  Cultist: {
    name: "Cultist",
    health: 60,
    critChance: 15,
    strength: 0,
    armor: 1,
    magic: 4,
    resist: 3,
  },
  Pointar: {
    name: "Chief Pointar",
    health: 90,
    critChance: 5,
    strength: 5,
    armor: 3,
    magic: 0,
    resist: -3
  },
  Homeowner: {
    name: "Homeowner",
    health: 20,
    critChance: 5,
    strength: 1,
    armor: 0,
    magic: 1,
    resist: 1
  },
  Leak: {
    name: "Leak",
    health: 25,
    critChance: 8,
    strength: 0,
    armor: -1,
    magic: 4,
    resist: 5,
  },
  Duelist: {
    name: "Duelist",
    health: 40,
    critChance: 30,
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
    health: 80,
    strength: 2,
    armor: -5,
    magic: 0,
    resist: 3
  },
  Pebble: {
    name: "Pebble",
    critChance: 30,
    health: 20,
    strength: 2,
    armor: -2,
    magic: 0,
    resist: 3
  },
  Hooligan: {
    name: "Hooligan",
    critChance: 5,
    health: 20,
    strength: 1,
    armor: 1,
    magic: 2,
    resist: 1
  },
  Oh_rangutang: {
    name: "Oh-rangutang",
    critChance: 30,
    health: 15,
    strength: 3,
    armor: 0,
    magic: 0,
    resist: -1
  },
  Spider: {
    name: "Spider",
    critChance: 8,
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
  },
  Rogue_Soldier: {
    name: "Rogue Soldier",
    critChance: 10,
    health: 70,
    strength: 5,
    armor: 1,
    magic: 0,
    resist: -1
  },
  Tuo: {
    name: "Prophet Tuo",
    critChance: 5,
    health: 25,
    strength: 1,
    armor: -2,
    magic: 3,
    resist: 3
  },
  Tuos_Complement: {
    name: "Tuo's Complement",
    critChance: 5,
    health: 25,
    strength: 3,
    armor: 3,
    magic: 1,
    resist: -2
  },
  Root2: {
    name: "Root of 2",
    critChance: 8,
    health: 30,
    strength: 1.41,
    armor: 2,
    magic: 2,
    resist: 1

  },
  Pi: {
    name: "Pi",
    health: 25,
    critChance: 8,
    strength: 1,
    armor: -2,
    magic: 3.14,
    resist: 2
  },
  Blighted_Tree: {
    name: "Blighted Tree",
    health: 30, 
    critChance: 15,
    strength: 0,
    armor: 4,
    magic: 4,
    resist: -2
  },
  Thief: {
    name: "Thief",
    health: 20,
    critChance: 30,
    strength: 2, 
    armor: -3,
    magic: 0,
    resist: 5
  },
  Bubbles: {
    name: "Bubbles",
    health: 15,
    critChance: 10,
    strength: 1,
    armor: 0,
    magic: 0,
    resist: 0
  },
  Angry_Student: {
    name: "Angry Student",
    health: 20,
    critChance: 10,
    strength: 1,
    armor: 1,
    magic: 0,
    resist: 0
  },
  Overdue_Queuesgardian: {
    name: "Overdue Queuesgardian",
    health: 30,
    critChance: 10,
    strength: 3,
    armor: -3,
    magic: 1,
    resist: 1
  },
  Euler: {
    name: "Euler",
    health: 50,
    critChance: 30,
    strength: 1,
    armor: 0,
    magic: 5,
    resist: 4
  },
  Blight_Fae: {
    name: "Blight Fae",
    health: 50, 
    critChance: 30,
    strength: 0,
    armor: -2,
    magic: 4,
    resist: 2
  },
  Mick: {
    name: "Mick Palmford",
    health: 50,
    critChance: 50,
    strength: 1,
    armor: -2,
    magic: 3,
    resist: 1
  },
  Tector: {
    name: "Tector Sod-dunk",
    health: 50,
    critChance: 10,
    strength: 3,
    armor: 2,
    magic: 0,
    resist: -4
  },
  Jimbo: {
    name: "Jimbo Sod-dunk",
    health: 20,
    critChance: 30,
    strength: 2,
    armor: 0,
    magic: 1,
    resist: -1
  },
  Tavern: {
    name: "Lou's Tavern",
    health: 100,
    critChance: 0,
    armor: 9,
    strength: 1,
    magic: 0,
    resist: -2
  },
  Demolitionist: {
    name: "Demolitionist",
    health: 80,
    armor: 5,
    strength: 5,
    critChance: 0,
    magic: 0,
    resist: -4
  },
  Edge: {
    name: "Corrupt Edge",
    health: 20,
    armor: -1,
    strength: 0,
    critChance: 30,
    magic: 3,
    resist: 2
  },
  WishEnder: {
    name: "Wish-Ender",
    health: 75,
    armor: -3,
    strength: 0,
    magic: 5,
    resist: 5,
    critChance: 10
  },
  TechnicaIngoramus: {
    name: "Technica Ingoramus",
    critChance: 30,
    health: 300,
    armor: 5,
    strength: 1,
    resist: 5,
    magic: 1
  }
};

export default enemies;
