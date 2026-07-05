import { getSmileyUrl } from '@/utils/smilies';

export function SmileyCodeItem({
    code,
    onSelect,
}: {
    code: string;
    onSelect: (code: string) => void;
}) {
    const url = getSmileyUrl(code);
    return (
        <li class="smiley-item">
            <a
                href="#"
                data-smiley={code}
                onClick={(e) => {
                    e.preventDefault();
                    onSelect(code);
                }}
                style={url ? { backgroundImage: `url('${url}')` } : undefined}
                title={code}
            >
            </a>
        </li>
    );
}
