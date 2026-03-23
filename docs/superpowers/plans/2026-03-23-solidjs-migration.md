# Solid.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Re:Dollars userscript frontend from Preact+Signals to Solid.js with CSS Modules, targeting ~50% build size reduction.

**Architecture:** Full rewrite replacing Preact's virtual DOM with Solid.js's fine-grained reactivity. State management migrates from Preact Signals to Solid's `createSignal`/`createStore`. Styles migrate from a single 5,500-line global CSS to component-scoped CSS Modules with a shared design token system. WebSocket logic splits into a stateless connection primitive and store-based message handlers.

**Tech Stack:** Solid.js ^1.9, CSS Modules, Vite + vite-plugin-solid, TypeScript 5, terser minification

**Spec:** `docs/superpowers/specs/2026-03-23-solidjs-refactor-design.md`

---

## File Structure

### Files to Create

```
src/
├── design/
│   ├── tokens.css                      # Design token system (CSS custom properties)
│   └── theme.css                       # Dark mode overrides
├── primitives/
│   ├── createWebSocket.ts              # WebSocket connection, reconnection, heartbeat
│   ├── createDraggable.ts              # Window drag logic
│   ├── createResizable.ts              # Window resize logic
│   ├── createFileUpload.ts             # File selection, validation, upload
│   ├── createScrollAnchor.ts           # Scroll anchoring & virtual scrolling
│   ├── createSwipeGesture.ts           # Swipe-to-reply gesture
│   └── createLongPress.ts              # Long press detection
├── stores/
│   ├── chat.ts                         # Messages, conversations, optimistic sends
│   ├── ui.ts                           # Panels, layout, browse position, image viewer
│   ├── user.ts                         # Auth, settings, favorites, blocklist
│   ├── presence.ts                     # Online users, typing, wsConnected
│   ├── drafts.ts                       # Draft auto-save/restore
│   ├── readState.ts                    # Unread tracking
│   └── extensions.ts                   # Extension conversations
├── components/
│   ├── DockButton/
│   │   ├── DockButton.tsx
│   │   └── DockButton.module.css
│   ├── ChatWindow/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatHeader.tsx
│   │   └── ChatWindow.module.css
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── ConversationList.tsx
│   │   └── Sidebar.module.css
│   ├── MessageList/
│   │   ├── MessageList.tsx
│   │   ├── VirtualScroll.tsx
│   │   ├── FloatingUI.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── MessageList.module.css
│   ├── MessageItem/
│   │   ├── MessageItem.tsx
│   │   ├── MessageContent.tsx
│   │   ├── MessageReactions.tsx
│   │   └── MessageItem.module.css
│   ├── ChatInput/
│   │   ├── ChatInput.tsx
│   │   ├── Toolbar.tsx
│   │   ├── MediaPreview.tsx
│   │   ├── MentionCompleter.tsx
│   │   └── ChatInput.module.css
│   ├── SmileyPanel/
│   │   ├── SmileyPanel.tsx
│   │   └── SmileyPanel.module.css
│   ├── SearchPanel/
│   │   ├── SearchPanel.tsx
│   │   └── SearchPanel.module.css
│   ├── GalleryPanel/
│   │   ├── GalleryPanel.tsx
│   │   └── GalleryPanel.module.css
│   ├── ImageViewer/
│   │   ├── ImageViewer.tsx
│   │   └── ImageViewer.module.css
│   ├── ContextMenu/
│   │   ├── ContextMenu.tsx
│   │   ├── ReactionPicker.tsx
│   │   └── ContextMenu.module.css
│   ├── ProfileCard/
│   │   ├── ProfileCard.tsx
│   │   └── ProfileCard.module.css
│   ├── UserProfilePanel/
│   │   ├── UserProfilePanel.tsx
│   │   └── UserProfilePanel.module.css
│   ├── TextFormatter/
│   │   ├── TextFormatter.tsx
│   │   └── TextFormatter.module.css
│   ├── NotificationManager/
│   │   ├── NotificationManager.tsx
│   │   └── NotificationManager.module.css
│   ├── UserAvatar/
│   │   ├── UserAvatar.tsx
│   │   └── UserAvatar.module.css
│   └── ErrorBoundary.tsx
├── utils/
│   ├── api.ts                          # API client (framework-independent, minimal changes)
│   ├── bbcode.ts                       # BBCode parser (framework-independent, minimal changes)
│   ├── format.ts                       # Formatting utils (no changes)
│   ├── constants.ts                    # All magic numbers + existing constants
│   ├── icons.ts                        # SVG icons (no changes)
│   ├── smilies.ts                      # Smiley config (no changes)
│   ├── smoothScroll.ts                 # Scroll animation (no changes)
│   ├── blurhash.ts                     # BlurHash decoder (no changes)
│   ├── globals.ts                      # Bangumi site globals (no changes)
│   └── settingsPanel.ts               # Native settings integration (minimal changes)
├── types/
│   ├── index.ts                        # Type definitions (retained, minor additions)
│   └── chii.d.ts                       # Bangumi host page global type declarations (retained as-is)
├── extensionAPI.ts                     # Framework-agnostic wrapper API
├── App.tsx                             # Root component
└── main.tsx                            # Entry point
```

### Files to Delete (after migration complete)

All current `src/` files will be replaced. The old Preact code is not reused — this is a full rewrite. Key deletions:
- `src/components/*.tsx` (25 flat files → directory-per-component structure)
- `src/hooks/*.ts` (4 files → `primitives/`)
- `src/stores/*.ts` (8 files → rewritten with Solid APIs)
- `src/styles/index.css` (5,500 lines → distributed CSS Modules)
- `src/utils/memo.ts` (Preact-specific, unnecessary in Solid)
- `src/utils/signalMap.ts` (Preact Signal helpers, unnecessary with Solid Store)

---

## Task 1: Project Scaffolding & Build Config

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `vite.config.ts`
- Create: `src/design/tokens.css`
- Create: `src/design/theme.css`

