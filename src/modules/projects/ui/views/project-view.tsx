"use client";

import { FileExplorer } from "@/components/file-explorer";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserControl } from "@/components/user-control";
import { Fragment } from "@/generated/prisma";
import { FragmentWeb } from "@/modules/projects/ui/components/fragment-web";
import { MessagesContainer } from "@/modules/projects/ui/components/message-container";
import { ProjectHeader } from "@/modules/projects/ui/components/project-header";
import { useAuth } from "@clerk/nextjs";
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <div className="h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
            <Suspense
              fallback={
                <div className="p-4 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32 animate-pulse" />
                </div>
              }
            >
              <ProjectHeader projectId={projectId} />
            </Suspense>

            <Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse mx-auto" />
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Loading conversation...
                    </p>
                  </div>
                </div>
              }
            >
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors" />

        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
          <div className="h-full bg-white dark:bg-zinc-900">
            <Tabs
              className="h-full flex flex-col"
              defaultValue="preview"
              value={tabState}
              onValueChange={(value) =>
                setTabState(value as "preview" | "code")
              }
            >
              {/* Fixed header layout */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  <TabsList className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <TabsTrigger
                      value="preview"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-sm"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>Preview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-sm"
                    >
                      <CodeIcon className="w-4 h-4" />
                      <span>Code</span>
                    </TabsTrigger>
                  </TabsList>

                  {activeFragment && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-full">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        Live
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!hasProAccess && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
                    >
                      <Link href="/pricing" className="flex items-center gap-2">
                        <CrownIcon className="w-4 h-4" />
                        <span>Upgrade</span>
                      </Link>
                    </Button>
                  )}
                  <UserControl />
                </div>
              </div>

              <TabsContent value="preview" className="flex-1 min-h-0 m-0 p-4">
                {activeFragment ? (
                  <div className="h-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                    <FragmentWeb data={activeFragment} />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-6 max-w-sm">
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl mx-auto flex items-center justify-center">
                        <EyeIcon className="w-8 h-8 text-zinc-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                          Ready to Preview
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Start a conversation to generate your first app
                          preview
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="code" className="flex-1 min-h-0 m-0 p-4">
                {activeFragment?.files ? (
                  <div className="h-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                    <FileExplorer
                      files={
                        Array.isArray(activeFragment.files)
                          ? Object.fromEntries(
                              (
                                activeFragment.files as Array<{
                                  path: string;
                                  content: string;
                                }>
                              ).map((f) => [f.path, f.content])
                            )
                          : typeof activeFragment.files === "object" &&
                            activeFragment.files !== null
                          ? (activeFragment.files as { [path: string]: string })
                          : {}
                      }
                    />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-6 max-w-sm">
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl mx-auto flex items-center justify-center">
                        <CodeIcon className="w-8 h-8 text-zinc-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                          Code Explorer
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Generate an app to explore the source code and file
                          structure
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
