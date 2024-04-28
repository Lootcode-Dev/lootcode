import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function GameRules() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className="h-6 w-6 text-yellow-200" />
        </TooltipTrigger>
        <TooltipContent className="h-auto max-w-lg border-purple-500 bg-[#15162c] p-4 drop-shadow-md transition-all ease-in hover:border-yellow-200">
          <div className="text-white text-center prose prose-headings:text-purple-500 font-normal">
            <h1 className="text-2xl font-bold">Game Breakdown</h1>
            <p className="text-sm">
              There are 6 main stats in the game, and each of them works as
              follows:
            </p>
            <ul className="mt-4 text-sm text-left">
              <li>Health: the amount of damage you can take</li>
              <li>
                Critical Strike: The chance of critting an enemy out of 10,
                which deals 3x damage
              </li>
              <li>Strength: The amount of physical damage you do</li>
              <li>Armor: A measure of your physical damage negation</li>
              <li>Magic: The amount of magical damage you do</li>
              <li>Resist: A measure of your magical damage negation</li>
            </ul>
            <p className="mt-4 text-sm">
              Every tick, you and all enemies on the board will exchange blows,
              with each entity on the board dealing the sum of their magic and
              physical damage against their respective enemies. Combat will
              continue until either you or all of the enemies are eliminated.
              Encounters are meant to be difficult regardless of your level or
              gear - do not underestimate the opponent, and be sure to equip
              proper gear according to the stats of the encounter! Good luck
              adventurer!
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
