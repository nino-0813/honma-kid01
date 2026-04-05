"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "@/app/components/reveal";

/** `public/ikebeji/green` 内のファイル名（スペース含む）を URL パスに */
function ikebejiGreenPng(filename: string): string {
  return `/ikebeji/green/${encodeURIComponent(filename)}`;
}

const ABOUT_KICKER = "about Kids' Nature Exploration Team";
const ABOUT_TITLE = "佐渡Kids生き物調査隊とは";
/** モバイル about 見出しの改行（1行目＋2行目＝ `ABOUT_TITLE` と同じ読み） */
const ABOUT_TITLE_MOBILE_LINES = ["佐渡Kids生き物", "調査隊とは"] as const;
/** モバイル about 見出し周りの手描きアイコン（`public/ikebeji`） */
const ABOUT_MOBILE_TITLE_DECOR = {
  cloud: ikebejiGreenPng("sadokids_green_cloud 1.png"),
  crab: ikebejiGreenPng("sadokids_green_crab.png"),
  net: ikebejiGreenPng("sadokids_green_insect net.png"),
} as const;

/** 下段実写エリア（3枚写真の周り）の手描き装飾 — 参照イメージのように点数を絞って余白を残す */
const ABOUT_LOWER_DECOR_ICONS = [
  {
    src: ikebejiGreenPng("sadokids_green_insect 2.png"),
    boxClass:
      "left-[38%] top-[25%] h-[96px] w-[96px] rotate-[14deg] sm:left-[39%] sm:top-[24%] sm:h-[112px] sm:w-[112px]",
    motionClass: "about-decor-bob",
    delayClass: "",
  },
  {
    src: ikebejiGreenPng("sadokids_green_leaves 3.png"),
    boxClass:
      "left-[6%] top-[59%] h-[76px] w-[76px] -rotate-[16deg] sm:left-[8%] sm:top-[60%] sm:h-[92px] sm:w-[92px]",
    motionClass: "about-decor-rock",
    delayClass: "about-decor-delay-sm",
  },
  {
    src: ikebejiGreenPng("sadokids_green_lizard.png"),
    boxClass:
      "right-[4%] bottom-[10%] h-[96px] w-[96px] -rotate-[18deg] sm:right-[5%] sm:bottom-[11%] sm:h-[112px] sm:w-[112px]",
    motionClass: "about-decor-sway",
    delayClass: "about-decor-delay-md",
  },
] as const;
const ABOUT_BODY =
  "佐渡の田んぼや水辺をフィールドに、生きものたちと出会いながら観察・記録する子ども向けの野外プログラムです。季節ごとの調査テーマを決め、ネットや図鑑とあわせて「なぜ？」を一緒に掘り下げていきます。体験内容や日程は調整中のため、ここに載せている説明は仮のイメージです。正式な募集要項は追ってお知らせします。";

/** 上段コラージュ共通の実写3枚（ASCII パス — デプロイ先 Linux でも確実に解決する） */
const ABOUT_MOBILE_COLLAGE_PHOTOS = [
  { src: "/ikebeji/kids-survey-09.jpg", alt: "フィールドの様子" },
  { src: "/ikebeji/kids-survey-12.jpg", alt: "水辺の観察" },
  { src: "/ikebeji/kids-survey-18.jpg", alt: "発表やまとめ" },
] as const;

const P = ABOUT_MOBILE_COLLAGE_PHOTOS;

/** モバイル下段3枚と同じファイル（デスクトップ大コラージュの一部枠で使用） */
const IKEBEJI_COLLAGE_17 = "/ikebeji/kids-survey-17.jpg";
const IKEBEJI_COLLAGE_37 = "/ikebeji/kids-survey-37.jpg";

/** デスクトップ Figma コラージュ6枠（`<CollagePhoto>` の参照順） */
const COLLAGE_IMAGES = [
  { src: IKEBEJI_COLLAGE_17, alt: "フィールドの様子" },
  { src: P[1].src, alt: P[1].alt },
  { src: "/ikebeji/kids-survey-38.jpg", alt: "活動の記録" },
  {
    src: "/ikebeji/kids-survey-36.jpg",
    alt: "佐渡Kids 生きもの調査隊 — 遊んで学んで体験する",
  },
  { src: IKEBEJI_COLLAGE_37, alt: "仲間と学ぶ時間" },
  { src: P[2].src, alt: P[2].alt },
] as const;

/**
 * モバイル（`lg:hidden`）上段コラージュ：
 * 参考イメージのように、余白多めの非対称 3 枚配置＋手描きアイコン 2 つ。
 */
type AboutMobileCollagePhoto = {
  readonly kind: "photo";
  readonly src: string;
  readonly alt: string;
  readonly boxClass: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly imageClassName?: string;
};

