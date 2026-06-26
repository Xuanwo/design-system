import * as React from "react";

/**
 * Primary action button. Filled accent for the main action, bordered
 * secondary and quiet ghost for the rest; danger for destructive.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual emphasis. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon node rendered before the label (e.g. a Lucide <svg>). */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Swap content for a spinner and block interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Render as a different element/component (e.g. "a"). */
  as?: React.ElementType;
  /** When set (or as="a"), renders an anchor. */
  href?: string;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): React.JSX.Element;
