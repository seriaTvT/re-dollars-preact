# Re:Dollars Frontend Refactor — Solid.js Migration Design

**Date**: 2026-03-23
**Status**: Approved
**Goal**: Refactor the userscript-preact frontend to be lighter, more elegant, with unified design, using cutting-edge technology. Primary success metric: **smaller build output**.

## Current State

- **Framework**: Preact 10 + @preact/signals
- **Styling**: Single global CSS file (5,500 lines)
- **Build output**: 462 KB raw / 100 KB gzip (`minify: false`)
- **Dependencies**: preact, @preact/signals, react-photo-view
- **Codebase**: ~15,600 lines across 24 components, 8 stores, 4 hooks, 12 utils

## Target State

- **Framework**: Solid.js 1.9+
- **Styling**: CSS Modules + CSS Custom Properties design token system
- **Build output**: ~240-280 KB raw / ~55-70 KB gzip (target: **~50% reduction**)
- **Dependencies**: solid-js (single runtime dependency)

---

## 1. Technology Stack

| Layer | Current | After |
|-------|---------|-------|
| Framework | Preact 10 + @preact/signals | Solid.js 1.9+ |
| Styling | Global index.css (5500 lines) | CSS Modules + design tokens |
| Build | Vite + @preact/preset-vite | Vite + vite-plugin-solid |
| Image viewer | react-photo-view (~30KB) | Native `<dialog>` + CSS (~3-5KB) |
| Types | TypeScript 5 | TypeScript 5 (retained) |
| Output | IIFE single-file userscript | IIFE single-file userscript (retained) |

## 2. Directory Structure

```
src/
├── main.tsx                    # Entry: inject styles, mount app
├── App.tsx                     # Root component: init, routing
├── design/                     # Design token system
│   ├── tokens.css              # CSS variables (colors, spacing, radii, shadows, animation)
│   └── theme.css               # Light/dark theme overrides
├── primitives/                 # Solid primitives (equivalent to React hooks)
│   ├── createWebSocket.ts      # WebSocket connection & reconnection
│   ├── createDraggable.ts      # Drag logic
│   ├── createResizable.ts      # Resize logic
│   ├── createFileUpload.ts     # File upload
│   ├── createScrollAnchor.ts   # Scroll anchoring & virtual scrolling
│   ├── createSwipeGesture.ts   # Swipe gesture
│   └── createLongPress.ts      # Long press detection
├── stores/                     # Solid stores (reactive state)
│   ├── chat.ts                 # Messages, conversations
│   ├── ui.ts                   # Panels, layout state
│   ├── user.ts                 # User, auth, settings
│   └── presence.ts             # Online users, typing (extracted from chat)
├── components/                 # UI components (directory per component)
│   ├── ChatWindow/
│   │   ├── ChatWindow.tsx
│   │   └── ChatWindow.module.css
│   ├── MessageList/
│   │   ├── MessageList.tsx     # Message list container
│   │   ├── VirtualScroll.tsx   # Virtual scroll logic
│   │   └── MessageList.module.css
│   ├── MessageItem/
│   │   ├── MessageItem.tsx
│   │   ├── MessageContent.tsx  # BBCode rendering
│   │   └── MessageItem.module.css
│   ├── ChatInput/
│   │   ├── ChatInput.tsx       # Input container
│   │   ├── Toolbar.tsx         # Formatting toolbar
│   │   ├── MediaPreview.tsx    # Attachment preview
│   │   └── ChatInput.module.css
│   ├── ImageViewer/
│   │   ├── ImageViewer.tsx     # Replaces react-photo-view
│   │   └── ImageViewer.module.css
│   └── ...                     # Other components follow same pattern
├── utils/                      # Pure function utilities
│   ├── api.ts                  # API client
│   ├── bbcode.ts               # BBCode parsing
│   ├── format.ts               # Formatting
│   └── constants.ts            # All magic numbers centralized
└── types/
    └── index.ts
```

### Boundary Rules

