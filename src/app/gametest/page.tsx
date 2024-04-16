import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Testgame from "~/components/testgame";
import { db } from "~/server/db";

export default async function GamePage() {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map`);
  }

  return (
    <div>
      <Testgame user={dbUser} name={user.firstName ?? ""} />
    </div>
  );
}
