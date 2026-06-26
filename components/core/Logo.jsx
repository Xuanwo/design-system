import React from "react";

/* Default asset paths (relative to the consuming page's root). Pass an
   explicit `src` when the page lives in a subdirectory. */
const WORDMARK_SRC = "assets/logo/wordmark.png";
const MARK_SRC = "assets/logo/monogram.png";

/**
 * Xuanwo brand mark — a pixel-art lockup.
 *  - variant="wordmark" (default): the full "Xuanwo" wordmark (the X is the
 *    border-collie face, with monitor + tail). Sized by height; width auto.
 *  - variant="mark": the standalone "X" monogram (the dog face). Square.
 */
export function Logo({
  variant = "wordmark",
  height,
  src,
  alt = "Xuanwo",
  className = "",
  style,
  ...rest
}) {
  const isMark = variant === "mark";
  const h = height != null ? height : (isMark ? 32 : 28);
  const url = src || (isMark ? MARK_SRC : WORDMARK_SRC);
  return (
    <img
      src={url}
      alt={alt}
      height={h}
      className={className}
      style={{
        height: typeof h === "number" ? `${h}px` : h,
        width: "auto",
        display: "block",
        ...(isMark ? { borderRadius: "var(--radius-sm)" } : null),
        ...style,
      }}
      {...rest}
    />
  );
}

/** The standalone "X" monogram (dog-face). Convenience wrapper over Logo. */
export function LogoMark({ size = 32, src, ...rest }) {
  return <Logo variant="mark" height={size} src={src} {...rest} />;
}
