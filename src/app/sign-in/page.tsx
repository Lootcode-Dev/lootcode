import { SignIn } from "@clerk/nextjs";
import { SwordIcon } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="my-24 text-6xl font-bold">
        Lets get you started with <span className="text-purple-500">Loot</span>
        <span className=" text-yellow-200">code</span>
      </h1>
      <SignIn />
      <div className="mt-24">Get ready to adventure!</div>
    </main>
  );
}
