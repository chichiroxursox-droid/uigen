"use client";

import { Loader2 } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
  result?: unknown;
}

interface ToolInvocationDisplayProps {
  toolInvocation: ToolInvocation;
}

function getFilename(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] || path;
}

function getFriendlyMessage(toolInvocation: ToolInvocation): string {
  const { toolName, args } = toolInvocation;

  if (toolName === "str_replace_editor") {
    const command = args.command as string | undefined;
    const path = args.path as string | undefined;
    const filename = path ? getFilename(path) : "file";

    switch (command) {
      case "create":
        return `Creating ${filename}`;
      case "view":
        return `Reading ${filename}`;
      case "str_replace":
        return `Editing ${filename}`;
      case "insert":
        return `Editing ${filename}`;
      default:
        return toolName;
    }
  }

  if (toolName === "file_manager") {
    const command = args.command as string | undefined;
    const path = args.path as string | undefined;
    const newPath = args.new_path as string | undefined;
    const filename = path ? getFilename(path) : "file";

    switch (command) {
      case "rename":
        const newFilename = newPath ? getFilename(newPath) : "new file";
        return `Renaming ${filename} → ${newFilename}`;
      case "delete":
        return `Deleting ${filename}`;
      default:
        return toolName;
    }
  }

  return toolName;
}

export function ToolInvocationDisplay({
  toolInvocation,
}: ToolInvocationDisplayProps) {
  const isCompleted =
    toolInvocation.state === "result" && toolInvocation.result !== undefined;
  const message = getFriendlyMessage(toolInvocation);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isCompleted ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{message}</span>
    </div>
  );
}
