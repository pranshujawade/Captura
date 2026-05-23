"use client";

import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

export interface CapturaInputProps extends Omit<TextFieldProps, "variant"> {
  /** TextField variant — always outlined for Captura styling */
  variant?: "outlined";
}

/**
 * CapturaInput — branded text input atom with dark theme styling.
 *
 * Features:
 * - Dark surface background (#18170F)
 * - Gold focus ring on focus state
 * - Error state with red accent
 * - Consistent with Captura's gold/cream design language
 */
export default function CapturaInput({
  variant = "outlined",
  sx,
  ...rest
}: CapturaInputProps) {
  const theme = useTheme();

  return (
    <TextField
      variant={variant}
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            "& fieldset": {
              borderColor: "var(--captura-border-color-subtle)",
            },
            "&:hover fieldset": {
              borderColor: theme.palette.gold[300],
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--captura-semantic-focus-ring-color)",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.text.secondary,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--captura-semantic-focus-ring-color)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
}
