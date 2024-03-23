"use client";

import { nameToFileName } from "~/components/mapview";
import { db } from "~/server/db";
import { GUser, Entity, Stats, getUserStats } from "~/app/game/utility";

import encounters from "~/gameinfo/encounters.json";
import enemyList from "~/gameinfo/enemies.json";
import { useEffect } from "react";

interface PageProps {
  params: {
    encounterid: string;
  };
}

interface GameInfo {
  ents: Entity[];
}

export default function GameView({ ents }: GameInfo) {
  return (
    <div className="justify-centerz flex-col items-center">
      {ents.map((value: Entity, index) => (
        <div className="m-4 border bg-white p-4 text-black" key={index}>
          {value.name + " " + value.health + "/" + value.maxHealth}
        </div>
      ))}
    </div>
  );
}
