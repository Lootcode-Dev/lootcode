import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Testgame from "~/components/testgame";
import { db } from "~/server/db";

interface PageProps {
  params: {
    encounterid: string;
  };
}

export default async function GamePage({ params }: PageProps) {
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
      <Testgame
        user={dbUser}
        name={user.firstName ?? ""}
        enc={params.encounterid}
      />
    </div>
  );
}
