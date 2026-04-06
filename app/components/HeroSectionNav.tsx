"use client";

import { useUsecaseZoneActive } from "@/app/components/useUsecaseZoneActive";

type HeroSectionNavVariant = "hero" | "floating";

const SECTION_LINKS = [
  { href: "#about", label: "佐渡Kids生きもの調査隊", accent: "#4DC47A" },
  { href: "#usecase", label: "年間プログラム", accent: "#4DC47A" },
  { href: "#staff", label: "スタッフ紹介", accent: "#F7F54D" },
  { href: "#faq", label: "よくある質問", accent: "#4DC47A" },
] as const;

/** 年間プログラムブロック上（#usecase かつ #staff より手前） */
const FLOATING_ON_USECASE_LINK =
  "text-white underline decoration-white/35 decoration-1 underline-offset-[6px] transition-[color,decoration-color] hover:text-white hover:decoration-white/65 md:text-[12px]";
const FLOATING_ON_USECASE_SEP =
  "mx-2.5 select-none text-[11px] text-white/40 md:mx-3 md:text-[12px]";

/** 上記以外 — 指定色 #006B2B */
const FLOATING_DEFAULT_LINK =
  "text-[#006B2B] underline decoration-[#006B2B]/30 decoration-1 underline-offset-[6px] transition-[color,decoration-color] hover:text-[#004d1f] hover:decoration-[#006B2B]/60 md:text-[12px]";
const FLOATING_DEFAULT_SEP =
  "mx-2.5 select-none text-[11px] text-[#006B2B]/40 md:mx-3 md:text-[12px]";

/**
 * ページ内アンカー（ヒーロー内は白文字＋左ライン、固定は本文色・横並び可）
 * 固定・横並び時: 年間プログラム（#usecase）表示中のみ白、それ以外は #006B2B（#staff 以降は緑に戻す）。
 */
export default function HeroSectionNav({
  variant = "hero",
  layout = "column",
}: {
  variant?: HeroSectionNavVariant;
  layout?: "column" | "row";
}) {
  const usecaseZoneActive = useUsecaseZoneActive(
    variant === "floating" && layout === "row",
  );

  const linkTextHero =
    "text-[11px] leading-snug tracking-[0.08em] text-white/95 md:text-[12px]";
  const linkTextFloating =
    "text-[11px] leading-snug tracking-[0.12em] text-[#444] md:text-[12px]";

  const isFloatingRow = variant === "floating" && layout === "row";

  if (isFloatingRow) {
    const linkClass = usecaseZoneActive
      ? FLOATING_ON_USECASE_LINK
      : FLOATING_DEFAULT_LINK;
    const sepClass = usecaseZoneActive
      ? FLOATING_ON_USECASE_SEP
      : FLOATING_DEFAULT_SEP;

    return (
      <nav
        aria-label="ページ内セクション"
        className="flex flex-row flex-wrap items-center justify-end gap-y-1"
      >
        {SECTION_LINKS.map((item, i) => (
          <span key={item.href} className="inline-flex items-center">
            {i > 0 ? (
              <span className={sepClass} aria-hidden>
                /
              </span>
            ) : null}
            <a
              href={item.href}
              className={`nav-link whitespace-nowrap py-0.5 text-[11px] leading-snug tracking-[0.12em] ${linkClass}`}
            >
              {item.label}
            </a>
          </span>
        ))}
      </nav>
    );
  }

  const linkText = variant === "hero" ? linkTextHero : linkTextFloating;

  return (
    <nav aria-label="ページ内セクション" className="flex flex-col gap-2.5 md:gap-3">
      {SECTION_LINKS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="nav-link block border-l-[2px] py-0.5 pl-2.5"
          style={{ borderLeftColor: item.accent }}
        >
          <span className={linkText}>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
