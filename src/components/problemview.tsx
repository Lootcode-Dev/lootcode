"use client";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import dynamic from "next/dynamic";
// Dynamically import CodeMirror with no SSR
const CodeMirrorNoSSR = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});
import { useEffect, useState } from "react";
const ReactMarkdownNoSSR = dynamic(() => import("react-markdown"), {
  ssr: false,
});
import remarkGfm from "remark-gfm";
import { set } from "zod";
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
} //Code Grade Interface

export default function ProblemView({ problemid }: { problemid: string }) {
  const [language, setLanguage] = useState<string>("python");
  const [codeSize, setCodeSize] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const [runningCode, setRunningCode] = useState<boolean>(false);
  const [runData, setRunData] = useState<codeGradeResult>();

  const handleRun = () => {
    setRunningCode(true);
    void codeRun();
  };

  const { data: problem } = api.code.getProblem.useQuery({
    name: problemid,
  });

  const {
    data: runResponse,
    refetch: codeRun,
    error: codeError,
  } = api.code.runProblem.useQuery(
    {
      name: problemid,
      code: code,
      lang: language,
    },
    { enabled: false },
  );

  useEffect(() => {
    if (codeError) console.log("ERROR DETECTED\n\n\n", codeError);
  }, [codeError]);

  useEffect(() => {
    if (runResponse) {
      setRunningCode(false);
      setRunData(runResponse);
    }
  }, [runResponse]);

  return (
    <main className="z-10 flex h-[92.5vh] flex-col items-center border border-red-500 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <ResizablePanelGroup direction="horizontal" className="border">
        {/* Panel 1: Markdown */}
        <ResizablePanel defaultSize={30} className="bg-[#282A36]">
          <div className="max-h-[100vh] overflow-auto">
            <ReactMarkdownNoSSR
              remarkPlugins={[remarkGfm]}
              className="prose p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
            >
              {problem}
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
                <div className="  mx-2 flex h-[5vh] justify-between bg-zinc-800 p-1">
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
                  <Button
                    className="border bg-purple-950"
                    onClick={() => handleRun()}
                  >
                    {runningCode ? "Running..." : "Run"}
                  </Button>
                </div>
                <div className="max-h-100px grow overflow-auto">
                  <CodeMirrorNoSSR
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    theme={dracula}
                    height={`${codeSize - 5}vh`}
                    extensions={[loadLanguage(language)]}
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
                  {runData && (
                    <div className="flex gap-4">
                      <div>Total: {runData.numFailed + runData.numPassed} </div>
                      <div>Passed: {runData.numPassed} </div>
                      <div>Failed: {runData.numFailed} </div>
                    </div>
                  )}
                </div>
                <div
                  className={`mt-4 h-full max-h-full w-full flex-col space-y-4 overflow-auto  px-2`}
                >
                  {runData ? (
                    runData.compileError ? (
                      <div className="flex items-center justify-center font-extrabold text-red-500">
                        {runData.compileError}
                      </div>
                    ) : (
                      runData.cases.map((c, index) => (
                        <CodeCase c={c} key={`${c.num}-${index}`} />
                      ))
                    )
                  ) : (
                    "Run code to see results"
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