type AboutMobileCollageIcon = {
  readonly kind: "icon";
  readonly src: string;
  readonly boxClass: string;
  readonly width: number;
  readonly height: number;
  readonly motionClass: string;
  readonly delayClass?: string;
};

type AboutMobileCollageLayer = AboutMobileCollagePhoto | AboutMobileCollageIcon;

const ABOUT_MOBILE_COLLAGE_LAYERS: readonly AboutMobileCollageLayer[] = [
  {
    kind: "photo",
    src: ABOUT_MOBILE_COLLAGE_PHOTOS[0].src,
    alt: ABOUT_MOBILE_COLLAGE_PHOTOS[0].alt,
    boxClass: "left-[49%] top-[8px] z-[3] h-[194px] w-[188px] rotate-[2deg]",
    width: 188,
    height: 194,
    sizes: "188px",
    imageClassName: "h-full w-full object-cover object-[50%_52%]",
  },
  {
    kind: "photo",
    src: ABOUT_MOBILE_COLLAGE_PHOTOS[1].src,
    alt: ABOUT_MOBILE_COLLAGE_PHOTOS[1].alt,
    boxClass: "left-[4px] top-[146px] z-[2] h-[178px] w-[150px] -rotate-[2deg]",
    width: 150,
    height: 178,
    sizes: "150px",
    imageClassName: "h-full w-full object-cover object-[44%_46%]",
  },
  {
    kind: "photo",
    src: ABOUT_MOBILE_COLLAGE_PHOTOS[2].src,
    alt: ABOUT_MOBILE_COLLAGE_PHOTOS[2].alt,
    boxClass: "left-[52%] top-[268px] z-[2] h-[148px] w-[176px] rotate-[1.5deg]",
    width: 176,
    height: 148,
    sizes: "176px",
    imageClassName: "h-full w-full object-cover object-[58%_44%]",
  },
  {
    kind: "icon",
    src: ikebejiGreenPng("sadokids_green_rice.png"),
    boxClass: "left-[-18px] top-[112px] z-0 h-[124px] w-[284px] -rotate-[7deg] opacity-[0.82]",
    width: 596,
    height: 278,
    motionClass: "about-decor-bob",
  },
  {
    kind: "icon",
    src: ikebejiGreenPng("sadokids_green_Butterfly.png"),
    boxClass: "left-[40%] top-[216px] z-0 h-[188px] w-[144px] rotate-[10deg] opacity-[0.82]",
    width: 288,
    height: 428,
    motionClass: "about-decor-sway",
    delayClass: "about-decor-delay-sm",
  },
];

