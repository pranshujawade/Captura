"use client";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CapturaCard from "@/components/atoms/CapturaCard";
import CapturaTypography from "@/components/atoms/CapturaTypography";

export interface ProfileCardProps {
  /** Person's full name */
  name: string;
  /** Person's title/role */
  title: string;
  /** Optional short bio */
  bio?: string;
  /** Optional avatar image src */
  avatarSrc?: string;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * ProfileCard — molecule composing an avatar + name + title inside a CapturaCard.
 *
 * Used in community spotlight sections, team pages.
 * Features a gold gradient top border via pseudo-element (borderImage breaks border-radius).
 */
export default function ProfileCard({
  name,
  title,
  bio,
  avatarSrc,
  ...rest
}: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <CapturaCard
      component="article"
      hoverable
      aria-label={rest["aria-label"]}
      sx={{
        textAlign: "center",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "var(--captura-gradient-gold-shine)",
        },
      }}
    >
      <Stack spacing={2} alignItems="center">
        {avatarSrc ? (
          <Avatar
            src={avatarSrc}
            alt={name}
            sx={{
              width: 80,
              height: 80,
              border: "3px solid var(--captura-semantic-icon-active)",
              boxShadow: "0 0 12px rgba(200,149,42,0.3)",
            }}
          />
        ) : (
          <Avatar
            alt={name}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "var(--captura-semantic-icon-active)",
              color: "var(--captura-semantic-text-on-gold)",
              fontSize: "1.5rem",
              fontWeight: 600,
              boxShadow: "0 0 12px rgba(200,149,42,0.3)",
            }}
          >
            {initials}
          </Avatar>
        )}
        <CapturaTypography variant="subheading" headingLevel={5}>
          {name}
        </CapturaTypography>
        <CapturaTypography variant="body2" color="accent">
          {title}
        </CapturaTypography>
        {bio && (
          <CapturaTypography variant="body2" color="secondary">
            {bio}
          </CapturaTypography>
        )}
      </Stack>
    </CapturaCard>
  );
}
