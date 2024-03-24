"use client";

import {
  GUser,
  Stats,
  fakeEquip,
  getUserStats,
  isEquipped,
} from "~/app/game/utility";
import itemList from "~/gameinfo/items.json";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

interface IParams {
  user: GUser;
}

export default function Inventory({ user }: IParams) {
  const [stats, setStats] = useState<Stats>(getUserStats(user));
  const [getUser, setUser] = useState<GUser>(user);
  const [fetching, setFetching] = useState(false);
  const [selItem, setSelItem] = useState(-1);

  const { data: newUser, refetch: equipCallback } =
    api.game.equipItemID.useQuery(
      {
        item: selItem,
      },
      { enabled: false, retry: false },
    );

  useEffect(() => {
    if (selItem != -1) {
      //nightmare fire and brimstone race condition
      //if ppl swap items too fast (display desyncs)

      //Will fix when I figure out a better way to do this
      let temp = getUser;
      fakeEquip(temp, selItem);

      setUser(temp);
      setStats(getUserStats(temp));

      equipCallback();
      setSelItem(-1);
    }
  }, [selItem]);

  return (
    <div className="mb-2 grow rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
      <div className="grid grid-cols-2">
        <div className="text-2xl">{"Health: " + stats.health}</div>
        <div className="text-2xl">{"Gold: " + getUser.gold}</div>
      </div>
      <div className="my-4 grid grid-cols-3 rounded border">
        <div>{"Armor: " + stats.armor}</div>
        <div>{"Resist: " + stats.resist}</div>
        <div>{"Mana: " + stats.mana}</div>
        <div>{"Strength: " + stats.strength}</div>
        <div>{"Intelligence: " + stats.intelligence}</div>
        <div>{"Wisdom: " + stats.wisdom}</div>
      </div>
      <div className="my-4 grid grid-cols-3 gap-2 rounded border p-2">
        {itemList.items.map((value, index) =>
          getUser.items[index] == "1" ? (
            <div
              className="cursor-pointer rounded border bg-purple-700 duration-150 hover:bg-[#15162c]"
              onClick={() => setSelItem(index)}
              key={index}
            >
              <div className="">
                {value.name + (isEquipped(getUser, index) ? " (E)" : "")}
              </div>
              <div>
                {value.health != 0 ? "" + value.health + " Health" : ""}
              </div>
              <div>{value.armor != 0 ? "" + value.armor + " Armor" : ""}</div>
              <div>
                {value.resist != 0 ? "" + value.resist + " Resist" : ""}
              </div>
              <div>{value.mana != 0 ? "" + value.mana + " Mana" : ""}</div>
              <div>
                {value.strength != 0 ? "" + value.strength + " Strength" : ""}
              </div>
              <div>
                {value.intelligence != 0
                  ? "" + value.intelligence + " Intelligence"
                  : ""}
              </div>
              <div>
                {value.wisdom != 0 ? "" + value.wisdom + " Wisdom" : ""}
              </div>
            </div>
          ) : (
            <div />
          ),
        )}
      </div>
    </div>
  );
}
