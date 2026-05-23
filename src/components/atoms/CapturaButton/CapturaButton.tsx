"use client";

import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export interface CapturaButtonProps extends Omit<ButtonProps, "variant"> {
  /** Visual variant of the button */
  variant?: "primary" | "secondary" | "ghost";
  /** Shows a loading spinner and disables the button */
  loading?: boolean;
  /** Makes the button take full width of its container */
  fullWidth?: boolean;
}

const variantMap: Record<string, ButtonProps["variant"]> = {
  primary: "contained",
  secondary: "outlined",
  ghost: "text",
};

/**
 * CapturaButton — branded button atom with gold/cream dark-theme styling.
 *
 * Variants:
 * - `primary`: Gold filled background with dark text (default)
 * - `secondary`: Gold outlined with gold text
 * - `ghost`: No border/background, gold text
 */
export default function CapturaButton({
  variant = "primary",
  loading = false,
  children,
  disabled,
  ...rest
}: CapturaButtonProps) {
  const muiVariant = variantMap[variant] ?? "contained";
  const isDisabled = disabled || loading;

  return (
    <Button
      variant={muiVariant}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={16} color="inherit" />
          {children}
        </Box>
      ) : (
        children
      )}
    </Button>
  );
}
