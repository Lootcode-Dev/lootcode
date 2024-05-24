import { type LUser } from "~/app/game/utility";

interface LParams {
  user: LUser;
  place: number;
}

export default function LeaderboardCard({ user, place }: LParams) {
  return (
    <span
      className={`m-4 flex flex-row justify-between gap-2 p-2 text-sm md:text-md md:p-4 ${place == 0 ? "text-purple-500" : place <= 3 ? "text-yellow-300" : place <= 25 ? "text-[#c0c0c0]" : place <= 100 ? "text-[#CD7F32]" : "text-purple-500"} items-center overflow-auto rounded-xl border-4 border-double border-purple-400`}
    >
      <b>
        {place == 0 ? "Unranked" : place}
        {place == 0 ? "" : findExt(place)}
      </b>
      <b className="w-[20%] overflow-clip break-words">{user.name}</b>
      <p className="w-[20%] overflow-clip break-words">Solves: {user.score}</p>
      <p className="w-[30%] overflow-clip break-words">{formatTime(user.time)}</p>
    </span>
  );
}

function formatTime(d: Date) {
  let res = "";

  // The date formatted
  if (d.getMonth() < 10) res += "0";
  res += d.getMonth() + 1 + "/";

  if (d.getDate() < 10) res += "0";
  res += d.getDate() + "/";

  res += d.getFullYear();
  res += " ";

  //24 Hour Time converted into 12 Hour
  res +=
    (d.getHours() % 12 == 0 ? (d.getHours() % 12) + 12 : d.getHours() % 12) +
    ":";

  if (d.getMinutes() < 10) res += "0";
  res += d.getMinutes();

  res += " ";
  res += d.getHours() > 11 ? "PM" : "AM";
  return res;
}

function findExt(i: number) {
  let ext = "";
  if (i % 100 > 10 && i % 100 < 20) {
    ext += "th";
  } else {
    switch (i % 10) {
      case 1:
        ext += "st";
        break;
      case 2:
        ext += "nd";
        break;
      case 3:
        ext += "rd";
        break;
      default:
        ext += "th";
    }
  }
  return ext;
}
