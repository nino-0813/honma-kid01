import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kosugiyu Tonari",
  description:
    "Shared bathside space in Koenji — architectural lighting, layered space, and scroll-led storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#e8edf5]">{children}</body>
    </html>
  );
}
