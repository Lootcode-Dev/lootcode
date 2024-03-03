import { SignUp } from "@clerk/nextjs";
import { SwordIcon } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="my-24 text-6xl font-bold">
        Get excited for <span className="text-purple-500">Loot</span>
        <span className=" text-yellow-200">code</span>
      </h1>
      <SignUp />
      <div className="mt-24 flex items-center justify-items-center gap-3">
        <div>Prepare for an adventure</div>
        <div className="rounded-full bg-purple-500 p-2 ">
          <SwordIcon className="h-5 w-5" />
        </div>
      </div>
    </main>
  );
}
