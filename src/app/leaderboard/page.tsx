import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Leaderboard from "~/components/leaderboard";
import { db } from "~/server/db";


export default async function Page() {
    const user = await currentUser();
    
    if (!user?.id) redirect(`/auth-callback?origin=leaderboard`);

    const dbUser = await db.user.findFirst({
      where: { id: user.id },
    });
    const allUsers = await db.user.findMany({
        orderBy: [
            {score: 'desc'}, //Sort by score
            {time: 'asc'} //In ties sort by earliest solve
        ]
    });

    const totalUsers = allUsers.length; //Total Users
    const dbUserPlace = allUsers.findIndex(u => u.id === dbUser?.id)+1; //Placement of current user
    const topTen = allUsers.slice(0, 10); //Top ten
    const topThree = allUsers.slice(0, 3); // Top three

    if (!dbUser) redirect('/auth-callback?origin=leaderboard');
  
    return (
      <main className="z-10 flex h-[92.5vh] flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Leaderboard user={dbUser} place={dbUserPlace} totalUsers={totalUsers} topUsers={topTen} topThree={topThree}></Leaderboard>
      </main>
    );
  }
  