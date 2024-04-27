"use client";

import { CoinsIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GUser, Stats, getItem, getUserStats } from "~/app/game/utility";
import { api } from "~/trpc/react";
import itemList from "~/util/items.json";
import ItemDisplay from "./itemdisplay";
import StatDisplay from "./statdisplay";
import { isMobile } from "react-device-detect";
import Mobile from "./mobile";

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
      void buyCallback().then((response) => {
        if (response != undefined) {
          setUser(response.data ?? getUser);
          setSelItem(-1);
          setFetching(false);
        }
      });
    }
  }, [selItem]);

  // Check if the user is a mobile user
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="flex flex-row">
      <StatDisplay name={name} user={getUser} />
      <div className="m-4 h-[80vh] w-[70vw] overflow-auto rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
        <div className="m-2 text-left text-3xl">
          <div className="flex items-center gap-2">
            Shop
            {fetching ? <LoaderIcon /> : <div />}
          </div>
          <div className="my-4 flex flex-wrap">
            {itemList.items.map((value, index) =>
              getUser.items[index] == "1" ? (
                <div
                  className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-950 p-4 duration-150 hover:bg-[#15162c]"
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
              ) : getItem(index)?.value ?? 0 <= getUser.gold ? (
                <div
                  className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
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
                  className="m-2 cursor-pointer rounded border border-red-700 bg-red-950 p-4 duration-150 hover:bg-[#15162c]"
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
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
