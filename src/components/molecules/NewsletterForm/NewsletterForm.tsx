"use client";

import { useState, type FormEvent } from "react";
import Stack from "@mui/material/Stack";
import CapturaInput from "@/components/atoms/CapturaInput";
import CapturaButton from "@/components/atoms/CapturaButton";

export interface NewsletterFormProps {
  /** Callback when a valid email is submitted */
  onSubmit?: (email: string) => void;
  /** Button label text (default: "SUBSCRIBE") */
  buttonText?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * NewsletterForm — molecule composing an email input + subscribe button with validation.
 */
export default function NewsletterForm({ onSubmit, buttonText = "SUBSCRIBE" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !EMAIL_RE.test(email)) {
      setError(true);
      setHelperText("Please enter a valid email address");
      return;
    }
    setError(false);
    setHelperText("");
    onSubmit?.(email);
  };

  return (
    <Stack
      component="form"
      role="form"
      aria-label="Newsletter subscription"
      direction="row"
      spacing={1}
      onSubmit={handleSubmit}
    >
      <CapturaInput
        label="Email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) {
            setError(false);
            setHelperText("");
          }
        }}
        error={error}
        helperText={helperText}
        placeholder="Enter your email address"
        size="small"
        fullWidth
      />
      <CapturaButton type="submit" sx={{ whiteSpace: "nowrap" }}>
        {buttonText}
      </CapturaButton>
    </Stack>
  );
}
