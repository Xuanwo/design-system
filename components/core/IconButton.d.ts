import * as React from "react";

/** Square button holding a single icon. Always pass `label` for a11y. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "ghost" */
  variant?: "ghost" | "secondary" | "primary";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name (also the tooltip title). Required. */
  label: string;
  /** The icon node (e.g. a Lucide <svg>). */
  children: React.ReactNode;
}
export function IconButton(props: IconButtonProps): React.JSX.Element;
