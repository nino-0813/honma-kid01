"use client";

import { useEffect, useState } from "react";

type HeroSectionNavVariant = "hero" | "floating";

const SECTION_LINKS = [
  { href: "#about", label: "佐渡Kids生き物調査隊とは", accent: "#4DC47A" },
  { href: "#place", label: "キッズのみなさんへ", accent: "#F7F54D" },
  { href: "#usecase", label: "年間プログラム", accent: "#4DC47A" },
  { href: "#staff", label: "スタッフ紹介", accent: "#F7F54D" },
  { href: "#faq", label: "よくある質問", accent: "#4DC47A" },
] as const;

/**
 * ページ内アンカー（ヒーロー内は白文字＋左ライン、固定は本文色・横並び可）
 * 固定・横並び時は #usecase（年間プログラム）表示中だけリンクを白にする。
 */
export default function HeroSectionNav({
  variant = "hero",
  layout = "column",
}: {
  variant?: HeroSectionNavVariant;
  layout?: "column" | "row";
}) {
  const [usecaseInView, setUsecaseInView] = useState(false);

  useEffect(() => {
    if (variant !== "floating" || layout !== "row") return;
    const el = document.getElementById("usecase");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setUsecaseInView(entry?.isIntersecting ?? false);
      },
      { root: null, threshold: 0.12, rootMargin: "-48px 0px -20% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [variant, layout]);

  const linkTextHero =
    "text-[11px] leading-snug tracking-[0.08em] text-white/95 md:text-[12px]";
  const linkTextFloating =
    "text-[11px] leading-snug tracking-[0.12em] text-[#444] md:text-[12px]";

  const isFloatingRow = variant === "floating" && layout === "row";

  if (isFloatingRow) {
    const linkOnGreen =
      "text-white underline decoration-white/35 decoration-1 underline-offset-[6px] transition-[color,decoration-color] hover:text-white hover:decoration-white/65 md:text-[12px]";
    const linkDefault =
      "text-[#006B2B] underline decoration-[#006B2B]/30 decoration-1 underline-offset-[6px] transition-[color,decoration-color] hover:text-[#004d1f] hover:decoration-[#006B2B]/60 md:text-[12px]";
    const sepOnGreen = "mx-2.5 select-none text-[11px] text-white/40 md:mx-3 md:text-[12px]";
    const sepDefault =
      "mx-2.5 select-none text-[11px] text-[#006B2B]/40 md:mx-3 md:text-[12px]";

    return (
      <nav
        aria-label="ページ内セクション"
        className="flex flex-row flex-wrap items-center justify-end gap-y-1"
      >
        {SECTION_LINKS.map((item, i) => (
          <span key={item.href} className="inline-flex items-center">
            {i > 0 ? (
              <span
                className={usecaseInView ? sepOnGreen : sepDefault}
                aria-hidden
              >
                /
              </span>
            ) : null}
            <a
              href={item.href}
              className={`nav-link whitespace-nowrap py-0.5 text-[11px] leading-snug tracking-[0.12em] ${usecaseInView ? linkOnGreen : linkDefault}`}
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
