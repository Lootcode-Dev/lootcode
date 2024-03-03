"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { api } from "~/trpc/react";

const Callback = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  api.auth.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : `/dashboard`);
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Callback;
1;
