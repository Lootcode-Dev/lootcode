import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  ArrowRight,
  BrainIcon,
  Instagram,
  SwordIcon,
  TerminalIcon,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <>
      <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-white md:px-0">
        <div className="mt-[-7.5vh] flex h-screen w-full items-center justify-center p-4">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center justify-between  md:grid-cols-2">
            <div className="space-y-2">
              <div className="grid grid-cols-1 content-center items-center md:flex ">
                <Image
                  src={"/logos/lootcode-no-floor.png"}
                  width={512}
                  height={512}
                  alt={"lootcode logo"}
                  className="mb-3 h-36 w-36"
                />
                <div className="pt-4 text-5xl font-bold">
                  <span className="text-purple-500">Loot</span>
                  <span className=" text-yellow-200">code</span>
                </div>
              </div>

              <p className="text-lg">
                Embark on a journey to learn and master the art of programming.
                Explore the world, fight enemies, and uncover the mystery of the
                world of Algorion.
              </p>
              <div className="md:flex md:flex-col">
                <SignedOut>
                  <Link href="/sign-up">
                    <Button className="mt-4 bg-purple-700 text-white">
                      <div className="flex items-center">
                        Get Started
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </Button>
                  </Link>
                </SignedOut>
                <div className="mt-4 font-bold">
                  If you experience any issues feel free to reach out to us in
                  our{" "}
                  <a
                    href="https://discord.com/invite/7G7kJzc4pd"
                    target="_blank"
                    className="text-blue-500 hover:text-white"
                  >
                    Discord
                  </a>
                  .
                </div>
              </div>
            </div>
            <div className="mt-8 flex w-full items-center justify-center px-4">
              <Image
                src={"/maps/map1.png"}
                height={720}
                width={1280}
                alt={"Map of Algorion"}
                className="mt-6 h-full w-auto rounded-3xl border-2 p-2 transition-transform hover:scale-105 md:mt-0"
              />
            </div>
          </div>
        </div>
        <section className="w-full py-12">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Make Learning an Adventure
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                Lootcode has boiled down learning data structures and algorithms
                into a simple, yet engaging gameplay loop.
              </p>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-10 md:gap-24 lg:max-w-none lg:grid-cols-3 lg:grid-rows-1">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-purple-500 bg-[#15162c] p-4 drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
                <div className="rounded-full bg-purple-500 p-3 ">
                  <TerminalIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Code</h3>
                <p>
                  Enjoy a seamless code-editing experience with an integrated
                  code editor and our blazingly fast code-grade pipeline,
                  equipped with real-time feedback.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-purple-500 bg-[#15162c] p-4 drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
                <div className="rounded-full bg-purple-500 p-3 ">
                  <SwordIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Adventure</h3>
                <p>
                  Travel the world of Algorion and uncover the mystery of the
                  malice that has overtaken the world, while fighting enemies
                  and discovering lore along the way.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-purple-500 bg-[#15162c] p-4 drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
                <div className="rounded-full bg-purple-500 p-3">
                  <BrainIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Learn</h3>
                <p>
                  Try new things, get exposed to new concepts, and do everything
                  you can to help the people of Algorion. The smarter you are,
                  the safer the world becomes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full md:py-24 lg:py-72">
          <div className="mb-8 mt-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Expansive Gameplay
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
              The world of Algorion is rich and vast, and offers a unique
              gameplay experience on a person-to-person basis. Don&apos;t
              beleive us? Just take a look at how extensive the in-game content
              is!
            </p>
          </div>
          <div className="container grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-purple-500 bg-[#15162c] p-4 text-center drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
              <div className="space-y-2">
                <h2 className="text-xl  font-bold tracking-tighter md:text-4xl/tight">
                  12 Unique Regions
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From the lush forest of the Arbonclave to the textually rich
                  lands of Lexica, there are 12 completely unique regions, each
                  with their own culture, people, and problems for you to
                  explore.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-purple-500 bg-[#15162c] p-4 text-center drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
              <div className="space-y-2">
                <h2 className="text-xl  font-bold tracking-tighter md:text-4xl/tight">
                  25,000+ Words of Story
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Across lore collectibles, region descriptions, problem
                  statements, and encounters, we have crafted a story that is
                  sure to keep you engaged and always wonder &quot;what
                  next?&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-purple-500 bg-[#15162c] p-4 text-center drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tighter md:text-4xl/tight">
                  75+ Problems
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Overcome the vast array of challenges that threaten you and
                  the people of Algorion. By leveraging your keen intellect, you
                  can save thousands. No pressure.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-purple-500 bg-[#15162c] p-4 text-center drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tighter md:text-4xl/tight">
                  30+ Encounters
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Engage in addictive combat encounters with foes who dare
                  threaten the peace of Algorion. Leverage your magical gear and
                  smite your opponents down.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-purple-500 bg-[#15162c] p-4 text-center drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
              <div className="space-y-2">
                <h2 className="text-xl  font-bold tracking-tighter md:text-4xl/tight">
                  35+ Collectibles
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the mystery of the world as you play by unlocking
                  collectibles with various hints into where the magic of
                  Algorion has vanished to...
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-purple-500 bg-[#15162c] p-4 text-center drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
              <div className="space-y-2">
                <h2 className="text-xl  font-bold tracking-tighter md:text-4xl/tight">
                  50+ Items
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Having access to unique items, each with a unique playstyle
                  and stats, the combat encounters have a level of depth and
                  strategy!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full pb-56">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="pt-12 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Gallery
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A glance at the world of Algorion, and the adventure that awaits
                you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Image
                alt="Inventory Screenshot"
                className=" rounded-xl object-cover transition-transform hover:scale-105"
                height="720"
                src="/gallery/inventory.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="1280"
              />
              <Image
                alt="Home Page Screenshot"
                className="rounded-xl object-cover transition-transform hover:scale-105"
                height="720"
                src="/gallery/home.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="1280"
              />
              <Image
                alt="Problem Screenshot"
                className="rounded-xl object-cover transition-transform hover:scale-105"
                height="720"
                src="/gallery/problem.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="1280"
              />
              <Image
                alt="Leaderboard Screenshot"
                className="rounded-xl object-cover transition-transform hover:scale-105"
                height="720"
                src="/gallery/leaderboard.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="1280"
              />
              <Image
                alt="Region Screenshot"
                className="rounded-xl object-cover transition-transform hover:scale-105"
                height="720"
                src="/gallery/region.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="1280"
              />
              <Image
                alt="Game Screenshot"
                className="rounded-xl object-cover transition-transform hover:scale-105"
                height="720"
                src="/gallery/game.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="1280"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 bg-indigo-950 px-4 py-6 text-white sm:flex-row md:px-6">
        <p className="text-xs ">© 2024 Lootcode. All rights reserved.</p>

        <nav className="flex gap-4 sm:ml-auto sm:gap-6"></nav>
        <div className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link href="/privacy.pdf" className="text-white">
            Privacy Policy
          </Link>
          <Link
            className="text-white transition-all ease-in hover:-translate-y-1"
            href="https://www.instagram.com/lootcode.dev/"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            className="text-white transition-all ease-in hover:-translate-y-1"
            href="https://www.youtube.com/@Lootcode-Dev"
          >
            <Youtube className="h-5 w-5" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            className="text-white transition-all ease-in hover:-translate-y-1  "
            href="https://discord.gg/7G7kJzc4pd"
          >
            <Image
              src="/discord.svg"
              alt="Discord"
              width={24}
              height={24}
              className="h-5 w-5 "
            />
            <span className="sr-only">Discord</span>
          </Link>
        </div>
      </footer>
    </>
  );
}
