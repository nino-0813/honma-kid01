import Image from "next/image";
import MobileTourCta from "@/app/components/MobileTourCta";
import Reveal from "@/app/components/reveal";
import FaqSection from "@/app/components/FaqSection";
import StaffMarquee from "@/app/components/StaffMarquee";
import UseCasePanel from "@/app/components/UseCasePanel";

/* ────────────────────────────────────────────
   Data
──────────────────────────────────────────── */
/** #place — キッズ・調査隊の雰囲気を伝える説明ブロック（文言は仮） */
const kidsAboutCards = [
  {
    phaseEn: "nature",
    phaseJp: "自然の中で",
    title: "外のフィールドが、いちばんの教室",
    description:
      "佐渡の田んぼや水路、湿地をゆっくり歩きながら、生きもののすみかやあとを観察します。ネットや観察ノートで、見つけたものを写真やスケッチに残していきます。安全に楽しむための服装や持ち物は、開催前にお知らせします。",
    image: "/figma-assets/usecase-1-23bd32.png",
  },
  {
    phaseEn: "together",
    phaseJp: "みんなと一緒に",
    title: "スタッフや仲間と話しながら、「わからない」を楽しむ",
    description:
      "図鑑やアプリを手に、名前や特徴を調べたり、「なぜここにいるの？」を話し合ったりします。正解を急がず、子どものペースで進めます。初めての子も、生きものが好きな子も、それぞれの見え方を尊重します。",
    image: "/figma-assets/usecase-2-d783d7.png",
  },
  {
    phaseEn: "next",
    phaseJp: "つぎにつなげて",
    title: "記録や発表を通して、次の「見たい」につなげる",
    description:
      "季節ごとに写真やメモをそろえ、隊員同士で簡単に発表する時間ももちます。うまくまとまらなくても大丈夫。次のテーマや調査へつなげていきます。参加費や対象年齢などの詳細は、決まり次第お知らせ予定です。",
    image: "/figma-assets/usecase-3-48e433.png",
  },
];

