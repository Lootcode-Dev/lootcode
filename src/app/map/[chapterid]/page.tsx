/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MapView from "~/components/mapview";
import ReqsDenied from "~/components/reqsdenied";
import { db } from "~/server/db";
import indFile from "~/util/index.json";
import mapFile from "~/util/map.json";

interface PageProps {
  params: {
    chapterid: string;
  };
}

const regions = [
  "Lexica",
  "Vectara",
  "Stackspires",
  "Queuesgard",
  "Arbonclave",
  "Findara",
  "Compendia",
  "Nodak",
  "Bitwise Bastions",
  "Arithmend",
  "Dynamar",
  "The Thicket",
];

export default async function Page({ params }: PageProps) {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map/${params.chapterid}`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map/${params.chapterid}`);
  }

  // Check for the Tower pre Requisites.
  let reqs = true;
  if (params.chapterid == "the_tower") {
    for (const region of regions) {
      if (!checkChapterCompletion(region, dbUser.problems)) {
        reqs = false;
      }
    }
  }

  if (params.chapterid == "the_tower" && reqs != true) {
    return <ReqsDenied />;
  }

  return <MapView user={dbUser} chapterid={params.chapterid}></MapView>;
}

function nameToFileName(name: string): string {
  return name.split(" ").join("_").toLowerCase();
}

//Restoring this to determine node colors
//I know this was implemented into the getProblem query,
//but I'd rather not run a TRPC query to get completion
//for each node on mount just to change colors
function checkCompletion(problem: string, user: string): boolean {
  let res = false;
  indFile.problems.map((prob, index) => {
    if (nameToFileName(problem) === nameToFileName(prob)) {
      res = user[index] === "1";
      return;
    }
  });
  return res;
}

//Returns true only if all problems in a chapter are completed
function checkChapterCompletion(
  name: string | undefined,
  user: string,
): boolean {
  if (name == undefined) return false;

  let res = true;
  mapFile.chapters.map((chapter, index) => {
    if (nameToFileName(chapter.name) === nameToFileName(name)) {
      mapFile.chapters[index]?.nodes.map((problem) => {
        if (!checkCompletion(problem.name, user)) {
          res = false;
          return;
        }
      });
    }
  });
  return res;
}
