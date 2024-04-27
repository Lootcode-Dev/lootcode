import { Check, X } from "lucide-react";
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
    <div className="w-full flex-1 flex-col justify-between gap-4 rounded-lg bg-[#15162c] p-2">
      <div className="flex h-auto items-center justify-between">
        <div className="flex flex-row gap-2 text-center text-2xl">
          {c.result ? (
            <Check className="size-8 text-green-700" />
          ) : (
            <X className="size-8 text-red-700" />
          )}
          <div>{"Case " + c.num}</div>
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
        <div className="mt-2 flex max-w-full flex-col gap-2 break-words rounded-lg bg-[#15162c] p-2">
          <div>Input: </div>
          <div className="whitespace-pre-wrap rounded-md bg-[#1f2937] p-2 font-mono">
            {c.input}
          </div>
          <div>Expected: </div>
          <div className="whitespace-pre-wrap rounded-md bg-[#1f2937] p-2 font-mono">
            {c.expected}
          </div>
          <div>Output: </div>
          <div className="whitespace-pre-wrap rounded-md bg-[#1f2937] p-2 font-mono">
            {c.output}
          </div>
        </div>
      )}
    </div>
  );
}
