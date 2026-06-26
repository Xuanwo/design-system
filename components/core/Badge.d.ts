import * as React from "react";

/** Compact status / category label. Not interactive — use Tag for removable chips. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  color?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  /** @default "subtle" */
  variant?: "subtle" | "solid";
  /** @default "md" */
  size?: "md" | "lg";
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): React.JSX.Element;