This task sets up the Solid.js toolchain and design token system. After this, `npm run build` should produce a valid (empty) IIFE userscript.

- [ ] **Step 1: Backup old source and clean src/**

The old Preact source must be moved out before replacing dependencies, otherwise TypeScript will try to compile files that import `preact` and fail. Move the entire `src/` to a backup location that we'll reference during migration:

```bash
mv src src-old
mkdir -p src/types src/utils src/stores src/components src/primitives src/design
```

Copy framework-independent files that won't change:
```bash
cp src-old/types/chii.d.ts src/types/chii.d.ts
```

- [ ] **Step 2: Replace dependencies**

```bash
cd /mnt1/docker/re-dollars/userscript-preact
npm uninstall preact @preact/signals react-photo-view @preact/preset-vite
npm install solid-js
npm install -D vite-plugin-solid
```

- [ ] **Step 3: Update tsconfig.json**

Change `jsxImportSource` from `preact` to `solid-js`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Update vite.config.ts**

Replace `@preact/preset-vite` with `vite-plugin-solid`, enable terser minification:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

function stripVitePreload(): import('rollup').Plugin {
    return {
        name: 'strip-vite-preload',
        generateBundle(_, bundle) {
            for (const f of Object.values(bundle)) {
                if (f.type !== 'chunk' || f.fileName !== 'userscript.user.js') continue;
                const stub = `const __vitePreload = (m)=>m();`;
                const re = /const scriptRel = 'modulepreload';const assetsURL = function\([^)]*\)[^;]*;const seen = \{\};const __vitePreload = function preload\([^)]*\)\s*\{[\s\S]*?return baseModule\(\)\.catch\(handlePreloadError\);\s*\}\);\s*\};/;
                if (re.test(f.code)) {
                    f.code = f.code.replace(re, stub);
                }
            }
        },
    };
}

const userscriptBanner = `// ==UserScript==
// @name         Re:Dollars 全站聊天
// @version      2.0.0
// @author       wataame
// @match        https://bgm.tv/*
// @match        https://bangumi.tv/*
// @match        https://chii.in/*
// @exclude      https://bgm.tv/rakuen/*
// @exclude      https://bangumi.tv/rakuen/*
// @exclude      https://chii.in/rakuen/*
// @grant        none
// ==/UserScript==
`;

export default defineConfig({
    plugins: [solid(), stripVitePreload()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        target: 'esnext',
        minify: 'terser',
        cssCodeSplit: false,
        cssMinify: true,
        reportCompressedSize: true,
        assetsInlineLimit: 100000,
        rollupOptions: {
            input: resolve(__dirname, 'src/main.tsx'),
            output: {
                format: 'iife',
                entryFileNames: 'userscript.user.js',
                banner: userscriptBanner,
                inlineDynamicImports: true,
            },
        },
        terserOptions: {
            compress: { drop_console: true, passes: 2 },
        },
    },
    server: {
        port: 5173,
    },
});
```

- [ ] **Step 5: Create design token files**

Create `src/design/tokens.css` with the full token system from the spec (Section 3).

Create `src/design/theme.css` with the dark mode overrides from the spec (Section 3).

- [ ] **Step 6: Create CSS Modules type declaration and vite-env.d.ts**

Create `src/vite-env.d.ts` — needed from the start since CSS Modules are used in every component:

```ts
/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

- [ ] **Step 7: Create minimal main.tsx to verify build**

Temporarily replace `src/main.tsx` with a minimal Solid entry point that imports the tokens and renders nothing:

```tsx
import { render } from 'solid-js/web';
import './design/tokens.css';
import './design/theme.css';

function App() {
  return <div id="dollars-root">Solid.js works</div>;
}

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(() => <App />, container);
}

init();
```

- [ ] **Step 8: Build and verify**

```bash
npm run build
```

Expected: Build succeeds, `dist/userscript.user.js` is a valid IIFE with CSS inlined. Size should be very small (~10-15 KB) with just Solid runtime + tokens.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Solid.js project with design tokens and build config"
```

---

## Task 2: Types & Constants

**Files:**
- Create: `src/types/index.ts` (rewrite from current)
- Verify: `src/types/chii.d.ts` (copied in Task 1, should already exist)
- Create: `src/utils/constants.ts` (consolidate magic numbers)

These are framework-independent. Port them first so everything else can import them.

- [ ] **Step 1: Port types/index.ts**

Copy the current `src/types/index.ts` (123 lines). Remove any Preact-specific types. Add `MessageState` type if not present:

```ts
export type MessageState = 'sending' | 'sent' | 'failed';
```

Ensure all interfaces (`Message`, `Conversation`, `UserInfo`, `Settings`, `Notification`, `WSMessage`, etc.) are present. These are plain TypeScript — no framework dependency.

- [ ] **Step 2: Create consolidated constants.ts**

Merge constants from the current `utils/constants.ts` (14 lines) with magic numbers scattered across the codebase:

```ts
// Backend
export const BACKEND_URL = 'https://dollars.bgm.ing';
export const WEBSOCKET_URL = 'wss://dollars.bgm.ing/ws';
export const BGM_APP_ID = '...';  // copy from current
export const BGM_CALLBACK_URL = '...';  // copy from current

// Message display
export const MESSAGE_GROUP_TIME_GAP = 5 * 60;  // seconds
export const MAX_DOM_MESSAGES = 100;
export const COLLAPSE_THRESHOLD = 500;  // chars

// Timing
export const PENDING_TIMEOUT_MS = 10_000;
export const RECONNECT_DELAY_MS = 2_000;
export const HEARTBEAT_INTERVAL_MS = 25_000;
export const CONNECTION_CHECK_MS = 10_000;
export const TYPING_DEBOUNCE_MS = 120;
export const DRAFT_SAVE_DEBOUNCE_MS = 1_000;

// Upload limits
export const MAX_IMAGE_SIZE = 50 * 1024 * 1024;   // 50 MB
export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;   // 500 MB
export const UPLOAD_TIMEOUT_MS = 60_000;

// UI
export const NARROW_LAYOUT_BREAKPOINT = 600;  // px

// Reactions
export const CONTEXT_MENU_REACTIONS = ['👍', '❤️', '😂', '😢', '😡', '🤔'];

// SVG icons — import from icons.ts
export { SVGIcons } from './icons';
```

- [ ] **Step 3: Build to verify no import errors**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/types/ src/utils/constants.ts
git commit -m "feat: port types and consolidate constants"
```

---

## Task 3: Pure Utility Functions

**Files:**
- Create: `src/utils/format.ts` (copy, no changes needed)
- Create: `src/utils/icons.ts` (copy, no changes needed)
- Create: `src/utils/smilies.ts` (copy, no changes needed)
- Create: `src/utils/smoothScroll.ts` (copy, no changes needed)
- Create: `src/utils/blurhash.ts` (copy, no changes needed)
- Create: `src/utils/globals.ts` (copy, no changes needed)

These utils are framework-independent — pure functions with no Preact imports. Copy them verbatim.

- [ ] **Step 1: Copy all pure utils**

Copy each file directly from the current codebase. Verify none import from `preact` or `@preact/signals`. The following files should be copied as-is:
- `utils/format.ts` (134 lines)
- `utils/icons.ts` (35 lines)
- `utils/smilies.ts` (105 lines)
- `utils/smoothScroll.ts` (59 lines)
- `utils/blurhash.ts` (39 lines)
- `utils/globals.ts` (11 lines)

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/
git commit -m "feat: port framework-independent utilities"
```

---

## Task 4: API Client

**Files:**
- Create: `src/utils/api.ts` (port from current 555 lines)

The API client mostly uses `fetch` and is framework-independent. The main change: replace `import { getAuthHeaders } from '@/stores/user'` with a passed-in getter or direct import from the new Solid user store (which will be written in Task 6). For now, stub the auth header import.

- [ ] **Step 1: Port api.ts**

Copy the current `src/utils/api.ts`. Make these changes:
1. Remove any `import ... from 'preact'` or `@preact/signals`
2. For `getAuthHeaders()` — import will point to `@/stores/user` which doesn't exist yet. Create a temporary stub at `src/stores/user.ts`:

```ts
// Temporary stub — will be fully implemented in Task 6
import { createSignal } from 'solid-js';

export const [userInfo, setUserInfo] = createSignal<any>(null);

export function getAuthHeaders(): Record<string, string> {
  return {};  // stub
}

export function getToken(): string | null {
  return null;  // stub
}
```

3. Update any `.value` reads to function calls if the API reads signals directly (check for `settings.value`, `userInfo.value`, etc. and replace with `settings()`, `userInfo()`)

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/api.ts src/stores/user.ts
git commit -m "feat: port API client with user store stub"
```

---

## Task 5: BBCode Parser & Settings Panel

**Files:**
- Create: `src/utils/bbcode.ts` (port from current 296 lines)
- Create: `src/utils/settingsPanel.ts` (port from current 224 lines)

- [ ] **Step 1: Port bbcode.ts**

Copy the current `src/utils/bbcode.ts`. Changes:
1. If it reads `settings.value.loadImages`, change to `settings().loadImages` (Solid signal accessor pattern)
2. If it imports `settings` from a store, point the import to the new stub location

- [ ] **Step 2: Port settingsPanel.ts**

Copy the current `src/utils/settingsPanel.ts`. Changes:
1. Replace `signal.value` reads/writes with Solid signal getter/setter patterns
2. Replace imports from `@preact/signals` with `solid-js`
3. Update store imports to point to new locations

**Note:** This file uses Bangumi host page globals (`chiiLib`, etc.) declared in `src/types/chii.d.ts`, which was already copied in Task 1 Step 1.

- [ ] **Step 3: Build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/utils/bbcode.ts src/utils/settingsPanel.ts
git commit -m "feat: port BBCode parser and settings panel integration"
```

---

## Task 6: Stores — Core State

**Files:**
- Create: `src/stores/chat.ts`
- Modify: `src/stores/user.ts` (replace stub from Task 4)
- Create: `src/stores/ui.ts`
- Create: `src/stores/presence.ts`
- Create: `src/stores/drafts.ts`
- Create: `src/stores/readState.ts`
- Create: `src/stores/extensions.ts`

This is the largest task. Port all 8 Preact Signal stores to Solid.js. Follow the migration map in the spec (Section 4).

- [ ] **Step 1: Port presence.ts (new — extracted from chat.ts)**

```ts
import { createSignal } from 'solid-js';

// Connection state — owned by this store, updated by WebSocket primitive
export const [wsConnected, setWsConnected] = createSignal(false);

// Online users
export const [onlineUsers, setOnlineUsers] = createSignal<number[]>([]);
export const onlineCount = () => onlineUsers().length;

// Typing indicators
export interface TypingUser { uid: number; nickname: string; }
export const [typingUsers, setTypingUsers] = createSignal<TypingUser[]>([]);

// Handler map for WebSocket dispatch
export const presenceHandlers: Record<string, (data: any) => void> = {
  connected: (connected: boolean) => setWsConnected(connected),
  presence_update: (data: { online_users: number[] }) => setOnlineUsers(data.online_users),
  typing_start: (data: TypingUser) => {
    setTypingUsers(prev => prev.some(u => u.uid === data.uid) ? prev : [...prev, data]);
  },
  typing_stop: (data: { uid: number }) => {
    setTypingUsers(prev => prev.filter(u => u.uid !== data.uid));
  },
};
```

- [ ] **Step 2: Port drafts.ts**

Port the current `stores/drafts.ts` (83 lines). Replace `signal()` with `createSignal()`, `.value` with getter/setter calls.

- [ ] **Step 3: Port readState.ts**

Port the current `stores/readState.ts` (155 lines). Replace `signal()` → `createSignal()`, `computed()` → `createMemo()`. Note: this imports `messageIds` from chat — use a lazy import or forward reference since chat.ts isn't written yet.

- [ ] **Step 4: Port extensions.ts**

Port the current `stores/extensionConversations.ts` (78 lines) → `stores/extensions.ts`. Rename file and update exports.

- [ ] **Step 5: Port user.ts (replace stub)**

Port the full `stores/user.ts` (158 lines) + merge in `stores/favorites.ts` (80 lines). Replace the stub from Task 4.

Use `createSignal` for `userInfo` (since the API client and extensionAPI both consume it as a single value), `createSignal` for `isLoggedIn`, and `createSignal` for `settings`. Merge favorites into this file.

**Important imports:**
```ts
import { createSignal, batch } from 'solid-js';
```

Key changes:
- `signal()` → `createSignal()`
- `userInfo.value` → `userInfo()` / `setUserInfo()`
- Merge `favorites` signal and `initFavorites()`, `addFavorite()`, `removeFavorite()` into this file
- Keep `getAuthHeaders()` and `getToken()` exports
- `getAuthHeaders()` reads `getToken()` which reads from `userInfo()` — all signal accessors

- [ ] **Step 6: Port ui.ts (absorbs browsePosition.ts)**

Port the current `stores/ui.ts` (233 lines) + merge `stores/browsePosition.ts` (62 lines). Key changes:
- Replace multiple panel booleans with `activePanel` enum (per spec Section 4)
- Merge browse position signals and functions into this store
- `signal()` → `createSignal()`

- [ ] **Step 7: Port chat.ts**

Port the current `stores/chat.ts` (479 lines). This is the most complex store. Key changes:
- Use `createStore<Record<number, Message>>` for messages instead of `Signal<Map>`

**Important imports:**
```ts
import { createSignal, createMemo, batch } from 'solid-js';
import { createStore } from 'solid-js/store';
```

- Use `createMemo` for `messageIds` derivation
- Move `wsConnected`, `onlineUsers`, `typingUsers` to `presence.ts` (remove from this file)
- Move `browsePosition` stuff to `ui.ts` (remove re-exports)
- Move `draft` stuff — keep re-exports pointing to new `drafts.ts`
- Move `readState` stuff — keep re-exports pointing to new `readState.ts`
- Remove `signalMap.ts` dependency — Solid Store handles granular updates natively
- `batch()` from `solid-js` instead of `@preact/signals`

- [ ] **Step 8: Build to verify**

```bash
npm run build
```

Fix any import cycles or type errors.

- [ ] **Step 9: Commit**

```bash
git add src/stores/
git commit -m "feat: port all stores to Solid.js signals and createStore"
```

---

## Task 7: Primitives

**Files:**
- Create: `src/primitives/createWebSocket.ts`
- Create: `src/primitives/createDraggable.ts`
- Create: `src/primitives/createResizable.ts`
- Create: `src/primitives/createFileUpload.ts`
- Create: `src/primitives/createScrollAnchor.ts`
- Create: `src/primitives/createSwipeGesture.ts`
- Create: `src/primitives/createLongPress.ts`

Port the 4 current hooks to 7 Solid primitives (some are new extractions from components).

- [ ] **Step 1: Port createLongPress.ts**

Port `hooks/useLongPress.ts` (94 lines). Replace `useRef` → local `let` variables (Solid components run once), `useCallback` → plain functions.

```ts
import { onCleanup } from 'solid-js';

export interface LongPressOptions {
  onLongPress: (e: MouseEvent | TouchEvent) => void;
  onClick?: (e: MouseEvent | TouchEvent) => void;
  threshold?: number;
}

export function createLongPress(options: LongPressOptions) {
  // Solid: no useRef needed — local variables persist because
  // the function calling createLongPress runs once

  let timer: ReturnType<typeof setTimeout> | null = null;
  let triggered = false;
  const threshold = options.threshold ?? 500;

  const start = (e: MouseEvent | TouchEvent) => {
    triggered = false;
    timer = setTimeout(() => {
      triggered = true;
      options.onLongPress(e);
    }, threshold);
  };

  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  const end = (e: MouseEvent | TouchEvent) => {
    cancel();
    if (!triggered && options.onClick) options.onClick(e);
  };

  onCleanup(cancel);

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: cancel,
  };
}
```

- [ ] **Step 2: Port createSwipeGesture.ts**

Port `hooks/useSwipeToReply.ts` (141 lines). Same pattern: replace hooks with plain variables, `onCleanup` for cleanup.

- [ ] **Step 3: Create createDraggable.ts**

Extract drag logic from current `ChatWindow.tsx` (lines ~50-150). Create a reusable primitive:

```ts
import { createSignal, onCleanup } from 'solid-js';

export interface DraggableOptions {
  initialX?: number;
  initialY?: number;
  bounds?: boolean;
}

export function createDraggable(options: DraggableOptions = {}) {
  const [position, setPosition] = createSignal({
    x: options.initialX ?? 0,
    y: options.initialY ?? 0,
  });
  const [isDragging, setIsDragging] = createSignal(false);

  // ... drag handlers using document-level mousemove/mouseup
  // Bounds checking against window.innerWidth/Height

  onCleanup(() => {
    // Remove document-level listeners
  });

  return { position, isDragging, handlers: { onMouseDown } };
}
```

- [ ] **Step 4: Create createResizable.ts**

Extract resize logic from current `ChatWindow.tsx`. Similar pattern to createDraggable.

- [ ] **Step 5: Port createWebSocket.ts**

Port `hooks/useWebSocket.ts` (554 lines). This is the largest primitive. Split into:
- Connection lifecycle (connect, reconnect, heartbeat) — stays in primitive
- Message handlers (new_messages, reactions, typing, etc.) — move to store handler maps

The primitive signature:

```ts
import { onCleanup } from 'solid-js';

export interface WebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (type: string, data: any) => void;
}

export function createWebSocket(url: string, options: WebSocketOptions) {
  let ws: WebSocket | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  function connect() { /* ... */ }
  function disconnect() { /* ... */ }
  function send(msg: object) { /* ... */ }
  function startHeartbeat() { /* ... */ }
  function scheduleReconnect() { /* ... */ }

  // Auto-connect
  connect();

  onCleanup(disconnect);

  return { send, disconnect, reconnect: connect };
}
```

Message normalization (`normalizeMessage()`) stays in this file as a helper. The `handleWebSocketMessage` switch/dispatch calls `options.onMessage(type, data)` which routes to store handlers.

- [ ] **Step 6: Create createFileUpload.ts**

Extract file upload logic from current `ChatInput.tsx` (the upload-related code, ~120 lines). Uses `api.uploadFile()` internally.

- [ ] **Step 7: Create createScrollAnchor.ts**

Extract scroll anchoring from current `ChatBody.tsx`. This manages:
- `isStickingToBottom` state
- Scroll restoration after history load
- MAX_DOM_MESSAGES windowing

- [ ] **Step 8: Build to verify**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add src/primitives/
git commit -m "feat: create Solid primitives for WebSocket, drag, resize, gestures"
```

