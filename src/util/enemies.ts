type Enemies = Record<string, Enemy>;

export interface Enemy {
  name: string;
  image: string;
  health: number;
  attackSpeed: number;
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
    health: 50,
    attackSpeed: 1,
    critChance: 1,
    strength: 250,
    armor: 0,
    magic: 0,
    resist: 0,
  },
  Goblin: {
    name: "Goblin",
    image: "/goblin.png",
    health: 200,
    attackSpeed: 1,
    critChance: 1,
    strength: 1,
    armor: 0,
    magic: 0,
    resist: 0,
  },
};

export default enemies;
