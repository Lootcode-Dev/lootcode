import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between bg-indigo-950 px-56 py-4 shadow-md">
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
          <UserButton afterSignOutUrl="/" showName={true} />
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
