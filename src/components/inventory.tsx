"use client";

import { LoaderIcon } from "lucide-react";
import { Key, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { type GUser, isEquipped, getItem } from "~/app/game/utility";
import { api } from "~/trpc/react";
import itemList from "~/util/items.json";
import ItemDisplay from "./itemdisplay";
import StatDisplay from "./statdisplay";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Mobile from "./mobile";
import { isMobile } from "react-device-detect";

interface IParams {
  name: string;
  user: GUser;
}

export default function Inventory({ name, user }: IParams) {
  const [getUser, setUser] = useState<GUser>(user);
  const [fetching, setFetching] = useState(false);
  const [selItem, setSelItem] = useState(-1);
  const items = [...itemList.items].sort((a, b) => {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    if (a.level < b.level) {
      return -1;
    }
    if (a.level > b.level) {
      return 1;
    }
    return 0;
  });

  const itemIndexes:number[] = [];
  items.map((val, index)=>{
    itemIndexes[index] = itemList.items.findIndex((item) => item.name == val.name);
  })

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

  // Check if the user is a mobile user
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="mt-2 flex flex-row">
      <StatDisplay name={name} user={getUser} />
      <div className="m-4 h-[80vh] w-[70vw] overflow-auto rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
        <div className="m-2 text-left text-3xl">
          <div className="flex items-center gap-2">
            Items
            {fetching ? <LoaderIcon className="animate-spin" /> : <div />}
          </div>
          <div className="my-4 flex flex-wrap">
            {items.map((value, index) =>
              getUser.items[
                itemIndexes[index] ?? 0
              ] == "1" ? (
                isEquipped(
                  getUser,
                  itemIndexes[index] ?? 0,
                ) ? (
                  <div
                    className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-950 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() =>
                      !fetching &&
                      setSelItem(
                        itemIndexes[index] ?? 0,
                      )
                    }
                    key={index}
                  >
                    <ItemDisplay
                      id={itemIndexes[index] ?? 0}
                    />
                  </div>
                ) : (
                  <div
                    className="m-2 cursor-pointer rounded border border-purple-700 bg-purple-700 p-4 duration-150 hover:bg-[#15162c]"
                    onClick={() =>
                      !fetching &&
                      setSelItem(
                        itemIndexes[index] ?? 0,
                      )
                    }
                    key={index}
                  >
                    <ItemDisplay
                      id={itemIndexes[index] ?? 0}
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
          <div className="my-4 flex flex-wrap gap-4">
            {loreCollectibles?.map((value: string, index) => (
              <Dialog key={index}>
                <DialogTrigger className="cursor-pointer rounded bg-purple-700 p-4 text-2xl duration-150 hover:bg-[#15162c]">
                  {value.split("\n")[0]?.replace("#", "")}
                </DialogTrigger>
                <DialogContent className="bg-[#15162c] p-4 text-white">
                  <ReactMarkdown
                    className="prose w-auto  max-w-none 
                        p-4 text-white prose-headings:text-purple-500 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
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
