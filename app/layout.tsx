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
  openGraph: {
    title: "Khushi Yadav — Artist × AI Engineer",
    description: "Designing beautiful intelligence.",
    type: "website",
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