---

## Task 8: Entry Point & Root Component

**Files:**
- Modify: `src/main.tsx` (replace minimal stub from Task 1)
- Create: `src/App.tsx`

- [ ] **Step 1: Write main.tsx**

Port the current `main.tsx` (102 lines). Changes:
- `import { render } from 'solid-js/web'` instead of `preact`
- Import `tokens.css` and `theme.css` from `design/`
- `injectStyles()` — same DOM injection logic, but CSS now comes from CSS Modules bundled by Vite
- `injectSVGFilters()` — copy as-is (pure DOM manipulation)
- `injectHomeCard()` — copy as-is (pure DOM manipulation)
- `render(() => <App />, container)` instead of Preact's `render(<App />, container)`

- [ ] **Step 2: Write App.tsx**

Port the current `App.tsx` (124 lines). Changes:
- Replace `useEffect` with `createEffect` / `onMount`
- Replace `useRef` with local `let` variables
- Replace `useSignal` with `createSignal`
- Replace signal `.value` reads with function calls
- Solid components: function body runs once, so initialization code runs naturally at component creation time

```tsx
import { createEffect, onMount } from 'solid-js';
import { Show } from 'solid-js';
// ... store imports

export default function App() {
  onMount(async () => {
    await initUserInfo();
    await loadSettingsFromCloud();
    // ... initialization sequence
  });

  // Lazy WebSocket connection when chat opens
  let wsInitialized = false;
  createEffect(() => {
    if (isChatOpen() && !wsInitialized) {
      wsInitialized = true;
      // Wire WebSocket to store handlers
      createWebSocket(WEBSOCKET_URL, {
        onOpen: () => presenceHandlers.connected(true),
        onClose: () => presenceHandlers.connected(false),
        onMessage: (type, data) => {
          chatHandlers[type]?.(data);
          presenceHandlers[type]?.(data);
        },
      });
    }
    }
  });

  return (
    <>
      <DockButton />
      <Show when={isChatOpen()}>
        <ChatWindow />
      </Show>
      <ContextMenu />
      <ProfileCard />
      <ImageViewer />
      <NotificationManager />
    </>
  );
}
```

