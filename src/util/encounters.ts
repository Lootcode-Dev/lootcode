type Encounters = Record<string, Encounter[]>;

type Encounter = {
  name: string;
  image: string;
  health: number;
  attackSpeed: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
};

const encounters: Encounters = {
  fortnite: [
    {
      name: "Rat",
      image: "/rat.png",
      health: 100,
      attackSpeed: 1,
      critChance: 0.1,
      strength: 10,
      armor: 0,
      magic: 0,
      resist: 0,
    },
    {
      name: "Goblin",
      image: "/goblin.png",
      health: 200,
      attackSpeed: 1,
      critChance: 0.1,
      strength: 20,
      armor: 0,
      magic: 0,
      resist: 0,
    },
  ],
  test: [
    {
      name: "Rat",
      image: "/rat.png",
      health: 100000,
      attackSpeed: 1,
      critChance: 0.1,
      strength: 10,
      armor: 0,
      magic: 0,
      resist: 0,
    },
    {
      name: "Goblin",
      image: "/goblin.png",
      health: 200,
      attackSpeed: 1,
      critChance: 0.1,
      strength: 20,
      armor: 0,
      magic: 0,
      resist: 0,
    },
  ],
};

export default encounters;
