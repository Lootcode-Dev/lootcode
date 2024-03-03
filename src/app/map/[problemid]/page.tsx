"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import CodeMirror from "@uiw/react-codemirror";

interface PageProps {
  params: {
    problemid: string;
  };
}

export default function Problem({ params }: PageProps) {
  return (
    <main className="z-10 flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen w-screen rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">{params.problemid}</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-[100cqh] w-[100cqw] items-center justify-center">
                <CodeMirror
                  width="100cqw"
                  height="100cqh"
                  onChange={(value, viewUpdate) => {
                    console.log(value, viewUpdate);
                  }}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
