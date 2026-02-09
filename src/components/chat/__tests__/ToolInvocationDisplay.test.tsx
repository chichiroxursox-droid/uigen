import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

afterEach(() => {
  cleanup();
});

test("str_replace_editor with create command shows 'Creating {file}'", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "src/components/App.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating App.tsx")).toBeDefined();
});

test("str_replace_editor with str_replace command shows 'Editing {file}'", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "src/components/Button.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Editing Button.tsx")).toBeDefined();
});

test("str_replace_editor with view command shows 'Reading {file}'", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "view", path: "src/utils/helpers.ts" },
        state: "result",
        result: "file contents",
      }}
    />
  );

  expect(screen.getByText("Reading helpers.ts")).toBeDefined();
});

test("str_replace_editor with insert command shows 'Editing {file}'", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "insert", path: "src/App.tsx", insert_line: 10 },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Editing App.tsx")).toBeDefined();
});

test("file_manager with rename command shows 'Renaming {file} → {newFile}'", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "file_manager",
        args: {
          command: "rename",
          path: "src/old-name.tsx",
          new_path: "src/new-name.tsx",
        },
        state: "result",
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Renaming old-name.tsx → new-name.tsx")).toBeDefined();
});

test("file_manager with delete command shows 'Deleting {file}'", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "file_manager",
        args: { command: "delete", path: "src/unused.tsx" },
        state: "result",
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Deleting unused.tsx")).toBeDefined();
});

test("loading state shows spinner", () => {
  const { container } = render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "src/App.tsx" },
        state: "call",
      }}
    />
  );

  // Check for the spinning loader (has animate-spin class)
  const spinner = container.querySelector(".animate-spin");
  expect(spinner).toBeDefined();
  expect(spinner).not.toBeNull();

  // Green dot should not be present
  const greenDot = container.querySelector(".bg-emerald-500");
  expect(greenDot).toBeNull();
});

test("completed state shows green dot", () => {
  const { container } = render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "src/App.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );

  // Check for the green dot
  const greenDot = container.querySelector(".bg-emerald-500");
  expect(greenDot).toBeDefined();
  expect(greenDot).not.toBeNull();

  // Spinner should not be present
  const spinner = container.querySelector(".animate-spin");
  expect(spinner).toBeNull();
});

test("unknown tool falls back to raw toolName", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "some_unknown_tool",
        args: { foo: "bar" },
        state: "result",
        result: "done",
      }}
    />
  );

  expect(screen.getByText("some_unknown_tool")).toBeDefined();
});

test("str_replace_editor with unknown command falls back to toolName", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "unknown_command", path: "src/App.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("str_replace_editor")).toBeDefined();
});

test("file_manager with unknown command falls back to toolName", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "file_manager",
        args: { command: "unknown_command", path: "src/App.tsx" },
        state: "result",
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("file_manager")).toBeDefined();
});

test("handles missing path gracefully", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create" },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating file")).toBeDefined();
});

test("extracts filename from nested path", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "src/components/ui/deep/Button.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});
