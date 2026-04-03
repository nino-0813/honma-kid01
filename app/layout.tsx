import type { Metadata } from "next";
import "./globals.css";

const siteName = "佐渡Kids生き物調査隊";
const siteDescription =
  "佐渡の田んぼや水辺をフィールドに、生きものと出会い観察・記録を楽しむ子ども向けの野外プログラムです。年間の活動内容、スタッフ紹介、参加に関するよくある質問などを掲載しています。";

export const metadata: Metadata = {
  metadataBase: new URL("https://honma-kid01.vercel.app"),
  title: {
    default: siteName,
    template: `%s｜${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/figma-assets/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202026-04-03%2014.03.42.png",
        width: 2112,
        height: 1592,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#e8edf5]">{children}</body>
    </html>
  );
}
