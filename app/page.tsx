import Image from "next/image";
import AboutCollage from "@/app/components/AboutCollage";
import DesktopFloatingApplyCta from "@/app/components/DesktopFloatingApplyCta";
import DesktopSectionNavFollow from "@/app/components/DesktopSectionNavFollow";
import HeroSectionNav from "@/app/components/HeroSectionNav";
import MobileTourCta from "@/app/components/MobileTourCta";
import Reveal from "@/app/components/reveal";
import FaqSection from "@/app/components/FaqSection";
import StaffMarquee from "@/app/components/StaffMarquee";
import UseCasePanel from "@/app/components/UseCasePanel";

function ikebejiGreenIconPath(filename: string): string {
  return `/ikebeji/green/${encodeURIComponent(filename)}`;
}

/** #place 先頭（Wildlife）— lg 以上の装飾アイコン（absolute + gentle-float） */
const PLACE_WILDLIFE_DESKTOP_DECOR: readonly {
  file: string;
  className: string;
  width: number;
  height: number;
}[] = [
  {
    file: "sadokids_green_Butterfly.png",
    className:
      "absolute left-[593px] top-[-83px] z-30 h-[180px] w-[230px] object-contain opacity-90 gentle-float will-change-transform [animation-delay:0ms]",
    width: 460,
    height: 360,
  },
  {
    file: "sadokids_green_insect 1.png",
    className:
      "absolute left-[653px] top-[410px] z-30 h-[180px] w-[230px] object-contain opacity-90 gentle-float will-change-transform [animation-delay:220ms]",
    width: 460,
    height: 360,
  },
  {
    file: "sadokids_green_toki.png",
    className:
      "absolute left-[574px] top-[940px] z-30 h-[180px] w-[230px] object-contain opacity-90 gentle-float will-change-transform [animation-delay:440ms]",
    width: 460,
    height: 360,
  },
];

/* ────────────────────────────────────────────
   Data
──────────────────────────────────────────── */
/** #place — キッズ・調査隊の雰囲気を伝える説明ブロック（文言は仮） */
const kidsAboutCards = [
  {
    phaseEn: "Wildlife",
    phaseJp: "生きものと同じ目線に",
    title: "しゃがんでのぞく、生きものの世界",
    description:
      "佐渡ヶ島の田んぼや水辺には、虫をはじめ、鳥やカエル、水の中の小さな生きものたちまで、思っている以上にたくさんの命が息づいています。しゃがみこんで水の中をのぞくたび、草むらに目を向けるたび、新しい発見がある。季節の移り変わりの中で生きものたちは、それぞれが命を全うする姿を見せてくれます。その姿が、子どもたちの好奇心をそっとひらき、生きものの世界の奥深さや面白さへと誘っていきます。",
    image: "/ikebeji/069_20220526__S5_5756.JPG",
  },
  {
    phaseEn: "Rice & life",
    phaseJp: "田んぼまるごと、学びの場",
    title: "暮らしと食と命のつながり",
    description:
      "日本の水田には5,000種以上の生きものがいるともいわれています。そのお米の産地である佐渡ヶ島では、約20年にわたって生きものを育む農法が大切に育てられてきました。いまでは、世界でも有数の生物多様性先進地域となりました。田んぼに立って感じる生きものたちの声。食と命のつながりを深めるお米づくりの世界。目には見えない豊かな循環を、歩いて、動いて、味わって、感じていきます。",
    image: "/ikebeji/kids-survey-27.jpg",
  },
  {
    phaseEn: "Together",
    phaseJp: "ひとりじゃないから、もっと面白い",
    title: "好きが広がる仲間との出会い",
    description:
      "見つけたことを話したり、教え合ったり、やってみたい気持ちを一緒にふくらませたり。佐渡Kids生きもの調査隊には、どんな小さな関心も大切に扱って、みんなで学びを育てていく文化があります。大切にしているのは、教えることよりも、その子らしい「好き」や「知りたい」がのびのびと動き出すこと。仲間や講師とともに過ごす中で、ひとりではたどり着けなかった発見や学びが、少しずつ深まっていきます。",
    image: "/ikebeji/１.png",
  },
];

