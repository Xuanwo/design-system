import * as React from "react";

/** Highlighted note / admonition block for docs and articles. Ships a default icon per variant. */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "note" */
  variant?: "note" | "accent" | "info" | "success" | "warning" | "danger";
  /** Optional bold lead line. */
  title?: React.ReactNode;
  /** Override the default variant icon. */
  icon?: React.ReactNode;
  /** Drop the icon entirely. */
  hideIcon?: boolean;
  children?: React.ReactNode;
}
export function Callout(props: CalloutProps): React.JSX.Element;
