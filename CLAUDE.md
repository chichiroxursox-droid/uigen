# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components in a chat interface, and Claude generates/modifies code in a virtual file system that renders in real-time.

## Commands

```bash
npm run setup          # First-time setup: install deps, generate Prisma client, run migrations
npm run dev            # Development server with Turbopack (http://localhost:3000)
npm run build          # Production build
npm run lint           # ESLint
npm run test           # Run vitest tests
npm run db:reset       # Reset database (destructive)
```

To run a single test file:
```bash
npx vitest run src/lib/__tests__/file-system.test.ts
```

## Architecture

### Core Flow
1. User enters prompt in ChatInterface
2. POST to `/api/chat` streams to Claude with system prompt + tools
3. Claude uses `str_replace_editor` and `file_manager` tools to modify virtual FS
4. FileSystemContext captures tool calls, updates state, triggers preview re-render
5. For authenticated users, project state persists to SQLite via Prisma

### Key Directories
- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - React components organized by feature (auth, chat, editor, preview, ui)
- `/src/lib` - Business logic: VirtualFileSystem class, AI tools, prompts, auth
- `/src/actions` - Server actions for auth and project CRUD
- `/src/hooks` - Custom React hooks

### Important Files
- `src/lib/file-system.ts` - VirtualFileSystem class (in-memory tree, never writes to disk)
- `src/lib/prompts/generation.tsx` - System prompt for component generation
- `src/lib/tools/` - AI tool definitions (str-replace, file-manager)
- `src/lib/contexts/` - React Context providers for chat and file system state
- `src/app/api/chat/route.ts` - Chat streaming API endpoint
- `src/lib/provider.ts` - AI model provider (Claude or MockLanguageModel fallback)

### AI Integration
- Uses Vercel AI SDK with Anthropic provider
- Default model: Claude Haiku 4.5
- Falls back to MockLanguageModel if no ANTHROPIC_API_KEY (returns static sample components)
- Tools enable Claude to create, edit, rename, and delete files in the virtual FS

### Authentication
- Manual email/password auth (no OAuth)
- JWT sessions stored in httpOnly cookies (7-day expiration)
- Middleware protects `/api/projects` and `/api/filesystem` routes
- Anonymous mode available (state not persisted)

### Database
- SQLite with Prisma ORM
- Models: User (email, password) and Project (messages JSON, data JSON)
- Schema at `prisma/schema.prisma`

## Testing

Tests use Vitest with jsdom environment. Test files are co-located in `__tests__/` directories:
- `src/components/chat/__tests__/`
- `src/components/editor/__tests__/`
- `src/lib/__tests__/`
- `src/lib/contexts/__tests__/`

## Configuration

- TypeScript path alias: `@/*` maps to `src/*`
- shadcn/ui components in `src/components/ui/` (New York style, neutral colors)
- Tailwind CSS v4 with PostCSS
