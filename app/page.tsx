import Image from "next/image";
import MobileTourCta from "@/app/components/MobileTourCta";
import Reveal from "@/app/components/reveal";
import UseCasePanel from "@/app/components/UseCasePanel";

/* ────────────────────────────────────────────
   Data
──────────────────────────────────────────── */
const aboutImages = [
  "/figma-assets/about-1-29782b.png",
  "/figma-assets/about-2-37e68f.png",
  "/figma-assets/about-3-56586a.png",
  "/figma-assets/about-4-56586a.png",
  "/figma-assets/about-5-3de823.png",
  "/figma-assets/about-6-1b0fae.png",
];

const placeCards = [
  {
    floor: "1st floor",
    jpFloor: "1階",
    title: "A Living Space",
    description:
      "You can use an open shared kitchen and living area with free access. There's also a drink station and a community board, with regular events held here.",
    image: "/figma-assets/place-1-529e19.png",
  },
  {
    floor: "2nd floor",
    jpFloor: "2階",
    title: "A Co-working Space",
    description:
      "A tatami-floored workspace designed for focused work or reading. When you're tired, you can take a break on the tatami. The space is equipped with Wi-Fi, power outlets, a printer, and bookshelves.",
    image: "/figma-assets/place-2-530e32.png",
  },
  {
    floor: "3rd floor",
    jpFloor: "3階",
    title: "A Private Room with a Balcony",
    description:
      "A six-tatami-mat private room with balcony for rent. Perfect for online meetings or an afternoon nap. From the balcony, you can enjoy views of Mt. Fuji and the sunset beyond the bathhouse rooftops.",
    image: "/figma-assets/place-3-49dba7.png",
  },
];

