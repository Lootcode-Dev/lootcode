"use client";

import { CoinsIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getItem, getLevel, type GUser } from "~/app/game/utility";
import { api } from "~/trpc/react";
import itemList from "~/util/items.json";
import ItemDisplay from "./itemdisplay";
import StatDisplay from "./statdisplay";
import { Item } from "~/app/game/utility";

interface IParams {
  name: string;
  user: GUser;
}

export default function Shop({ name, user }: IParams) {
  const [getUser, setUser] = useState<GUser>(user);
  const [fetching, setFetching] = useState(false);
  const [selItem, setSelItem] = useState(-1);

  const items = [...itemList.items].sort((a, b) => {
    const groupA = Math.floor(a.value / 50);
    const groupB = Math.floor(b.value / 50);

    if (groupA < groupB) {
      return -1;
    }
    if (groupA > groupB) {
      return 1;
    }
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });

  // Log the sum of the values of the items
  console.log(items.reduce((acc, item) => acc + (item as Item).value, 0));

  // Log the sum of the values of the items at each level
  console.log(
    items.reduce(
      (acc, item) => {
        const group = Math.floor((item as Item).value / 50);
        acc[group] = (acc[group] ?? 0) + (item as Item).value;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  const itemIndexes: number[] = [];
  items.map((val, index) => {
    itemIndexes[index] = itemList.items.findIndex(
      (item) => item.name == val.name,
    );
  });

  const { refetch: buyCallback } = api.game.buyItem.useQuery(
    {
      item: selItem,
    },
    { enabled: false, retry: false },
  );

  useEffect(() => {
    if (selItem != -1) {
      setFetching(true);
      void buyCallback().then((response) => {
        if (response != undefined) {
          setUser(response.data ?? getUser);
          setSelItem(-1);
          setFetching(false);
        }
      });
    }
  }, [buyCallback, getUser, selItem]);

  return (
    <div className="mt-2 flex flex-col md:flex-row">
      <StatDisplay name={name} user={getUser} />
      <div className="m-4 h-[60vh] overflow-auto rounded-xl bg-[#15162c] p-2 text-center font-bold text-white md:h-[80vh] md:w-[70vw]">
        <div className="m-2 text-left text-3xl">
          <div className="flex items-center gap-2">
            Shop
            {fetching ? <LoaderIcon className="animate-spin" /> : <div />}
          </div>
          <div className="my-4 flex flex-wrap">
            {items.map((value, index) =>
              getUser.items[itemIndexes[index] ?? 0] == "1" ? (
                <div
                  className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-950 p-4 duration-150 hover:bg-[#15162c]"
                  key={index}
                >
                  <div className="grid grid-cols-2 justify-between text-base font-normal">
                    Owned
                    <div className="items-right flex justify-end">
                      <div>{"" + getItem(itemIndexes[index] ?? 0)?.value}</div>
                      <CoinsIcon />
                    </div>
                  </div>

                  <ItemDisplay id={itemIndexes[index] ?? 0} />
                </div>
              ) : value.level > getLevel(user) ? (
                <div
                  className="m-2 cursor-pointer rounded border border-red-700 bg-red-950 p-4 duration-150 hover:bg-[#15162c]"
                  key={index}
                >
                  <div className="grid grid-cols-2 justify-between text-base font-normal">
                    {`Level ${value.level}`}
                    <div className="items-right flex justify-end">
                      <div>{"" + getItem(itemIndexes[index] ?? 0)?.value}</div>
                      <CoinsIcon />
                    </div>
                  </div>

                  <ItemDisplay id={itemIndexes[index] ?? 0} />
                </div>
              ) : value.value <= getUser.gold ? (
                <div
                  className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
                  onClick={() =>
                    !fetching && setSelItem(itemIndexes[index] ?? 0)
                  }
                  key={index}
                >
                  <div className="grid grid-cols-2 justify-between text-base font-normal">
                    Purchase
                    <div className="items-right flex justify-end">
                      <div>{"" + getItem(itemIndexes[index] ?? 0)?.value}</div>
                      <CoinsIcon />
                    </div>
                  </div>

                  <ItemDisplay id={itemIndexes[index] ?? 0} />
                </div>
              ) : (
                <div
                  className="m-2 cursor-pointer rounded border border-red-700 bg-red-950 p-4 duration-150 hover:bg-[#15162c]"
                  key={index}
                >
                  <div className="grid grid-cols-2 justify-between text-base font-normal">
                    Not Enough Gold
                    <div className="items-right flex justify-end">
                      <div>{"" + getItem(itemIndexes[index] ?? 0)?.value}</div>
                      <CoinsIcon />
                    </div>
                  </div>

                  <ItemDisplay id={itemIndexes[index] ?? 0} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
