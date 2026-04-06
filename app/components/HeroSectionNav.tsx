"use client";

import { useUsecaseZoneActive } from "@/app/components/useUsecaseZoneActive";

type HeroSectionNavVariant = "hero" | "floating";

const SECTION_LINKS = [
  { href: "#about", label: "佐渡Kids生きもの調査隊", accent: "#4DC47A" },
  { href: "#usecase", label: "年間プログラム", accent: "#F7F54D" },
  { href: "#staff", label: "スタッフ紹介", accent: "#4DC47A" },
  { href: "#faq", label: "よくある質問", accent: "#F7F54D" },
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
    "text-[11px] font-semibold leading-snug tracking-[0.08em] text-white/95 md:text-[12px]";
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
          <span key={item.href} className="inline-flex items-center font-semibold">
            {i > 0 ? (
              <span className={sepClass} aria-hidden>
                /
              </span>
            ) : null}
            <a
              href={item.href}
              className={`nav-link whitespace-nowrap py-0.5 text-[11px] font-semibold leading-snug tracking-[0.12em] ${linkClass}`}
            >
              {item.label}
            </a>
          </span>
        ))}
        <span className="inline-flex items-center font-semibold">
          <span className={sepClass} aria-hidden>
            /
          </span>
          <a
            href="https://www.instagram.com/ikimono_sado"
            target="_blank"
            rel="noopener noreferrer"
            className={
              usecaseZoneActive
                ? "inline-flex shrink-0 py-0.5 text-white transition-opacity hover:opacity-90"
                : "inline-flex shrink-0 py-0.5 text-[#006B2B] transition-opacity hover:opacity-80"
            }
            aria-label="Instagram"
          >
            <svg
              className="h-[18px] w-[18px] md:h-5 md:w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </span>
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
