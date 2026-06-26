import * as React from "react";

/**
 * Code display with an optional filename header, language label, copy
 * button, line numbers, and line highlighting. Plain text in — bring
 * your own syntax highlighter if you want tokens colored.
 */
export interface CodeBlockProps {
  /** The source to render. */
  code: string;
  /** Language label shown at top-right (also a hint for highlighters). */
  language?: string;
  /** Filename shown in the header (adds a leading dot). */
  filename?: string;
  /** Show a line-number gutter. */
  lineNumbers?: boolean;
  /** 1-based line numbers to highlight. */
  highlight?: number[];
  /** Show the copy button. @default true */
  copyable?: boolean;
  className?: string;
}
export function CodeBlock(props: CodeBlockProps): React.JSX.Element;
