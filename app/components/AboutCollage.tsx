"use client";

import Image from "next/image";
import Reveal from "@/app/components/reveal";

const ABOUT_KICKER = "about the program";
const ABOUT_TITLE = "佐渡Kids生き物調査隊とは";
/** モバイル about 見出しの改行（1行目＋2行目＝ `ABOUT_TITLE` と同じ読み） */
const ABOUT_TITLE_MOBILE_LINES = ["佐渡Kids生き物", "調査隊とは"] as const;
/** モバイル about 見出し周りの手描きアイコン（`public/ikebeji`） */
const ABOUT_MOBILE_TITLE_DECOR = {
  cloud: "/ikebeji/sadokids_png_Black_cloud 1.png",
  crab: "/ikebeji/sadokids_png_Black_crab.png",
  net: "/ikebeji/sadokids_png_Black_insect net.png",
} as const;

/** 下段実写エリア（3枚写真の周り）の手描き装飾 — `boxClass` は位置・静的回転、`motionClass` は内側ラッパーのループアニメ */
const ABOUT_LOWER_DECOR_ICONS = [
  {
    src: "/ikebeji/sadokids_png_Black_snake.png",
    boxClass:
      "left-0 top-[1%] h-[68px] w-[68px] -translate-x-0.5 -rotate-[26deg] sm:left-[1%] sm:top-[2%] sm:h-[82px] sm:w-[82px] sm:-rotate-[22deg]",
    motionClass: "about-decor-sway",
    delayClass: "",
  },
  {
    src: "/ikebeji/sadokids_png_Black_insect 2.png",
    boxClass:
      "right-[2%] top-[4%] h-[52px] w-[52px] rotate-[18deg] sm:h-[60px] sm:w-[60px] sm:rotate-[14deg]",
    motionClass: "about-decor-bob",
    delayClass: "",
  },
  {
    src: "/ikebeji/sadokids_png_Black_insect cage.png",
    boxClass:
      "bottom-[6%] left-[0%] h-[58px] w-[58px] -rotate-[10deg] sm:bottom-[8%] sm:left-[1%] sm:h-[68px] sm:w-[68px]",
    motionClass: "about-decor-sway",
    delayClass: "about-decor-delay-sm",
  },
  {
    src: "/ikebeji/sadokids_png_Black_leaves 3.png",
    boxClass:
      "left-[8%] top-[36%] h-[44px] w-[44px] rotate-[24deg] sm:left-[10%] sm:top-[40%] sm:h-[52px] sm:w-[52px]",
    motionClass: "about-decor-rock",
    delayClass: "about-decor-delay-md",
  },
  {
    src: "/ikebeji/sadokids_png_Black_lizard.png",
    boxClass:
      "right-[14%] bottom-[10%] h-[54px] w-[54px] -rotate-[20deg] sm:right-[12%] sm:bottom-[12%] sm:h-[62px] sm:w-[62px]",
    motionClass: "about-decor-sway",
    delayClass: "about-decor-delay-lg",
  },
] as const;
const ABOUT_BODY =
  "佐渡の田んぼや水辺をフィールドに、生きものたちと出会いながら観察・記録する子ども向けの野外プログラムです。季節ごとの調査テーマを決め、ネットや図鑑とあわせて「なぜ？」を一緒に掘り下げていきます。体験内容や日程は調整中のため、ここに載せている説明は仮のイメージです。正式な募集要項は追ってお知らせします。";

/** 上段コラージュ共通の実写3枚（モバイル配置は `ABOUT_MOBILE_COLLAGE_LAYERS`、デスクトップは `COLLAGE_IMAGES` で6枠に割当） */
const ABOUT_MOBILE_COLLAGE_PHOTOS = [
  { src: "/ikebeji/キッズ生き物調査隊-09.jpg", alt: "フィールドの様子" },
  { src: "/ikebeji/8_9 川の生きもの調査.jpg", alt: "水辺の観察" },
  { src: "/ikebeji/キッズ生き物調査隊-02.jpg", alt: "活動の記録" },
] as const;

const P = ABOUT_MOBILE_COLLAGE_PHOTOS;

