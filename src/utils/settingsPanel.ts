import { settings, saveSettings, isLoggedIn, userInfo } from '@/stores/user';
import { isChatOpen } from '@/stores/chatState';
import { performLogin, performLogout } from '@/utils/api/auth';
import type { Settings } from '@/types';
import { clearChatOpenState, saveChatOpenState } from '@/utils/windowState';

type SettingsConfigItem = readonly [
    keyof Settings | 'auth_control_group',
    'checkbox' | 'radio' | 'auth_control_group',
    string,
    Record<string, string>?,
    (() => void)?,
];

const settingsConfig: SettingsConfigItem[] = [
    ['auth_control_group', 'auth_control_group', 'Bangumi 授权'],
    ['showCard', 'checkbox', '首页显示 Re:Dollars 卡片', undefined, applyHomeCardDisplay],
    ['linkPreview', 'checkbox', '启用链接预览'],
    ['sharePresence', 'checkbox', '分享在线状态'],
    ['notificationType', 'radio', '消息通知', {
            detail: '详细',
            simple: '精简',
            off: '关闭',
        }],
    ['pmNoticeOpensRD', 'checkbox', '短信通知跳转到 RD'],
    ['loadImages', 'checkbox', '默认加载图片'],
    ['rememberOpenState', 'checkbox', '记忆窗口状态', undefined, handleRememberOpenStateChange],
    ['sendShortcut', 'radio', '发送快捷键', {
            CtrlEnter: 'Ctrl+Enter 发送',
            Enter: 'Enter 发送',
        }],
    ['backgroundMode', 'radio', '主题背景', {
            transparent: '透明',
            lines: '线条',
            tint: '色调',
        }, applyBackgroundPattern],
    ['glassBlur', 'checkbox', '玻璃模糊', undefined, applyGlassBlur],
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
    if (!settings.value.rememberOpenState) {
        clearChatOpenState();
    } else {
        saveChatOpenState(isChatOpen.value);
    }
}

export function applyAllSettings() {
    applyHomeCardDisplay();
    applyBackgroundPattern();
    applyGlassBlur();
}

function generateApiConfig() {
    return settingsConfig.map((s) => {
        const [key, type, label, options, onchange] = s;
        if (type === 'auth_control_group') {
            authControlConfig = authControlConfig || createAuthControlConfig();
            syncAuthControlConfig();
            return authControlConfig;
        } else if (type === 'checkbox') {
            return {
                title: label,
                name: key,
                type: 'radio' as const,
                defaultValue: String(settings.value[key as keyof Settings] ?? true),
                getCurrentValue: () => String(settings.value[key as keyof Settings]),
                onChange: (value: string) => {
                    settings.value = {
                        ...settings.peek(),
                        [key]: value === 'true',
                    };
                    saveSettings();
                    if (onchange) onchange();
                },
                options: [
                    { value: 'true', label: '开启' },
                    { value: 'false', label: '关闭' },
                ],
            };
        } else if (type === 'radio' && options) {
            return {
                title: label,
                name: key,
                type: 'radio' as const,
                defaultValue: String(settings.value[key as keyof Settings] ?? Object.keys(options)[0]),
                getCurrentValue: () => String(settings.value[key as keyof Settings]),
                onChange: (value: string) => {
                    settings.value = {
                        ...settings.peek(),
                        [key]: value,
                    };
                    saveSettings();
                    if (onchange) onchange();
                },
                options: Object.entries(options).map(([value, label]) => ({ value, label })),
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
