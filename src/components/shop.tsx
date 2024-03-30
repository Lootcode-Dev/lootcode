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

export default function Shop({ user }: IParams) {
  return (
    <div className="mb-2 grow rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
      <div></div>
    </div>
  );
}
