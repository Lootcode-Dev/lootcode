import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ReqsDenied from "~/components/reqsdenied";
import Testgame from "~/components/testgame";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import indFile from "~/util/index.json";
import mapFile from "~/util/map.json";

interface PageProps {
  params: {
    chapterid: string;
    encounterid: string;
  };
}

export default async function GamePage({ params }: PageProps) {
  // Make sure this is an encounter, not a problem, and that it exists
  const problem = await api.code.getProblem.query({
    name: params.encounterid,
    region: params.chapterid,
  });

  if (problem?.type == "problem") {
    redirect(`/map/${params.chapterid}/${params.encounterid}`);
  }

  if (problem?.description == "DNE") {
    redirect(`/map/${params.chapterid}`);
  }

  const user = await currentUser();

  if (!user?.id)
    redirect(
      `/auth-callback?origin=game/${params.chapterid}/${params.encounterid}`,
    );

  const dbUser = await db.user.findFirst({
    where: { email: user.emailAddresses[0]?.emailAddress },
  });

  if (!dbUser) {
    redirect(
      `/auth-callback?origin=game/${params.chapterid}/${params.encounterid}`,
    );
  }

  // Check if the necessary requisite problems were completed first
  // Grab the pre-requisites from the map file
  let reqsMet = true;
  const problems = dbUser.problems.split("");
  const regName = params.chapterid
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const region = mapFile.chapters.find((chapter) => chapter.name == regName);
  if (region) {
    const encName = params.encounterid
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const encounter = region.nodes.find((node) => node.name === encName);
    const prereqs = encounter?.next.map((str) =>
      str.toLowerCase().replace(/\s/g, "_"),
    );
    if (prereqs) {
      for (const prereq of prereqs) {
        // Find the index of prereq in the index file
        const prereqIndex = indFile.problems.findIndex(
          (problem) => problem.toLowerCase() === prereq,
        );
        if (problems[prereqIndex] === "0") {
          reqsMet = false;
          break;
        }
      }
    }
  }

  if (reqsMet) {
    return (
      <Testgame
        user={dbUser}
        name={user.firstName ?? ""}
        enc={params.encounterid}
        reg={params.chapterid}
      />
    );
  } else {
    return <ReqsDenied />;
  }
}
