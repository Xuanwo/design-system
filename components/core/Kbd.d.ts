import * as React from "react";

/** Keyboard key / shortcut hint. Pass `keys` for a combo, or children for one key. */
export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Render a combo, joined with "+", e.g. ["⌘","K"]. */
  keys?: string[];
  children?: React.ReactNode;
}
export function Kbd(props: KbdProps): React.JSX.Element;
