/// <reference types="vitest" />
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

// 將 Vite 注入的 __vitePreload 替換為最小實現，減少體積（單文件 IIFE 不需要 preload）
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
// @version      1.0.0
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
    plugins: [preact(), stripVitePreload()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
        reportCompressedSize: false,
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
    },
    server: {
        port: 5173,
    },
});
