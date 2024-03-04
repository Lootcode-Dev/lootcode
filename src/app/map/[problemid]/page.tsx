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
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "~/trpc/react";

interface PageProps {
  params: {
    problemid: string;
  };
}

export default function Problem({ params }: PageProps) {
  const [language, setLanguage] = useState<string>("python");
  const [size, setSize] = useState<number>(0);
  const [code, setCode] = useState<string>("");

  const {
    data: data,
    refetch: codeRun,
    error: codeError,
  } = api.code.getProblem.useQuery(
    {
      name: params.problemid,
      code: code,
    },
    { enabled: false },
  );

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

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
        <ResizablePanel defaultSize={30}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="prose dark:prose-invert"
          ></Markdown>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            {/* Panel 2: Editor */}
            <ResizablePanel defaultSize={40} onResize={setSize}>
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
                        <SelectItem value="javascript">Javascript</SelectItem>
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
                <span className="font-semibold" onClick={() => codeRun()}>
                  Three
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}