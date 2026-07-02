import { h, render } from 'preact';
import type { ComponentType } from 'preact';

const APP_MOUNT_ID = 'dollars-app-mount';

export function getAppMountPoint() {
    const existing = document.getElementById(APP_MOUNT_ID);
    if (existing) return existing;

    const container = document.createElement('div');
    container.id = APP_MOUNT_ID;
    document.body.appendChild(container);
    return container;
}

export function renderUserscriptApp(App: ComponentType) {
    render(h(App, {}), getAppMountPoint());
}
