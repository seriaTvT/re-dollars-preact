import { AUTH_BASE_URL, AUTH_CLIENT } from '../constants';
import { getAuthHeaders, getToken } from '@/stores/user';
import { getChiiApp } from '@/utils/globals';
import { apiUrl } from './url';

type AuthUser = {
    id: string;
    nickname: string;
    avatar: string;
};

type AuthCheckResult = {
    isLoggedIn: boolean;
    user?: AuthUser;
};

function currentBangumiUid() {
    return window.CHOBITS_UID ? String(window.CHOBITS_UID) : null;
}

function isCurrentUser(user: AuthUser) {
    const uid = currentBangumiUid();
    return !uid || String(user.id) === uid;
}

function normalizeAuthUser(user: any): AuthUser | null {
    if (!user?.id) return null;
    return {
        id: String(user.id),
        nickname: String(user.nickname || ''),
        avatar: String(user.avatar || ''),
    };
}

async function fetchCurrentAuthUser(): Promise<AuthCheckResult> {
    const res = await fetch(apiUrl('/auth/me'), {
        headers: getAuthHeaders(),
        credentials: 'include'
    });
    const data = await res.json();
    const user = normalizeAuthUser(data.user);

    if (data.status && user && isCurrentUser(user)) {
        return { isLoggedIn: true, user };
    }

    return { isLoggedIn: false };
}

async function restoreSessionFromToken(token: string): Promise<AuthCheckResult> {
    const loginRes = await fetch(apiUrl('/auth/token-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'include'
    });
    const loginData = await loginRes.json();
    const user = normalizeAuthUser(loginData.user);

    if (loginData.status && user && isCurrentUser(user)) {
        return { isLoggedIn: true, user };
    }

    return { isLoggedIn: false };
}

/**
 * 检查登录状态
 * 只有存在本地 token 时才探测服务端会话，避免未授权用户刷新时请求 /auth/me。
 * 如果 cookie 验证失败但存在云端同步的 token，则尝试 token-login 恢复会话。
 */
export async function checkAuth(): Promise<AuthCheckResult> {
    const token = getToken();
    if (!token) return { isLoggedIn: false };

    try {
        const currentUser = await fetchCurrentAuthUser();
        if (currentUser.isLoggedIn) {
            return currentUser;
        }

        return await restoreSessionFromToken(token);
    } catch {
        // ignore
    }

    return { isLoggedIn: false };
}

async function saveToken(token: string) {
    const cloud = getChiiApp()?.cloud_settings;
    if (cloud) {
        cloud.update({ dollarsAuthToken: token });
        cloud.save();
    }
}

async function loginBackendWithToken(token: string): Promise<{
    isLoggedIn: boolean;
    user?: { id: string; nickname: string; avatar: string };
    error?: string;
}> {
    const res = await fetch(apiUrl('/auth/token-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'include'
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.status || !data.token) {
        return { isLoggedIn: false, error: data.message || data.error || '登录失败' };
    }

    await saveToken(token);
    return { isLoggedIn: true, user: data.user };
}

/**
 * 执行 rymk-auth OAuth 登录
 */
export function performLogin() {
    const width = 600, height = 700;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const nonce = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const authUrl = `${AUTH_BASE_URL}/api/auth/bangumi/start`
        + `?mode=popup`
        + `&client=${encodeURIComponent(AUTH_CLIENT)}`
        + `&origin=${encodeURIComponent(window.location.origin)}`
        + `&state=${encodeURIComponent(nonce)}`;

    const loginWindow = window.open(authUrl, 'rymk-auth', `width=${width},height=${height},top=${top},left=${left}`);
    if (!loginWindow) return;

    const authOrigin = new URL(AUTH_BASE_URL).origin;
    const watchTimer = window.setInterval(() => {
        if (loginWindow.closed) {
            window.clearInterval(watchTimer);
            window.removeEventListener('message', messageHandler);
        }
    }, 600);

    const messageHandler = (event: MessageEvent) => {
        const data = event.data || {};

        if (event.origin === authOrigin && data.type === 'rymk_auth' && data.state === nonce) {
            window.clearInterval(watchTimer);
            window.removeEventListener('message', messageHandler);
            loginWindow.close();

            if (data.ok && data.token) {
                loginBackendWithToken(data.token).then((result) => {
                    if (result.isLoggedIn) {
                        window.location.reload();
                    } else {
                        window.alert(result.error || '授权 token 无法被 Re:Dollars 后端验证');
                    }
                });
            }
        }
    };

    window.addEventListener('message', messageHandler);
}

/**
 * 执行注销
 */
export async function performLogout() {
    try {
        await fetch(apiUrl('/auth/logout'), {
            method: 'POST',
            credentials: 'include',
        });

        // 清除本地 token
        const cloud = getChiiApp()?.cloud_settings;
        if (cloud) {
            cloud.delete('dollarsAuthToken');
            cloud.save();
        }

        window.location.reload();
    } catch (e) {
        // ignore
    }
}
