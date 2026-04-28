import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GtagPageView from "@/app/components/GtagPageView";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import "./globals.css";

const siteUrl = "https://honma-kid01.vercel.app";
const canonicalHost = "https://www.ikimono-sado.com";

const siteName = "佐渡Kids生き物調査隊";
const siteDescription =
  "佐渡の田んぼや水辺をフィールドに、生きものと出会い観察・記録を楽しむ子ども向けの野外プログラムです。年間の活動内容、スタッフ紹介、参加に関するよくある質問などを掲載しています。";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalHost),
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
    url: canonicalHost,
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
    <html lang="ja" className="h-full w-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* next/font の Zen Kaku は subset が latin 系のみで和文が載らないため、CSS2 で本文フォントを読み込む */}
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full w-full flex flex-col bg-[#7ECFDF]">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
            <Suspense fallback={null}>
              <GtagPageView />
            </Suspense>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