/** ヒーロー背景スライド（5枚・`globals.css` の `hero-fade-quad` 30s 周期）— すべて ASCII パス（Linux デプロイ向け） */
const HERO_SLIDESHOW_IMAGES = [
  "/ikebeji/kids-survey-01.jpg",
  "/ikebeji/kids-survey-09.jpg",
  "/ikebeji/kids-survey-19.jpg",
  "/ikebeji/kids-survey-20.jpg",
  "/ikebeji/kids-survey-22.jpg",
] as const;

/**
 * デスクトップ・ヒーロー左カラムの仮置き（ロゴ位置・幅・ロゴサイズ）
 * ナビ列の水平位置はここでは変えない（p-14 内の通常配置）。
 */
const HERO_DESKTOP_LEFT_COL = {
  /** ロゴ枠と下段（ナビ・Instagram）で共通の max-width */
  maxWidth: "min(1140px, calc(100vw - 14rem))",
  /** ロゴ画像の表示サイズ（px）— 親の maxWidth より狭い画面では幅に合わせて縮小 */
  logoWidth: 1140,
  logoHeight: 420,
  /** ロゴ枠の min-height（px） */
  logoBoxMinHeight: 420,
  /** デスクトップヒーロー縦の最小高さ（px）— ロゴは大きいまま、枠だけ以前のコンパクトさに */
  sectionMinHeight: 820,
  /**
   * ロゴ枠だけの位置（px）。ナビ・Instagram は p-14 基準のまま動かさない。
   * marginTop は負で上へ。
   */
  marginLeft: -88,
  marginTop: -36,
} as const;

