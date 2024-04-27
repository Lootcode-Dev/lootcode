"use client";

import { useEffect, useState } from "react";
import { GUser } from "~/app/game/utility";
import LeaderboardCard from "~/components/leaderboardcard";
import { Button } from "~/components/ui/button";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { api } from "~/trpc/react";

interface LParams {
  user: GUser;
  place: number;
  totalUsers: number;
  topUsers: GUser[];
  topThree: GUser[];
}

export default function Leaderboard({
  user,
  place,
  totalUsers,
  topUsers,
  topThree,
}: LParams) {
  const perPage = topUsers.length;
  const [getUsers, setUsers] = useState<GUser[]>(topUsers);
  const [getPage, setPage] = useState(0);
  const [getLoader, setLoader] = useState(false);

  const { data, refetch, isLoading, isError } =
    api.leaderboard.grabUsers.useQuery(
      { page: getPage, perPage: perPage },
      {
        enabled: false, // Prevents the query from automatically running on mount
      },
    );

  const nextPage = () => {
    setUsers([]);
    setLoader(true);
    setPage(getPage + 1);
  };
  const prevPage = () => {
    setUsers([]);
    setLoader(true);
    setPage(getPage - 1);
  };

  useEffect(() => {
    void refetch().then((res) => {
      setUsers(res.data ?? []);
      setLoader(false);
    });
  }, [getPage]);

  return (
    <div className="flex h-full w-full flex-row items-center justify-between p-10">
      <div className="flex w-[100%] flex-row items-end justify-around">
        <div
          style={{ borderStyle: "groove" }}
          className="flex h-[80vh] w-[40vw] flex-col overflow-auto rounded-2xl border-4 border-purple-700 bg-[#15162c] font-mono"
        >
          <div className="flex w-full flex-row items-center justify-between border-b-2 border-purple-700 p-2 text-3xl font-bold">
            {getPage != 0 ? (
              <Button onClick={prevPage} className="h-8 bg-purple-700">
                <ArrowLeft />
              </Button>
            ) : (
              <div></div>
            )}
            Leaderboard
            {totalUsers > perPage * (getPage + 1) ? (
              <Button onClick={nextPage} className="h-8 bg-purple-700">
                <ArrowRight />
              </Button>
            ) : (
              <div></div>
            )}
          </div>
          {!getLoader ? (
            getUsers.map((u, idx) => (
              <div key={idx}>
                <LeaderboardCard
                  user={u}
                  place={getPage * perPage + idx + 1}
                ></LeaderboardCard>
              </div>
            ))
          ) : (
            <div className="flex grow-[10] flex-row items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-yellow-200"></Loader2>
            </div>
          )}
          <div className="flex grow flex-col justify-end">
            <hr className="border-purple-500"></hr>
            <b className="mx-4 px-4 pt-4">Your placement:</b>
            <LeaderboardCard user={user} place={place}></LeaderboardCard>
          </div>
        </div>
        <div className="flex flex-row items-end gap-2">
          <div className="flex flex-col">
            {topThree[2] ? (
              <div className="text-center font-extrabold">
                {topThree[2].name}
              </div>
            ) : (
              <div></div>
            )}
            <div className="h-[30vh] w-[10vw] rounded-xl bg-[#CD7F32]"></div>
          </div>
          <div className="flex flex-col">
            {topThree[0] ? (
              <div className="text-center font-extrabold">
                {topThree[0].name}
              </div>
            ) : (
              <div></div>
            )}
            <div className="h-[70vh] w-[10vw] rounded-xl bg-yellow-300"></div>
          </div>
          <div className="flex flex-col">
            {topThree[1] ? (
              <div className="text-center font-extrabold">
                {topThree[1].name}
              </div>
            ) : (
              <div></div>
            )}
            <div className="h-[50vh] w-[10vw] rounded-xl bg-[#c0c0c0]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
