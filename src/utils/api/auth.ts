import { BACKEND_URL, BGM_APP_ID, BGM_CALLBACK_URL } from '../constants';
import { getAuthHeaders } from '@/stores/user';
import { getChiiApp } from '@/utils/globals';

/**
 * 检查登录状态
 * 如果 cookie 验证失败但存在云端同步的 token，则尝试 token-login 恢复会话
 */
export async function checkAuth(): Promise<{
    isLoggedIn: boolean;
    user?: {
        id: string;
        nickname: string;
        avatar: string;
    };
}> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
            headers: getAuthHeaders(),
            credentials: 'include'
        });
        const data = await res.json();

        const localUid = window.CHOBITS_UID ? String(window.CHOBITS_UID) : null;

        // 检查 cookie-based 登录是否有效（用户 id 需要匹配当前账号）
        if (data.status && (!localUid || String(data.user.id) === localUid)) {
            return { isLoggedIn: true, user: data.user };
        }

        // Cookie 验证失败，尝试使用云端同步的 token 恢复会话
        const cloud = getChiiApp()?.cloud_settings;
        const token = cloud?.getAll()?.dollarsAuthToken;

        if (token) {
            try {
                const loginRes = await fetch(`${BACKEND_URL}/api/auth/token-login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                    credentials: 'include'
                });
                const loginData = await loginRes.json();

                if (loginData.status) {
                    return { isLoggedIn: true, user: loginData.user };
                }
            } catch (tokenErr) {
                // ignore
            }
        }
    } catch (e) {
        // ignore
    }

    return { isLoggedIn: false };
}

/**
 * 执行 OAuth 登录
 */
export function performLogin() {

    const width = 600, height = 700;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    const currentHost = window.location.hostname;
    const authUrl = `https://${currentHost}/oauth/authorize?client_id=${BGM_APP_ID}&response_type=code&redirect_uri=${encodeURIComponent(BGM_CALLBACK_URL)}`;

    const loginWindow = window.open(authUrl, 'BangumiLogin', `width=${width},height=${height},top=${top},left=${left}`);

    const messageHandler = (event: MessageEvent) => {
        if (event.data && event.data.type === 'bgm_login_success') {
            if (event.data.token) {
                const cloud = getChiiApp()?.cloud_settings;
                if (cloud) {
                    cloud.update({ dollarsAuthToken: event.data.token });
                    cloud.save();
                }
            }
            // 重新检查登录状态
            checkAuth().then(result => {
                if (result.isLoggedIn) {
                    window.location.reload();
                }
            });
            window.removeEventListener('message', messageHandler);
            loginWindow?.close();
        }
    };

    window.addEventListener('message', messageHandler);
}

/**
 * 执行注销
 */
export async function performLogout() {
    try {
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
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
