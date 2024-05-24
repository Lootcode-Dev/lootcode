/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
"use client";

import {
  Clover,
  Filter,
  Heart,
  LoaderIcon,
  Shield,
  Sparkle,
  Sword,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { type GUser, isEquipped } from "~/app/game/utility";
import { api } from "~/trpc/react";
import itemList from "~/util/items.json";
import ItemDisplay from "./itemdisplay";
import StatDisplay from "./statdisplay";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Mobile from "./safari";
import { Item } from "~/app/game/utility";


interface IParams {
  name: string;
  user: GUser;
}

enum IKEY {
  HEALTH = 0,
  CRIT,
  STRENGTH,
  MAGIC,
  ARMOR,
  RESIST,
}

export default function Inventory({ name, user }: IParams) {
  const [getUser, setUser] = useState<GUser>(user);
  const [fetching, setFetching] = useState(false);
  const [selItem, setSelItem] = useState(-1);
  const [filter, setFilter] = useState(-1);
  const items = [...itemList.items].sort((a, b) => {
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

  const { refetch: equipCallback } = api.game.equipItemID.useQuery(
    {
      item: selItem,
    },
    { enabled: false, retry: false },
  );

  const { data: loreCollectibles } = api.game.getLoreCollection.useQuery();

  useEffect(() => {
    if (selItem != -1) {
      setFetching(true);
      void equipCallback().then((response) => {
        if (response != undefined) {
          setUser(response.data ?? getUser);
          setSelItem(-1);
          setFetching(false);
        }
      });
    }
  }, [equipCallback, getUser, selItem]);

  return (
    <div className="mt-2 flex flex-col md:flex-row">
      <StatDisplay name={name} user={getUser} />
      <div className="m-4 rounded-xl bg-[#15162c] p-2 text-center font-bold text-white md:h-[80vh] md:w-[70vw]">
        <div className="m-2 text-left text-3xl">
          <div className="flex items-center justify-end gap-2 md:hidden">
            <Filter className="mr-2" />
            <div
              className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.HEALTH ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
              onClick={() => {
                if (filter == IKEY.HEALTH) setFilter(-1);
                else setFilter(IKEY.HEALTH);
              }}
            >
              <Heart />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.CRIT ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
              onClick={() => {
                if (filter == IKEY.CRIT) setFilter(-1);
                else setFilter(IKEY.CRIT);
              }}
            >
              <Clover />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.STRENGTH ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
              onClick={() => {
                if (filter == IKEY.STRENGTH) setFilter(-1);
                else setFilter(IKEY.STRENGTH);
              }}
            >
              <Sword />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.ARMOR ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
              onClick={() => {
                if (filter == IKEY.ARMOR) setFilter(-1);
                else setFilter(IKEY.ARMOR);
              }}
            >
              <Shield />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.MAGIC ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
              onClick={() => {
                if (filter == IKEY.MAGIC) setFilter(-1);
                else setFilter(IKEY.MAGIC);
              }}
            >
              <Wand2 />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.RESIST ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
              onClick={() => {
                if (filter == IKEY.RESIST) setFilter(-1);
                else setFilter(IKEY.RESIST);
              }}
            >
              <Sparkle />
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between">
            <div className="flex items-center gap-2">
              Items
              {fetching ? <LoaderIcon className="animate-spin" /> : <div />}
            </div>
            <div className="hidden items-center justify-end gap-2 md:flex">
              <Filter className="mr-2" />
              <div
                className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.HEALTH ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
                onClick={() => {
                  if (filter == IKEY.HEALTH) setFilter(-1);
                  else setFilter(IKEY.HEALTH);
                }}
              >
                <Heart />
              </div>
              <div
                className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.CRIT ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
                onClick={() => {
                  if (filter == IKEY.CRIT) setFilter(-1);
                  else setFilter(IKEY.CRIT);
                }}
              >
                <Clover />
              </div>
              <div
                className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.STRENGTH ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
                onClick={() => {
                  if (filter == IKEY.STRENGTH) setFilter(-1);
                  else setFilter(IKEY.STRENGTH);
                }}
              >
                <Sword />
              </div>
              <div
                className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.ARMOR ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
                onClick={() => {
                  if (filter == IKEY.ARMOR) setFilter(-1);
                  else setFilter(IKEY.ARMOR);
                }}
              >
                <Shield />
              </div>
              <div
                className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.MAGIC ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
                onClick={() => {
                  if (filter == IKEY.MAGIC) setFilter(-1);
                  else setFilter(IKEY.MAGIC);
                }}
              >
                <Wand2 />
              </div>
              <div
                className={`cursor-pointer rounded-full border border-purple-700 ${filter == IKEY.RESIST ? "bg-purple-950" : "bg-purple-700"} p-2 duration-150 hover:bg-[#15162c]`}
                onClick={() => {
                  if (filter == IKEY.RESIST) setFilter(-1);
                  else setFilter(IKEY.RESIST);
                }}
              >
                <Sparkle />
              </div>
            </div>
          </div>
          <div className="my-4 flex max-h-[40vh] flex-wrap overflow-auto">
            {items.map((value, index) =>
              getUser.items[
                itemList.items.findIndex((item) => item.name == value.name)
              ] == "1" ? (
                !sortStat(value, filter) ? (
                  <div />
                ) : isEquipped(
                    getUser,
                    itemList.items.findIndex((item) => item.name == value.name),
                  ) ? (
                  <div
                    className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-950 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() =>
                      !fetching &&
                      setSelItem(
                        itemList.items.findIndex(
                          (item) => item.name == value.name,
                        ),
                      )
                    }
                    key={index}
                  >
                    <ItemDisplay
                      id={itemList.items.findIndex(
                        (item) => item.name == value.name,
                      )}
                    />
                  </div>
                ) : !sortStat(value, filter) ? (
                  <div />
                ) : (
                  <div
                    className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() =>
                      !fetching &&
                      setSelItem(
                        itemList.items.findIndex(
                          (item) => item.name == value.name,
                        ),
                      )
                    }
                    key={index}
                  >
                    <ItemDisplay
                      id={itemList.items.findIndex(
                        (item) => item.name == value.name,
                      )}
                    />
                  </div>
                )
              ) : (
                <div key={index} />
              ),
            )}
          </div>
        </div>
        <div className="m-2 text-left">
          <span className="text-3xl">Collectibles</span>
          <div className="my-4 flex max-h-[40vh] flex-wrap overflow-auto md:max-h-[20vh]">
            {loreCollectibles?.map((value: string, index) => (
              <Dialog key={index}>
                <DialogTrigger className="m-2 cursor-pointer rounded bg-purple-700 p-4 text-2xl duration-150 hover:bg-[#15162c]">
                  {value.split("\n")[0]?.replace("#", "")}
                </DialogTrigger>
                <DialogContent className="max-h-[50vh] max-w-[90vw] overflow-auto rounded-xl bg-[#15162c] p-4 text-white md:max-h-[425px] md:max-w-[600px]">
                  <ReactMarkdown
                    className="prose w-auto  max-w-none 
                        p-4 text-white prose-headings:text-purple-500 prose-strong:font-medium prose-strong:text-gray-400  prose-strong:text-opacity-30 prose-em:text-yellow-200"
                    key={index}
                  >
                    {value}
                  </ReactMarkdown>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function sortStat(it: Item, stat: number): boolean {
  if (stat == -1) return true;

  let comp = -1;
  switch (stat) {
    case IKEY.HEALTH:
      comp = it.health;
      break;
    case IKEY.CRIT:
      comp = it.critChance;
      break;
    case IKEY.STRENGTH:
      comp = it.strength;
      break;
    case IKEY.MAGIC:
      comp = it.magic;
      break;
    case IKEY.ARMOR:
      comp = it.armor;
      break;
    case IKEY.RESIST:
      comp = it.resist;
      break;
  }

  return comp > 0;
}
