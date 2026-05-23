"use client";

import Image from "next/image";
import Link from "next/link";

export interface CapturaLogoProps {
  /** Size variant — footer version is larger */
  variant?: "default" | "footer";
}

/**
 * CapturaLogo — branded CP monogram + CAPTURA wordmark linking to home.
 * Uses the official logo image from /images/logo.jpeg.
 *
 * Variants:
 * - `default`: Compact size for the Header (height 36px)
 * - `footer`: Larger size for the Footer (height 64px)
 */
export default function CapturaLogo({ variant = "default" }: CapturaLogoProps) {
  const height = variant === "footer" ? 64 : 36;
  const width = height * 2; // Logo is 2:1 aspect ratio

  return (
    <Link
      href="/"
      aria-label="Captura home"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
      }}
    >
      <Image
        src="/images/logo.jpeg"
        alt="Captura"
        width={width}
        height={height}
        priority
        style={{ objectFit: "contain", display: "block" }}
      />
    </Link>
  );
}
