"use client";

import {
  GUser,
  Stats,
  fakeBuy,
  fakeEquip,
  getItem,
  getItemName,
  getLevel,
  getUserStats,
  isEquipped,
} from "~/app/game/utility";
import itemList from "~/util/items.json";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  BrainIcon,
  CoinsIcon,
  FlaskRound,
  LoaderIcon,
  PlusIcon,
  ShieldIcon,
  SparkleIcon,
  SwordIcon,
  Wand2,
} from "lucide-react";
import ItemDisplay from "./itemdisplay";
import StatDisplay from "./statdisplay";

interface IParams {
  name: string;
  user: GUser;
}

export default function Shop({ name, user }: IParams) {
  const [stats, setStats] = useState<Stats>(getUserStats(user));
  const [getUser, setUser] = useState<GUser>(user);
  const [fetching, setFetching] = useState(false);
  const [selItem, setSelItem] = useState(-1);

  const { data: newUser, refetch: buyCallback } = api.game.buyItem.useQuery(
    {
      item: selItem,
    },
    { enabled: false, retry: false },
  );

  useEffect(() => {
    if (selItem != -1) {
      setFetching(true);
      buyCallback().then((response) => {
        if (response != undefined) {
          setUser(response.data ?? getUser);
          setSelItem(-1);
          setFetching(false);
        }
      });
    }
  }, [selItem]);

  return (
    <div className="flex flex-row">
      <StatDisplay name={name} user={getUser} />
      <div className="m-4 h-[80vh] w-[70vw] rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
        <div className="m-2 text-left text-3xl">
          <div className="flex items-center gap-2">
            Shop
            {fetching ? <LoaderIcon /> : <div />}
          </div>
          <div className="my-4 grid auto-cols-max grid-flow-col gap-4">
            {itemList.items.map((value, index) =>
              value.level <= getLevel(getUser) ? (
                getUser.items[index] == "1" ? (
                  <div
                    className="cursor-pointer rounded border border-purple-700 bg-purple-950 p-4 duration-150 hover:bg-[#15162c]"
                    key={index}
                  >
                    <div className="grid grid-cols-2 justify-between text-base font-normal">
                      Owned
                      <div className="items-right flex justify-end">
                        <div>{"" + getItem(index)?.value}</div>
                        <CoinsIcon />
                      </div>
                    </div>

                    <ItemDisplay id={index} />
                  </div>
                ) : getItem(index)?.value <= getUser.gold ? (
                  <div
                    className="cursor-pointer rounded border border-purple-700 bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() => setSelItem(index)}
                    key={index}
                  >
                    <div className="grid grid-cols-2 justify-between text-base font-normal">
                      Purchase
                      <div className="items-right flex justify-end">
                        <div>{"" + getItem(index)?.value}</div>
                        <CoinsIcon />
                      </div>
                    </div>

                    <ItemDisplay id={index} />
                  </div>
                ) : (
                  <div
                    className="cursor-pointer rounded border border-red-700 bg-red-950 p-4 duration-150 hover:bg-[#15162c]"
                    key={index}
                  >
                    <div className="grid grid-cols-2 justify-between text-base font-normal">
                      Not Enough Gold
                      <div className="items-right flex justify-end">
                        <div>{"" + getItem(index)?.value}</div>
                        <CoinsIcon />
                      </div>
                    </div>

                    <ItemDisplay id={index} />
                  </div>
                )
              ) : (
                <div />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
