"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { GUser, getLevel, getUserStats } from "~/app/game/utility";

interface Entity {
  image: string;
  name: string;
  health: number;
  maxHealth: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
  dead: boolean;
  critHit: boolean;
}

interface Enemy {
  name: string;
  image: string;
  health: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
}

interface Props {
  name: string;
  user: GUser;
}

export default function Testgame({ user, name }: Props) {
  const [enemies, setEnemies] = useState<Entity[] | null>(null);
  const [player, setPlayer] = useState<Entity | null>(null);
  const [originalPlayer, setOriginalPlayer] = useState<Entity | null>(null);
  const [originalEnemies, setOriginalEnemies] = useState<Entity[] | null>(null);
  const userStats = getUserStats(user);

  const { data } = api.game.getEncounter.useQuery({
    encounterid: "test",
  });

  useEffect(() => {
    if (data) {
      const convertedEnemies = (data as Enemy[]).map((encounter) => ({
        image: encounter.image,
        name: encounter.name,
        health: Math.floor(encounter.health * (1 + 0.1 * getLevel(user))),
        maxHealth: Math.floor(encounter.health * (1 + 0.1 * getLevel(user))),
        critChance: encounter.critChance,
        strength: encounter.strength,
        armor: encounter.armor,
        magic: encounter.magic,
        resist: encounter.resist,
        dead: false,
        critHit: false,
      }));

      setEnemies(convertedEnemies);
      setOriginalEnemies(convertedEnemies);
    }
  }, [data, user]);

  useEffect(() => {
    const convertedPlayer = {
      image: "/player.png",
      name: name,
      health: userStats.health,
      maxHealth: userStats.health,
      critChance: userStats.critChance,
      strength: userStats.strength,
      armor: userStats.armor,
      magic: userStats.magic,
      resist: userStats.resist,
      dead: false,
      critHit: false,
    };

    setPlayer(convertedPlayer);
    setOriginalPlayer(convertedPlayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intervalRef = useRef<number | null>(null);

  function gameLoop() {
    if (enemies) {
      let currentEnemyIndex = 0;
      intervalRef.current = setInterval(() => {
        // Update Enemy health for each player attack
        setEnemies((prevEnemies) => {
          if (prevEnemies) {
            const updatedEnemies = [...prevEnemies];
            const currentEnemy = updatedEnemies[currentEnemyIndex];

            // Enemy incoming damage updates
            if (currentEnemy) {
              let damage =
                Math.max(0, userStats.strength - currentEnemy.armor) -
                Math.max(0, userStats.magic - currentEnemy.resist);

              if (Math.random() * 100 <= userStats.critChance) {
                damage *= 3;
                currentEnemy.critHit = true;
              } else {
                currentEnemy.critHit = false;
              }

              const newHealth = currentEnemy.health - damage;
              const health = newHealth < 0 ? 0 : newHealth;

              if (health <= 0) {
                currentEnemy.dead = true;
              }

              updatedEnemies[currentEnemyIndex] = {
                ...currentEnemy,
                health,
              };
            }

            if (currentEnemy && currentEnemy.health <= 0) {
              currentEnemyIndex++;
              if (currentEnemyIndex >= updatedEnemies.length) {
                clearInterval(intervalRef.current!);
              }
            }

            // Check if all enemies are dead
            const allEnemiesDead = updatedEnemies.every((enemy) => enemy.dead);
            if (allEnemiesDead) {
              clearInterval(intervalRef.current ?? 0);
              console.log("You win!");
            }

            return updatedEnemies;
          }

          return prevEnemies;
        });

        // Update Player health for each enemy attack that is still alive
        setPlayer((prevPlayer) => {
          if (prevPlayer) {
            const updatedPlayer = { ...prevPlayer };

            const currentEnemy = enemies[currentEnemyIndex];
            if (currentEnemy) {
              let damage =
                Math.max(0, currentEnemy.strength - userStats.armor) -
                Math.max(0, currentEnemy.magic - userStats.resist);

              if (Math.random() * 100 <= currentEnemy.critChance) {
                damage *= 3;
                updatedPlayer.critHit = true;
              } else {
                updatedPlayer.critHit = false;
              }

              const newHealth = updatedPlayer.health - damage;
              const health = newHealth < 0 ? 0 : newHealth;

              if (health <= 0) {
                updatedPlayer.dead = true;
              }

              // Check if player is dead
              if (updatedPlayer.health <= 0) {
                clearInterval(intervalRef.current ?? 0);
                console.log("You lose!");
              }

              return {
                ...updatedPlayer,
                health,
              };
            }
          }

          return prevPlayer;
        });
      }, 100) as unknown as number;
    }
  }

  function reset() {
    clearInterval(intervalRef.current ?? 0);
    setPlayer(originalPlayer);
    setEnemies(originalEnemies);
  }

  return (
    <div className="h-[92.5vh] bg-[#282A36] text-white">
      <div className="grid grid-cols-2 items-center justify-center pt-2">
        <Button onClick={gameLoop} className="w-24">
          Start
        </Button>
        <Button onClick={reset} className="w-24">
          Reset
        </Button>
      </div>
      <div className="grid h-full grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center space-y-12">
            <div>Player</div>
            <div
              className={player?.dead ? "" : "animate-wiggle animate-infinite"}
            >
              <div
                style={{
                  color: player?.dead
                    ? "black"
                    : player?.critHit
                      ? "red"
                      : "inherit",
                }}
              >
                <div>{player?.name}</div>
                <div>{player?.health}</div>
                <div>{player?.health}</div>
                <div>{player?.armor}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center space-y-12">
            <div>Enemy</div>
            <div>Enemy 2</div>
            {enemies?.map((enemy, index) => (
              <div
                key={index}
                className={enemy.dead ? "" : "animate-wiggle animate-infinite"}
              >
                <div
                  style={{
                    color: enemy.dead
                      ? "black"
                      : enemy.critHit
                        ? "red"
                        : "inherit",
                  }}
                >
                  <div>{enemy.name}</div>
                  <div>{enemy.health}</div>
                  <div>{enemy.health}</div>
                  <div>{enemy.armor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
