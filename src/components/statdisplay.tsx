"use client";

import {
  GUser,
  Stats,
  fakeEquip,
  getItemName,
  getLevel,
  getUserStats,
  isEquipped,
} from "~/app/game/utility";
import itemList from "~/gameinfo/items.json";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  BrainIcon,
  CoinsIcon,
  FlaskRound,
  PlusIcon,
  ShieldIcon,
  SparkleIcon,
  SwordIcon,
  Wand2,
} from "lucide-react";
import ItemDisplay from "./itemdisplay";

interface IParams {
  name: string;
  user: GUser;
}

export default function StatDisplay({ name, user }: IParams) {
  const stats = getUserStats(user);

  return (
    <div className="m-4 flex flex-col rounded-xl bg-[#15162c] p-2">
      <div className="grid grid-cols-2 justify-items-center">
        <div>
          <div className="flex items-center text-2xl font-bold">{name}</div>
          <div className="flex items-center text-2xl">
            {"Lvl. " + getLevel(user)}
          </div>
        </div>
        <div>
          <div className="flex items-center text-2xl">
            <PlusIcon></PlusIcon> {"" + stats.health}
          </div>
          <div className="flex items-center text-2xl">
            <CoinsIcon></CoinsIcon> {"" + user.gold}
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-3 justify-around gap-4">
        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <ShieldIcon></ShieldIcon>
            {"" + stats.armor}
          </div>
          <div className="text-sm">Armor</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <SparkleIcon></SparkleIcon>
            {"" + stats.resist}
          </div>
          <div className="text-sm">Resist</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <FlaskRound></FlaskRound>
            {"" + stats.mana}
          </div>
          <div className="text-sm">Mana</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <SwordIcon></SwordIcon>
            {"" + stats.strength}
          </div>
          <div className="text-sm">Strength</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <Wand2></Wand2>
            {"" + stats.intelligence}
          </div>
          <div className="text-sm">Intelligence</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <BrainIcon></BrainIcon>
            {"" + stats.wisdom}
          </div>
          <div className="text-sm">Wisdom</div>
        </div>
      </div>
      <div className="m-2 my-4 text-center text-2xl font-bold">Equipped</div>
      <div className="flex grid grid-cols-1 gap-2 overflow-auto scroll-smooth">
        {user.armor != -1 ? <ItemDisplay id={user.armor} /> : <div />}
        {user.accessory != -1 ? <ItemDisplay id={user.accessory} /> : <div />}
        {user.weapon != -1 ? <ItemDisplay id={user.weapon} /> : <div />}
        {user.focus != -1 ? <ItemDisplay id={user.focus} /> : <div />}
        {user.skill1 != -1 ? <ItemDisplay id={user.skill1} /> : <div />}
        {user.skill2 != -1 ? <ItemDisplay id={user.skill2} /> : <div />}
        {user.skill3 != -1 ? <ItemDisplay id={user.skill3} /> : <div />}
      </div>
    </div>
  );
}
