import * as React from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Optional trailing count pill. */
  count?: number;
  disabled?: boolean;
  /** Panel content (when not using the render-prop form). */
  content?: React.ReactNode;
}

/**
 * Tabbed navigation. Controlled (`value`+`onChange`) or uncontrolled
 * (`defaultValue`). Render panels via item `content` or a child function.
 */
export interface TabsProps {
  items: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** @default "underline" */
  variant?: "underline" | "pill";
  /** Render-prop receiving the active value, as an alternative to item.content. */
  children?: (active: string) => React.ReactNode;
  className?: string;
}
export function Tabs(props: TabsProps): React.JSX.Element;
