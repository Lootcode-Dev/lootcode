export interface GUser {
  id: string;
  email: string;
  problems: string;
  items: string;
  gold: number;
  armor: number;
  accessory: number;
  weapon: number;
  focus: number;
  skill1: number;
  skill2: number;
  skill3: number;
}

export type Stats = {
  health: number;
  mana: number;
  wisdom: number;
  strength: number;
  intelligence: number;
  armor: number;
  resist: number;
};

export type Entity = {
  image: string;
  name: string;

  health: number;
  maxHealth: number;

  //true if entity is the player
  player: boolean;

  //mana is used for spells
  mana: number;
  maxMana: number;

  strength: number; //physical damage
  intelligence: number; //magic damage

  wisdom: number; //mana regen

  armor: number; //resist physical damage
  resist: number; //resist magical damage
};

export function getUserStats(user: GUser): Stats {
  let statBlock: Stats = {
    health: 10,
    mana: 10,
    wisdom: 1,
    strength: 0,
    intelligence: 0,
    armor: 0,
    resist: 0,
  };

  return statBlock;
}
