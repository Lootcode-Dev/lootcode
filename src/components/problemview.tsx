"use client";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { ArrowLeft, Check, CoinsIcon, Hash, Loader2, X } from "lucide-react";
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
import mapFile from "~/util/map.json";
import { nameToFileName } from "./mapview";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Mobile from "./safari";
import Stopwatch from "./stopwatch";
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

export default function ProblemView({
  problemid,
  chapterid,
}: {
  problemid: string;
  chapterid: string;
}) {
  const [language, setLanguage] = useState<string>("python");
  const [codeSize, setCodeSize] = useState<number>(0);
  const [runningCode, setRunningCode] = useState<boolean>(false);
  const [runData, setRunData] = useState<codeGradeResult>();
  const [code, setCode] = useState<string>("");
  const [firstSolve, setFirstSolve] = useState<boolean>(false);
  const [problemLabel, setProblemLabel] = useState<string>("");
  const panelRef = useRef(null);

  useEffect(() => {
    const storedCode = localStorage.getItem(`code${problemid}`); // retrieve local stored code from problemid space
    const storedLang = localStorage.getItem(`lang${problemid}`); // retrieve local stored lang from problemid space
    if (storedCode) setCode(storedCode);
    if (storedLang) setLanguage(storedLang);

    mapFile.chapters.map((val, index) => {
      if (nameToFileName(val.name) == chapterid) {
        mapFile.chapters[index]?.nodes.map((value) => {
          if (nameToFileName(value.name) == problemid) {
            setProblemLabel(value.name);
            return;
          }
        });
        return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const langName = new Map(); //Map to convert lang identifier to proper name
  langName.set("python", "Python");
  langName.set("java", "Java");
  langName.set("cpp", "C++");
  langName.set("c", "C");
  langName.set("rust", "Rust");
  langName.set("go", "Go");
  langName.set("csharp", "C#");

  //Function to save what lang we're using to localStorage
  const langSaver = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem(`lang${problemid}`, lang);
  };

  const { data: problem } = api.code.getProblem.useQuery({
    name: problemid,
    region: chapterid,
  });

  const { refetch: codeRun } = api.code.runProblem.useQuery(
    {
      name: problemid,
      code: code,
      lang: language,
      region: chapterid,
    },
    { enabled: false, retry: false },
  );

  const { refetch: dockerCreate } = api.docker.createDockerContainer.useQuery(
    { name: problemid },
    { enabled: false, retry: false },
  );

  return (
    <main className="z-10 flex h-[92.5vh] flex-col items-center bg-gradient-to-b  from-[#2e026d] to-[#15162c] p-2 text-white">
      <div className="m-2 grid w-full grid-cols-2 items-center justify-between rounded-xl bg-[#15162c] p-2 font-bold md:grid-cols-3 md:text-2xl">
        <div className="flex flex-row items-center gap-2">
          <a href={`/map/${chapterid}`}>
            <ArrowLeft className="m-1 size-8 cursor-pointer rounded bg-purple-700 duration-150 hover:bg-[#15162c]"></ArrowLeft>
          </a>
          <div>{problemLabel}</div>
        </div>
        <div className="hidden text-lg md:block">
          <Stopwatch />
        </div>
        <div className="mr-1 flex flex-row justify-end gap-2">
          <Select onValueChange={langSaver}>
            <SelectTrigger className="h-8 w-[180px] bg-purple-700">
              <SelectValue placeholder={langName.get(language) as string} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="h-8 bg-purple-700"
            onClick={() => {
              if (!runningCode) {
                setRunningCode(true);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                void dockerCreate().then(() => {
                  void codeRun().then((response) => {
                    //Set stateful data to our data to propagate changes
                    setRunData(response.data);
                    //When setFirstSolve is true we solved the problem (not necessarily the first time)
                    if (response.data?.reward === true) setFirstSolve(true);
                    setRunningCode(false);
                  });
                });
              }
            }}
          >
            {runningCode ? "Running..." : "Run"}
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" ref={panelRef} className="">
        {/* Panel 1: Markdown */}
        <ResizablePanel
          defaultSize={30}
          className="rounded-lg border-4 border-[#15162c] bg-transparent"
        >
          <div className="h-full overflow-auto bg-[#282A36]">
            <ReactMarkdownNoSSR
              remarkPlugins={[remarkGfm]}
              className="prose p-4 text-white prose-headings:text-purple-500 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
            >
              {problem?.description}
            </ReactMarkdownNoSSR>
          </div>
        </ResizablePanel>
        <ResizableHandle className="border-4 border-transparent bg-transparent" />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            {/* Panel 2: Editor */}
            <ResizablePanel
              defaultSize={40}
              onResize={setCodeSize}
              className="rounded-lg border-4 border-[#15162c] bg-[#282A36]"
            >
              <CodeMirrorNoSSR
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                theme={dracula}
                value={code}
                height={`${(80 * codeSize) / 100}vh`}
                extensions={[
                  loadLanguage(
                    language as
                      | "java"
                      | "python"
                      | "csharp"
                      | "cpp"
                      | "c"
                      | "rust"
                      | "go",
                  )!,
                ]} //Typescript shenanigans
                basicSetup={{
                  syntaxHighlighting: true,
                  closeBrackets: true,
                  highlightActiveLine: true,
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  autocompletion: false,
                }}
                onChange={(value) => {
                  localStorage.setItem(`code${problemid}`, value); // Map code to local storage problem Id space
                  setCode(value);
                }}
              />
            </ResizablePanel>
            <ResizableHandle className="border-4 border-transparent bg-transparent" />
            {/* Panel 3 */}
            <ResizablePanel
              defaultSize={20}
              className="overflow-auto rounded-lg border-4 border-[#15162c] bg-[#282A36]"
            >
              <div className={`flex h-full flex-col items-center`}>
                <div className="flex h-[5vh] w-full items-center bg-zinc-800 p-2">
                  <div className="grid w-full grid-cols-2 items-center justify-between">
                    <div className="items-center text-xl font-bold">Cases</div>

                    <div className="flex flex-row justify-end gap-2">
                      <div className="flex w-full items-center justify-end">
                        {runData?.solved === true ? (
                          <>
                            <Dialog
                              open={firstSolve}
                              onOpenChange={setFirstSolve}
                            >
                              <DialogTrigger asChild className="cursor-pointer">
                                <CoinsIcon className="mx-2 h-6 w-6 text-yellow-200" />
                              </DialogTrigger>
                              <DialogContent className="max-h-[500px] overflow-auto bg-zinc-800 sm:max-w-[625px]">
                                {chapterid === "the_tower" ? (
                                  <ReactMarkdownNoSSR
                                    remarkPlugins={[remarkGfm]}
                                    className="prose max-h-[425px] max-w-[600px] overflow-auto p-4 text-white prose-headings:text-purple-500 prose-strong:font-medium prose-strong:text-gray-400 prose-strong:text-opacity-30 prose-em:text-yellow-200"
                                  >
                                    {`${problem?.lore}\n\n` +
                                      `${`*Reward: ${problem?.gold} gold*`}`}
                                  </ReactMarkdownNoSSR>
                                ) : (
                                  <ReactMarkdownNoSSR
                                    remarkPlugins={[remarkGfm]}
                                    className="prose p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
                                  >
                                    {`# You earned...\n` +
                                      `${problem?.lore ? `*Collectible: ${problem.lore}*\n\n` : ""}` +
                                      `${`*Reward: ${problem?.gold} gold*`}`}
                                  </ReactMarkdownNoSSR>
                                )}
                              </DialogContent>
                            </Dialog>
                          </>
                        ) : (
                          <div />
                        )}
                      </div>
                      {!runningCode && runData && (
                        <div className="flex flex-row justify-end gap-2">
                          <div className="flex flex-row rounded border-2 border-gray-700 bg-gray-950 p-1">
                            <Hash />
                            {runData?.numFailed + runData?.numPassed}
                          </div>
                          <div className="flex flex-row rounded border-2 border-green-700 bg-green-950 p-1">
                            <Check />
                            {runData?.numPassed}
                          </div>
                          <div className="flex flex-row rounded border-2 border-red-700 bg-red-950 p-1">
                            <X />
                            {runData?.numFailed}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`m-2 h-full max-h-full w-full flex-col space-y-4 overflow-auto  px-2`}
                >
                  {runningCode ? (
                    <div className="flex h-full items-center justify-center font-extrabold text-yellow-200">
                      <Loader2 className="h-10 w-10 animate-spin" />
                    </div>
                  ) : runData ? (
                    runData?.compileError ? (
                      <div className="flex min-h-full flex-col items-center justify-center overflow-scroll p-2">
                        <div className="font-extrabold">Compile Time Error</div>
                        <div className="font-mono text-red-500">
                          {runData.compileError.split("\n").map((data, idx) => (
                            <p key={idx}>{data}</p>
                          ))}
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
