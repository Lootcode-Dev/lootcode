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
          <div className="mr-1 flex size-6 items-center text-base">
            <ShieldIcon></ShieldIcon>
            {"" + item?.armor}
          </div>
        ) : (
          <div />
        )}
        {item?.resist != 0 ? (
          <div className="mr-1 flex size-6 items-center text-base">
            <SparkleIcon></SparkleIcon>
            {"" + item?.resist}
          </div>
        ) : (
          <div />
        )}
        {item?.mana != 0 ? (
          <div className="mr-1 flex size-6 items-center text-base">
            <FlaskRound></FlaskRound>
            {"" + item?.mana}
          </div>
        ) : (
          <div />
        )}
        {item?.strength != 0 ? (
          <div className="mr-1 flex size-6 items-center text-base">
            <Sword></Sword>
            {"" + item?.strength}
          </div>
        ) : (
          <div />
        )}
        {item?.intelligence != 0 ? (
          <div className="mr-1 flex size-6 items-center text-base">
            <Wand2></Wand2>
            {"" + item?.intelligence}
          </div>
        ) : (
          <div />
        )}
        {item?.wisdom != 0 ? (
          <div className="mr-1 flex size-6 items-center text-base">
            <BrainIcon></BrainIcon>
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
