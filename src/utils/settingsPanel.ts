import { settings, saveSettings, isLoggedIn, userInfo } from '@/stores/user';
import { isChatOpen } from '@/stores/chatState';
import { isMaximized, mobileChatViewActive } from '@/stores/ui';
import { performLogin, performLogout } from '@/utils/api/auth';
import type { Settings } from '@/types';
import { clearWindowState, saveChatOpenState, saveMaximizedState, saveMobileChatViewState } from '@/utils/windowState';

interface SettingsConfigItem {
    key: keyof Settings | 'auth_control_group';
    type: 'checkbox' | 'radio' | 'auth_control_group';
    label: string;
    options?: Record<string, string>;
    onchange?: () => void;
}

const settingsConfig: SettingsConfigItem[] = [
    {
        key: 'auth_control_group',
        type: 'auth_control_group',
        label: 'Bangumi 授权',
    },
    {
        key: 'showCard',
        type: 'checkbox',
        label: '首页显示 Re:Dollars 卡片',
        onchange: applyHomeCardDisplay,
    },
    {
        key: 'linkPreview',
        type: 'checkbox',
        label: '启用链接预览',
    },
    {
        key: 'sharePresence',
        type: 'checkbox',
        label: '分享在线状态',
    },
    {
        key: 'notificationType',
        type: 'radio',
        label: '消息通知',
        options: {
            detail: '详细',
            simple: '精简',
            off: '关闭',
        },
    },
    {
        key: 'loadImages',
        type: 'checkbox',
        label: '默认加载图片',
    },
    {
        key: 'rememberOpenState',
        type: 'checkbox',
        label: '记忆窗口状态',
        onchange: handleRememberOpenStateChange,
    },
    {
        key: 'sendShortcut',
        type: 'radio',
        label: '发送快捷键',
        options: {
            CtrlEnter: 'Ctrl+Enter 发送',
            Enter: 'Enter 发送',
        },
    },
    {
        key: 'backgroundMode',
        type: 'radio',
        label: '主题背景',
        options: {
            transparent: '透明',
            lines: '线条',
            tint: '色调',
        },
        onchange: applyBackgroundPattern,
    },
    {
        key: 'glassBlur',
        type: 'checkbox',
        label: '玻璃模糊',
        onchange: applyGlassBlur,
    },
];

const PANEL_TAB = 'dollars_chat_settings';
let nativeSettingsPanelRegistered = false;
let nativeSettingsPanelRetryTimer: number | undefined;
let settingsHeaderButtonBound = false;
let authControlConfig: ReturnType<typeof createAuthControlConfig> | null = null;

function getUkagaka() {
    return (window as any).chiiLib?.ukagaka as Window['chiiLib']['ukagaka'] | undefined;
}

function authDisplayName() {
    return userInfo.value.nickname || userInfo.value.name || userInfo.value.id || '当前用户';
}

function currentAuthControlValue() {
    return isLoggedIn.value ? 'auth_state' : '';
}

function authControlOptions() {
    return isLoggedIn.value
        ? [
            { value: 'auth_state', label: `已鉴权：${authDisplayName()}` },
            { value: 'logged_out', label: '撤销鉴权' },
        ]
        : [
            { value: 'oauth_login', label: 'OAuth 鉴权' },
        ];
}

function createAuthControlConfig() {
    return {
        title: 'Bangumi 授权',
        name: 'dollars_auth_action',
        type: 'radio' as const,
        defaultValue: currentAuthControlValue(),
        getCurrentValue: currentAuthControlValue,
        onChange: async (value: string) => {
            if (value === 'oauth_login') {
                performLogin();
            } else if (value === 'logged_out') {
                performLogout();
            }
        },
        options: authControlOptions(),
    };
}

function syncAuthControlConfig() {
    if (!authControlConfig) return;
    authControlConfig.defaultValue = currentAuthControlValue();
    authControlConfig.options = authControlOptions();
}

function applyHomeCardDisplay() {
    const card = document.getElementById('dollars-card');
    if (card) {
        card.style.display = settings.value.showCard ? '' : 'none';
    }
}

function applyBackgroundPattern() {
    const root = document.getElementById('dollars-chat-root');
    if (root) {
        root.dataset.bgMode = settings.value.backgroundMode;
        root.classList.remove('no-background-pattern');
    }
}

function applyGlassBlur() {
    const root = document.getElementById('dollars-chat-root');
    if (root) {
        if (settings.value.glassBlur) {
            root.classList.remove('disable-blur');
        } else {
            root.classList.add('disable-blur');
        }
    }
}

