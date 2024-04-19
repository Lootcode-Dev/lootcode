type Enemies = Record<string, Enemy>;

export interface Enemy {
  name: string;
  image: string;
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
    image: "/rat.png",
    health: 25,
    critChance: 1,
    strength: 2,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Goblin: {
    name: "Goblin",
    image: "/goblin.png",
    health: 25,
    critChance: 1,
    strength: 2,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Toilet: {
    name: "Toilet",
    image: "/goblin.png",
    health: 69,
    critChance: 1,
    strength: 2,
    armor: 1,
    magic: 0,
    resist: 1,
  },
};

export default enemies;
