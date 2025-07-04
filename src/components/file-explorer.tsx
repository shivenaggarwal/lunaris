import { CodeView } from "@/components/code-view";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

type FileCollection = { [path: string]: string };

function getLangFromFileExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension || "text";
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
        // You could add a toast notification here
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    }
  };

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={20} className="bg-sidebar">
          <div className="h-full flex flex-col">
            <div className="p-3 border-b">
              <h3 className="text-sm font-medium">Files</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {Object.keys(files).map((filePath) => (
                <button
                  key={filePath}
                  onClick={() => setSelectedFile(filePath)}
                  className={`w-full text-left p-2 rounded text-sm hover:bg-sidebar-accent transition-colors ${
                    selectedFile === filePath
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  }`}
                >
                  <div className="truncate">{filePath}</div>
                </button>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />
        <ResizablePanel defaultSize={70} minSize={50} className="flex flex-col">
          {selectedFile && files[selectedFile] ? (
            <>
              <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium truncate">
                    {selectedFile}
                  </span>
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
