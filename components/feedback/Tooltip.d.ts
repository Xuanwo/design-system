import * as React from "react";

/** Hover/focus tooltip. Wraps a single interactive child. */
export interface TooltipProps {
  /** Tooltip text/content. */
  content: React.ReactNode;
  /** @default "top" */
  side?: "top" | "bottom" | "left" | "right";
  /** Optional trailing shortcut hint, e.g. "⌘K". */
  kbd?: string;
  /** Show delay in ms. @default 250 */
  delay?: number;
  /** The trigger (should be focusable for a11y). */
  children: React.ReactNode;
  className?: string;
}
export function Tooltip(props: TooltipProps): React.JSX.Element;
