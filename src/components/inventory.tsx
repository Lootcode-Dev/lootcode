import { GUser, getUserStats, isEquipped } from "~/app/game/utility";
import itemList from "~/gameinfo/items.json";

interface IParams {
  user: GUser;
}

export default function Inventory({ user }: IParams) {
  const stats = getUserStats(user);

  return (
    <div className="mb-2 grow rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
      <div className="grid grid-cols-2">
        <div className="text-2xl">{"Health: " + stats.health}</div>
        <div className="text-2xl">{"Gold: " + user.gold}</div>
      </div>
      <div className="my-4 grid grid-cols-3 rounded border">
        <div>{"Armor: " + stats.armor}</div>
        <div>{"Resist: " + stats.resist}</div>
        <div>{"Mana: " + stats.mana}</div>
        <div>{"Strength: " + stats.strength}</div>
        <div>{"Intelligence: " + stats.intelligence}</div>
        <div>{"Wisdom: " + stats.wisdom}</div>
      </div>
      <div className="my-4 grid grid-cols-3 gap-2 rounded border p-2">
        {itemList.items.map((value, index) =>
          user.items[index] == "1" ? (
            <div className="rounded border" key={index}>
              <div className="text-xl">
                {value.name + (isEquipped(user, index) ? " (E)" : "")}
              </div>
              <div>
                {value.health != 0 ? "" + value.health + " Health" : ""}
              </div>
              <div>{value.armor != 0 ? "" + value.armor + " Armor" : ""}</div>
              <div>
                {value.resist != 0 ? "" + value.resist + " Resist" : ""}
              </div>
              <div>{value.mana != 0 ? "" + value.mana + " Mana" : ""}</div>
              <div>
                {value.strength != 0 ? "" + value.strength + " Strength" : ""}
              </div>
              <div>
                {value.intelligence != 0
                  ? "" + value.intelligence + " Intelligence"
                  : ""}
              </div>
              <div>
                {value.wisdom != 0 ? "" + value.wisdom + " Wisdom" : ""}
              </div>
            </div>
          ) : (
            <div />
          ),
        )}
      </div>
    </div>
  );
}
