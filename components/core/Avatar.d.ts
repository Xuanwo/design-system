import * as React from "react";

/** User/author avatar — image with initials fallback, optional status dot. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL; falls back to initials when absent/broken. */
  src?: string;
  /** Full name — drives initials and the title tooltip. */
  name?: string;
  /** Named step or a raw pixel number. @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** @default "circle" */
  shape?: "circle" | "rounded";
  /** Presence indicator. */
  status?: "online" | "busy" | "away" | "offline";
}
export function Avatar(props: AvatarProps): React.JSX.Element;
