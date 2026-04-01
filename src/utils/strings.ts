/**
 * 集中管理 UI 字符串，为未来国际化做准备
 */
export const STRINGS = {
    // 通用
    loading: '加载中...',
    confirm: '确认',
    cancel: '取消',

    // 消息状态
    messageDeleted: '此消息已撤回',
    messageEdited: '已编辑',
    messageFailed: '发送失败，点击重试',
    expandFull: '展开全文',
    collapse: '收起',
    imageTag: '[图片]',

    // 输入
    typingSingle: '正在输入...',
    typingMultiple: (count: number) => ` 和其他 ${count} 人正在输入...`,
    typingAnd: ' 和 ',

    // 搜索
    searchPlaceholder: '搜索消息...',
    searchNoResults: '未找到相关消息',
    searchConversations: '搜索对话...',

    // 用户
    online: '在线',
    noSignature: '这个人很懒，什么都没有写...',
    noMessages: '暂无发言记录',
    messagesUnit: '条消息',
    perDay: '条/天',
    firstMessage: '首次发言',
    searchMessages: '搜索发言',
    homepage: '主页',
    signature: '个性签名',
    media: '媒体',
    userProfile: '用户资料',

    // 操作
    confirmDelete: '确认撤回这条消息吗？',
    savedToBmo: '已存入BMO面板',
    reply: '回复',
    copy: '复制',
    edit: '编辑',
    delete: '撤回',
    favorite: '收藏',

    // 通知
    repliedYou: '回复了你',
    mentionedYou: '提到了你',
    view: '查看',
    ignore: '忽略',

    // BMO
    openBmoPanel: '打开 BMO 快速拼装面板',
    noBmoSaved: '暂无保存的 BMO 表情',
    uploadOrFavorite: '上传或右键图片收藏',

    // 格式化
    linkPlaceholder: '输入链接 URL...',
} as const;
