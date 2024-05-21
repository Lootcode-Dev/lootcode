"use client";

import Image from "next/image";
import AccountDelete from "~/components/accountdelete";

export default function Page() {
    return (
        <main className="z-10 flex h-[92.5vh] flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="border-2 w-[60vw] h-[60vh] bg-black mt-10 flex flex-col items-center rounded-2xl overflow-scroll">
                <h1 className="text-6xl font-bold mt-5">Account Deletion</h1>
                <div className="flex flex-col items-center h-[100%] mt-5">
                    <p className="text-xl">Weclome traveler, seems you&#39;ve come across the void. It&#39;s dangerous here please head back.</p>
                    <p className="text-xl">If you&#39;re experiencing issues and can&#39;t play go ahead and jump.</p>
                    <div className="flex flex-row h-[80%] items-center">
                        <Image
                        src={"/logos/lootcode-no-floor.png"}
                        width={512}
                        height={512}
                        alt={"lootcode logo"}
                        className="mb-3 h-14 w-auto"
                        />
                        <div className="mt-[-1rem]"><AccountDelete></AccountDelete></div>
                    </div>
                </div>
            </div>
        </main>
    )
}