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
  mana: number;
  strength: number;
  intelligence: number;
  wisdom: number;
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

export function fakeBuy(user: GUser, id: number) {
  var item = getItem(id);
  if (user.gold >= item?.value) {
    user.gold -= item?.value;
    var temp = user.items.split("");
    temp[id] = "1";
    user.items = temp.join("");
  }
}

export function getItemName(id: number): string {
  var ret = "";
  itemList.items.map((value, index) => {
    if (index == id) ret = value.name;
  });

  return ret;
}

export function getItem(id: number): Item | undefined {
  var ret;
  itemList.items.map((value, index) => {
    if (index == id) ret = value;
  });

  return ret;
}

export function getItemIDFromName(name: string): number {
  var ret = -1;
  itemList.items.map((value, index) => {
    if (name == value.name) ret = index;
  });

  return ret;
}

export function getProblemsCompleted(user: GUser): number {
  var sum = 0;
  for (var i = 0; i < user.problems.length; i++)
    if (user.problems[i] == "1") sum++;

  return sum;
}

//Users start at level 1.
//Add a level for every 10 problems completed.
//i.e. a user with 25 problems completed would be level 3.
//Levels determine game difficulty scaling
//and what items are avaliable in the shop
export function getLevel(user: GUser): number {
  var sum = getProblemsCompleted(user);

  return Math.floor(sum / 10) + 1;
}
