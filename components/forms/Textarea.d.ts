import * as React from "react";

/** Multi-line text field. Shares the label/hint/error pattern with Input. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** Monospace mode — for code/config input. */
  mono?: boolean;
}
export function Textarea(props: TextareaProps): React.JSX.Element;
