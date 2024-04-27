import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Inter } from "next/font/google";

import Navbar from "~/components/navbar";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lootcode",
  description:
    "A fantasy themed code runner for learning Data Structures and Algorithms.",
  icons: [{ rel: "icon", url: "/logos/lootcode-no-floor.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="bg-[#282A36]">
        <body className={`font-sans ${inter.variable}`}>
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