/* ────────────────────────────────────────────
   Shared components
──────────────────────────────────────────── */
function PlaceSection({ id = "place", className = "" }: { id?: string; className?: string }) {
  return (
    <section
      id={id}
      className={[
        "rounded-none bg-transparent px-5 py-20 md:px-10 md:py-24",
        className,
      ]
        .join(" ")
        .trim()}
    >
      <div className="mx-auto max-w-[1540px]">
        <div className="flex flex-col gap-24 md:gap-32">
          {kidsAboutCards.map((card, index) => (
            <Reveal
              key={card.phaseEn}
              delay={index * 80}
              variant={index % 2 === 0 ? "left" : "right"}
            >
              <article
                className={[
                  "grid items-start gap-6 lg:grid-cols-2 lg:items-center lg:gap-16",
                  index === 0 ? "relative overflow-visible lg:pt-10" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={[
                    "card-interactive overflow-hidden rounded-3xl lg:rounded-[24px]",
                    index % 2 !== 0 ? "lg:order-2" : "",
                  ].join(" ")}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={1810}
                    height={1280}
                    className="h-auto w-full object-cover transition-transform duration-700 ease-out"
                  />
                </div>
                <div
                  className={[
                    "flex flex-col gap-5",
                    index % 2 !== 0 ? "lg:order-1 lg:pl-8 xl:pl-16" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="lg:hidden">
                    <div className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="text-[30px] font-semibold leading-none tracking-[0.08em] text-[#444]">
                        {card.phaseJp}
                      </span>
                      <span className="font-inter text-[12px] capitalize tracking-[0.1em] text-[#444]">
                        {card.phaseEn}
                      </span>
                    </div>
                    <div className="mt-4 border-t border-[#111]" aria-hidden />
                  </div>

                  <div className="hidden lg:block">
                    <div className="space-y-1">
                      <p className="font-inter text-[15px] capitalize tracking-[0.18em] text-[#6d9ecf]">
                        {card.phaseEn}
                      </p>
                      <p className="text-[28px] font-bold leading-none tracking-[0.08em] text-[#444] md:text-[32px]">
                        {card.phaseJp}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-[18px] font-semibold leading-[1.5] tracking-[0.08em] text-[#444] lg:text-[24px] lg:font-semibold lg:leading-[1.45] lg:tracking-[0.1em]">
                    {card.title}
                  </h3>
                  <p className="max-w-[560px] text-[15px] font-medium leading-[1.85] tracking-[0.1em] text-[#444]/85">
                    {card.description}
                  </p>
                </div>

                {index === 0
                  ? PLACE_WILDLIFE_DESKTOP_DECOR.map((item) => (
                      <Image
                        key={item.file}
                        src={ikebejiGreenIconPath(item.file)}
                        alt=""
                        width={item.width}
                        height={item.height}
                        className={["hidden lg:block", item.className].join(" ")}
                        sizes="230px"
                        aria-hidden
                      />
                    ))
                  : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Page
──────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="relative min-h-screen w-full min-w-0 flex-1 bg-[#7ECFDF] text-[#444]">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-0">
        <DesktopFloatingApplyCta />

        {/* ── HERO ──────────────────────────────────── */}
        <section
          id="site-hero"
          className="relative min-h-dvh overflow-hidden rounded-none bg-[#7ECFDF] text-white shadow-none md:min-h-0 md:bg-[#6d9ecf]"
        >
          {/* Background slideshow */}
          <div className="absolute inset-0" aria-hidden>
            {HERO_SLIDESHOW_IMAGES.map((src, i) => (
              <div key={src} className={`hero-slide hero-slide-mobile-${i + 1}`}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 hidden w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.54)_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0)_72%)] md:block" />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.45)_100%)] md:hidden"
              aria-hidden
            />
          </div>

          {/* Mobile — 上 ロゴ / CTA、下 ナビ+SNS（デスクトップ左下と同じリンク） */}
          <div className="relative z-10 flex min-h-dvh flex-col justify-between p-5 pb-8 pt-6 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 shrink-0 -ml-[26px]">
                <Image
                  src="/ikebeji/White/sadokids_White_LOGO_3.png"
                  alt="佐渡Kids生き物調査隊"
                  width={940}
                  height={780}
                  priority
                  sizes="(max-width: 640px) 92vw, 720px"
                  className="h-[156px] w-auto max-w-[min(720px,92vw)] sm:h-[180px]"
                />
              </div>
              <MobileTourCta />
            </div>

            <div className="flex flex-col gap-7">
              <HeroSectionNav />
              <div className="flex items-end justify-start">
                <a
                  href="https://www.instagram.com/ikimono_sado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 text-white/90 transition hover:text-white"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop — ロゴとナビは HERO_DESKTOP_LEFT_COL で幅を揃え */}
          <div
            className="relative z-10 hidden flex-col justify-between p-14 md:flex"
            style={{ minHeight: HERO_DESKTOP_LEFT_COL.sectionMinHeight }}
          >
            {/* ファーストビューは Reveal しない（IO が効かない / opacity:0 のままになるケースを避ける） */}
            <div
              className="relative z-20 min-w-0 shrink-0 self-start"
              style={{
                maxWidth: HERO_DESKTOP_LEFT_COL.maxWidth,
                minHeight: HERO_DESKTOP_LEFT_COL.logoBoxMinHeight,
                marginLeft: HERO_DESKTOP_LEFT_COL.marginLeft,
                marginTop: HERO_DESKTOP_LEFT_COL.marginTop,
              }}
            >
              <Image
                src="/ikebeji/White/sadokids_White_LOGO_3.png"
                alt="佐渡Kids生き物調査隊"
                width={940}
                height={780}
                priority
                sizes={HERO_DESKTOP_LEFT_COL.maxWidth}
                className="block max-w-full object-contain object-left"
                style={{
                  width: HERO_DESKTOP_LEFT_COL.logoWidth,
                  height: HERO_DESKTOP_LEFT_COL.logoHeight,
                }}
              />
            </div>

            <div
              className="flex w-full flex-col gap-7 pt-8"
              style={{ maxWidth: HERO_DESKTOP_LEFT_COL.maxWidth }}
            >
              <DesktopSectionNavFollow />
              <a
                href="https://www.instagram.com/ikimono_sado"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 text-white/90 transition hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="h-9 w-9"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <div className="bg-white">
          <AboutCollage />
          <PlaceSection />
        </div>

        {/* ── USE CASE ──────────────────────────────── */}
        <section className="relative w-full min-w-0 overflow-hidden bg-white">
          <div className="w-full overflow-hidden rounded-t-[32px] bg-[rgb(111,174,202)] md:rounded-t-[48px]">
            <UseCasePanel id="usecase" density="default" embeddedBackdrop={false} />
          </div>
        </section>

        {/* ── STAFF ─────────────────────────────────── */}
        <section
          id="staff"
          className="bg-white px-5 py-20 md:px-10 md:py-24"
        >
          <div className="mx-auto max-w-[1540px] text-center">
            <p className="font-inter text-[16px] tracking-[0.16em] text-[#999] md:text-[15px]">
              Staff
            </p>
            <h2 className="mt-3 text-[30px] font-medium leading-[1.15] tracking-[0.08em] text-[#006B2B] md:text-[46px]">
              スタッフ紹介
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[15px] font-medium leading-[1.85] tracking-[0.1em] text-[#444]/85 md:mt-6">
              佐渡Kids生きもの調査隊を一緒に支えるスタッフをご紹介します。
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[1540px] md:mt-16">
            <StaffMarquee />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────── */}
        <FaqSection />

        {/* ── FOOTER ─────────────────────────────────── */}
        <footer className="rounded-none bg-white px-5 pb-[120px] pt-10 text-[#222] sm:pb-24 md:px-10">
          <div className="mx-auto flex max-w-[1540px] flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-0">
                <div className="flex min-h-0 w-full items-center justify-center md:flex-1 md:basis-0 md:justify-end md:pr-6 lg:pr-10">
                  <Image
                    src="/ikebeji/White/sadokids_rogo_symbol_LOGO_3.png"
                    alt="佐渡Kids生きもの調査隊"
                    width={940}
                    height={780}
                    className="h-auto w-[min(100%,280px)] md:w-[260px] lg:w-[320px]"
                  />
                </div>
                <div
                  className="hidden h-[7.5rem] w-[2px] shrink-0 self-center rounded-full bg-[#dadada] md:block"
                  aria-hidden
                />
                <div className="flex min-h-0 w-full max-w-[400px] flex-col items-center justify-center gap-2.5 text-center text-[15px] leading-relaxed tracking-[0.06em] text-[#2B6FA8] md:max-w-none md:flex-1 md:basis-0 md:items-center md:text-center md:pl-6 lg:pl-10">
                  <p className="font-semibold tracking-[0.12em]">お問い合わせ</p>
                  <p className="text-center text-[14px] leading-snug tracking-[0.08em]">
                    運営事務局　株式会社naco 「
                    <a
                      href="https://www.ikevege.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit underline-offset-2 transition hover:underline"
                    >
                      イケベジ
                    </a>
                    」
                  </p>
                  <a
                    href="tel:05036345251"
                    className="inline-flex flex-wrap items-center justify-center gap-2 break-all text-center transition hover:underline"
                  >
                    <svg
                      className="h-[1.1em] w-[1.1em] shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <rect x="6" y="3" width="12" height="18" rx="2" />
                      <path d="M10 18h4" />
                    </svg>
                    050-3634-5251
                  </a>
                  <a
                    href="mailto:contact@ikimono-sado.com"
                    className="inline-flex flex-wrap items-center justify-center gap-2 break-all text-center transition hover:underline"
                  >
                    <svg
                      className="h-[1.1em] w-[1.1em] shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 5 9-5" />
                    </svg>
                    contact@ikimono-sado.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center md:items-end md:text-right">
                <a
                  href="#"
                  className="px-[15px] text-[14px] tracking-[0.16em] text-[#444] transition hover:text-[#111] hover:underline"
                >
                  プライバシーポリシー
                </a>
              </div>
            </div>
            <p className="mx-auto w-full max-w-[520px] text-center text-[10px] leading-[1.7] tracking-[0.08em] text-[#aaa] md:whitespace-nowrap md:text-[11px]">
              © 2026 株式会社naco 「イケベジ」。当サイトに掲載する文章・写真・イラストなどの無断転載を禁じます。
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
