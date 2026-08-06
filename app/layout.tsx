import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vantasystems.it"),

  title: {
    default: "Vanta Systems",
    template: "%s | Vanta Systems",
  },

  description:
    "Software su misura, piattaforme web, automazioni e soluzioni basate sull'intelligenza artificiale per aziende.",

  keywords: [
    "software house",
    "sviluppo software",
    "software su misura",
    "web application",
    "automazioni",
    "intelligenza artificiale",
    "gestionali aziendali",
    "api",
    "next.js",
    "vanta systems",
  ],

  authors: [
    {
      name: "Vanta Systems",
    },
  ],

  creator: "Vanta Systems",

  openGraph: {
    title: "Vanta Systems",
    description:
      "Software su misura, automazioni e soluzioni digitali per aziende.",

    url: "https://vantasystems.it",

    siteName: "Vanta Systems",

    locale: "it_IT",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vanta Systems",
    description:
      "Software su misura, automazioni e piattaforme digitali.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<LayoutProps<"/">>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
