import { currentUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

// Dynamically import `ProblemView` with no SSR
const ProblemViewWithNoSSR = dynamic(() => import("~/components/problemview"), {
  ssr: false,
});

interface PageProps {
  params: {
    problemid: string;
  };
}

export default async function Problem({ params }: PageProps) {
  const user = await currentUser();

  if (!user?.id) redirect(`/auth-callback?origin=map/${params.problemid}`);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=map/${params.problemid}`);
  }

  return (
    <ProblemViewWithNoSSR problemid={params.problemid}></ProblemViewWithNoSSR>
  );
}
