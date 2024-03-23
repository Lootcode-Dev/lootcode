/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: EXTRACT TO COMPONENT TO WRAP WITH AUTH CALLBACK

import { currentUser } from "@clerk/nextjs";
import MapView from "~/components/mapview";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export default async function Page() {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map`);
  }

  return <MapView user={dbUser}></MapView>;
}
