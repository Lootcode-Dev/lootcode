import {
  CloverIcon,
  HeartIcon,
  ShieldIcon,
  SparkleIcon,
  SwordIcon,
  Wand2,
} from "lucide-react";
import { getItem } from "~/app/game/utility";
import Mobile from "./safari";

interface IParams {
  id: number;
}

export default function ItemDisplay({ id }: IParams) {
  const item = getItem(id);

  return (
    <div className="items-left mx-2 flex flex-col text-xl">
      <div className="text-center text-xl">{item?.name}</div>
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
        {item?.magic != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <Wand2 size={20}></Wand2>
            </div>
            {"" + item?.magic}
          </div>
        ) : (
          <div />
        )}
        {item?.strength != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <SwordIcon size={20}></SwordIcon>
            </div>
            {"" + item?.strength}
          </div>
        ) : (
          <div />
        )}
        {item?.health != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <HeartIcon size={20}></HeartIcon>
            </div>
            {"" + item?.health}
          </div>
        ) : (
          <div />
        )}
        {item?.critChance != 0 ? (
          <div className="mr-1 flex items-center text-base">
            <div>
              <CloverIcon size={20}></CloverIcon>
            </div>
            {"" + item?.critChance}
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="text-center text-sm">
        {item?.type[0]?.toUpperCase() + item!.type.substring(1) ?? ""}
      </div>
    </div>
  );
}