- [ ] **Step 3: Build to verify**

```bash
npm run build
```

Components referenced in App.tsx don't exist yet — create empty stubs for each:

```tsx
// e.g. src/components/DockButton/DockButton.tsx
export default function DockButton() { return null; }
```

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/App.tsx src/components/
git commit -m "feat: port entry point and root App component to Solid.js"
```

---

## Task 9: Small Components (DockButton, UserAvatar, ErrorBoundary, TypingIndicator, Sidebar)

**Files:**
- Create: `src/components/DockButton/DockButton.tsx` + `.module.css`
- Create: `src/components/UserAvatar/UserAvatar.tsx` + `.module.css`
- Create: `src/components/ErrorBoundary.tsx`
- Create: `src/components/MessageList/TypingIndicator.tsx`
- Create: `src/components/Sidebar/Sidebar.tsx` + `ConversationList.tsx` + `.module.css`

Start with the smallest components. Each is <100 lines and has minimal interaction logic.

- [ ] **Step 1: Port DockButton**

Port current `DockButton.tsx` (83 lines). Extract its styles from `index.css` into `DockButton.module.css`. Replace:
- `useSignal` → `createSignal`
- Class string building → `classList` directive
- Signal `.value` → getter calls

- [ ] **Step 2: Port UserAvatar**

Port current `UserAvatar.tsx` (67 lines). Uses `createLongPress` primitive.

- [ ] **Step 3: Port ErrorBoundary**

Solid has `ErrorBoundary` built-in. Port the current ErrorBoundary (65 lines) preserving its retry button and Chinese fallback UI:

```tsx
import { ErrorBoundary as SolidErrorBoundary } from 'solid-js';
import { createSignal } from 'solid-js';