- **Cross-component shared state → stores/**
- **DOM interaction / side effects → primitives/**
- **Pure computation → utils/**

## 3. Design Token System

### tokens.css

```css
:root {
  /* Color palette */
  --color-primary: #f09199;
  --color-primary-hover: #e57f87;

  /* Semantic colors */
  --color-bg-base: #ffffff;
  --color-bg-surface: #f8f8f8;
  --color-bg-elevated: #ffffff;
  --color-bg-glass: rgba(255, 255, 255, 0.85);
  --color-text-primary: #333333;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-border: rgba(0, 0, 0, 0.08);

  /* Spacing (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Glass morphism */
  --glass-blur: 12px;
  --glass-bg: var(--color-bg-glass);

  /* Z-index layers */
  --z-base: 90;
  --z-float: 95;
  --z-panel: 99;
  --z-modal: 2000;
  --z-toast: 3000;
}
```

### theme.css (dark mode overrides)

```css
html[data-theme="dark"] {
  --color-bg-base: #1a1a1a;
  --color-bg-surface: #242424;
  --color-bg-elevated: #2a2a2a;
  --color-bg-glass: rgba(30, 30, 30, 0.85);
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #aaaaaa;
  --color-text-muted: #777777;
  --color-border: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
}
```

### CSS Rules

1. **No hardcoded colors/spacing/radii** — all reference token variables
2. **No inline styles** except dynamic positioning (drag coordinates)
3. **Component styles only in own `.module.css`** — no global style leakage
4. **tokens.css + theme.css are the only global CSS**
5. **Conditional styles via `classList`** (Solid's native API), not string concatenation

## 4. State Management

### Preact Signals → Solid Mapping

| Preact Signals | Solid.js |
|---|---|
| `signal()` | `createSignal()` |
| `computed()` | `createMemo()` |
| `effect()` | `createEffect()` |
| `batch()` | `batch()` |
| `.value` read/write | getter/setter functions `[get, set]` |

### chat.ts — Deep Reactive Store

```ts
// Current: Signal<Map> requires full replacement on any change
// New: createStore with path-level granular updates

const [messages, setMessages] = createStore<Record<number, Message>>({});
const messageIds = createMemo(() =>
  Object.keys(messages).map(Number).sort(/* ... */)
);

function addMessage(msg: Message) {
  setMessages(msg.id, msg);
}

function addMessagesBatch(msgs: Message[]) {
  batch(() => msgs.forEach(m => setMessages(m.id, m)));
}

// Update single field — does NOT trigger full list re-render
function updateReaction(msgId: number, reactions: Reaction[]) {
  setMessages(msgId, 'reactions', reactions);
}
```

### ui.ts — Panel State as Enum

```ts
type PanelType = 'smiley' | 'search' | 'gallery' | 'profile' | 'settings';

const [isChatOpen, setIsChatOpen] = createSignal(false);
const [activePanel, setActivePanel] = createSignal<PanelType | null>(null);

// Single enum replaces multiple booleans — structurally prevents
// multiple panels being open simultaneously
function togglePanel(panel: PanelType) {
  setActivePanel(prev => prev === panel ? null : panel);
}

