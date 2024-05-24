import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Leaderboard from "~/components/leaderboard";
import { db } from "~/server/db";


export default async function Page() {
    const user = await currentUser();
    
    if (!user?.id) redirect(`/auth-callback?origin=leaderboard`);

    const dbUser = await db.user.findFirst({
      where: { email: user.emailAddresses[0]?.emailAddress },
    });
    
    if (!dbUser) redirect('/auth-callback?origin=leaderboard');

    //Only use required info
    const mainUser = {name: dbUser.name, score: dbUser.score, time: dbUser.time};

    const allUsers = await db.user.findMany({
        where: {
            email: {
                notIn: ['leogofman23@gmail.com', 'dylanvidal1204@gmail.com', 'lukeculleninc@gmail.com']
            },
            score: {
              gt: 0
            }
        },
        orderBy: [
            {score: 'desc'}, //Sort by score
            {time: 'asc'}, //In ties sort by earliest solve
            {email: 'desc'}
        ]
    });

    //Only use required info
    const lUsers = allUsers.map(obj => ({name: obj.name, score: obj.score, time: obj.time}));

    const totalUsers = lUsers.length; //Total Users
    const dbUserPlace = allUsers.findIndex(u => u.id === dbUser?.id)+1; //Placement of current user
    const topTen = lUsers.slice(0, 10); //Top ten
    const topThree = lUsers.slice(0, 3); // Top three
  
    return (
      <main className="z-10 flex md:h-[92.5vh] flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Leaderboard user={mainUser} place={dbUserPlace} totalUsers={totalUsers} topUsers={topTen} topThree={topThree}></Leaderboard>
      </main>
    );
  }
  