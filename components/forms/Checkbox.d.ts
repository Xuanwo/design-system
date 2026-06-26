import * as React from "react";

/** Checkbox with optional label + description and an indeterminate state. */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Inline label text/node. */
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  /** Render the "mixed" dash state. */
  indeterminate?: boolean;
}
export function Checkbox(props: CheckboxProps): React.JSX.Element;
