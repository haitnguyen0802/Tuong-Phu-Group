import * as React from "react";

type SocialName = "instagram" | "facebook" | "tiktok" | "youtube";

type Props = React.SVGAttributes<SVGSVGElement> & {
  name: SocialName;
};

/**
 * Inline SVG glyphs for social platforms. Lucide v1 dropped branded icons due
 * to trademark concerns — we ship our own minimal monochrome marks instead.
 */
export function SocialIcon({ name, ...rest }: Props) {
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...rest}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.25" cy="6.75" r="0.9" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...rest}>
          <path
            d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.4-3.7 3.9v2.3H8v3h2.5V21z"
            fill="currentColor"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...rest}>
          <path
            d="M14 3v10.5a3 3 0 1 1-3-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14 3c.4 2.4 2.1 4.1 4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...rest}>
          <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" />
        </svg>
      );
  }
}
