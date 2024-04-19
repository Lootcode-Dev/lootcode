/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { currentUser } from "@clerk/nextjs";
import MapView from "~/components/mapview";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export default async function Page() {
  redirect("/map/home");
}