export default function ErrorBoundary(props: { children: any }) {
  return (
    <SolidErrorBoundary fallback={(err, reset) => (
      <div style="padding: 16px; text-align: center; color: var(--color-text-secondary);">
        <p>出了点问题: {err.message}</p>
        <button onClick={reset} style="margin-top: 8px; cursor: pointer;">
          重试
        </button>
      </div>
    )}>
      {props.children}
    </SolidErrorBoundary>
  );
}
```

**Important:** Solid's `ErrorBoundary` passes a `reset` function as the second arg to the fallback — use this for the retry button instead of the Preact class-based `setState` approach.

- [ ] **Step 4: Port TypingIndicator**

Port current `TypingIndicator.tsx` (34 lines). Trivial — reads `typingUsers` from presence store.

- [ ] **Step 5: Port Sidebar + ConversationList**

Port current `Sidebar.tsx` (26 lines) and `ConversationList.tsx` (88 lines). Extract styles into `Sidebar.module.css`.

- [ ] **Step 6: Extract CSS for all small components**

For each component, find the relevant CSS rules in the current `src/styles/index.css` and move them to the component's `.module.css` file. Replace hardcoded values with design token variables.

- [ ] **Step 7: Build to verify**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/components/DockButton/ src/components/UserAvatar/ src/components/ErrorBoundary.tsx src/components/MessageList/TypingIndicator.tsx src/components/Sidebar/
git commit -m "feat: port small components (DockButton, UserAvatar, ErrorBoundary, TypingIndicator, Sidebar)"
```

