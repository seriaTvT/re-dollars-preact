interface MentionLookupResult {
    id: number;
    nickname: string;
}

type MentionLookup = (usernames: string[]) => Promise<Record<string, MentionLookupResult>>;

const CODE_BLOCK_PLACEHOLDER_PREFIX = '\x00CODE_BLOCK_';
const mentionRegex = /(^|\s|\[\/[^\]]+\])@([\p{L}\p{N}_']{1,30})/gu;

export async function transformMentions(
    text: string,
    lookupUsersByName: MentionLookup
): Promise<string> {
    const codeBlocks: string[] = [];
    let processedText = text.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (match) => {
        codeBlocks.push(match);
        return `${CODE_BLOCK_PLACEHOLDER_PREFIX}${codeBlocks.length - 1}\x00`;
    });

    const matches = [...processedText.matchAll(mentionRegex)];
    if (matches.length === 0) {
        return restoreCodeBlocks(processedText, codeBlocks);
    }

    const usernamesToLookup = [...new Set(matches.map(match => match[2]))].filter(u => u !== 'Bangumi娘');
    if (usernamesToLookup.length === 0) {
        return restoreCodeBlocks(processedText, codeBlocks);
    }

    const userDataMap = await lookupUsersByName(usernamesToLookup);
    const replacementMap = new Map<string, string>();
    for (const username in userDataMap) {
        const data = userDataMap[username];
        if (data?.id && data?.nickname) {
            replacementMap.set(username, `[user=${data.id}]${data.nickname}[/user]`);
        }
    }

    processedText = processedText.replace(mentionRegex, (match, prefix, username) =>
        replacementMap.has(username) ? `${prefix}${replacementMap.get(username)}` : match
    );

    return restoreCodeBlocks(processedText, codeBlocks);
}

function restoreCodeBlocks(text: string, codeBlocks: string[]): string {
    let restoredText = text;
    codeBlocks.forEach((block, i) => {
        restoredText = restoredText.replace(`${CODE_BLOCK_PLACEHOLDER_PREFIX}${i}\x00`, block);
    });
    return restoredText;
}