function CollagePhoto({
  src,
  alt,
  className,
  sizes,
  staggerMs = 0,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  /** 表示時の段遅延（`Reveal mode="children-only"` 配下） */
  staggerMs?: number;
}) {
  return (
    <div
      className={["absolute", className].join(" ")}
      style={{ "--about-stagger": `${staggerMs}ms` } as CSSProperties}
    >
      <div className="about-collage-photo-inner relative h-full w-full overflow-hidden rounded-[10px] shadow-[0_8px_28px_-8px_rgba(30,55,90,0.14)] ring-1 ring-black/[0.04]">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
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
        <div className="relative mx-auto w-full overflow-visible px-10 pb-3 pt-8 sm:px-12 sm:pt-9">
          <div className="pointer-events-none absolute left-0 top-1 z-[-1] h-[108px] w-[108px] -translate-x-0.5 -translate-y-1 -rotate-[8deg] opacity-[0.88] sm:h-[128px] sm:w-[128px]">
            <div className="relative h-full w-full about-decor-bob">
              <Image
                src={ABOUT_MOBILE_TITLE_DECOR.cloud}
                alt=""
                width={240}
                height={240}
                className="h-full w-full object-contain"
                sizes="128px"
                aria-hidden
              />
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-3 z-[-1] h-[128px] w-[128px] translate-x-1 rotate-[16deg] opacity-[0.88] sm:top-4 sm:h-[152px] sm:w-[152px]">
            <div className="relative h-full w-full about-decor-sway about-decor-delay-sm">
              <Image
                src={ABOUT_MOBILE_TITLE_DECOR.net}
                alt=""
                width={240}
                height={240}
                className="h-full w-full object-contain"
                sizes="152px"
                aria-hidden
              />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-14 right-3 z-[-1] h-[100px] w-[100px] -rotate-[12deg] opacity-[0.9] sm:bottom-16 sm:h-[116px] sm:w-[116px]">
            <div className="relative h-full w-full about-decor-rock about-decor-delay-md">
              <Image
                src={ABOUT_MOBILE_TITLE_DECOR.crab}
                alt=""
                width={240}
                height={240}
                className="h-full w-full object-contain"
                sizes="116px"
                aria-hidden
              />
            </div>
          </div>
          <h2 className="relative z-[1] text-[clamp(19px,5.2vw,30px)] font-medium leading-[1.2] tracking-[0.08em] text-[#006B2B]">
            <span className="block">{ABOUT_TITLE_MOBILE_LINES[0]}</span>
            <span className="block">{ABOUT_TITLE_MOBILE_LINES[1]}</span>
          </h2>
        </div>
        <p className="mt-2 text-[15px] leading-[1.65] tracking-[0.08em] lowercase text-[#222]/90">
          {ABOUT_KICKER}
        </p>
      </div>
    );
  }

  if (figmaDesktopCenter) {
    return (
      <div className={["text-center [&_p]:mx-auto [&_h2]:mx-auto", className].join(" ")}>
        <p className="font-inter text-[14px] lowercase tracking-[0.12em] text-[#006B2B]">{ABOUT_KICKER}</p>
        <h2 className="mt-2 text-[18px] font-medium leading-[1.35] tracking-[0.08em] text-[#006B2B] xl:text-[20px]">
          {ABOUT_TITLE}
        </h2>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-inter text-[16px] lowercase tracking-[0.16em] text-[#444]">{ABOUT_KICKER}</p>
      <h2 className="mt-3 text-[30px] font-medium leading-[1.15] tracking-[0.08em] text-[#006B2B] md:text-[40px] xl:text-[46px]">
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
  return (
    <>
      {ABOUT_MOBILE_COLLAGE_LAYERS.map((layer, i) => {
        const staggerStyle = { "--about-stagger": `${i * 70}ms` } as CSSProperties;
        if (layer.kind === "photo") {
          return (
            <div
              key={`mobile-collage-${layer.src}-${i}`}
              className={["absolute", layer.boxClass].join(" ")}
              style={staggerStyle}
            >
              <div className="about-collage-photo-inner relative h-full w-full overflow-hidden rounded-[22px] bg-white shadow-[0_18px_42px_-18px_rgba(27,53,90,0.3)] ring-1 ring-[#dbe3ef]">
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  width={layer.width}
                  height={layer.height}
                  sizes={layer.sizes}
                  className={layer.imageClassName ?? "h-full w-full object-cover"}
                />
              </div>
            </div>
          );
        }

        return (
          <div
            key={`mobile-collage-${layer.src}-${i}`}
            className={["pointer-events-none absolute", layer.boxClass].join(" ")}
            style={staggerStyle}
            aria-hidden
          >
            <div
              className={[
                "about-collage-photo-inner relative h-full w-full",
                layer.motionClass,
                layer.delayClass,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={layer.src}
                alt=""
                width={layer.width}
                height={layer.height}
                className="h-full w-full object-contain"
                sizes="192px"
              />
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
          <Reveal
            mode="children-only"
            delay={0}
            className="relative mx-auto h-[430px] w-full overflow-visible bg-white sm:h-[458px]"
          >
            <AboutMobileCollageCanvas />
          </Reveal>

          <Reveal
            className="relative z-10 mx-auto mt-6 mb-12 flex w-full max-w-[326px] flex-col items-center gap-6 text-center"
            delay={120}
          >
            <AboutHeadingBlock mobileTitleFirst className="w-full" />
            <AboutBodyText intro className="w-full text-left" />
          </Reveal>
        </div>
      </div>

      {/* ── Desktop: Figma node 1:94（1500×1000）座標 ── */}
      <Reveal
        mode="children-only"
        delay={0}
        className="relative mx-auto hidden h-[1000px] w-full max-w-[1500px] lg:block"
      >
        <CollagePhoto
          src={COLLAGE_IMAGES[0].src}
          alt={COLLAGE_IMAGES[0].alt}
          sizes="285px"
          staggerMs={0}
          className="left-[1.933%] top-[13.1%] z-[1] h-[37.9%] w-[19%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[3].src}
          alt={COLLAGE_IMAGES[3].alt}
          sizes="375px"
          staggerMs={75}
          className="left-[30.933%] top-[2.9%] z-[1] h-[28.1%] w-[25%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[1].src}
          alt={COLLAGE_IMAGES[1].alt}
          sizes="285px"
          staggerMs={150}
          className="left-[79.4%] top-[4.9%] z-[1] h-[38%] w-[19%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[2].src}
          alt={COLLAGE_IMAGES[2].alt}
          sizes="362px"
          staggerMs={225}
          className="left-[-1.6%] top-[65.2%] z-[1] h-[27.1%] w-[24.133%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[4].src}
          alt={COLLAGE_IMAGES[4].alt}
          sizes="413px"
          staggerMs={300}
          className="left-[40.067%] top-[70.2%] z-[1] h-[28.6%] w-[27.533%]"
        />
        <CollagePhoto
          src={COLLAGE_IMAGES[5].src}
          alt={COLLAGE_IMAGES[5].alt}
          sizes="380px"
          staggerMs={375}
          className="left-[79.4%] top-[60.4%] z-[1] h-[28.5%] w-[25.333%]"
        />

        <div className="pointer-events-none absolute left-[54.87%] top-[14.3%] z-0 h-[13.9%] max-w-[19.87%] overflow-visible">
          <div className="about-decor-sway about-decor-delay-sm relative h-full w-max max-w-full origin-top-left scale-[1.5]">
            <Image
              src={ikebejiGreenPng("sadokids_green_crab.png")}
              alt=""
              width={447}
              height={447}
              sizes="300px"
              className="h-full w-auto max-w-full object-contain opacity-[0.9]"
              aria-hidden
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-[21.2%] top-[68.8%] z-0 h-[19.6%] max-w-[15.33%] overflow-visible">
          <div className="about-decor-bob relative h-full w-max max-w-full origin-bottom-left scale-[1.5]">
            <Image
              src={ikebejiGreenPng("sadokids_green_insect cage.png")}
              alt=""
              width={345}
              height={294}
              sizes="240px"
              className="h-full w-auto max-w-full object-contain opacity-90"
              aria-hidden
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-[68.33%] top-[65.2%] z-0 h-[21.4%] max-w-[9.6%] overflow-visible">
          <div className="about-decor-rock about-decor-delay-md relative h-full w-max max-w-full origin-top-left scale-[1.5]">
            <Image
              src={ikebejiGreenPng("sadokids_green_flower 2.png")}
              alt=""
              width={216}
              height={321}
              sizes="180px"
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
      </Reveal>

      {/* 下段・実写＋装飾（モバイルのみ — デスクトップは大コラージュ側に集約） */}
      <Reveal
        mode="children-only"
        delay={40}
        className="relative mx-auto mt-3 min-h-[520px] w-full max-w-[390px] lg:hidden"
      >
        {ABOUT_LOWER_DECOR_ICONS.map((item) => (
          <div
            key={item.src}
            className={["pointer-events-none absolute z-[-1] opacity-[0.78]", item.boxClass].join(" ")}
          >
            <div
              className={["relative h-full w-full", item.motionClass, item.delayClass].filter(Boolean).join(" ")}
            >
              <Image
                src={item.src}
                alt=""
                width={240}
                height={240}
                className="h-full w-full object-contain"
                sizes="(max-width:640px) 144px, 176px"
                aria-hidden
              />
            </div>
          </div>
        ))}
        <div
          className="absolute right-[8px] top-[12px] z-[1] h-[188px] w-[150px]"
          style={{ "--about-stagger": "0ms" } as CSSProperties}
        >
          <div className="about-collage-photo-inner relative h-full w-full overflow-hidden rounded-[22px] shadow-[0_18px_42px_-18px_rgba(27,53,90,0.28)] ring-1 ring-[#dbe3ef]">
            <Image
              id="img1"
              src="/ikebeji/kids-survey-24.jpg"
              alt=""
              width={150}
              height={188}
              className="h-full w-full object-cover"
              sizes="150px"
            />
          </div>
        </div>
        <div
          className="absolute left-1/2 top-[310px] z-[1] h-[168px] w-[250px] -translate-x-1/2"
          style={{ "--about-stagger": "90ms" } as CSSProperties}
        >
          <div className="about-collage-photo-inner relative h-full w-full overflow-hidden rounded-[22px] shadow-[0_18px_42px_-18px_rgba(27,53,90,0.28)] ring-1 ring-[#dbe3ef]">
            <Image
              id="img2"
              src="/ikebeji/kids-survey-17.jpg"
              alt=""
              width={250}
              height={168}
              className="h-full w-full object-cover"
              sizes="250px"
            />
          </div>
        </div>
        <div
          className="absolute left-[18px] top-[184px] z-[1] h-[116px] w-[148px]"
          style={{ "--about-stagger": "180ms" } as CSSProperties}
        >
          <div className="about-collage-photo-inner relative h-full w-full overflow-hidden rounded-[22px] shadow-[0_18px_42px_-18px_rgba(27,53,90,0.28)] ring-1 ring-[#dbe3ef]">
            <Image
              id="img3"
              src="/ikebeji/kids-survey-37.jpg"
              alt=""
              width={148}
              height={116}
              className="h-full w-full object-cover"
              sizes="148px"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
