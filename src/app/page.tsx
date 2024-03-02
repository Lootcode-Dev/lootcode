import { Button } from "~/components/ui/button";
import { ArrowRight, BrainIcon, SwordIcon, TerminalIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex h-screen w-full items-center justify-center p-4">
        <div className="flex w-full max-w-7xl items-center justify-between space-x-12">
          <div className="max-w-lg space-y-6">
            <h1 className="text-5xl font-bold">
              Embark on a quest with{" "}
              <span className="text-purple-500">Loot</span>
              <span className=" text-yellow-200">code</span>
            </h1>
            <p className="text-lg">
              Embark on a journey to learn and master the art of programming by
              looting dungeons, fighting enemies, and uncovering the mystery of
              the world of (TBD)
            </p>
            <div className="flex space-x-4">
              <Button className="bg-purple-700 text-white">
                <SignInButton>
                  <div className="flex items-center">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </SignInButton>
              </Button>
              <Button className="border border-black bg-white text-black">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-auto w-[40vw]">
              <Image
                src={"/homepage2.png"}
                height={1920}
                width={1080}
                alt={"A colorful fantasy background"}
                className="h-auto w-[40vw]"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-12">
          <div className="space-y-4 text-center">
            <div className="inline-block space-y-2 rounded-lg bg-yellow-200 px-3 py-1 text-sm dark:bg-gray-800">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Learning is an adventure
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
              The realms of Lootcode await, filled with challenges and treasures
              unknown. Sign up today and take the first step on your journey to
              becoming a coding legend. Your quest begins now.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-12 lg:max-w-none lg:grid-cols-3 lg:grid-rows-1">
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-purple-500 p-3">
                <TerminalIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Code</h3>
              <p>
                Enjoy a seamless code-testing experience with our blazingly fast
                codegrade pipeline and built-in editor
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-purple-500 p-3 ">
                <SwordIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Adventure</h3>
              <p>
                Travel the world, loot dungeons, slay monsters, and discover the
                secrets of the world of (TBD).
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-purple-500 p-3">
                <BrainIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Learn</h3>
              <p>
                Try new things, learn new concepts, and become a better
                programmer with every challenge you face.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
