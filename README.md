# Re:Dollars Frontend Next

A lighter, more maintainable rewrite of the Bangumi/Chii.in Re:Dollars userscript. It keeps the current Preact + Signals runtime, preserves the existing userscript behavior and visual language, and focuses the rewrite on cleaner module boundaries, lower runtime overhead, and safer incremental evolution.

## Features

-   **Userscript-first architecture**: Built for injection into Bangumi/Chii.in pages without backend changes.
-   **Preact + Signals**: Keeps the small runtime while reducing component and store coupling.
-   **Behavior parity**: Chat, notifications, panels, search, uploads, mentions, reactions, and extension APIs remain compatible with the existing frontend.
-   **Visual parity with polish**: Preserves the current glassy floating chat interface while allowing focused refinements.
-   **No production compression requirement**: The Bangumi component/userscript build remains readable and debuggable.

## Architecture

-   `src/app/`: userscript startup, host-page injection, delayed chat initialization.
-   `src/services/`: framework-light business services, including websocket connection management and composer sending.
-   `src/stores/`: focused signal stores. `stores/chat.ts` remains as a compatibility barrel; new code should import from `chatState`, `messageStore`, `composerState`, or the other focused stores.
-   `src/hooks/`: UI lifecycle hooks for window interaction, message effects, uploads, scrolling, and websocket lifecycle.
-   `src/components/`: Preact view components with side effects pushed into hooks/services where practical.

## Installation

### For Users
1.  Install a Userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.top/).
2.  [**Click here to install the script**](https://github.com/maho0x/re-dollars-preact/releases/download/latest/userscript.user.js) (latest GitHub Actions build).

### For Developers

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd re-dollars-frontend-next
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start development server**
    ```bash
    npm run dev
    ```
    This will start Vite in watch mode.

4.  **Build**
    ```bash
    npm run build
    ```
    The output file will be generated at `dist/userscript.user.js`.

5.  **Verify**
    ```bash
    npm run typecheck
    npm test
    npm run build
    ```

## License

MIT License. See [LICENSE](./LICENSE) for details.
