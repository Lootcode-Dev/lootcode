"use client";

import {
  GUser,
  Stats,
  fakeEquip,
  getItemName,
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

export default function Inventory({ name, user }: IParams) {
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
    <div className="flex flex-row">
      <div className="m-4 flex flex-col rounded-xl bg-[#15162c] p-2">
        <div className="grid grid-cols-2 justify-items-center">
          <div className="flex items-center text-2xl font-bold">{name}</div>
          <div>
            <div className="flex items-center text-2xl">
              <PlusIcon></PlusIcon> {"" + stats.health}
            </div>
            <div className="flex items-center text-2xl">
              <CoinsIcon></CoinsIcon> {"" + getUser.gold}
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
          {getUser.armor != -1 ? <ItemDisplay id={getUser.armor} /> : <div />}
          {getUser.accessory != -1 ? (
            <ItemDisplay id={getUser.accessory} />
          ) : (
            <div />
          )}
          {getUser.weapon != -1 ? <ItemDisplay id={getUser.weapon} /> : <div />}
          {getUser.focus != -1 ? <ItemDisplay id={getUser.focus} /> : <div />}
          {getUser.skill1 != -1 ? <ItemDisplay id={getUser.skill1} /> : <div />}
          {getUser.skill2 != -1 ? <ItemDisplay id={getUser.skill2} /> : <div />}
          {getUser.skill3 != -1 ? <ItemDisplay id={getUser.skill3} /> : <div />}
        </div>
      </div>
      <div className="m-4 h-[80vh] w-[70vw] rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
        <div className="m-2 text-left text-3xl">
          Items
          <div className="my-4 grid auto-cols-max grid-flow-col gap-4">
            {itemList.items.map((value, index) =>
              getUser.items[index] == "1" ? (
                isEquipped(getUser, index) ? (
                  <div
                    className="cursor-pointer rounded border border-purple-700 bg-purple-950 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() => setSelItem(index)}
                    key={index}
                  >
                    <ItemDisplay id={index} />
                  </div>
                ) : (
                  <div
                    className="cursor-pointer rounded border-purple-700 bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() => setSelItem(index)}
                    key={index}
                  >
                    <ItemDisplay id={index} />
                  </div>
                )
              ) : (
                <div />
              ),
            )}
          </div>
        </div>
        <div className="m-2 text-left text-3xl">
          Collectibles
          <div className="my-4 grid auto-cols-max grid-flow-col gap-4">
            {itemList.items.map((value, index) =>
              getUser.items[index] == "1" ? (
                <div
                  className="cursor-pointer rounded bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
                  key={index}
                >
                  Collectible
                </div>
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
