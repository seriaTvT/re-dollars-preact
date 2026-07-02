/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { transformSync } from 'esbuild';

const rawCssModuleId = 'virtual:dollars-css';
const resolvedRawCssModuleId = `\0${rawCssModuleId}`;

function escapeTemplateLiteral(value: string) {
    return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function rawCssModule(): import('rollup').Plugin {
    return {
        name: 'raw-css-module',
        resolveId(id) {
            if (id === rawCssModuleId) {
                return resolvedRawCssModuleId;
            }
            return null;
        },
        load(id) {
            if (id !== resolvedRawCssModuleId) return null;

            const css = transformSync(readFileSync(resolve(__dirname, 'src/styles/index.css'), 'utf8'), {
                loader: 'css',
                minify: true,
            }).code;
            return `export default \`${escapeTemplateLiteral(css)}\`;`;
        },
    };
}

// 將 Vite 注入的 __vitePreload 替換為最小實現，減少體積（單文件 IIFE 不需要 preload）
function stripVitePreload(userscriptBanner: string): import('rollup').Plugin {
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
        writeBundle(options) {
            const outputDir = options.dir || resolve(__dirname, 'dist');
            const filePath = resolve(outputDir, 'userscript.user.js');
            const code = readFileSync(filePath, 'utf8');
            if (!code.startsWith('// ==UserScript==')) {
                writeFileSync(filePath, `${userscriptBanner}\n${code}`);
            }
        }
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
    plugins: [rawCssModule(), stripVitePreload(userscriptBanner)],
    esbuild: {
        jsx: 'transform',
        jsxFactory: 'h$jsx',
        jsxFragment: 'Fragment$jsx',
        jsxInject: `import { h as h$jsx, Fragment as Fragment$jsx } from 'preact';`,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        target: 'esnext',
        minify: false,
        modulePreload: false,
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
