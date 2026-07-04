import { signal } from '@preact/signals';
import type { UserInfo, Settings } from '@/types';
import { getChiiApp } from '@/utils/globals';
import { lookupUsersByName } from '@/utils/api/users';

const browserWindow = typeof window !== 'undefined' ? window : undefined;

// 用户状态
export const isLoggedIn = signal(false);
export const userInfo = signal<UserInfo>({
    id: browserWindow?.CHOBITS_UID?.toString() || '',
    name: browserWindow?.CHOBITS_USERNAME || '',
    nickname: '',
    avatar: '',
    formhash: '',
});

// 设置
export const settings = signal<Settings>({
    showCard: true,
    linkPreview: true,
    sendShortcut: 'CtrlEnter',
    sharePresence: false,
    notificationType: 'off',
    pmNoticeOpensRD: false,
    loadImages: true,
    rememberOpenState: false,

    backgroundMode: 'tint',
    glassBlur: true,
});

// 屏蔽用户
export const blockedUsers = signal<Set<string>>(new Set());

// 初始化屏蔽用户列表
export async function initializeBlockedUsers() {
    const list = (window as any).data_ignore_users || [];
    if (!list.length) return;

    const newBlockedUsers = new Set<string>();
    let cache: Record<string, string> = {};
    let cacheDirty = false;

    // 从云设置加载缓存
    try {
        const cloudSettings = getChiiApp().cloud_settings.getAll();
        if (cloudSettings?.dollars_blocked_cache) {
            cache = JSON.parse(cloudSettings.dollars_blocked_cache);
        }
    } catch {
    }

    const usernamesToResolve: string[] = [];

    for (const u of list) {
        const uStr = String(u);

        if (/^\d+$/.test(uStr)) {
            // 已经是 UID
            newBlockedUsers.add(uStr);
        } else {
            // 是用户名，需要解析为 UID
            if (cache[uStr]) {
                newBlockedUsers.add(String(cache[uStr]));
            } else {
                usernamesToResolve.push(uStr);
            }
        }
    }

    if (usernamesToResolve.length) {
        try {
            const resolved = await lookupUsersByName(usernamesToResolve);
            for (const username of usernamesToResolve) {
                const user = resolved[username];
                if (!user?.id) continue;
                const id = String(user.id);
                newBlockedUsers.add(id);
                cache[username] = id;
                cacheDirty = true;
            }
        } catch {
        }
    }

    blockedUsers.value = newBlockedUsers;

    // 保存缓存到云设置
    if (cacheDirty) {
        try {
            const cloud = getChiiApp().cloud_settings;
            cloud.update({ dollars_blocked_cache: JSON.stringify(cache) });
            cloud.save();
        } catch (e) {
            // ignore
        }
    }
}

// 初始化用户信息
export function initUserInfo() {
    const nicknameEl = document.querySelector('#dock .content ul li:first-child a span');
    const avatarEl = document.querySelector('.avatarNeue.avatarSize32') as HTMLElement;
    const formhashEl = document.querySelector('input[name="formhash"]') as HTMLInputElement;

    userInfo.value = {
        ...userInfo.value,
        nickname: nicknameEl?.textContent?.trim() || window.CHOBITS_USERNAME || '',
        avatar: avatarEl?.style.backgroundImage?.slice(5, -2) || '',
        formhash: formhashEl?.value || '',
    };
}

// 从云设置加载
export function loadSettingsFromCloud() {
    const cloudSettings = getChiiApp().cloud_settings.getAll();
    if (!cloudSettings) return;

    const defaults = settings.peek();
    const newSettings = { ...defaults };

    for (const key in cloudSettings) {
        if (key in defaults) {
            const defaultValue = defaults[key as keyof Settings];
            if (typeof defaultValue === 'boolean') {
                (newSettings as any)[key] = cloudSettings[key] === 'true';
            } else {
                (newSettings as any)[key] = cloudSettings[key];
            }
        }
    }

    settings.value = newSettings;
}

// 保存设置到云
export function saveSettings() {
    const cloud = getChiiApp().cloud_settings;
    const settingsToSave: Record<string, string> = {};
    const currentSettings = settings.peek();

    for (const key in currentSettings) {
        settingsToSave[key] = String((currentSettings as any)[key]);
    }

    cloud.update(settingsToSave);
    cloud.save();
}

// 获取 Token
export function getToken(): string | null {
    try {
        return getChiiApp()?.cloud_settings?.getAll?.()?.dollarsAuthToken || null;
    } catch {
        return null;
    }
}

// 获取认证 Headers
export function getAuthHeaders(): Record<string, string> {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function isJwtToken(token: string) {
    return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token);
}

// 获取图床认证 Headers。旧版 64 位本地 token 不发给 up.ry.mk，避免被判定为无效 bearer。
export function getUploadAuthHeaders(): Record<string, string> {
    const token = getToken();
    return token && isJwtToken(token) ? { 'Authorization': `Bearer ${token}` } : {};
}
