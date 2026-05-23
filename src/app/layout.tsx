import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Cinzel } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Captura — Elevate Your Health with Premium Supplements",
    template: "%s — Captura",
  },
  description:
    "Science-backed formulation for optimal wellness. Captura offers premium health supplements crafted with high-quality ingredients and research validation.",
  metadataBase: new URL("https://captura.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Captura",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${playfairDisplay.variable} ${inter.variable} ${cinzel.variable}`}
    >
      <body>
        <ThemeRegistry>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
