import * as React from "react";

/** Text field with optional label, hint, error, and prefix/suffix icons. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message — turns the field red and overrides hint. */
  error?: React.ReactNode;
  /** Marks the label with a red asterisk. */
  required?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Leading icon node. */
  prefix?: React.ReactNode;
  /** Trailing icon node. */
  suffix?: React.ReactNode;
}
export function Input(props: InputProps): React.JSX.Element;
