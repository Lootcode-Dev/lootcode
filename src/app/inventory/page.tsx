/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import Inventory from "~/components/inventory";

export default async function Page() {
  const user = await currentUser();
  
  if (!user?.id) redirect(`/auth-callback?origin=inventory`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=inventory`);
  }

  return (
    <main className="z-10 flex h-[92.5vh] flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Inventory name={user.firstName ?? ""} user={dbUser}></Inventory>
    </main>
  );
}
