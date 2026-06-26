import * as React from "react";

/** Interactive chip — topics, filters, keywords. Selectable and/or removable. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Prefix a "#" (topic style). */
  hash?: boolean;
  /** Selected/active styling. */
  selected?: boolean;
  /** Show a remove (×) button; receives the click event. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Makes the whole tag clickable (filter toggle). */
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
export function Tag(props: TagProps): React.JSX.Element;
