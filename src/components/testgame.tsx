"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

interface Enemy {
  image: string;
  name: string;
  health: number;
  attackSpeed: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
}

export default function Testgame() {
  const [enemies, setEnemies] = useState<Enemy[] | null>(null);

  const { data } = api.game.getEncounter.useQuery({
    encounterid: "fortnite",
  });

  useEffect(() => {
    if (data) {
      setEnemies(data);
    }
  }, [data]);

  function gameLoop() {
    if (enemies) {
      const interval = setInterval(() => {
        setEnemies((prevEnemies) => {
          if (prevEnemies) {
            const updatedEnemies = prevEnemies.map((enemy) => {
              const newHealth = enemy.health - 5;
              const health = newHealth < 0 ? 0 : newHealth;

              return {
                ...enemy,
                health,
              };
            });

            const allEnemiesDead = updatedEnemies.every(
              (enemy) => enemy.health <= 0,
            );
            if (allEnemiesDead) {
              clearInterval(interval);
            }

            return updatedEnemies;
          }

          return prevEnemies;
        });
      }, 100);
    }
  }

  useEffect(() => {
    console.log(enemies);
  }, [enemies]);

  return (
    <div className="grid h-[92.5vh] grid-cols-2 bg-[#282A36] text-white">
      <Button onClick={gameLoop}>Start</Button>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-12">
          <div>Player</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-12">
          <div>Enemy</div>
          <div>Enemy 2</div>
          {enemies?.map((enemy, index) => (
            <div key={index}>
              <div>{enemy.name}</div>
              <div>{enemy.health}</div>
              <div>{enemy.health}</div>
              <div>{enemy.armor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
