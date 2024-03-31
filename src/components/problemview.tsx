"use client";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Coins, CoinsIcon, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import CodeCase from "~/components/codecase";
import { Button } from "~/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Stopwatch from "~/components/stopwatch";
// Dynamically import CodeMirror with no SSR
const CodeMirrorNoSSR = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});
const ReactMarkdownNoSSR = dynamic(() => import("react-markdown"), {
  ssr: false,
});

// Prepare the output
interface caseRes {
  num: number;
  input: string;
  expected: string;
  output: string;
  result: boolean;
  runtimeError?: string;
} //Case Interface for cases in the Code Grade Interface
interface codeGradeResult {
  compileError?: string;
  numPassed: number;
  numFailed: number;
  cases: caseRes[];
  time: string;
  reward: boolean;
  solved: boolean;
} //Code Grade Interface

export default function ProblemView({ problemid }: { problemid: string }) {
  const [language, setLanguage] = useState<string>("python");
  const [codeSize, setCodeSize] = useState<number>(0);
  const [runningCode, setRunningCode] = useState<boolean>(false);
  const [runData, setRunData] = useState<codeGradeResult>();
  const [code, setCode] = useState<string>("");
  const [firstSolve, setFirstSolve] = useState<boolean>(false);

  const { data: problem } = api.code.getProblem.useQuery({
    name: problemid,
  });

  const { data: runResponse, refetch: codeRun } = api.code.runProblem.useQuery(
    {
      name: problemid,
      code: code,
      lang: language,
    },
    { enabled: false },
  );

  return (
    <main className="z-10 flex h-[92.5vh] flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <ResizablePanelGroup direction="horizontal" className="border">
        {/* Panel 1: Markdown */}
        <ResizablePanel defaultSize={30} className="bg-[#282A36]">
          <div className="max-h-[92.5vh] overflow-auto">
            <ReactMarkdownNoSSR
              remarkPlugins={[remarkGfm]}
              className="prose p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
            >
              {problem?.description}
            </ReactMarkdownNoSSR>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            {/* Panel 2: Editor */}
            <ResizablePanel
              defaultSize={40}
              onResize={setCodeSize}
              className="bg-[#282A36]"
            >
              <div className="flex flex-col">
                <div className="mx-2 flex h-[5vh] items-center justify-between bg-zinc-800 p-1">
                  <Select onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px] bg-purple-950">
                      <SelectValue placeholder="Python" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="c">C</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Stopwatch />
                  <Button
                    className="border bg-purple-950"
                    onClick={() => {
                      setRunningCode(true);
                      void codeRun().then(response => {
                        //Set stateful data to our data to propagate changes 
                        setRunData(response.data);
                        
                        //When setFirstSolve is true we solved the problem (not necessarily the first time)
                        if (response.data?.reward === true) setFirstSolve(true);
                    
                        setRunningCode(false);
                      });
                    }}
                  >
                    {runningCode ? "Running..." : "Run"}
                  </Button>
                </div>
                <div className="max-h-100px grow overflow-auto">
                  <CodeMirrorNoSSR
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    theme={dracula}
                    height={`${codeSize - 5}vh`}
                    extensions={[loadLanguage(language as "java" | "python" | "cpp" | "c")!]} //Typescript shenanigans 
                    basicSetup={{
                      syntaxHighlighting: true,
                      closeBrackets: true,
                      highlightActiveLine: true,
                      lineNumbers: true,
                      highlightActiveLineGutter: true,
                      autocompletion: false,
                    }}
                    onChange={(value) => {
                      setCode(value);
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            {/* Panel 3 */}
            <ResizablePanel
              defaultSize={20}
              className=" overflow-auto  bg-[#282A36]"
            >
              <div className={`flex h-full flex-col items-center`}>
                <div className="flex h-[5vh] w-full items-center bg-zinc-800 p-1 px-4">
                  {!runningCode && runData && (
                    <div className="flex gap-4">
                      <div>Total: </div>
                      <div>
                        {runData?.numFailed +
                          runData?.numPassed}
                      </div>
                      <div>Passed: </div>
                      <div>{runData?.numPassed} </div>
                      <div>Failed:</div>
                      <div> {runData?.numFailed} </div>
                    </div>
                  )}
                  <div className="flex w-full items-center justify-end">
                    {runData?.solved === true ? (
                      <>
                        <Dialog open={firstSolve} onOpenChange={setFirstSolve}>
                          <DialogTrigger asChild>
                            <CoinsIcon className="mx-2 h-6 w-6 text-yellow-200" />
                          </DialogTrigger>
                          <DialogContent className="bg-zinc-800 sm:max-w-[425px]">
                            <ReactMarkdownNoSSR
                              remarkPlugins={[remarkGfm]}
                              className="prose p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
                            >
                              {problem?.loot}
                            </ReactMarkdownNoSSR>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`mt-4 h-full max-h-full w-full flex-col space-y-4 overflow-auto  px-2`}
                >
                  {runningCode ? (
                    <div className="flex h-full items-center justify-center font-extrabold text-yellow-200">
                      <Loader2 className="h-10 w-10 animate-spin" />
                    </div>
                  ) : runData ? (
                    runData?.compileError ? (
                      <div className="flex h-full items-center justify-center">
                        <div className="font-extrabold text-red-500">
                          {runData.compileError}
                        </div>
                      </div>
                    ) : (
                      runData?.cases.map((c, index) => (
                        <CodeCase c={c} key={`${c.num}-${index}`} />
                      ))
                    )
                  ) : (
                    <div className=" flex h-full items-center justify-center font-thin text-yellow-200 opacity-60 ">
                      Run code to see results...
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