const [viewportWidth, setViewportWidth] = createSignal(0);
const isNarrowLayout = createMemo(() => viewportWidth() < 600);
```

### presence.ts — Extracted from chat.ts

```ts
const [onlineUsers, setOnlineUsers] = createSignal<number[]>([]);
const [typingUsers, setTypingUsers] = createSignal<TypingUser[]>([]);
const [wsConnected, setWsConnected] = createSignal(false);
```

### user.ts

```ts
const [currentUser, setCurrentUser] = createStore<UserState>({
  id: 0,
  nickname: '',
  avatar: '',
  isLoggedIn: false,
  settings: { /* ... */ },
  blockedUsers: [],
});
```

## 5. Component Decomposition

### ChatBody (754 lines) → MessageList + VirtualScroll

| File | Responsibility | Est. lines |
|---|---|---|
| `MessageList.tsx` | Message list container, history loading, unread tracking | ~200 |
| `VirtualScroll.tsx` | DOM limit (MAX_DOM_MESSAGES), scroll anchoring, position restore | ~200 |

### ChatInput (773 lines) → ChatInput + Toolbar + MediaPreview + primitive

| File | Responsibility | Est. lines |
|---|---|---|
| `ChatInput.tsx` | Input box, send, draft auto-save, @mention transform | ~250 |
| `Toolbar.tsx` | Formatting buttons | ~80 |
| `MediaPreview.tsx` | Attachment preview & removal | ~60 |
| `primitives/createFileUpload.ts` | File selection, validation, upload, progress | ~120 |

### useWebSocket (555 lines) → createWebSocket + store handlers

| File | Responsibility | Est. lines |
|---|---|---|
| `createWebSocket.ts` | Connection, reconnection, heartbeat | ~150 |
| Store handlers | Message dispatch moved to respective stores | distributed |

```ts
const ws = createWebSocket(url, {
  onMessage(type, data) {
    chatHandlers[type]?.(data);
    presenceHandlers[type]?.(data);
  }
});
```

### ImageViewer — Replaces react-photo-view

- Native `<dialog>` + CSS implementation
- Zoom (CSS `transform: scale()` + wheel event)
- Drag panning
- Multi-image navigation
- ~150 lines TSX + ~80 lines CSS, replacing ~30KB dependency

### Solid Component Model

```tsx
// Component function body runs ONCE (not on every render like Preact)
// All dynamic parts auto-track through signal reads in templates

const MessageItem = (props: MessageItemProps) => {
  const content = createMemo(() => parseBBCode(props.message.content));
  const [isCollapsed, setIsCollapsed] = createSignal(
    props.message.content.length > COLLAPSE_THRESHOLD
  );

  return (
    <div class={styles.root} classList={{ [styles.own]: props.isOwn }}>
      <div class={styles.bubble}>{content()}</div>
    </div>
  );
};
```

## 6. Feature Parity Checklist

All existing features must be retained 1:1:

- [ ] Optimistic message sending (stableKey matching)
- [ ] Swipe-to-reply gesture
- [ ] Message collapse/expand
- [ ] Smiley panel + BMO custom emoji
- [ ] Right-click context menu
- [ ] Drag/resize window + position persistence
- [ ] Virtual scrolling (100 DOM message limit)
- [ ] Unread jump (Telegram-style)
- [ ] Draft auto-save/restore
- [ ] Dark theme toggle
- [ ] Mention completer
- [ ] Notification manager
- [ ] User profile panel
- [ ] Gallery panel
- [ ] Search panel
- [ ] Message reactions
- [ ] Conversation list / sidebar
- [ ] Extension API compatibility

## 7. Build Configuration

### vite.config.ts

```ts
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solid(), stripVitePreload()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
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
});
```

### Size Budget

| Optimization | Est. savings | Notes |
|---|---|---|
| Preact+Signals → Solid.js | ~8-12 KB | Smaller runtime, no VDOM |
| Remove react-photo-view | ~30 KB | Self-implemented ~3-5 KB |
| Enable terser minify | ~150-180 KB | Currently `minify: false` — largest single win |
| CSS Modules tree-shake | ~5-10 KB | Unused global styles eliminated |
| drop_console | ~2-3 KB | Remove debug output |
| Constant inlining + dead code | ~3-5 KB | Terser constant folding |

**Conservative estimate**: 462 KB → **240-280 KB** raw, 100 KB → **55-70 KB** gzip

### Dependencies (after refactor)

```json
{
  "dependencies": {
    "solid-js": "^1.9.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vite-plugin-solid": "^2.10.0",
    "typescript": "^5.7.0"
  }
}
```

From 3 runtime dependencies to **1**.

## 8. Build Verification

Post-build validation:

1. Output is a valid IIFE single file
2. CSS is inlined (no external requests)
3. Installable and functional in Tampermonkey/Violentmonkey
4. Host page (bgm.tv) styles unaffected by CSS Modules scoping
