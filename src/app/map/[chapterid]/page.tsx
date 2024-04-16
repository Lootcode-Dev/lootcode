/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { currentUser } from "@clerk/nextjs";
import MapView from "~/components/mapview";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

interface PageProps {
  params: {
    chapterid: string;
  };
}

export default async function Page({params}:PageProps) {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map`);
  }

  return <MapView user={dbUser} chapterid={params.chapterid}></MapView>;
}