const newsCards = [
  {
    title:
      "現役大学生スタッフが考える、小杉湯となりで働く魅力とは？【3/20まで求人募集中】",
    image: "/figma-assets/news-1-d53795.png",
  },
  {
    title: "小杉湯となりを一緒に育ててくれる〈店長候補&店舗スタッフ〉を募集します！",
    image: "/figma-assets/news-2-d53795.png",
  },
  {
    title: "小杉湯となり会員のみなさんへ",
    image: "/figma-assets/news-3-d53795.png",
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
            <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#444]">
              Place
            </p>
            <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-[#444] md:text-[46px]">
              建物について
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 md:gap-32">
          {placeCards.map((card, index) => (
            <Reveal
              key={card.floor}
              delay={index * 80}
              variant={index % 2 === 0 ? "left" : "right"}
            >
              <article className="grid items-center gap-10 md:gap-16 lg:grid-cols-2">
                <div
                  className={[
                    "card-interactive overflow-hidden rounded-[24px]",
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
                    "space-y-5",
                    index % 2 !== 0 ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  <div className="space-y-1">
                    <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#444]">
                      {card.floor}
                    </p>
                    <p className="text-[32px] leading-none tracking-[0.08em] text-[#444]">
                      {card.jpFloor}
                    </p>
                  </div>
                  <h3 className="text-[22px] leading-[1.4] tracking-[0.12em] text-[#444] md:text-[26px]">
                    {card.title}
                  </h3>
                  <p className="max-w-[560px] text-[16px] leading-[2] tracking-[0.12em] text-[#444]">
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
              <div className="flex flex-col gap-6">
                <a href="#usecase" className="nav-link block border-l-[3px] border-[#FB876D] pl-3">
                  <p className="text-[15px] leading-snug tracking-[0.08em]">日常的に使いたい</p>
                  <p className="mt-1 text-[11px] tracking-[0.14em] text-white/75">会員利用</p>
                </a>
                <a href="#usecase" className="nav-link block border-l-[3px] border-[#9ec5e8] pl-3">
                  <p className="text-[15px] leading-snug tracking-[0.08em]">ふらっと使いたい</p>
                  <p className="mt-1 text-[11px] tracking-[0.14em] text-white/75">都度利用</p>
                </a>
                <a
                  href="#access"
                  className="nav-link text-[13px] leading-relaxed tracking-[0.1em] text-white/95"
                >
                  視察・間貸・講演 / お問い合わせ
                </a>
              </div>

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
                <div className="text-right">
                  <p className="font-inter text-[10px] uppercase tracking-[0.14em] text-white/55">
                    SNS
                  </p>
                  <Image
                    src="/figma-assets/footer-social.svg"
                    alt=""
                    width={220}
                    height={21}
                    className="ml-auto mt-2 h-auto w-[108px] invert"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="relative z-10 hidden min-h-[880px] flex-col justify-start p-16 md:flex">
            <div className="flex items-start justify-between">
              <Reveal className="flex max-w-[270px] flex-col gap-12" delay={80}>
                <Image
                  src="/figma-assets/logo.svg"
                  alt="Kosugiyu Tonari"
                  width={230}
                  height={280}
                  priority
                  className="h-auto w-[230px]"
                />
                <div className="flex flex-col gap-6 text-white/90">
                  <div className="space-y-4">
                    <a href="#usecase" className="nav-link block">
                      <p className="text-[18px] leading-none tracking-[0.12em]">
                        As usual use
                      </p>
                      <p className="mt-2 text-[12px] leading-none tracking-[0.14em]">
                        Membership use
                      </p>
                    </a>
                    <a href="#usecase" className="nav-link block">
                      <p className="text-[18px] leading-none tracking-[0.12em]">
                        On weekend use
                      </p>
                      <p className="mt-2 text-[12px] leading-none tracking-[0.14em]">
                        Drop in use
                      </p>
                    </a>
                  </div>
                  <a
                    href="#access"
                    className="nav-link text-[14px] tracking-[0.16em] text-white/90"
                  >
                    About Site Visits / Contact us
                  </a>
                </div>
              </Reveal>

              <Reveal
                className="flex flex-col items-end gap-5"
                delay={180}
                variant="right"
              >
                <nav className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-[14px] tracking-[0.16em] text-white/90">
                  <a href="#about" className="nav-link">
                    About
                  </a>
                  <a href="#place" className="nav-link">
                    Place
                  </a>
                  <a href="#stories" className="nav-link">
                    News
                  </a>
                  <a href="#access" className="nav-link">
                    Access
                  </a>
                  <span className="font-inter">JA / EN</span>
                </nav>
                <div className="flex items-center gap-6">
                  <span className="text-[14px] tracking-[0.16em] text-white/80">SNS</span>
                  <Image
                    src="/figma-assets/footer-social.svg"
                    alt="Social links"
                    width={220}
                    height={21}
                    className="h-auto w-[120px] invert"
                  />
                </div>
                <ArrowLink href="#access" label="About Facilities Tours" />
              </Reveal>
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {aboutImages.map((image, index) => (
                <Reveal key={image} delay={index * 80} className="h-full">
                  <div
                    className={[
                      "card-interactive overflow-hidden rounded-[24px]",
                      index % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]",
                    ].join(" ")}
                  >
                    <Image
                      src={image}
                      alt=""
                      width={640}
                      height={640}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="flex flex-col justify-center" delay={120} variant="right">
              <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#444]">
                about &quot;kosugiyu tonari&quot;
              </p>
              <h2 className="mt-3 text-[32px] leading-[1.12] tracking-[0.08em] text-[#444] md:text-[46px]">
                小杉湯となり とは
              </h2>
              <p className="mt-8 max-w-[680px] text-[16px] leading-[2] tracking-[0.12em] text-[#444]">
                Kosugiyu-Tonari is a shared space with access to a public bath,
                located next to Kosugiyu. On weekdays it serves as a co-working
                and living space, and on weekends as a cafe. You can relax after
                a bath, work, or enjoy a meal — You can use like a &quot;second home.&quot;
              </p>
            </Reveal>
          </div>
        </section>

        <PlaceSection />

        {/* ── USE CASE ──────────────────────────────── */}
        <section className="relative overflow-hidden rounded-[32px] shadow-[0_32px_100px_-24px_rgba(30,55,90,0.14)]">
          <UseCasePanel id="usecase" card="all" density="default" />
        </section>

        {/* ── STORIES ───────────────────────────────── */}
        <section
          id="stories"
          className="rounded-[32px] bg-[#fafafa] px-5 py-20 shadow-[0_28px_90px_-22px_rgba(30,55,90,0.12)] md:px-10 md:py-24"
        >
          <div className="mx-auto max-w-[1540px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#FB876D]">
                  News and Stories
                </p>
                <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-[#444] md:text-[46px]">
                  お知らせ・読みもの
                </h2>
              </div>
              <a
                href="#stories"
                className="arrow-link inline-flex items-center gap-3 text-[14px] tracking-[0.16em] text-[#444]"
              >
                <span>read all articles</span>
                <ArrowIcon />
              </a>
            </div>

            <div className="mt-14 grid gap-6 xl:grid-cols-3">
              {newsCards.map((card) => (
                <article
                  key={card.title}
                  className="card-interactive h-full overflow-hidden rounded-[28px] bg-white text-[#444] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={592}
                    height={419}
                    className="h-auto w-full object-cover"
                  />
                  <div className="space-y-6 px-6 py-7">
                    <h3 className="text-[20px] leading-[1.7] tracking-[0.08em] text-[#444]">
                      {card.title}
                    </h3>
                    <a
                      href="#access"
                      className="arrow-link inline-flex items-center gap-3 text-[14px] tracking-[0.16em] text-[#4d84c5]"
                    >
                      <span>read more</span>
                      <ArrowIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPAND TO TOWN ─────────────────────────── */}
        <section className="rounded-t-[40px] bg-white px-5 py-20 shadow-[0_32px_100px_-24px_rgba(30,55,90,0.12)] md:px-10 md:py-24">
          <div className="mx-auto max-w-[1540px]">
            <div>
              <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#444]">
                expand to town
              </p>
              <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-[#444] md:text-[46px]">
                まちにひらかれたくらし
              </h2>
            </div>

            <div className="mt-14 grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[28px] bg-white p-2">
                <Image
                  src="/figma-assets/town-illustration.svg"
                  alt="Expand to town illustration"
                  width={900}
                  height={900}
                  className="h-auto w-full"
                />
              </div>

              <div className="space-y-8">
                <p className="max-w-[760px] text-[16px] leading-[2.2] tracking-[0.12em] text-[#444]">
                  Kosugiyu Tonari also operates a bathhouse apartment complex using vacant
                  houses in the surrounding area. The bath is at Kosugiyu, the study and
                  kitchen are at Kosugiyu Tonari, and the bedroom is in the bathhouse
                  apartment, offering a lifestyle where you can enjoy the entire
                  neighborhood like your home. In addition to Koenji, we also collaborate
                  with the guesthouse &quot;Kosugiyu Tonari - Villa&quot; in Nagano, and bathhouses
                  like &quot;Utopia Shiratama Onsen&quot; and &quot;Kosugiyu Harajuku&quot; in Osaka, helping to
                  spread the bathhouse lifestyle across the country.
                </p>

                <div className="card-interactive rounded-[28px] bg-[#f8f8f8] p-8 md:p-12">
                  <h3 className="text-[28px] leading-[1.35] tracking-[0.08em] text-[#444]">
                    「銭湯ぐらし」について
                  </h3>
                  <p className="mt-6 max-w-[720px] text-[16px] leading-[2.1] tracking-[0.12em] text-[#444]">
                    The company that operates Kosugiyu Tonari and the bathhouse apartments is
                    called &quot;Sento Gurashi&quot;. The team members were originally regulars at the
                    bathhouse who once lived in the no-bath apartments next door. If you would
                    like to learn more about the company, start here.
                  </p>
                  <div className="mt-10 flex flex-col gap-4 md:flex-row">
                    <ArrowLink href="https://sentogurashi.jp/" label="銭湯ぐらし公式サイト" light />
                    <ArrowLink href="#access" label="見学のお申し込み" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAP & ACCESS ───────────────────────────── */}
        <section
          id="access"
          className="relative overflow-hidden rounded-[32px] bg-[#568CBE] px-5 py-20 text-white shadow-[0_32px_100px_-24px_rgba(25,55,95,0.28)] md:px-10 md:py-24"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
            <Image
              src="/figma-assets/footer-bg-5c67b6.png"
              alt=""
              fill
              sizes="100vw"
              className="pointer-events-none object-cover opacity-10"
            />
          </div>
          <div className="relative mx-auto max-w-[1540px]">
            <div>
              <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-white/80">
                Map and Access
              </p>
              <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-white md:text-[46px]">
                地図・アクセス
              </h2>
            </div>
            <div className="mt-14 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-[28px] border border-white/20 bg-white">
                <iframe
                  title="Kosugiyu Tonari Map"
                  src="https://www.google.com/maps?q=3-32-16-2%20Koenji%20Kita%2C%20Suginami-ku%2C%20Tokyo&z=16&output=embed"
                  className="h-[560px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-col justify-between gap-8 rounded-[28px] bg-white/10 p-8 backdrop-blur-sm md:p-10">
                <div className="space-y-6">
                  <p className="text-[16px] leading-[2.1] tracking-[0.12em]">
                    Hours: 9:00 AM - 10:00 PM (Closed on Thursdays)
                    <br />
                    Location: 5-minute walk from JR Chuo Line{" "}
                    &quot;Koenji Station&quot;
                    <br />
                    Address: 3-32-16-2, Koenji North, Suginami-ku, Tokyo, 166-0002
                  </p>
                  <div>
                    <p className="text-[16px] leading-[2] tracking-[0.12em]">
                      For international guests (non-Japanese speakers):
                    </p>
                    <p className="mt-3 text-[14px] leading-[2] tracking-[0.1em] text-white/90 md:text-[16px]">
                      We warmly welcome everyone who&apos;s interested in us! Please
                      understand that not all of our staff speak English
                      fluently yet, but we&apos;re doing our best to assist you.
                      Thank you so much for your kind understanding!
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <ArrowLink href="#about" label="Home" light />
                  <ArrowLink href="#access" label="見学のお申し込み" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────── */}
        <footer className="rounded-[32px] bg-gray-900 px-5 py-10 text-white sm:pb-24 md:px-10">
          <div className="mx-auto flex max-w-[1540px] flex-col items-center gap-14">
            <Image
              src="/figma-assets/footer-social.svg"
              alt=""
              width={220}
              height={21}
              className="h-auto w-[220px] opacity-90 invert"
            />
            <div className="flex flex-col items-center gap-4 text-center">
              <a
                href="#access"
                className="text-[14px] tracking-[0.16em] text-white/80 transition hover:text-white hover:underline"
              >
                プライバシーポリシー
              </a>
              <p className="font-inter text-[14px] tracking-[0.16em] text-white/50">
                2026 sentogurashi inc.
              </p>
            </div>
            <Image
              src="/figma-assets/footer-badge.svg"
              alt="Kosugiyu Tonari"
              width={238}
              height={87}
              className="h-auto w-[180px] opacity-90 invert md:w-[238px]"
            />
          </div>
        </footer>

      </div>
    </main>
  );
}
