import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "Vanta Systems",
    template: "%s | Vanta Systems",
  },
  description:
    "Software su misura, automazioni intelligenti e soluzioni digitali per far crescere il tuo business.",
  keywords: [
    "Software House",
    "Sviluppo Software",
    "Automazioni",
    "Web App",
    "Gestionali",
    "AI",
    "Vanta Systems",
  ],
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