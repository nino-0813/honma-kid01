import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://honma-kid01.vercel.app";

const siteName = "佐渡Kids生き物調査隊";
const siteDescription =
  "佐渡の田んぼや水辺をフィールドに、生きものと出会い観察・記録を楽しむ子ども向けの野外プログラムです。年間の活動内容、スタッフ紹介、参加に関するよくある質問などを掲載しています。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s｜${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "ja_JP",
    siteName,
    title: siteName,
    description: siteDescription,
    /* og:image は app/opengraph-image.png（ASCIIパス）で出力。LINE等は日本語ファイル名URLで取得に失敗することがある */
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
      <body className="min-h-full flex flex-col bg-[#7ECFDF]">{children}</body>
    </html>
  );
}
