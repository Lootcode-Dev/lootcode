/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: EXTRACT TO COMPONENT TO WRAP WITH AUTH CALLBACK

import { currentUser } from "@clerk/nextjs";
import MapView from "~/components/mapview";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import GameView from "~/components/gameview";
import dynamic from "next/dynamic";

import { GUser, Entity, Stats, getUserStats } from "~/app/game/utility";
import { nameToFileName } from "~/components/mapview";

import encounters from "~/gameinfo/encounters.json";
import enemyList from "~/gameinfo/enemies.json";

const GameViewNoSSR = dynamic(() => import("~/components/gameview"), {
  ssr: false,
});

interface PageProps {
  params: {
    encounterid: string;
  };
}

interface GameInfo {
  user: GUser | null;
  encounter: string;
}

export default async function Page({ params }: PageProps) {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map`);
  }

  //assuming nothing goes wrong player should always
  //be the first entry in the entities table

  const encounterHeader = getEncounterHeader(params.encounterid);

  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="m-4 text-3xl font-bold">{encounterHeader}</div>
      <GameViewNoSSR user={dbUser} eid={params.encounterid}></GameViewNoSSR>
    </main>
  );
}

function getEncounterHeader(name: string): string {
  let ret: string = "";
  encounters.encounters.map((value, index) => {
    if (value.name.toLowerCase() === name) ret = value.name;
  });

  return ret;
}
