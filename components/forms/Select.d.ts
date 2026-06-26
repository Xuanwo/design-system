import * as React from "react";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

/** Native select, restyled. Pass `options` or `<option>` children. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Options as strings or {value,label,disabled}. */
  options?: (string | SelectOption)[];
  /** Disabled first option shown when nothing is chosen. */
  placeholder?: string;
}
export function Select(props: SelectProps): React.JSX.Element;