/** モバイル下段3枚と同じファイル（デスクトップ大コラージュの一部枠で使用） */
const IKEBEJI_COLLAGE_17 = "/ikebeji/キッズ生き物調査隊-17.jpg";
const IKEBEJI_COLLAGE_18 = "/ikebeji/キッズ生き物調査隊-18.jpg";
const IKEBEJI_COLLAGE_37 = "/ikebeji/キッズ生き物調査隊-37.jpg";
const IKEBEJI_DEC_RICE_SALE = "/ikebeji/12月 お米販売.jpg";

/** デスクトップ Figma コラージュ6枠（`<CollagePhoto>` の参照順） */
const COLLAGE_IMAGES = [
  { src: IKEBEJI_COLLAGE_17, alt: "フィールドの様子" },
  { src: P[1].src, alt: P[1].alt },
  { src: IKEBEJI_DEC_RICE_SALE, alt: "活動の記録" },
  {
    src: IKEBEJI_COLLAGE_18,
    alt: "佐渡Kids 生きもの調査隊 — 遊んで学んで体験する",
  },
  { src: IKEBEJI_COLLAGE_37, alt: "仲間と学ぶ時間" },
  { src: P[2].src, alt: "発表やまとめ" },
] as const;

/**
 * モバイル（`lg:hidden`）上段コラージュ：`aspect-[390/760]` 内に写真3枚＋アイコン2つ。
 * `left` / `top` / `width` / `height` はコンテナに対する %。ここを編集して配置を変えられる。
 */
type AboutMobileCollagePhoto = {
  readonly kind: "photo";
  readonly src: string;
  readonly alt: string;
  readonly left: string;
  readonly top: string;
  readonly width: string;
  readonly height: string;
  readonly zIndex: number;
  readonly rotateDeg?: number;
  /** Next/Image `fill` の既定 inset(0) を上書きしてトリミング位置を調整 */
  readonly imageInset?: string;
  /**
   * `fill` は img に width/height を指定できないため、内側に relative ラッパーで枠寸法を与える。
   */
  readonly fillFrame?: { readonly width: string; readonly height: string };
  /** Next/Image の追加クラス（例: 角丸） */
  readonly imageClassName?: string;
};

type AboutMobileCollageIcon = {
  readonly kind: "icon";
  readonly src: string;
  readonly left: string;
  readonly top: string;
  /** 幅（コンテナ比）。高さは `aspectRatio` で決まる */
  readonly widthPct: string;
  readonly aspectRatio: string;
  readonly zIndex: number;
  readonly rotateDeg?: number;
};

type AboutMobileCollageLayer = AboutMobileCollagePhoto | AboutMobileCollageIcon;

const ABOUT_MOBILE_COLLAGE_LAYERS: readonly AboutMobileCollageLayer[] = [
  {
    kind: "photo",
    src: ABOUT_MOBILE_COLLAGE_PHOTOS[0].src,
    alt: ABOUT_MOBILE_COLLAGE_PHOTOS[0].alt,
    left: "50%",
    top: "5%",
    width: "223px",
    height: "167px",
    zIndex: 2,
    rotateDeg: 0,
    imageInset: "45px 0 0 -28px",
    fillFrame: { width: "182px", height: "240px" },
    imageClassName: "rounded-[12px]",
  },
  {
    kind: "photo",
    src: ABOUT_MOBILE_COLLAGE_PHOTOS[1].src,
    alt: ABOUT_MOBILE_COLLAGE_PHOTOS[1].alt,
    left: "3%",
    top: "28%",
    width: "156px",
    height: "207px",
    zIndex: 2,
    rotateDeg: 0,
    imageInset: "75px 0 0 -44px",
    imageClassName: "rounded-[12px]",
  },
  {
    kind: "photo",
    src: ABOUT_MOBILE_COLLAGE_PHOTOS[2].src,
    alt: ABOUT_MOBILE_COLLAGE_PHOTOS[2].alt,
    left: "36%",
    top: "54%",
    width: "223px",
    height: "167px",
    zIndex: 2,
    rotateDeg: 0,
    imageInset: "-22px 0 0 64px",
    imageClassName: "rounded-[12px]",
  },
  {
    kind: "icon",
    src: "/ikebeji/sadokids_png_Black_rice.png",
    left: "-1%",
    top: "12%",
    widthPct: "38%",
    aspectRatio: "298 / 139",
    zIndex: 4,
    rotateDeg: -8,
  },
  {
    kind: "icon",
    src: "/ikebeji/sadokids_png_Black_ちょうちょ.png",
    left: "34%",
    top: "44%",
    widthPct: "30%",
    aspectRatio: "144 / 214",
    zIndex: 4,
    rotateDeg: 10,
  },
];

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

