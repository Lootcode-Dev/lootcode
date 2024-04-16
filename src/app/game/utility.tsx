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

export interface Item {
  name: string;
  desc: string;
  image: string;
  type: string;
  value: number;
  level: number;

  health: number;
  armor: number;
  resist: number;
  critChance: number;
  strength: number;
  magic: number;
}

export type Stats = {
  health: number;
  attackSpeed: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
};

export type Entity = {
  image: string;
  name: string;

  health: number;
  attackSpeed: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
};

export function getUserStats(user: GUser): Stats {
  const statBlock: Stats = {
    health: 1000,
    attackSpeed: 1,
    critChance: 3,
    strength: 0,
    armor: 0,
    magic: 0,
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

  const item = itemList.items[id];

  if (item) {
    statBlock.health += item.health;
    statBlock.armor += item.armor;
    statBlock.resist += item.resist;
    statBlock.magic += item.magic;
    statBlock.strength += item.strength;
    statBlock.critChance += item.critChance;
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

export function fakeBuy(user: GUser, id: number) {
  const item = getItem(id);
  if (item && user.gold >= item.value) {
    user.gold -= item?.value ?? 0;
    const temp = user.items.split("");
    temp[id] = "1";
    user.items = temp.join("");
  }
}

export function getItemName(id: number): string {
  let ret = "";
  itemList.items.map((value, index) => {
    if (index == id) ret = value.name;
  });

  return ret;
}

export function getItem(id: number): Item | undefined {
  let ret;
  itemList.items.map((value, index) => {
    if (index == id) ret = value;
  });

  return ret;
}

export function getItemIDFromName(name: string): number {
  let ret = -1;
  itemList.items.map((value, index) => {
    if (name == value.name) ret = index;
  });

  return ret;
}

export function getProblemsCompleted(user: GUser): number {
  let sum = 0;
  for (const problem of user.problems) {
    if (problem === "1") {
      sum++;
    }
  }

  return sum;
}

//Users start at level 1.
//Add a level for every 10 problems completed.
//i.e. a user with 25 problems completed would be level 3.
//Levels determine game difficulty scaling
//and what items are avaliable in the shop
export function getLevel(user: GUser): number {
  const sum = getProblemsCompleted(user);

  return Math.floor(sum / 10) + 1;
}