---

## Task 10: ChatWindow & ChatHeader

**Files:**
- Create: `src/components/ChatWindow/ChatWindow.tsx` + `ChatHeader.tsx` + `.module.css`

- [ ] **Step 1: Port ChatHeader**

Port current `ChatHeader.tsx` (160 lines). Extract styles. Replace hooks with Solid patterns.

- [ ] **Step 2: Port ChatWindow**

Port current `ChatWindow.tsx` (317 lines). Key changes:
- Drag logic → use `createDraggable` primitive
- Resize logic → use `createResizable` primitive
- `useEffect` for ResizeObserver → `createEffect` + `onCleanup`
- Layout detection → reads from `ui.ts` store
- Position persistence → same localStorage pattern, but read/write via Solid signals

- [ ] **Step 3: Extract CSS into ChatWindow.module.css**

Find all `.chat-window`, `.chat-header`, `.chat-minimize`, `.chat-close` etc. rules in `index.css`. Move to module CSS. Replace hardcoded values with tokens.

- [ ] **Step 4: Build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ChatWindow/
git commit -m "feat: port ChatWindow and ChatHeader with drag/resize primitives"
```

---

## Task 11: MessageItem & MessageContent

**Files:**
- Create: `src/components/MessageItem/MessageItem.tsx` + `MessageContent.tsx` + `MessageReactions.tsx` + `.module.css`

- [ ] **Step 1: Port MessageContent**

Extract BBCode rendering from current `MessageItem.tsx`. This component takes a message and renders the processed HTML. Uses `bbcode.ts` utility.

In Solid, use `innerHTML` directive for BBCode output (same as current approach):

```tsx
const MessageContent = (props: { message: Message }) => {
  const html = createMemo(() => processBBCode(props.message.message));
  return <div class={styles.content} innerHTML={html()} />;
};
```

- [ ] **Step 2: Port MessageReactions**

Port current `MessageReactions.tsx` (168 lines). Reads reactions from message, handles click to toggle.

- [ ] **Step 3: Port MessageItem**

Port current `MessageItem.tsx` (455 lines). Key changes:
- Remove `memo()` wrapper — Solid doesn't need it (components run once)
- Lazy image loading via IntersectionObserver → use `createEffect` + `onCleanup`
- Swipe-to-reply → use `createSwipeGesture` primitive
- Message grouping → read from `chat.ts` store's `getMessageGrouping()`
- Long message collapse → local `createSignal`

- [ ] **Step 4: Extract CSS**

Move message bubble, avatar, timestamp, reaction styles from `index.css` to `MessageItem.module.css`. Apply token variables.

- [ ] **Step 5: Build to verify**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/MessageItem/
git commit -m "feat: port MessageItem with content rendering and reactions"
```

---

## Task 12: MessageList (VirtualScroll + FloatingUI)

**Files:**
- Create: `src/components/MessageList/MessageList.tsx` + `VirtualScroll.tsx` + `FloatingUI.tsx` + `.module.css`

This is the most complex component split. Current `ChatBody.tsx` is 754 lines.

**Note:** The current `hooks/useStateKeeper.ts` (43 lines) provides `insertBrowseSeparator()` and `insertUnreadSeparator()` — pure DOM manipulation for visual separators. These functions migrate into `MessageList.tsx` as local helpers (they are only used by this component).

- [ ] **Step 1: Write VirtualScroll.tsx**

Extract virtual scrolling logic from `ChatBody.tsx`:
- `MAX_DOM_MESSAGES` windowing
- Scroll position preservation on DOM changes
- `isStickingToBottom` / `isProgrammaticScroll` flags
- ResizeObserver for image reflow

Use `createScrollAnchor` primitive for the core scroll logic.

- [ ] **Step 2: Write FloatingUI.tsx**

Port current `FloatingUI.tsx` (174 lines). Scroll buttons, unread jump, floating date label. Extract styles.

- [ ] **Step 3: Write MessageList.tsx**

