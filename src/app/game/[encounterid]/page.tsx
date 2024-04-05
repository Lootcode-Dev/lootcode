/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: EXTRACT TO COMPONENT TO WRAP WITH AUTH CALLBACK

import { currentUser } from "@clerk/nextjs";
import MapView from "~/components/mapview";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import GameView from "~/components/gameview";

import { GUser, Entity, Stats, getUserStats } from "~/app/game/utility";
import { nameToFileName } from "~/components/mapview";

import encounters from "~/app/game/encounters.json";
import enemyList from "~/app/game/enemies.json";

interface PageProps {
  params: {
    encounterid: string;
  };
}

interface GameInfo {
  user: GUser | null;
  encounter: string;
}

let entities: Entity[] = [];

export default async function Page({ params }: PageProps) {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map`);
  }

  //return <GameView user={dbUser} encounter={params.encounterid}></GameView>;

  initPlayer(dbUser);
  const encounterHeader = loadEncounter(params.encounterid);

  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="m-4 text-3xl font-bold">{encounterHeader}</div>
      <GameView ents={entities}></GameView>
    </main>
  );
}

function loadEncounter(name: string): string {
  let ret: string = "";
  encounters.encounters.map((value, index) => {
    if (value.name.toLowerCase() === name) {
      ret = value.name;
      value.enemies.map((ent, index) => {
        enemyList.enemies.map((enemy, index) => {
          if (ent == enemy.name) {
            let temp: Entity = {
              image: enemy.image,
              name: enemy.name,
              health: enemy.health,
              maxHealth: enemy.health,
              player: false,
              mana: enemy.mana,
              maxMana: enemy.mana,
              strength: enemy.strength,
              intelligence: enemy.intelligence,
              armor: enemy.armor,
              wisdom: enemy.wisdom,
              resist: enemy.resist,
            };

            entities.push(temp);
          }
        });
      });
    }
  });

  return ret;
}

function initPlayer(user: GUser) {
  let statBlock: Stats = getUserStats(user);
  let temp: Entity = {
    image: "/enemies/rat.png",
    name: "Player",
    health: statBlock.health,
    maxHealth: statBlock.health,
    player: true,
    mana: statBlock.mana,
    maxMana: statBlock.mana,
    strength: statBlock.strength,
    intelligence: statBlock.intelligence,
    armor: statBlock.armor,
    wisdom: statBlock.wisdom,
    resist: statBlock.resist,
  };

  entities.push(temp);
}

function autoAttack(attacker: Entity, target: Entity) {
  target.health -= attacker.strength - target.armor;
}
