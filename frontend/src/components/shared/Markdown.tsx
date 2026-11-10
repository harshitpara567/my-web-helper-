import Link from "next/link";
import type { ReactNode } from "react";

const LIST_MARKER = /^[-*]\s+/;

/**
 * Renders inline markdown (`**bold**` and `[text](url)`) into React nodes.
 * No raw HTML is ever injected — only typed React elements are produced.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let token = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-strong-${token}`}>{match[1]}</strong>);
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const href = match[3];
      const label = match[2];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={`${keyPrefix}-link-${token}`} href={href}>
            {label}
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-link-${token}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      );
    }

    lastIndex = pattern.lastIndex;
    token += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * Minimal, dependency-free markdown renderer for editorial blog content.
 * Supports `##`/`###` headings, paragraphs, unordered lists, blockquotes and
 * inline bold/links. Output is wrapped in the shared `.prose-editorial` styles.
 */
export function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  const key = (prefix: string) => `${prefix}-${index}`;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key("h3")}>{renderInline(line.slice(4), key("h3-inline"))}</h3>);
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key("h2")}>{renderInline(line.slice(3), key("h2-inline"))}</h2>);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <blockquote key={key("quote")}>
          {renderInline(quote.join(" "), key("quote-inline"))}
        </blockquote>
      );
      continue;
    }

    if (LIST_MARKER.test(line)) {
      const items: string[] = [];
      while (index < lines.length && LIST_MARKER.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(LIST_MARKER, ""));
        index += 1;
      }
      blocks.push(
        <ul key={key("list")}>
          {items.map((item, itemIndex) => (
            <li key={`${key("list")}-item-${itemIndex}`}>
              {renderInline(item, `${key("list")}-item-${itemIndex}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const candidate = lines[index].trim();
      if (!candidate) break;
      if (
        candidate.startsWith("## ") ||
        candidate.startsWith("### ") ||
        candidate.startsWith(">") ||
        LIST_MARKER.test(candidate)
      ) {
        break;
      }
      paragraph.push(candidate);
      index += 1;
    }
    blocks.push(<p key={key("p")}>{renderInline(paragraph.join(" "), key("p-inline"))}</p>);
  }

  return <div className="prose-editorial">{blocks}</div>;
}
