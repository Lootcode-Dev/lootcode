import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-[92.5vh] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 py-12 text-white md:px-6 lg:px-8">
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          You&apos;ve stumbled off course...
        </h1>
        <p className=" md:text-xl">
          The requested page could not be located. Wander back to familiar
          territory, gear up, and try again.
        </p>
        <div className="grid gap-4">
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-purple-500 bg-[#15162c] p-4 drop-shadow-md transition-all ease-in hover:-translate-y-2 hover:border-yellow-200">
            <h3 className="text-lg font-semibold">Common Not Found Issues</h3>
            <ul className="mt-4 space-y-2 ">
              <li>
                <span className=" font-bold ">Sign-in without an account</span>{" "}
                - If you are encountering this page after trying to sign-in,
                make sure you sign-up first.
              </li>
              <li>
                <span className="font-bold ">Invalid URL</span> - You may be a
                bit lost... Try referring to your map.
              </li>
              <li>
                <span className="font-bold ">Deleted Content</span>- The page
                you&apos;re looking for may have been destroyed by vile
                magicians!
              </li>
            </ul>
          </div>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
