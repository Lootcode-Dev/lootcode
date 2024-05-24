import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {

  return (
    <div className=" flex h-[92.5vh] w-full flex-col  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex items-center justify-center p-8 text-white lg:p-12 ">
        <div className="w-full max-w-xl space-y-4 rounded-xl md:border md:bg-[#15162c] drop-shadow-xl">
          <div className="flex w-full justify-center px-12 pt-4">
            <Image
              src="/logos/lootcode-no-floor.png"
              width={512}
              height={512}
              alt="lootcode logo"
              className="h-24 w-24"
            />
            <div className="pl-2 pt-10 text-5xl font-bold">
              <span className="text-purple-500">Loot</span>
              <span className=" text-yellow-200">code</span>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 pb-6 pt-12 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get Started!
            </h1>
            <p className="flex max-w-[500px] flex-col pt-2 text-center ">
              Prepare to jump into the world of Algorion and explore all that
              awaits! If you already have an account, make sure to sign in
              instead.
            </p>
          </div>
          <div className="flex flex-col items-center pb-12">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
