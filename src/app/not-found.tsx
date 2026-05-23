import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaButton from "@/components/atoms/CapturaButton";
import CapturaDivider from "@/components/atoms/CapturaDivider";

export const metadata = {
  title: "Page Not Found — Captura",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <Box
      component="main"
      id="main-content"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        py: 8,
      }}
    >
      <Stack spacing={4} alignItems="center" textAlign="center">
        <CapturaTypography variant="display">
          404
        </CapturaTypography>
        <CapturaDivider />
        <CapturaTypography variant="heading" headingLevel={1}>
          Page Not Found
        </CapturaTypography>
        <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 480 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </CapturaTypography>
        <CapturaButton component="a" href="/">
          Return Home
        </CapturaButton>
      </Stack>
    </Box>
  );
}
