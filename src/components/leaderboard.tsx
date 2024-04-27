"use client"

import { GUser } from "~/app/game/utility";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import LeaderboardCard from "~/components/leaderboardcard";

import {
    ArrowLeft,
    ArrowRight,
    Loader2
} from "lucide-react";
import { api } from "~/trpc/react";

interface LParams {
    user: GUser,
    place: number,
    totalUsers: number,
    topUsers: GUser[],
    topThree: GUser[]
}

export default function Leaderboard({ user, place, totalUsers, topUsers, topThree }: LParams) {
    const perPage = topUsers.length;
    const [getUsers, setUsers] = useState<GUser[]>(topUsers);
    const [getPage, setPage] = useState(0);
    const [getLoader, setLoader] = useState(false);

    const { data, refetch, isLoading, isError } = api.leaderboard.grabUsers.useQuery({ page: getPage, perPage: perPage }, {
        enabled: false // Prevents the query from automatically running on mount
    });

    const nextPage = () => {
        setUsers([]);
        setLoader(true);
        setPage(getPage+1);
    }
    const prevPage = () => {
        setUsers([]);
        setLoader(true);
        setPage(getPage-1);
    }

    useEffect(() => {
        void refetch().then((res) => {
            setUsers(res.data ?? []);
            setLoader(false);
        });
    }, [getPage]);

    return (
        <div className="flex flex-row h-full w-full justify-between items-center p-10">
            <div className="flex flex-row items-end justify-around w-[100%]">
                <div style={{borderStyle: "groove"}} 
                    className="flex flex-col bg-[#15162c] h-[80vh] w-[40vw] border-4 border-purple-700 font-mono rounded-2xl overflow-scroll">
                    <div className="flex flex-row justify-between items-center border-b-2 w-full font-bold text-3xl p-2">
                        {
                            getPage != 0 ?
                            <Button onClick={prevPage} className="h-8 bg-purple-700"><ArrowLeft/></Button>
                            : <div></div>
                        }
                        Leaderboard
                        {   
                            totalUsers > perPage*(getPage+1) ?
                            <Button onClick={nextPage} className="h-8 bg-purple-700"><ArrowRight/></Button>
                            : <div></div>
                        }
                    </div>
                    {   
                        !getLoader ?
                            getUsers.map((u, idx) => (
                                <div key={idx}>
                                    <LeaderboardCard user={u} place={getPage*perPage + idx+1}></LeaderboardCard>
                                </div>
                            ))
                        :
                            <div className="flex flex-row justify-center items-center grow-[10]">
                                <Loader2 className="h-12 w-12 animate-spin text-yellow-200"></Loader2>
                            </div>
                    }
                    <div className="flex flex-col grow justify-end">
                        <hr className="border-purple-500"></hr>
                        <b className="px-4 pt-4 mx-4">Your placement:</b>
                        <LeaderboardCard user={user} place={place}></LeaderboardCard>
                    </div>
                </div>
                <div className="flex flex-row items-end gap-2">
                    <div className="flex flex-col">
                        {
                            topThree[2] ?
                                <div className="text-center font-extrabold">{topThree[2].name}</div>
                            :              
                                <div></div>
                        }
                        <div className="w-[10vw] h-[30vh] bg-[#CD7F32] rounded-xl"></div>
                    </div>
                    <div className="flex flex-col">
                        {
                            topThree[0] ?
                                <div className="text-center font-extrabold">{topThree[0].name}</div>
                            :              
                                <div></div>
                        }
                        <div className="w-[10vw] h-[70vh] bg-yellow-300 rounded-xl"></div>
                    </div>
                    <div className="flex flex-col">
                        {
                            topThree[1] ?
                                <div className="text-center font-extrabold">{topThree[1].name}</div>
                            :              
                                <div></div>
                        }
                        <div className="w-[10vw] h-[50vh] bg-[#c0c0c0] rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}