Port the remaining `ChatBody.tsx` logic:
- History loading on scroll up
- Unread separator insertion
- Jump-to-message functionality
- Message rendering loop using `<For>` (Solid's list primitive):

```tsx
<For each={visibleMessageIds()}>
  {(id) => <MessageItem message={messages[id]} />}
</For>
```

**Important**: Solid's `<For>` provides efficient keyed list rendering without manual `key` props.

- [ ] **Step 4: Extract CSS**

Move message list, scroll button, separator, date label styles from `index.css`.

- [ ] **Step 5: Build to verify**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/MessageList/
git commit -m "feat: port MessageList with VirtualScroll and FloatingUI"
```

---

## Task 13: ChatInput (Input + Toolbar + MediaPreview + MentionCompleter)

**Files:**
- Create: `src/components/ChatInput/ChatInput.tsx` + `Toolbar.tsx` + `MediaPreview.tsx` + `MentionCompleter.tsx` + `.module.css`

Current `ChatInput.tsx` is 773 lines — the largest component. Split into 4 files.

- [ ] **Step 1: Write Toolbar.tsx**

The ChatInput Toolbar is the **fixed formatting bar** below the textarea (bold, italic, underline, strike, code, link, upload buttons). Extract from current `ChatInput.tsx` — the button row that inserts BBCode tags into the textarea.

**Note:** This is separate from `TextFormatter.tsx` (276 lines), which is a **floating toolbar** that appears on text selection in messages. TextFormatter is ported in Task 15 as its own component.

- [ ] **Step 2: Write MediaPreview.tsx**

Extract media preview rendering (~60 lines from current `ChatInput.tsx`):
- Displays images/videos selected for upload
- Remove button for each attachment

- [ ] **Step 3: Write MentionCompleter.tsx**

Port current `MentionCompleter.tsx` (171 lines). Autocomplete dropdown for `@username`.

- [ ] **Step 4: Write ChatInput.tsx**

Port the core input logic (~250 lines):
- Textarea with auto-grow
- Send handler (Enter / Ctrl+Enter configurable)
- Draft auto-save using `drafts.ts` store
- `@mention` → `[user=uid]nickname[/user]` transformation
- Optimistic message sending via `chat.ts` store
- File upload via `createFileUpload` primitive

- [ ] **Step 5: Extract CSS**

Move input area, toolbar, mention dropdown, media preview styles from `index.css`.

- [ ] **Step 6: Build to verify**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ChatInput/
git commit -m "feat: port ChatInput with Toolbar, MediaPreview, and MentionCompleter"
```

---

## Task 14: Panels (SmileyPanel, SearchPanel, GalleryPanel)

**Files:**
- Create: `src/components/SmileyPanel/SmileyPanel.tsx` + `.module.css`
- Create: `src/components/SearchPanel/SearchPanel.tsx` + `.module.css`
- Create: `src/components/GalleryPanel/GalleryPanel.tsx` + `.module.css`

- [ ] **Step 1: Port SmileyPanel**

Port current `SmileyPanel.tsx` (334 lines). Emoji/sticker picker with tabs for different collections.

- [ ] **Step 2: Port SearchPanel**

Port current `SearchPanel.tsx` (288 lines). Message search with date filtering.

- [ ] **Step 3: Port GalleryPanel**

Port current `GalleryPanel.tsx` (243 lines). Media gallery with navigation.

- [ ] **Step 4: Extract CSS for all panels**

Move panel-specific styles from `index.css` to respective `.module.css` files.

- [ ] **Step 5: Build to verify**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/SmileyPanel/ src/components/SearchPanel/ src/components/GalleryPanel/
git commit -m "feat: port SmileyPanel, SearchPanel, and GalleryPanel"
```

---

## Task 15: Overlay Components (ContextMenu, ImageViewer, ProfileCard, UserProfilePanel)

**Files:**
- Create: `src/components/ContextMenu/ContextMenu.tsx` + `ReactionPicker.tsx` + `.module.css`
- Create: `src/components/ImageViewer/ImageViewer.tsx` + `.module.css`
- Create: `src/components/ProfileCard/ProfileCard.tsx` + `.module.css`
- Create: `src/components/UserProfilePanel/UserProfilePanel.tsx` + `.module.css`

- [ ] **Step 1: Port ContextMenu + ReactionPicker**

Port current `ContextMenu.tsx` (344 lines) and `ReactionPickerFloating.tsx` (216 lines). Merge reaction picker as a sub-component.

- [ ] **Step 2: Write ImageViewer (replaces react-photo-view)**

This is a **new implementation**, not a port. Replace the `react-photo-view` dependency:

```tsx
import { createSignal, Show, onCleanup } from 'solid-js';
import { imageViewerImages, imageViewerIndex, isImageViewerOpen, hideImageViewer } from '@/stores/ui';
import styles from './ImageViewer.module.css';

export default function ImageViewer() {
  const [scale, setScale] = createSignal(1);
  const [translate, setTranslate] = createSignal({ x: 0, y: 0 });

  // Keyboard: Escape to close, arrows for navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hideImageViewer();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  // Wheel zoom
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    setScale(s => Math.max(0.5, Math.min(5, s - e.deltaY * 0.001)));
  };

  // ... drag-to-pan, navigation, touch pinch-zoom

  return (
    <Show when={isImageViewerOpen()}>
      <dialog class={styles.overlay} open>
        <img
          src={imageViewerImages()[imageViewerIndex()]}
          class={styles.image}
          style={{
            transform: `translate(${translate().x}px, ${translate().y}px) scale(${scale()})`,
          }}
          onWheel={handleWheel}
        />
        {/* Close button, navigation arrows, image counter */}
      </dialog>
    </Show>
  );
}
```

Target: ~150 lines TSX + ~80 lines CSS.

- [ ] **Step 3: Port ProfileCard**

Port current `ProfileCard.tsx` (178 lines).

- [ ] **Step 4: Port UserProfilePanel**

Port current `UserProfilePanel.tsx` (302 lines).

- [ ] **Step 5: Port NotificationManager + TextFormatter**

Port current `NotificationManager.tsx` (262 lines) and `TextFormatter.tsx` (276 lines). Create directories with `.module.css`.

- [ ] **Step 6: Extract CSS for all overlays**

Move overlay, modal, card, tooltip styles from `index.css`.

- [ ] **Step 7: Build to verify**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/components/ContextMenu/ src/components/ImageViewer/ src/components/ProfileCard/ src/components/UserProfilePanel/ src/components/NotificationManager/ src/components/TextFormatter/
git commit -m "feat: port overlay components and new ImageViewer (replaces react-photo-view)"
```

---

## Task 16: Extension API

**Files:**
- Create: `src/extensionAPI.ts`

- [ ] **Step 1: Write framework-agnostic extension API**

Port current `extensionAPI.ts` (177 lines). Follow the spec (Section 5):

```ts
import { createRoot, createEffect } from 'solid-js';
import { extensionConversations, registerConversationItem, updateConversationItem } from '@/stores/extensions';
import { isChatOpen, toggleChat } from '@/stores/chat';
import { userInfo } from '@/stores/user';
import { showProfileCard } from '@/stores/ui';

export interface DollarsAPIInterface {
  conversationList: {
    registerItem: (item: any) => void;
    updateItem: (id: string, updates: any) => void;
    getItems: () => any[];
  };
  state: {
    readonly isChatOpen: boolean;
    readonly isLoggedIn: boolean;
    readonly userInfo: any;
  };
  events: {
    on: (event: string, cb: Function) => () => void;
  };
  actions: {
    toggleChat: () => void;
    showProfileCard: (uid: number, anchor: HTMLElement) => void;
  };
}

export function createDollarsAPI(): DollarsAPIInterface {
  const listeners = new Map<string, Set<Function>>();

  return {
    conversationList: {
      registerItem: (item) => registerConversationItem(item),
      updateItem: (id, updates) => updateConversationItem(id, updates),
      getItems: () => [...extensionConversations()],
    },
    state: {
      get isChatOpen() { return isChatOpen(); },
      get isLoggedIn() { return !!userInfo()?.id; },
      get userInfo() { return userInfo() ? { ...userInfo() } : null; },
    },
    events: {
      on(event: string, cb: Function) {
        if (!listeners.has(event)) listeners.set(event, new Set());
        listeners.get(event)!.add(cb);
        return () => listeners.get(event)?.delete(cb);
      },
    },
    actions: {
      toggleChat,
      showProfileCard,
    },
  };
}

export function initDollarsAPI() {
  (window as any).DollarsAPI = createDollarsAPI();
}
```