function CollagePhoto({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  return (
    <div
      className={[
        "absolute overflow-hidden rounded-[10px] shadow-[0_8px_28px_-8px_rgba(30,55,90,0.14)] ring-1 ring-black/[0.04]",
        className,
      ].join(" ")}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
    </div>
  );
}

function AboutHeadingBlock({
  className = "",
  figmaDesktopCenter = false,
  /** モバイル：大見出し→英字サブ（参照モック順） */
  mobileTitleFirst = false,
}: {
  className?: string;
  figmaDesktopCenter?: boolean;
  mobileTitleFirst?: boolean;
}) {
  if (mobileTitleFirst) {
    return (
      <div className={["text-center", className].join(" ")}>
        <div className="relative mx-auto w-full px-10 pb-3 pt-8 sm:px-12 sm:pt-9">
          <div className="pointer-events-none absolute left-0 top-1 z-0 h-[54px] w-[54px] -translate-x-0.5 -translate-y-1 -rotate-[8deg] opacity-[0.88] sm:h-[64px] sm:w-[64px]">
            <div className="relative h-full w-full about-decor-bob">
              <Image
                src={ABOUT_MOBILE_TITLE_DECOR.cloud}
                alt=""
                width={120}
                height={120}
                className="h-full w-full object-contain"
                sizes="64px"
                aria-hidden
              />
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-3 z-0 h-[64px] w-[64px] translate-x-1 rotate-[16deg] opacity-[0.88] sm:top-4 sm:h-[76px] sm:w-[76px]">
            <div className="relative h-full w-full about-decor-sway about-decor-delay-sm">
              <Image
                src={ABOUT_MOBILE_TITLE_DECOR.net}
                alt=""
                width={120}
                height={120}
                className="h-full w-full object-contain"
                sizes="76px"
                aria-hidden
              />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 right-3 z-0 h-[50px] w-[50px] translate-y-2 -rotate-[12deg] opacity-[0.9] sm:h-[58px] sm:w-[58px]">
            <div className="relative h-full w-full about-decor-rock about-decor-delay-md">
              <Image
                src={ABOUT_MOBILE_TITLE_DECOR.crab}
                alt=""
                width={120}
                height={120}
                className="h-full w-full object-contain"
                sizes="58px"
                aria-hidden
              />
            </div>
          </div>
          <h2 className="relative z-[1] text-[clamp(19px,5.2vw,30px)] font-medium leading-[1.2] tracking-[0.05em] text-[#F7A89A]">
            <span className="block">{ABOUT_TITLE_MOBILE_LINES[0]}</span>
            <span className="block">{ABOUT_TITLE_MOBILE_LINES[1]}</span>
          </h2>
        </div>
        <p className="mt-2 font-inter text-[15px] lowercase tracking-[0.08em] text-[#222]">{ABOUT_KICKER}</p>
      </div>
    );
  }

  if (figmaDesktopCenter) {
    return (
      <div className={["text-center [&_p]:mx-auto [&_h2]:mx-auto", className].join(" ")}>
        <p className="font-inter text-[14px] lowercase tracking-[0.12em] text-[#FF8E7D]">{ABOUT_KICKER}</p>
        <h2 className="mt-2 text-[18px] font-medium leading-[1.35] tracking-[0.08em] text-[#FF8E7D] xl:text-[20px]">
          {ABOUT_TITLE}
        </h2>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-inter text-[16px] lowercase tracking-[0.16em] text-[#444]">{ABOUT_KICKER}</p>
      <h2 className="mt-3 text-[30px] font-medium leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[40px] xl:text-[46px]">
        {ABOUT_TITLE}
      </h2>
    </div>
  );
}

function AboutBodyText({
  className = "",
  compact = false,
  /** モバイル about 本文 */
  intro = false,
}: {
  className?: string;
  /** デスクトップコラージュ：本文を小さく・行間ゆったり */
  compact?: boolean;
  intro?: boolean;
}) {
  const sizeClasses = compact
    ? "text-[13px] leading-[2] tracking-[0.06em]"
    : intro
      ? "text-[15px] leading-[1.65] tracking-[0.08em]"
      : "text-[16px] leading-[2] tracking-[0.06em]";

  const introColor = intro ? "text-[#222]/90" : "text-[#444]/85";

  return <p className={[introColor, sizeClasses, className].join(" ")}>{ABOUT_BODY}</p>;
}

function AboutMobileCollageCanvas() {
  const layers = [...ABOUT_MOBILE_COLLAGE_LAYERS].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {layers.map((layer, i) => {
        const baseStyle = {
          left: layer.left,
          top: layer.top,
          zIndex: layer.zIndex,
          transform: layer.rotateDeg != null ? `rotate(${layer.rotateDeg}deg)` : undefined,
          transformOrigin: "center center" as const,
        };

        if (layer.kind === "photo") {
          const photoImage = (
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              className={["object-cover", layer.imageClassName].filter(Boolean).join(" ")}
              sizes="(max-width: 1024px) 48vw, 200px"
              style={{
                ...(layer.imageInset ? { inset: layer.imageInset } : {}),
                transform:
                  layer.rotateDeg != null && layer.rotateDeg !== 0
                    ? `rotate(${layer.rotateDeg}deg) scale(1.14)`
                    : "scale(1.14)",
                transformOrigin: "center center",
              }}
            />
          );

          return (
            <div
              key={`mobile-collage-${layer.src}-${i}`}
              className="absolute overflow-visible"
              style={{
                left: layer.left,
                top: layer.top,
                zIndex: layer.zIndex,
                width: layer.width,
                height: layer.height,
              }}
            >
              {layer.fillFrame ? (
                <div
                  className="relative"
                  style={{ width: layer.fillFrame.width, height: layer.fillFrame.height }}
                >
                  {photoImage}
                </div>
              ) : (
                photoImage
              )}
            </div>
          );
        }

        const decorMotion =
          layer.src.includes("rice") ? "about-decor-bob" : "about-decor-sway about-decor-delay-sm";

        return (
          <div
            key={`mobile-collage-${layer.src}-${i}`}
            className="pointer-events-none absolute"
            style={{
              ...baseStyle,
              width: layer.widthPct,
              aspectRatio: layer.aspectRatio,
            }}
            aria-hidden
          >
            <div className={`relative h-full w-full ${decorMotion}`}>
              <Image src={layer.src} alt="" fill className="object-contain" sizes="128px" />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function AboutCollage() {
  return (
    <section
      id="about"
      className="relative overflow-x-clip bg-transparent px-5 py-16 sm:pt-4 md:px-10 md:py-20 lg:overflow-visible lg:py-24"
    >
      {/* ── Mobile：上にコラージュ画像 → 見出し・本文 ── */}
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[390px]">
          <Reveal className="relative mx-auto aspect-[390/760] w-full overflow-visible bg-white" delay={80}>
            <AboutMobileCollageCanvas />
          </Reveal>

          <Reveal
            className="relative z-10 mx-auto -mt-20 mb-10 flex w-full max-w-[320px] flex-col items-center gap-8 text-center sm:-mt-24"
            delay={120}
          >
            <AboutHeadingBlock mobileTitleFirst className="w-full" />
            <AboutBodyText intro className="w-full text-left" />
          </Reveal>
        </div>
      </div>

      {/* ── Desktop: Figma node 1:94（1500×1000）座標 ── */}
      <div className="relative mx-auto hidden h-[1000px] w-full max-w-[1500px] lg:block">
        <CollagePhoto
          src={COLLAGE_IMAGES[0].src}
          alt={COLLAGE_IMAGES[0].alt}
          sizes="285px"
          className="left-[1.933%] top-[13.1%] z-[1] h-[37.9%] w-[19%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[3].src}
          alt={COLLAGE_IMAGES[3].alt}
          sizes="375px"
          className="left-[30.933%] top-[2.9%] z-[1] h-[28.1%] w-[25%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[1].src}
          alt={COLLAGE_IMAGES[1].alt}
          sizes="285px"
          className="left-[79.4%] top-[4.9%] z-[1] h-[38%] w-[19%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[2].src}
          alt={COLLAGE_IMAGES[2].alt}
          sizes="362px"
          className="left-[-1.6%] top-[65.2%] z-[1] h-[27.1%] w-[24.133%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[4].src}
          alt={COLLAGE_IMAGES[4].alt}
          sizes="413px"
          className="left-[40.067%] top-[70.2%] z-[1] h-[28.6%] w-[27.533%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[5].src}
          alt={COLLAGE_IMAGES[5].alt}
          sizes="380px"
          className="left-[79.4%] top-[60.4%] z-[1] h-[28.5%] w-[25.333%]"
        />

        <div className="pointer-events-none absolute left-[54.87%] top-[14.3%] z-[2] h-[13.9%] max-w-[19.87%]">
          <div className="about-decor-sway about-decor-delay-sm relative h-full w-max max-w-full">
            <Image
              src="/ikebeji/sadokids_png_Black_crab.png"
              alt=""
              width={298}
              height={298}
              sizes="200px"
              className="h-full w-auto max-w-full object-contain opacity-[0.9]"
              aria-hidden
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-[21.2%] top-[68.8%] z-[2] h-[19.6%] max-w-[15.33%]">
          <div className="about-decor-bob relative h-full w-max max-w-full">
            <Image
              src="/ikebeji/sadokids_png_Black_insect cage.png"
              alt=""
              width={230}
              height={196}
              sizes="160px"
              className="h-full w-auto max-w-full object-contain opacity-90"
              aria-hidden
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-[68.33%] top-[65.2%] z-[2] h-[21.4%] max-w-[9.6%]">
          <div className="about-decor-rock about-decor-delay-md relative h-full w-max max-w-full">
            <Image
              src="/ikebeji/sadokids_png_Black_flower 2.png"
              alt=""
              width={144}
              height={214}
              sizes="120px"
              className="h-full w-auto max-w-full object-contain opacity-90"
              aria-hidden
            />
          </div>
        </div>

        <Reveal
          className="absolute left-1/2 top-[42%] z-20 flex max-w-[520px] -translate-x-1/2 flex-row items-start gap-5 xl:max-w-[560px] xl:gap-6"
          delay={80}
        >
          <div className="w-[min(168px,42%)] shrink-0 xl:w-[180px]">
            <AboutHeadingBlock figmaDesktopCenter />
          </div>
          <AboutBodyText compact className="max-w-[270px] shrink-0 pt-0.5 xl:max-w-[300px]" />
        </Reveal>

        <div className="absolute bottom-6 right-4 z-20 xl:bottom-10 xl:right-8">
          <Reveal delay={160} variant="right">
            <a
              href="#faq"
              className="button-chip inline-flex items-center justify-center gap-4 rounded-[14px] bg-[#FB876D] px-8 py-4 text-[14px] tracking-[0.16em] text-white shadow-[0_14px_36px_-12px_rgba(251,135,109,0.55)] transition-all duration-300 hover:bg-[#f0745a]"
            >
              <span>見学・お申し込み</span>
              <ArrowIcon />
            </a>
          </Reveal>
        </div>
      </div>

      {/* 下段・実写＋装飾（モバイルのみ — デスクトップは大コラージュ側に集約） */}
      <div className="relative mx-auto mt-8 min-h-[600px] w-full max-w-[min(100%,1100px)] md:mt-16 lg:hidden">
        {ABOUT_LOWER_DECOR_ICONS.map((item) => (
          <div
            key={item.src}
            className={["pointer-events-none absolute z-0 opacity-[0.78]", item.boxClass].join(" ")}
          >
            <div
              className={["relative h-full w-full", item.motionClass, item.delayClass].filter(Boolean).join(" ")}
            >
              <Image
                src={item.src}
                alt=""
                width={120}
                height={120}
                className="h-full w-full object-contain"
                sizes="(max-width:640px) 72px, 88px"
                aria-hidden
              />
            </div>
          </div>
        ))}
        <Image
          id="img1"
          src="/ikebeji/キッズ生き物調査隊-18.jpg"
          alt=""
          width={257}
          height={193}
          className="absolute top-[-18px] left-[258px] z-[1] h-[193px] w-[257px] max-lg:top-[70px] rounded-xl object-cover"
          sizes="257px"
        />
        <Image
          id="img2"
          src="/ikebeji/キッズ生き物調査隊-17.jpg"
          alt=""
          width={259}
          height={173}
          className="absolute top-[263px] left-[112px] z-[1] h-[173px] w-[259px] max-lg:top-[351px] rounded-xl object-cover"
          sizes="259px"
        />
        <Image
          id="img3"
          src="/ikebeji/キッズ生き物調査隊-37.jpg"
          alt=""
          width={234}
          height={175}
          className="absolute top-[63px] left-[-5px] z-[1] h-[175px] w-[234px] max-lg:top-[151px] rounded-xl object-cover"
          sizes="234px"
        />
      </div>
    </section>
  );
}
