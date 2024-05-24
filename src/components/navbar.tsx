"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  BackpackIcon,
  CoinsIcon,
  MapIcon,
  TrophyIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  return (
    <TooltipProvider>
      <nav className="z-30 flex h-[7.5vh] w-full items-center bg-indigo-950 px-4 shadow-md backdrop-blur-3xl backdrop-brightness-110 md:px-14">
        <div className="nt-bold flex-1 text-2xl font-bold">
          <h1 className="text-sm font-bold md:text-xl">
            <div className="flex items-center">
              <Image
                src="/logos/lootcode-no-floor.png"
                width={50}
                height={50}
                alt={"lootcode logo"}
                className="mb-3 h-8 w-8 cursor-pointer md:h-12 md:w-12"
                onClick={() => router.push("/")}
              />
              <span
                className="cursor-pointer text-purple-500"
                onClick={() => router.push("/")}
              >
                Loot
              </span>
              <span
                className=" cursor-pointer text-yellow-200"
                onClick={() => router.push("/")}
              >
                code
              </span>
            </div>
          </h1>
        </div>
        <div className="items-center ">
          <SignedIn>
            <div className="flex items-center gap-4 md:gap-8">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-2 text-white hover:bg-primary md:p-3"
                    onClick={() => router.push("/map/home")}
                  >
                    <div className="flex items-center gap-2">
                      <MapIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="animate-fade-down bg-purple-700 text-white ease-in animate-duration-300"
                >
                  <div>Map</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-2 text-white hover:bg-primary md:p-3"
                    onClick={() => router.push("/inventory")}
                  >
                    <div className="flex items-center gap-2">
                      <BackpackIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="animate-fade-down bg-purple-700 text-white ease-in animate-duration-300"
                >
                  <div>Inventory</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-2 text-white hover:bg-primary md:p-3"
                    onClick={() => router.push("/shop")}
                  >
                    <div className="flex items-center gap-2">
                      <CoinsIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="animate-fade-down bg-purple-700 text-white ease-in animate-duration-300"
                >
                  <div>Shop</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-2 text-white hover:bg-primary md:p-3"
                    onClick={() => router.push("/leaderboard")}
                  >
                    <div className="flex items-center gap-2">
                      <TrophyIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="animate-fade-down bg-purple-700 text-white ease-in animate-duration-300"
                >
                  <div>Leaderboard</div>
                </TooltipContent>
              </Tooltip>
              <div className="hidden md:block">
                <UserButton
                  afterSignOutUrl="/sign-in"
                  showName={true}
                  userProfileMode="navigation"
                  userProfileUrl="/manage"
                />
              </div>
              <div className="md:hidden">
                <UserButton
                  afterSignOutUrl="/sign-in"
                  showName={false}
                  userProfileMode="navigation"
                  userProfileUrl="/manage"
                />
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button className="rounded-md bg-purple-700 p-2 text-white md:p-4">
                <div className="flex items-center">
                  Sign in
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </TooltipProvider>
  );
}
