import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Inter } from "next/font/google";

import Navbar from "~/components/navbar";
import { TRPCReactProvider } from "~/trpc/react";
import { type Viewport } from "next";

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

export const viewport: Viewport = {
  themeColor: "purple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="bg-[#282A36]">
      <Script
                async
                src="https://dormdevs-analytics.vercel.app/script.js"
                data-website-id="c309e430-da82-4161-b0d0-08714de60cda"
            />
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
        </head>
        <body className={`font-sans ${inter.variable}`}>
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
