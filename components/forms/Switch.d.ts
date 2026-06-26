import * as React from "react";

/** Toggle switch for instant on/off settings (no Save step). */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md";
}
export function Switch(props: SwitchProps): React.JSX.Element;
