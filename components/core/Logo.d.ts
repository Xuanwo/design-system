import * as React from "react";

/**
 * Xuanwo brand mark — pixel-art lockup. `wordmark` is the full "Xuanwo"
 * logo (the X is the border-collie face); `mark` is the standalone "X"
 * monogram. Sized by `height`; pass `src` when the page is in a subfolder.
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** @default "wordmark" */
  variant?: "wordmark" | "mark";
  /** Rendered height in px (width auto). Defaults: 28 wordmark / 32 mark. */
  height?: number;
  /** Override the image URL (relative to the consuming page). */
  src?: string;
  /** @default "Xuanwo" */
  alt?: string;
}
export function Logo(props: LogoProps): React.JSX.Element;

/** The standalone "X" monogram (dog-face). */
export interface LogoMarkProps extends Omit<LogoProps, "variant" | "height"> {
  /** Square size in px. @default 32 */
  size?: number;
}
export function LogoMark(props: LogoMarkProps): React.JSX.Element;
