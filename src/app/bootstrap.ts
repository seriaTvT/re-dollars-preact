import type { ComponentType } from 'preact';
import { initDollarsAPI } from '@/extensionAPI';
import { injectStyles } from '@/app/hostIntegrations';
import { renderUserscriptApp } from '@/app/mount';

export function bootstrapUserscriptApp(App: ComponentType) {
    injectStyles();
    initDollarsAPI();
    renderUserscriptApp(App);
}
