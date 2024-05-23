import { currentUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import ReqsDenied from "~/components/reqsdenied";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import indFile from "~/util/index.json";
import mapFile from "~/util/map.json";

// Dynamically import `ProblemView` with no SSR
const ProblemViewWithNoSSR = dynamic(() => import("~/components/problemview"), {
  ssr: false,
});

interface PageProps {
  params: {
    chapterid: string;
    problemid: string;
  };
}

export default async function Problem({ params }: PageProps) {
  
  // Make sure this is a problem, not an encounter, and that it exists
  const problem = await api.code.getProblem.query({
    name: params.problemid,
    region: params.chapterid,
  });

  if (problem?.type == "game") {
    redirect(`/game/${params.chapterid}/${params.problemid}`);
  }

  if (problem?.description == "DNE") {
    redirect(`/map/${params.chapterid}`);
  }

  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map/${params.problemid}`);

  const dbUser = await db.user.findFirst({
    where: { email: user.emailAddresses[0]?.emailAddress },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map/${params.problemid}`);
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
    const encName = params.problemid
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
      <ProblemViewWithNoSSR
        problemid={params.problemid}
        chapterid={params.chapterid}
      ></ProblemViewWithNoSSR>
    );
  } else {
    return <ReqsDenied />;
  }
}
