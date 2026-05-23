"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CapturaNavLink from "@/components/atoms/CapturaNavLink";
import CapturaButton from "@/components/atoms/CapturaButton";
import CapturaIcon from "@/components/atoms/CapturaIcon";
import CapturaLogo from "@/components/atoms/CapturaLogo";
import { navigation } from "@/data/navigation";

export interface HeaderProps {
  /** Current pathname to mark active link */
  currentPath?: string;
}

/**
 * Header — two-row branded navigation bar:
 * Row 1: Logo (left) + Auth buttons with icons (right)
 * Row 2: Nav pills (centered) + gold divider line below
 */
export default function Header({ currentPath = "/" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar position="sticky" component="header">
      <Container maxWidth="lg">
        {/* Row 1: Logo + Auth buttons */}
        <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: "56px !important" }}>
          <CapturaLogo />

          {/* Desktop Auth Buttons — outlined with icon + text */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navigation.authButtons.map((btn) => (
              <CapturaButton
                key={btn.href}
                component="a"
                href={btn.href}
                variant="secondary"
                size="small"
                startIcon={btn.icon ? <CapturaIcon size="small">{btn.icon}</CapturaIcon> : undefined}
              >
                {btn.label}
              </CapturaButton>
            ))}
          </Stack>

          {/* Mobile hamburger */}
          <IconButton
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
          >
            <Box component="span" sx={{ fontFeatureSettings: '"liga" 1', fontFamily: "'Material Icons'", fontSize: 24 }}>
              menu
            </Box>
          </IconButton>
        </Toolbar>

        {/* Row 2: Nav pills + gold divider */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack
            component="nav"
            role="navigation"
            aria-label="Main navigation"
            direction="row"
            spacing={1}
            sx={{
              pb: 1.5,
              justifyContent: "center",
            }}
          >
            {navigation.mainNav.map((item) => (
              <CapturaNavLink
                key={item.href}
                href={item.href}
                active={currentPath === item.href}
              >
                {item.label}
              </CapturaNavLink>
            ))}
          </Stack>
          {/* Gold divider line at bottom of header */}
          <Box
            aria-hidden="true"
            sx={{
              height: 2,
              background: "var(--captura-gradient-gold-horizontal)",
            }}
          />
        </Box>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ "& .MuiDrawer-paper": { backgroundColor: "var(--captura-semantic-background-elevated)", width: "75%" } }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            sx={{ color: "inherit" }}
          >
            <Box component="span" sx={{ fontFeatureSettings: '"liga" 1', fontFamily: "'Material Icons'", fontSize: 24 }}>
              close
            </Box>
          </IconButton>
          <List>
            {navigation.mainNav.map((item) => (
              <ListItem key={item.href} disablePadding>
                <CapturaNavLink
                  href={item.href}
                  active={currentPath === item.href}
                  sx={{ py: 1.5, px: 2, width: "100%" }}
                >
                  {item.label}
                </CapturaNavLink>
              </ListItem>
            ))}
          </List>
          <Stack spacing={1} sx={{ px: 2, mt: 2 }}>
            {navigation.authButtons.map((btn) => (
              <CapturaButton
                key={btn.href}
                component="a"
                href={btn.href}
                variant="secondary"
                size="small"
                fullWidth
                startIcon={btn.icon ? <CapturaIcon size="small">{btn.icon}</CapturaIcon> : undefined}
              >
                {btn.label}
              </CapturaButton>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
