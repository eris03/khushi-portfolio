import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khushi Yadav — Artist × AI Engineer",
  description:
    "An interactive digital exhibition by Khushi Yadav. AI Developer and Data Analyst in Bengaluru, building beautiful intelligence — forecasting systems, LLM applications, Android products.",
  keywords: [
    "Khushi Yadav",
    "AI Developer",
    "Data Analyst",
    "Machine Learning",
    "Prompt Engineering",
    "Bengaluru",
    "Portfolio",
  ],
  authors: [{ name: "Khushi Yadav" }],
  metadataBase: new URL("https://eris03.github.io/khushi-portfolio/"),
  openGraph: {
    title: "Khushi Yadav — AI Developer & Data Analyst",
    description:
      "Forecasting systems, LLM applications and Android products, shipped end to end. B.E. CSE (AI & ML), 8.3 CGPA. Bengaluru.",
    type: "website",
    url: "https://eris03.github.io/khushi-portfolio/",
    siteName: "Khushi Yadav",
    images: [
      {
        url: "/khushi-portfolio/og.png",
        width: 1200,
        height: 630,
        alt: "Khushi Yadav — AI Developer, Data Analyst, AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khushi Yadav — AI Developer & Data Analyst",
    description: "Designing beautiful intelligence.",
    images: ["/khushi-portfolio/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
