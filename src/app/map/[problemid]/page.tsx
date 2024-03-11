"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import { api } from "~/trpc/react";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: {
    problemid: string;
  };
}

export default function Problem({ params }: PageProps) {
  const [language, setLanguage] = useState<string>("python");
  const [size, setSize] = useState<number>(0);
  const [code, setCode] = useState<string>("");

  const { data: problem } = api.code.getProblem.useQuery({
    name: params.problemid,
  });

  /*
    TRPC OBJECT
    data, refetch, error

    {
      data: data
      refetch: codeRun
    }


  */

  const {
    data: data,
    refetch: codeRun,
    error: codeError,
  } = api.code.runProblem.useQuery(
    {
      name: params.problemid,
      code: code,
      lang: language,
    },
    { enabled: false },
  );

  const {
    data: templateData,
    refetch: templateRun,
    error: templateError,
  } = api.code.testTemplate.useQuery(
    {
      name: params.problemid,
      code: code,
      lang: language,
    },
    { enabled: false },
  );

  useEffect(() => {
    if (problem) {
      console.log(problem);
    }
  }, [problem]);

  useEffect(() => {
    if (codeError) console.log("ERROR DETECTED\n\n\n", codeError);
  }, [codeError]);

  return (
    <main className="z-10 flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen w-screen rounded-lg border"
      >
        {/* Panel 1: Markdown */}
        <ResizablePanel defaultSize={30} className="bg-[#282A36]">
          <div className="max-h-[100vh] overflow-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
            >
              {problem}
            </ReactMarkdown>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            {/* Panel 2: Editor */}
            <ResizablePanel
              defaultSize={40}
              onResize={setSize}
              className="bg-[#282A36]"
            >
              <div className="flex flex-col">
                <div className="  h-[5vh] bg-zinc-800 p-1">
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
                </div>
                <div className="max-h-100px grow overflow-auto">
                  <CodeMirror
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    theme={dracula}
                    height={`${size - 5}vh`}
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
            <ResizablePanel defaultSize={20}>
              <div className="flex h-full items-center justify-center p-6">
                <span
                  className="border-2 border-red-500 font-semibold"
                  onClick={() => codeRun()}
                >
                  Three
                </span>
                <span
                  className="border-2 border-red-500 font-semibold"
                  onClick={() => templateRun()}
                >
                  Four
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