Key: **No Solid types exposed**. All public methods return plain objects or use getter traps for reactive reads.

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/extensionAPI.ts
git commit -m "feat: port extension API with framework-agnostic wrapper"
```

---

## Task 17: Cleanup & Delete Old Files

**Files:**
- Delete: `src/styles/index.css`
- Delete: `src/hooks/` (entire directory)
- Delete: `src/utils/memo.ts`
- Delete: `src/utils/signalMap.ts`
- Delete: `src/vite-env.d.ts` (recreate if needed for Solid)

- [ ] **Step 1: Remove old Preact files**

At this point all functionality should be ported. Delete the old files:

```bash
rm -rf src/styles/
rm -rf src/hooks/
rm src/utils/memo.ts
rm src/utils/signalMap.ts
```

- [ ] **Step 2: Verify vite-env.d.ts is up to date**

The CSS Modules type declaration was already created in Task 1. Verify it still covers all needs. If `?inline` imports are used anywhere, add:

```ts
declare module '*?inline' {
  const content: string;
  export default content;
}
```

- [ ] **Step 3: Remove any remaining old component files**

If any flat `.tsx` files remain in `src/components/` that have been replaced by directory-based components, delete them:

```bash
# Delete all flat .tsx files in components/ root (replaced by directories)
rm -f src/components/*.tsx
```

- [ ] **Step 4: Build to verify no broken imports**

```bash
npm run build
```

Fix any remaining import errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old Preact files and unused utilities"
```

---

## Task 18: Build Verification & Size Audit

**Files:** None (verification only)

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: `dist/userscript.user.js` is a valid IIFE file. Target size: **240-280 KB raw**.

- [ ] **Step 2: Check build output size**

```bash
wc -c dist/userscript.user.js
gzip -c dist/userscript.user.js | wc -c
```

Compare against baseline: 462 KB raw / 100 KB gzip.

- [ ] **Step 3: Verify IIFE structure**

```bash
head -20 dist/userscript.user.js
```

Should start with the `// ==UserScript==` banner followed by an IIFE.

- [ ] **Step 4: Verify CSS is inlined**

```bash
grep -c '<style>' dist/userscript.user.js
```

Should find at least 1 match (CSS injected as `<style>` tag).

- [ ] **Step 5: Check for any external URL references that shouldn't exist**

```bash
grep -o 'https\?://[^ "]*\.css' dist/userscript.user.js || echo "No external CSS references (good)"
```

- [ ] **Step 6: Commit build result for size comparison**

```bash
git add dist/
git commit -m "build: Solid.js migration complete — verify size reduction"
```

---

## Task 19: Functional Smoke Test

**Files:** None (manual testing)

This task is a manual verification checklist. Load the built userscript in a browser with Tampermonkey/Violentmonkey on bgm.tv.

- [ ] **Step 1: Install and load**

Install `dist/userscript.user.js` in userscript manager. Navigate to `https://bgm.tv/`. Verify the dock button appears.

- [ ] **Step 2: Feature parity checklist**

Test each feature from the spec (Section 7):

- [ ] Chat window opens/closes via dock button
- [ ] Window drag and resize works
- [ ] Window position is remembered across page loads
- [ ] Messages load and display correctly
- [ ] New messages appear in real-time (WebSocket)
- [ ] Sending a message works (optimistic update)
- [ ] Reply to message (swipe or context menu)
- [ ] Message collapse for long messages
- [ ] Smiley/emoji panel works
- [ ] Right-click context menu appears
- [ ] Message reactions work
- [ ] Image viewer opens on image click (zoom, pan, navigate)
- [ ] Dark theme toggle works
- [ ] @mention autocomplete works
- [ ] Search panel works
- [ ] Gallery panel works
- [ ] User profile panel works
- [ ] Profile card tooltip works
- [ ] Notifications appear
- [ ] Draft auto-save/restore works
- [ ] Unread jump button works
- [ ] Extension API accessible via `window.DollarsAPI`
- [ ] Narrow layout (< 600px) responsive behavior
- [ ] No CSS conflicts with host page (bgm.tv)

- [ ] **Step 3: Document any issues**

If issues are found, create follow-up tasks to fix them before merging.

---

## Summary

| Task | Description | Est. Complexity |
|------|------------|----------------|
| 1 | Project scaffolding & build config | Low |
| 2 | Types & constants | Low |
| 3 | Pure utility functions | Low |
| 4 | API client | Medium |
| 5 | BBCode parser & settings panel | Medium |
| 6 | Stores (all 7) | High |
| 7 | Primitives (all 7) | High |
| 8 | Entry point & root component | Medium |
| 9 | Small components (5) | Medium |
| 10 | ChatWindow & ChatHeader | Medium |
| 11 | MessageItem & MessageContent | High |
| 12 | MessageList (VirtualScroll + FloatingUI) | High |
| 13 | ChatInput (4 sub-components) | High |
| 14 | Panels (Smiley, Search, Gallery) | Medium |
| 15 | Overlay components (5) | High |
| 16 | Extension API | Low |
| 17 | Cleanup old files | Low |
| 18 | Build verification & size audit | Low |
| 19 | Functional smoke test | Medium |