function handleRememberOpenStateChange() {
    // 如果关闭了记忆状态，清除所有保存的窗口状态
    if (!settings.value.rememberOpenState) {
        clearWindowState();
    } else {
        // 如果开启了记忆状态，保存当前所有窗口状态
        saveChatOpenState(isChatOpen.value);
        saveMaximizedState(isMaximized.value);
        saveMobileChatViewState(mobileChatViewActive.value);
    }
}

export function applyAllSettings() {
    applyHomeCardDisplay();
    applyBackgroundPattern();
    applyGlassBlur();
}

function generateApiConfig() {
    return settingsConfig.map((s) => {
        if (s.type === 'auth_control_group') {
            authControlConfig = authControlConfig || createAuthControlConfig();
            syncAuthControlConfig();
            return authControlConfig;
        } else if (s.type === 'checkbox') {
            return {
                title: s.label,
                name: s.key,
                type: 'radio' as const,
                defaultValue: String(settings.value[s.key as keyof Settings] ?? true),
                getCurrentValue: () => String(settings.value[s.key as keyof Settings]),
                onChange: (value: string) => {
                    settings.value = {
                        ...settings.peek(),
                        [s.key]: value === 'true',
                    };
                    saveSettings();
                    if (s.onchange) s.onchange();
                },
                options: [
                    { value: 'true', label: '开启' },
                    { value: 'false', label: '关闭' },
                ],
            };
        } else if (s.type === 'radio' && s.options) {
            return {
                title: s.label,
                name: s.key,
                type: 'radio' as const,
                defaultValue: String(settings.value[s.key as keyof Settings] ?? Object.keys(s.options)[0]),
                getCurrentValue: () => String(settings.value[s.key as keyof Settings]),
                onChange: (value: string) => {
                    settings.value = {
                        ...settings.peek(),
                        [s.key]: value,
                    };
                    saveSettings();
                    if (s.onchange) s.onchange();
                },
                options: Object.entries(s.options).map(([value, label]) => ({ value, label })),
            };
        }
        return null;
    }).filter((x): x is any => x !== null);
}

export function refreshNativeSettingsPanelAuthState() {
    syncAuthControlConfig();
    if (!authControlConfig) return;

    const ukagaka = getUkagaka() as (Window['chiiLib']['ukagaka'] & {
        generateOptionsTabContent?: (config: unknown[]) => string;
        bindConfigChangeEvents?: (config: unknown[]) => void;
    }) | undefined;
    const section = document.getElementById('section-dollars_auth_action');
    if (!section || typeof ukagaka?.generateOptionsTabContent !== 'function') return;

    const container = document.createElement('div');
    container.innerHTML = ukagaka.generateOptionsTabContent([authControlConfig]);
    const nextSection = container.querySelector('#section-dollars_auth_action');
    if (!nextSection) return;

    section.replaceWith(nextSection);
    ukagaka.bindConfigChangeEvents?.([authControlConfig]);
}

export function integrateWithNativeSettingsPanel() {
    if (nativeSettingsPanelRegistered) return;

    const ukagaka = getUkagaka();
    if (!ukagaka || typeof ukagaka.addPanelTab !== 'function') {
        if (nativeSettingsPanelRetryTimer === undefined) {
            nativeSettingsPanelRetryTimer = window.setTimeout(() => {
                nativeSettingsPanelRetryTimer = undefined;
                integrateWithNativeSettingsPanel();
            }, 500);
        }
        return;
    }

    const apiConfig = generateApiConfig();

    ukagaka.addPanelTab({
        tab: PANEL_TAB,
        label: 'Re:Dollars',
        type: 'options',
        config: apiConfig,
    });
    nativeSettingsPanelRegistered = true;

    const settingsBtnHeader = document.getElementById('dollars-settings-btn-header');
    if (settingsBtnHeader && !settingsHeaderButtonBound) {
        settingsHeaderButtonBound = true;
        settingsBtnHeader.title = '打开聊天设置';
        settingsBtnHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            openSettingsPanel();
        });
    }
}

export function openSettingsPanel() {
    integrateWithNativeSettingsPanel();
    const ukagaka = getUkagaka();
    if (ukagaka && typeof ukagaka.showCustomizePanelWithTab === 'function') {
        ukagaka.showCustomizePanelWithTab(PANEL_TAB);
    }
}
