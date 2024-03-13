import dynamic from "next/dynamic";

// Dynamically import `ProblemView` with no SSR
const ProblemViewWithNoSSR = dynamic(() => import("~/components/problemview"), {
  ssr: false,
});

interface PageProps {
  params: {
    problemid: string;
  };
}

export default function Problem({ params }: PageProps) {
  return (
    <ProblemViewWithNoSSR problemid={params.problemid}></ProblemViewWithNoSSR>
  );
}
