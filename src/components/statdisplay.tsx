"use client";

import {
  CloverIcon,
  CoinsIcon,
  HeartIcon,
  ShieldIcon,
  SparkleIcon,
  SwordIcon,
  Wand2,
} from "lucide-react";
import { GUser, getLevel, getUserStats } from "~/app/game/utility";
import ItemDisplay from "./itemdisplay";
import GameRules from "./gamerules";

interface IParams {
  name: string;
  user: GUser;
}

export default function StatDisplay({ name, user }: IParams) {
  const stats = getUserStats(user);

  return (
    <div className="m-4 flex h-[80vh] flex-col rounded-xl bg-[#15162c] p-2">
      <div className="flex items-center justify-center pb-6 text-2xl font-bold">
        <div className="mr-2">{name}</div>
        <GameRules />
      </div>
      <div className="grid grid-cols-2 justify-items-center">
        <div className="flex items-center text-2xl">
          {"Lvl. " + getLevel(user)}
        </div>
        <div className="flex items-center text-2xl">
          <CoinsIcon className="mr-1"></CoinsIcon> {"" + user.gold}
        </div>
      </div>
      <div className="my-4 grid grid-cols-3 justify-around gap-4">
        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <ShieldIcon className="mr-1"></ShieldIcon>
            {"" + stats.armor}
          </div>
          <div className="text-sm">Armor</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <SparkleIcon className="mr-1"></SparkleIcon>
            {"" + stats.resist}
          </div>
          <div className="text-sm">Resist</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <Wand2 className="mr-1"></Wand2>
            {"" + stats.magic}
          </div>
          <div className="text-sm">Magic</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <SwordIcon className="mr-1"></SwordIcon>
            {"" + stats.strength}
          </div>
          <div className="text-sm">Strength</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <HeartIcon className="mr-1"></HeartIcon>
            {"" + stats.health}
          </div>
          <div className="text-sm">Health</div>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <div className="flex items-center text-2xl">
            <CloverIcon className="mr-1"></CloverIcon>
            {"" + stats.critChance}
          </div>
          <div className="text-sm">Critical Strike</div>
        </div>
      </div>
      <div className="m-2 my-4 text-center text-2xl font-bold">Equipped</div>
      <div className="grid grid-cols-1 gap-2 overflow-auto scroll-smooth">
        {user.armor != -1 ? <ItemDisplay id={user.armor} /> : <div />}
        {user.accessory != -1 ? <ItemDisplay id={user.accessory} /> : <div />}
        {user.weapon != -1 ? <ItemDisplay id={user.weapon} /> : <div />}
        {user.focus != -1 ? <ItemDisplay id={user.focus} /> : <div />}
      </div>
    </div>
  );
}
