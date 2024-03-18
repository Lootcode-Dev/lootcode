import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface caseRes {
  num: number;
  input: string;
  expected: string;
  output: string;
  result: boolean;
  runtimeError?: string;
} //Case Interface for cases in the Code Grade Interface

export default function CodeCase({ c }: { c: caseRes }) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // Cleanup function
      setOpen(false);
    };
  }, []);

  return (
    <div className="w-full flex-1 flex-col justify-between gap-4 rounded-xl border bg-zinc-800 p-2">
      <div className="flex h-auto items-center justify-between">
        <div className="flex gap-2 font-semibold">
          <div>Case: {c.num}</div>
          <div>
            Result:{" "}
            {c.result ? (
              <span className="text-green-500">Pass</span>
            ) : (
              <span className="text-red-500">Fail</span>
            )}
          </div>
        </div>
        <Button
          onClick={(_event) => setOpen(!open)}
          className="flex-none rounded bg-purple-900 hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transform transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </div>
      {open && (
        <div className="flex max-w-full flex-col gap-2 break-words">
          <div>Input: </div>
          <div className="whitespace-pre-wrap rounded-md bg-[#1f2937] p-2">
            {c.input}
          </div>
          <div>Expected: </div>
          <div className="whitespace-pre-wrap rounded-md bg-[#1f2937] p-2">
            {c.expected}
          </div>
          <div>Output: </div>
          <div className="whitespace-pre-wrap rounded-md bg-[#1f2937] p-2">
            {c.output}
          </div>
        </div>
      )}
    </div>
  );
}
