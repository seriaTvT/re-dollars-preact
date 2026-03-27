import { describe, expect, it, vi } from 'vitest';
import { transformMentions } from './mentions';

describe('transformMentions', () => {
    it('transforms mentions after a reply quote tag', async () => {
        const lookup = vi.fn().mockResolvedValue({
            alice: { id: 42, nickname: 'Alice' }
        });

        const result = await transformMentions('[quote=100][/quote]@alice 你好', lookup);

        expect(result).toBe('[quote=100][/quote][user=42]Alice[/user] 你好');
        expect(lookup).toHaveBeenCalledWith(['alice']);
    });

    it('skips mentions inside code blocks', async () => {
        const lookup = vi.fn().mockResolvedValue({
            alice: { id: 42, nickname: 'Alice' }
        });

        const result = await transformMentions('测试 [code]@alice[/code] @alice', lookup);

        expect(result).toBe('测试 [code]@alice[/code] [user=42]Alice[/user]');
        expect(lookup).toHaveBeenCalledWith(['alice']);
    });
});
