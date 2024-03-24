import itemList from "~/gameinfo/items.json";

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

  applyItemStats(statBlock, user.armor);
  applyItemStats(statBlock, user.accessory);
  applyItemStats(statBlock, user.weapon);
  applyItemStats(statBlock, user.focus);

  return statBlock;
}

function applyItemStats(statBlock: Stats, id: number) {
  if (id == -1) return;

  let item = itemList.items[id];

  if (item) {
    statBlock.health += item.health;
    statBlock.armor += item.armor;
    statBlock.resist += item.resist;
    statBlock.mana += item.mana;
    statBlock.strength += item.strength;
    statBlock.intelligence += item.intelligence;
    statBlock.wisdom += item.wisdom;
  }
}

export function isEquipped(user: GUser, id: number) {
  return (
    user.armor == id ||
    user.accessory == id ||
    user.focus == id ||
    user.weapon == id ||
    user.skill1 == id ||
    user.skill2 == id ||
    user.skill3 == id
  );
}

export function fakeEquip(user: GUser, id: number) {
  switch (itemList.items[id]?.type) {
    case "armor":
      if (user?.armor == id) user.armor = -1;
      else user.armor = id;
      break;

    case "accessory":
      if (user?.accessory == id) user.accessory = -1;
      else user.accessory = id;
      break;

    case "weapon":
      if (user?.weapon == id) user.weapon = -1;
      else user.weapon = id;
      break;

    case "focus":
      if (user?.focus == id) user.focus = -1;
      else user.focus = id;
      break;

    case "skill1":
      if (user?.skill1 == id) user.skill1 = -1;
      else user.skill1 = id;
      break;

    case "skill2":
      if (user?.skill2 == id) user.skill2 = -1;
      else user.skill2 = id;
      break;

    case "skill3":
      if (user?.skill3 == id) user.skill3 = -1;
      else user.skill3 = id;
      break;

    default:
      break;
  }
}
