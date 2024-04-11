import {
  BrainIcon,
  FlaskRound,
  ShieldIcon,
  SparkleIcon,
  Sword,
  Wand2,
} from "lucide-react";
import { getItem } from "~/app/game/utility";

interface IParams {
  id: number;
}

export default function ItemDisplay({ id }: IParams) {
  const item = getItem(id);

  return (
    <div className="items-left mx-2 flex flex-col text-2xl">
      <div className="text-center text-2xl">{item?.name}</div>
      <div className="flex flex-row justify-center">
        {item?.armor != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <ShieldIcon size={20}></ShieldIcon>
            </div>
            {"" + item?.armor}
          </div>
        ) : (
          <div />
        )}
        {item?.resist != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <SparkleIcon size={20}></SparkleIcon>
            </div>
            {"" + item?.resist}
          </div>
        ) : (
          <div />
        )}
        {item?.mana != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <FlaskRound size={20}></FlaskRound>
            </div>
            {"" + item?.mana}
          </div>
        ) : (
          <div />
        )}
        {item?.strength != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <Sword size={20}></Sword>
            </div>
            {"" + item?.strength}
          </div>
        ) : (
          <div />
        )}
        {item?.intelligence != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <Wand2 size={20}></Wand2>
            </div>
            {"" + item?.intelligence}
          </div>
        ) : (
          <div />
        )}
        {item?.wisdom != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <BrainIcon size={20}></BrainIcon>
            </div>
            {"" + item?.wisdom}
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="text-center text-sm">
        {item?.type[0]?.toUpperCase() + item?.type.substring(1)}
      </div>
    </div>
  );
}
