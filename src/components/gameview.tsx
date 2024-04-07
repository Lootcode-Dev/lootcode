"use client";

import { nameToFileName } from "~/components/mapview";
import { db } from "~/server/db";
import { GUser, Entity, Stats, getUserStats } from "~/app/game/utility";

import encounters from "~/gameinfo/encounters.json";
import enemyList from "~/gameinfo/enemies.json";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    encounterid: string;
  };
}

interface GameInfo {
  user: GUser;
  eid: string;
}

let entities: Entity[] = [];
var startDate = Date.now();

export default function GameView({ user, eid }: GameInfo) {
  const [loops, setLoops] = useState(0);
  const [death, setDeath] = useState(false);

  useEffect(() => {
    entities = [];

    initPlayer(user);
    loadEncounter(eid);

    const gameInterval = setInterval(() => {
      gameLoop(setDeath);
      setLoops(loops + 1);
    }, 1000);

    return () => clearInterval(gameInterval);
  }, []);

  return (
    <div className="justify-centerz flex-col items-center">
      {entities.map((value: Entity, index) => (
        <div
          id={"" + index}
          className="m-4 border bg-white p-4 text-black"
          key={index}
        >
          {getEntText(value)}
        </div>
      ))}
    </div>
  );
}

function loadEncounter(name: string) {
  encounters.encounters.map((value, index) => {
    if (value.name.toLowerCase() === name) {
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

function gameLoop(death: any) {
  if (entities) {
    console.log("running " + (Date.now() - startDate));

    for (var i = 0; i < entities.length; i++) {
      if (!entities[i]?.player) autoAttack(entities[i], entities[0]);
      else if (entities[i]?.health <= 0) death(true);
      if (document.getElementById("" + i) != null && entities[i] != undefined)
        document.getElementById("" + i).innerText = getEntText(entities[i]);
    }
  }
}

function autoAttack(attacker: Entity | undefined, target: Entity | undefined) {
  if (attacker != undefined && target != undefined) {
    target.health -= attacker.strength;
    console.log(target.health);
  }
}

function getEntText(ent: Entity | undefined): string {
  if (ent != undefined)
    return ent.name + " " + ent.health + "/" + ent.maxHealth;
  else return "";
}
