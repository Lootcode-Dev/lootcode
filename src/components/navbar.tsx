import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  ArrowRight,
  BackpackIcon,
  CoinsIcon,
  MapIcon,
  SwordIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="flex h-[7.5vh] w-full items-center justify-between bg-indigo-950 px-56 py-4 shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <span className="text-purple-500">Loot</span>
            <span className=" text-yellow-200">code</span>
          </Link>
        </h1>
      </div>
      <div>
        <SignedIn>
          <div className="flex items-center gap-8">
            <Link href="/map">
              <Button className="bg-purple-700 text-white">
                <div className="flex items-center gap-2">
                  Map <MapIcon className="h-5 w-5" />
                </div>
              </Button>
            </Link>
            <Link href="/inventory">
              <Button className="bg-purple-700 text-white">
                <div className="flex items-center gap-2">
                  Inventory <BackpackIcon className="h-5 w-5" />
                </div>
              </Button>
            </Link>
            <Link href="/shop">
              <Button className="bg-purple-700 text-white">
                <div className="flex items-center gap-2">
                  Shop <CoinsIcon className="h-5 w-5" />
                </div>
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/sign-in" showName={true} />
          </div>
        </SignedIn>
        <SignedOut>
          <Button className="bg-purple-700 text-white">
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
  );
}
