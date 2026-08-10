import type { Metadata } from "next";
import { Chakra_Petch, Sarabun, Athiti, Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Thaigredient's accent face — pulled from the Claude Design source
// (assets/fonts/SOV_rohan.ttf); not available on Google Fonts.
const rohan = localFont({
  variable: "--font-rohan",
  src: "../fonts/SOV_rohan.ttf",
  weight: "400",
  display: "swap",
});

// Used by the TED Club section, whose design system runs on Athiti.
const athiti = Athiti({
  variable: "--font-athiti",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Used by the TEDx main CI (tokens/fonts.css: "Inter Variable" + "IBM Plex Sans Thai").
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TEDxBangkok Youth 2026 · ส่วนผสมลับ ฉบับคนไทย",
  description:
    "TEDxBangkok Youth 2026 — เวทีของไอเดียจากคนรุ่นใหม่ หยิบวัตถุดิบธรรมดาในชีวิตแบบไทย ๆ มาผสมใหม่ให้กลายเป็นสูตร(ไม่)ลับของความคิดสร้างสรรค์",
};

const fontVars = `${chakraPetch.variable} ${sarabun.variable} ${rohan.variable} ${athiti.variable} ${inter.variable} ${ibmPlexSansThai.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${fontVars} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
