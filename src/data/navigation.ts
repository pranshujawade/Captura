import type { NavigationContent } from "@/types/content";

export const navigation: NavigationContent = {
  mainNav: [
    { label: "Home", href: "/" },
    { label: "Captura Signatures", href: "/signatures" },
    { label: "Community", href: "/community" },
    { label: "About Us", href: "/about" },
  ],
  authButtons: [
    { label: "Account", href: "/account", icon: "person" },
    { label: "Cart", href: "/cart", icon: "shopping_cart" },
    { label: "Sign In", href: "/sign-in", icon: "login" },
  ],
};
