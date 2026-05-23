"use client";

import Stack from "@mui/material/Stack";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaButton from "@/components/atoms/CapturaButton";
import ProfileCard from "@/components/molecules/ProfileCard";
import type { CommunityContent } from "@/types/content";

interface CommunitySpotlightProps {
  content: CommunityContent["spotlight"];
}

export default function CommunitySpotlight({ content }: CommunitySpotlightProps) {
  return (
    <Stack spacing={3} alignItems="center">
      <CapturaTypography variant="subheading" headingLevel={3} color="accent">
        {content.heading}
      </CapturaTypography>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {content.builders.map((builder) => (
          <ProfileCard
            key={builder.name}
            name={builder.name}
            title={builder.title}
            avatarSrc={builder.image.src}
          />
        ))}
      </Stack>
      <CapturaButton component="a" href={content.cta.href} variant="secondary">
        {content.cta.label}
      </CapturaButton>
    </Stack>
  );
}
