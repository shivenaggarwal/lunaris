import { CodeView } from "@/components/code-view";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { FileTree } from "@/components/file-tree";

type FileCollection = { [path: string]: string };

function getLangFromFileExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension || "text";
}

function parseFilePath(filePath: string) {
  const segments = filePath.split("/").filter(Boolean);
  return segments.map((segment, index) => ({
    name: segment,
    path: segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));
}

interface FileExplorerProps {
  files: FileCollection;
}

export const FileExplorer = ({ files }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });

  const handleCopyToClipboard = async () => {
    if (selectedFile && files[selectedFile]) {
      try {
        await navigator.clipboard.writeText(files[selectedFile]);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    }
  };

  if (selectedFile) {
    console.log(
      "selectedFile:",
      selectedFile,
      "files[selectedFile]:",
      files[selectedFile]
    );
  }

  const breadcrumbSegments = selectedFile ? parseFilePath(selectedFile) : [];

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={20} className="bg-sidebar">
          <FileTree
            files={files}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />
        <ResizablePanel defaultSize={70} minSize={50} className="flex flex-col">
          {selectedFile && files[selectedFile] ? (
            <>
              <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2 shrink-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Breadcrumb>
                    <BreadcrumbList>
                      {breadcrumbSegments.map((segment, index) => (
                        <BreadcrumbItem key={segment.path}>
                          {segment.isLast ? (
                            <BreadcrumbPage className="font-medium">
                              {segment.name}
                            </BreadcrumbPage>
                          ) : (
                            <>
                              <BreadcrumbLink
                                className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                                onClick={() => {
                                  console.log(
                                    `Navigate to folder: ${segment.path}`
                                  );
                                }}
                              >
                                {segment.name}
                              </BreadcrumbLink>
                              <BreadcrumbSeparator />
                            </>
                          )}
                        </BreadcrumbItem>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <Hint text="Copy to clipboard" side="bottom">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyToClipboard}
                  >
                    <CopyIcon />
                  </Button>
                </Hint>
              </div>
              <div className="flex-1 overflow-auto min-h-0">
                <CodeView
                  code={files[selectedFile]}
                  lang={getLangFromFileExtension(selectedFile)}
                />
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>Select a file to view its contents</p>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
