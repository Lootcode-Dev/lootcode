"use client";

import Image from "next/image";
import AccountDelete from "~/components/accountdelete";

export default function Page() {
  return (
    <main className="z-10 flex h-[92.5vh] flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="m-4 mt-10 flex h-[60vh] flex-col items-center overflow-scroll rounded-2xl border-2 bg-black p-4 md:w-[60vw]">
        <h1 className="mt-5 text-6xl font-bold">Account Deletion</h1>
        <div className="mt-5 flex h-[100%] flex-col items-center">
          <p className="text-xl">
            Welcome traveler, seems you&#39;ve come across the void. It&#39;s
            dangerous here please head back.
          </p>
          <p className="text-xl">
            If you&#39;re experiencing issues and can&#39;t play go ahead and
            jump.
          </p>
          <div className="flex h-[80%] flex-row items-center">
            <Image
              src={"/logos/lootcode-no-floor.png"}
              width={512}
              height={512}
              alt={"lootcode logo"}
              className="mb-3 h-14 w-auto"
            />
            <div className="mt-[-1rem]">
              <AccountDelete></AccountDelete>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
