import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { useState } from "react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
}

interface FileTreeProps {
  files: { [path: string]: string };
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
}

function buildFileTree(files: { [path: string]: string }): FileNode[] {
  const tree: FileNode[] = [];
  const nodeMap = new Map<string, FileNode>();

  Object.keys(files).forEach((filePath) => {
    const parts = filePath.split("/").filter(Boolean);

    parts.forEach((part, index) => {
      const currentPath = parts.slice(0, index + 1).join("/");
      const isFile = index === parts.length - 1;

      if (!nodeMap.has(currentPath)) {
        const node: FileNode = {
          name: part,
          type: isFile ? "file" : "folder",
          path: currentPath,
          children: isFile ? undefined : [],
        };
        nodeMap.set(currentPath, node);
      }
    });
  });

  Object.keys(files).forEach((filePath) => {
    const parts = filePath.split("/").filter(Boolean);

    parts.forEach((part, index) => {
      const currentPath = parts.slice(0, index + 1).join("/");
      const parentPath = parts.slice(0, index).join("/");

      const currentNode = nodeMap.get(currentPath);
      if (!currentNode) return;

      if (index === 0) {
        if (!tree.some((node) => node.path === currentPath)) {
          tree.push(currentNode);
        }
      } else {
        const parentNode = nodeMap.get(parentPath);
        if (
          parentNode &&
          parentNode.children &&
          !parentNode.children.some((child) => child.path === currentPath)
        ) {
          parentNode.children.push(currentNode);
        }
      }
    });
  });

  const sortNodes = (nodes: FileNode[]): FileNode[] => {
    return nodes.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });
  };

  const sortTree = (nodes: FileNode[]): FileNode[] => {
    const sorted = sortNodes(nodes);
    sorted.forEach((node) => {
      if (node.children) {
        node.children = sortTree(node.children);
      }
    });
    return sorted;
  };

  return sortTree(tree);
}

interface TreeNodeProps {
  node: FileNode;
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (folderPath: string) => void;
  level: number;
}

function TreeNode({
  node,
  selectedFile,
  onFileSelect,
  expandedFolders,
  onToggleFolder,
  level,
}: TreeNodeProps) {
  const isExpanded = expandedFolders.has(node.path);
  const isSelected = selectedFile === node.path;
  const paddingLeft = level * 12; // 12px per level

  const handleClick = () => {
    if (node.type === "file") {
      onFileSelect(node.path);
    } else {
      onToggleFolder(node.path);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-1 px-2 py-1 text-sm hover:bg-sidebar-accent transition-colors text-left ${
          isSelected
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground"
        }`}
        style={{ paddingLeft: `${8 + paddingLeft}px` }}
      >
        {node.type === "folder" && (
          <span className="shrink-0">
            {isExpanded ? (
              <ChevronDownIcon className="size-3" />
            ) : (
              <ChevronRightIcon className="size-3" />
            )}
          </span>
        )}
        {node.type === "file" && (
          <span className="shrink-0 ml-3">
            <FileIcon className="size-3" />
          </span>
        )}
        {node.type === "folder" && (
          <span className="shrink-0">
            {isExpanded ? (
              <FolderOpenIcon className="size-3" />
            ) : (
              <FolderIcon className="size-3" />
            )}
          </span>
        )}
        <span className="truncate">{node.name}</span>
      </button>

      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ files, selectedFile, onFileSelect }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["app"])
  );

  const fileTree = buildFileTree(files);

  const handleToggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const handleCollapseAll = () => {
    setExpandedFolders(new Set());
  };

  const handleExpandAll = () => {
    const allFolders = new Set<string>();

    const collectFolders = (nodes: FileNode[]) => {
      nodes.forEach((node) => {
        if (node.type === "folder") {
          allFolders.add(node.path);
          if (node.children) {
            collectFolders(node.children);
          }
        }
      });
    };

    collectFolders(fileTree);
    setExpandedFolders(allFolders);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Files</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExpandAll}
              className="h-6 px-2 text-xs"
            >
              Expand All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapseAll}
              className="h-6 px-2 text-xs"
            >
              Collapse All
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {fileTree.map((node) => (
          <TreeNode
            key={node.path}
            node={node}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
            expandedFolders={expandedFolders}
            onToggleFolder={handleToggleFolder}
            level={0}
          />
        ))}
      </div>
    </div>
  );
}
