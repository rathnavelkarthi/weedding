import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cinzel, Italianno, Catamaran } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap",
});

const catamaran = Catamaran({
  subsets: ["latin", "tamil"],
  weight: ["300", "400", "500"],
  variable: "--font-catamaran",
  display: "swap",
});

export const metadata: Metadata = {
  title: "S. Bala & M. Gayathri — Wedding Reception",
  description:
    "With immense joy and heartfelt gratitude, we invite you to celebrate the wedding reception of S. Bala & M. Gayathri on 29 May 2026 at Manammai Maruthupandiyar Mandapam, Pattaladai, Mannargudi.",
  openGraph: {
    title: "S. Bala & M. Gayathri — Wedding Reception",
    description:
      "29 May 2026 · 6:00 PM onwards · Manammai Maruthupandiyar Mandapam, Pattaladai, Mannargudi.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a120a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${italianno.variable} ${catamaran.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
