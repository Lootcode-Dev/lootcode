"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  ArrowRight,
  BackpackIcon,
  CoinsIcon,
  MapIcon,
  TrophyIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <TooltipProvider>
      <nav className="z-30 flex h-[7.5vh] w-full items-center bg-indigo-950 px-14 shadow-md backdrop-blur-3xl backdrop-brightness-110">
        <div className="nt-bold flex-1 text-2xl font-bold">
          <h1 className="text-xl font-bold">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/lootcode-no-floor.png"
                  width={50}
                  height={50}
                  alt={"lootcode logo"}
                  className="mb-3 h-12 w-12"
                />
                <span className="text-purple-500">Loot</span>
                <span className=" text-yellow-200">code</span>
              </div>
            </Link>
          </h1>
        </div>
        <div className="items-center">
          <SignedIn>
            <div className="flex items-center gap-8">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-3 text-white hover:bg-primary"
                    onClick={() => router.push("/map/home")}
                  >
                    <div className="flex items-center gap-2">
                      <MapIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-purple-700 text-white"
                >
                  <div>Map</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-3 text-white hover:bg-primary"
                    onClick={() => router.push("/inventory")}
                  >
                    <div className="flex items-center gap-2">
                      <BackpackIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-purple-700 text-white"
                >
                  <div>Inventory</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-3 text-white hover:bg-primary"
                    onClick={() => router.push("/shop")}
                  >
                    <div className="flex items-center gap-2">
                      <CoinsIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-purple-700 text-white"
                >
                  <div>Shop</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="rounded-md  bg-purple-700 p-3 text-white hover:bg-primary"
                    onClick={() => router.push("/leaderboard")}
                  >
                    <div className="flex items-center gap-2">
                      <TrophyIcon className="h-5 w-5" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-purple-700 text-white"
                >
                  <div>Leaderboard</div>
                </TooltipContent>
              </Tooltip>
              <UserButton afterSignOutUrl="/sign-in" showName={true} />
            </div>
          </SignedIn>
          <SignedOut>
            <Button className="rounded-md bg-purple-700 p-4 text-white">
              <SignInButton>
                <div className="flex items-center">
                  Sign in
                  <ArrowRight className="h-5 w-5" />
                </div>
              </SignInButton>
            </Button>
          </SignedOut>
        </div>
      </nav>
    </TooltipProvider>
  );
}
