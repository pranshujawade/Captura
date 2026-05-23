"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaLogo from "@/components/atoms/CapturaLogo";
import NewsletterForm from "@/components/molecules/NewsletterForm";
import SocialLinks from "@/components/molecules/SocialLinks";
import { footer } from "@/data/footer";

/**
 * Footer — 3-column footer with contact, logo, and newsletter.
 * Gold gradient divider between content and copyright.
 */
export default function Footer() {
  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        backgroundColor: "var(--captura-semantic-background-section-alt)",
        borderTop: "1px solid var(--captura-border-color-subtle)",
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto", px: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          {/* Contact column */}
          <Stack spacing={1.5} alignItems={{ xs: "center", md: "flex-start" }}>
            <CapturaTypography variant="overline" color="accent">
              CONTACT US
            </CapturaTypography>
            <CapturaTypography variant="body2" color="secondary">
              {footer.contact.email}
            </CapturaTypography>
            <CapturaTypography variant="body2" color="secondary">
              {footer.contact.instagram}
            </CapturaTypography>
            <SocialLinks
              links={footer.contact.socialLinks.map((s) => ({
                icon: s.icon,
                href: s.url,
                label: s.platform,
              }))}
            />
          </Stack>

          {/* Logo / Brand column */}
          <Stack spacing={1.5} alignItems="center" justifyContent="center">
            <CapturaLogo variant="footer" />
            <CapturaTypography variant="caption" color="muted">
              Premium Health Supplements
            </CapturaTypography>
          </Stack>

          {/* Newsletter column */}
          <Stack spacing={1.5} sx={{ minWidth: { md: 280 } }} alignItems={{ xs: "center", md: "flex-end" }}>
            <CapturaTypography variant="overline" color="accent">
              {footer.newsletter.heading}
            </CapturaTypography>
            <CapturaTypography variant="body2" color="secondary" sx={{ textAlign: { xs: "center", md: "right" } }}>
              {footer.newsletter.description}
            </CapturaTypography>
            <NewsletterForm />
          </Stack>
        </Stack>

        {/* Gold gradient divider */}
        <Box
          aria-hidden="true"
          sx={{
            height: 1,
            background: "var(--captura-gradient-gold-subtle)",
            mt: 6,
            mb: 3,
          }}
        />

        <CapturaTypography variant="caption" color="muted" sx={{ textAlign: "center", display: "block" }}>
          {footer.copyright}
        </CapturaTypography>
      </Box>
    </Box>
  );
}
