import * as React from "react";

/**
 * Surface container — the basic content panel. Depth from a hairline
 * border on a raised surface, never a drop shadow.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Inner padding. @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
  /** Hover/active affordance for clickable cards. */
  interactive?: boolean;
  /** Tint the border with the accent. */
  accent?: boolean;
  /** Render as another element/component. */
  as?: React.ElementType;
  /** Renders an anchor and turns on interactive styling. */
  href?: string;
  children?: React.ReactNode;
}
export function Card(props: CardProps): React.JSX.Element;
