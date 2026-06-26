import * as React from "react";

/** Centered modal dialog with backdrop, Esc-to-close, and a footer slot. */
export interface DialogProps {
  /** Controls visibility. */
  open: boolean;
  /** Called on backdrop click, Esc, or the close button. */
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Footer actions (typically Buttons). */
  footer?: React.ReactNode;
  /** Show the corner × button. @default true */
  showClose?: boolean;
  /** Body content. */
  children?: React.ReactNode;
  className?: string;
}
export function Dialog(props: DialogProps): React.JSX.Element | null;