/* ────────────────────────────────────────────
   Shared components
──────────────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

function ArrowLink({
  href,
  label,
  light = false,
}: {
  href: string;
  label: string;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "button-chip inline-flex items-center justify-center gap-4 rounded-full px-7 py-4 text-[14px] tracking-[0.16em] transition-all duration-300",
        light
          ? "border border-[#7ba6d9] bg-white text-[#4d84c5] hover:bg-[#f5faff]"
          : "bg-[#FB876D] text-white hover:bg-[#f0745a]",
      ].join(" ")}
    >
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}

function PlaceSection({ id = "place", className = "" }: { id?: string; className?: string }) {
  return (
    <section
      id={id}
      className={[
        "relative z-10 rounded-[32px] bg-white px-5 py-20 shadow-[0_32px_100px_-24px_rgba(30,55,90,0.14)] md:px-10 md:py-24",
        className,
      ]
        .join(" ")
        .trim()}
    >
      <div className="mx-auto max-w-[1540px]">
        <Reveal>
          <div>
            <p className="font-inter text-[16px] lowercase tracking-[0.16em] text-[#444]">
              kids
            </p>
            <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[46px] lg:text-[#444]">
              キッズのみなさんへ
            </h2>
            <p className="mt-4 max-w-[720px] text-[15px] leading-[1.85] tracking-[0.1em] text-[#444]/85">
              佐渡Kids生き物調査隊は、田んぼや水辺などのフィールドで生きものと出会い、仲間と学び合う場です。ここでは「どんな時間を過ごすのか」を、三つの視点でご紹介します。日程や参加方法の詳細は、決まり次第このページでお知らせします。
            </p>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 md:gap-32">
          {kidsAboutCards.map((card, index) => (
            <Reveal
              key={card.phaseEn}
              delay={index * 80}
              variant={index % 2 === 0 ? "left" : "right"}
            >
              <article className="grid items-start gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
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
                    index % 2 !== 0 ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {/* スマホ: 画像下に「大ラベル + 小ラベル」→ 区切り線 → キャッチ → 本文 */}
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
                      <p className="text-[28px] leading-none tracking-[0.08em] text-[#444] md:text-[32px]">
                        {card.phaseJp}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-[18px] font-semibold leading-[1.5] tracking-[0.08em] text-[#444] lg:text-[24px] lg:font-normal lg:leading-[1.45] lg:tracking-[0.1em]">
                    {card.title}
                  </h3>
                  <p className="max-w-[560px] text-[15px] leading-[1.85] tracking-[0.1em] text-[#444]/85 lg:text-[16px] lg:leading-[2] lg:tracking-[0.12em] lg:text-[#444]">
                    {card.description}
                  </p>
                </div>
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
    <main className="relative min-h-screen bg-[#e8edf5] text-[#444]">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-6 px-4 py-6 md:px-6">

        {/* ── HERO ──────────────────────────────────── */}
        <section
          id="site-hero"
          className="relative min-h-dvh overflow-hidden rounded-[32px] bg-[#6d9ecf] text-white shadow-[0_36px_120px_-28px_rgba(25,55,95,0.35)] md:min-h-0 md:rounded-[24px]"
        >
          {/* Background slideshow */}
          <div className="absolute inset-0">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`hero-slide hero-slide-${index}`}
                aria-hidden="true"
              >
                <Image
                  src={`/figma-assets/hero-${index}-65a613.png`}
                  alt=""
                  fill
                  priority={index === 1}
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

          {/* Mobile — 参考モック: 上 タイトル+ロゴ / CTA、下 ナビ+言語・SNS */}
          <div className="relative z-10 flex min-h-dvh flex-col justify-between p-5 pb-8 pt-6 md:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-2">
                <p className="shrink-0 pt-0.5 text-[13px] font-medium leading-snug tracking-[0.18em] [writing-mode:vertical-rl]">
                  小杉湯となり
                </p>
                <div className="min-w-0">
                  <Image
                    src="/figma-assets/logo.svg"
                    alt="Kosugiyu Tonari"
                    width={230}
                    height={280}
                    priority
                    className="h-auto w-[76px]"
                  />
                  <p className="mt-2 font-inter text-[8px] tracking-[0.22em] text-white/90">
                    KOSUGIYU TONARI
                  </p>
                </div>
              </div>
              <MobileTourCta />
            </div>

            <div className="flex flex-col gap-7">
              <nav aria-label="ページ内セクション" className="flex flex-col gap-2.5">
                <a
                  href="#about"
                  className="nav-link block border-l-[2px] border-[#FB876D] py-0.5 pl-2.5"
                >
                  <span className="text-[11px] leading-snug tracking-[0.08em] text-white/95">
                    佐渡Kids生き物調査隊とは
                  </span>
                </a>
                <a
                  href="#place"
                  className="nav-link block border-l-[2px] border-[#9ec5e8] py-0.5 pl-2.5"
                >
                  <span className="text-[11px] leading-snug tracking-[0.08em] text-white/95">
                    キッズのみなさんへ
                  </span>
                </a>
                <a
                  href="#usecase"
                  className="nav-link block border-l-[2px] border-[#FB876D] py-0.5 pl-2.5"
                >
                  <span className="text-[11px] leading-snug tracking-[0.08em] text-white/95">
                    年間プログラム
                  </span>
                </a>
                <a
                  href="#staff"
                  className="nav-link block border-l-[2px] border-[#9ec5e8] py-0.5 pl-2.5"
                >
                  <span className="text-[11px] leading-snug tracking-[0.08em] text-white/95">
                    スタッフ紹介
                  </span>
                </a>
                <a
                  href="#faq"
                  className="nav-link block border-l-[2px] border-[#FB876D] py-0.5 pl-2.5"
                >
                  <span className="text-[11px] leading-snug tracking-[0.08em] text-white/95">
                    よくある質問
                  </span>
                </a>
              </nav>

              <div className="flex items-end justify-between gap-4 border-t border-white/25 pt-6">
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-[0.14em] text-white/55">
                    language
                  </p>
                  <p className="mt-1.5 text-[12px] tracking-[0.12em]">
                    <span className="underline decoration-white/80 underline-offset-4">JA</span>
                    <span className="text-white/60"> / </span>
                    <span className="text-white/70">EN</span>
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/"
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

          {/* Desktop */}
          <div className="relative z-10 hidden min-h-[880px] flex-col justify-between p-16 md:flex">
            <div className="flex items-start justify-between gap-8">
              <Reveal className="flex max-w-[270px] flex-col" delay={80}>
                <Image
                  src="/figma-assets/logo.svg"
                  alt="Kosugiyu Tonari"
                  width={230}
                  height={280}
                  priority
                  className="h-auto w-[230px]"
                />
              </Reveal>

              <Reveal
                className="flex shrink-0 flex-col items-end"
                delay={180}
                variant="right"
              >
                <ArrowLink href="#faq" label="お申し込み" />
              </Reveal>
            </div>

            <div className="flex items-end">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-white/90 transition hover:text-white"
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

        {/* ── ABOUT ──────────────────────────────────── */}
        <section
          id="about"
          className="relative overflow-hidden rounded-[32px] bg-white px-5 py-20 shadow-[0_32px_100px_-24px_rgba(30,55,90,0.14)] md:px-10 md:py-24"
        >
          <Image
            src="/figma-assets/about-accent-1.svg"
            alt=""
            width={298}
            height={139}
            className="absolute left-[52%] top-16 hidden h-auto w-[260px] -translate-x-1/2 md:block"
          />
          <Image
            src="/figma-assets/about-accent-2.svg"
            alt=""
            width={230}
            height={196}
            className="absolute bottom-16 left-14 hidden h-auto w-[180px] md:block"
          />
          <Image
            src="/figma-assets/about-accent-3.svg"
            alt=""
            width={144}
            height={214}
            className="absolute bottom-20 right-10 hidden h-auto w-[120px] md:block"
          />
          <div className="mx-auto grid max-w-[1540px] gap-16 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <figure className="relative overflow-hidden rounded-[28px] bg-[#eef2f7] shadow-[0_28px_80px_-28px_rgba(30,55,90,0.22)] ring-1 ring-black/[0.06]">
                <Image
                  src="/figma-assets/スクリーンショット 2026-04-03 14.03.42.png"
                  alt="佐渡Kids 生きもの調査隊 — 遊んで学んで体験する"
                  width={2112}
                  height={1592}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              </figure>
            </Reveal>

            <Reveal className="flex flex-col justify-center" delay={120} variant="right">
              <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#444]">
                about the program
              </p>
              <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[46px] lg:text-[#444]">
                佐渡Kids生き物調査隊とは
              </h2>
              <p className="mt-4 max-w-[680px] text-[15px] leading-[1.85] tracking-[0.1em] text-[#444]/85 md:mt-8 md:text-[16px] md:leading-[2] md:tracking-[0.12em] md:text-[#444]">
                佐渡の田んぼや水辺をフィールドに、生きものたちと出会いながら観察・記録する子ども向けの野外プログラムです。季節ごとの調査テーマを決め、ネットや図鑑とあわせて「なぜ？」を一緒に掘り下げていきます。体験内容や日程は調整中のため、ここに載せている説明は仮のイメージです。正式な募集要項は追ってお知らせします。
              </p>
            </Reveal>
          </div>
        </section>

        <PlaceSection />

        {/* ── USE CASE ──────────────────────────────── */}
        <section className="relative overflow-hidden rounded-[32px] shadow-[0_32px_100px_-24px_rgba(30,55,90,0.14)]">
          <UseCasePanel id="usecase" density="default" />
        </section>

        {/* ── STAFF ─────────────────────────────────── */}
        <section
          id="staff"
          className="rounded-t-[40px] bg-white px-5 py-20 shadow-[0_32px_100px_-24px_rgba(30,55,90,0.12)] md:px-10 md:py-24"
        >
          <div className="mx-auto max-w-[1540px] text-center">
            <p className="font-inter text-[16px] lowercase tracking-[0.16em] text-[#999] md:text-[15px]">
              staff
            </p>
            <h2 className="mt-3 text-[30px] font-semibold leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[46px] md:font-bold md:text-[#222]">
              スタッフ紹介
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.85] tracking-[0.1em] text-[#444]/85 md:mt-6 md:text-[16px] md:leading-[1.9] md:tracking-[0.08em] md:text-[#444]">
              佐渡Kids生き物調査隊を一緒に支えるスタッフをご紹介します。（写真・プロフィールは仮です）
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[1540px] md:mt-16">
            <StaffMarquee />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────── */}
        <FaqSection />

        {/* ── FOOTER ─────────────────────────────────── */}
        <footer className="rounded-[32px] bg-white px-5 py-10 text-[#222] shadow-[0_28px_90px_-22px_rgba(30,55,90,0.12)] sm:pb-24 md:px-10">
          <div className="mx-auto flex max-w-[1540px] flex-col items-center gap-14">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-[#111] transition hover:text-[#444]"
              aria-label="Instagram"
            >
              <svg
                className="h-9 w-9 md:h-10 md:w-10"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <div className="flex flex-col items-center gap-4 text-center">
              <a
                href="#"
                className="text-[14px] tracking-[0.16em] text-[#444] transition hover:text-[#111] hover:underline"
              >
                プライバシーポリシー
              </a>
              <p className="font-inter text-[14px] tracking-[0.16em] text-[#888]">
                2026 佐渡Kids生き物調査隊
              </p>
            </div>
            <Image
              src="/figma-assets/スクリーンショット 2026-04-03 14.37.34.png"
              alt="佐渡Kids生きもの調査隊"
              width={332}
              height={114}
              className="h-auto w-[min(100%,280px)] md:w-[320px]"
            />
          </div>
        </footer>

      </div>
    </main>
  );
}
