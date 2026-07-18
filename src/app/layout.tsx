import type { Metadata } from "next";
import { Chakra_Petch, Sarabun } from "next/font/google";
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

export const metadata: Metadata = {
  title: "TEDxBangkok Youth 2026 · ส่วนผสมลับ ฉบับคนไทย",
  description:
    "TEDxBangkok Youth 2026 — เวทีของไอเดียจากคนรุ่นใหม่ หยิบวัตถุดิบธรรมดาในชีวิตแบบไทย ๆ มาผสมใหม่ให้กลายเป็นสูตร(ไม่)ลับของความคิดสร้างสรรค์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${chakraPetch.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
