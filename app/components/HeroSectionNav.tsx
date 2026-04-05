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
 */
export default function HeroSectionNav({
  variant = "hero",
  layout = "column",
}: {
  variant?: HeroSectionNavVariant;
  layout?: "column" | "row";
}) {
  const linkTextHero =
    "text-[11px] leading-snug tracking-[0.08em] text-white/95 md:text-[12px]";
  const linkTextFloating =
    "text-[11px] leading-snug tracking-[0.12em] text-[#444] md:text-[12px]";

  const isFloatingRow = variant === "floating" && layout === "row";

  if (isFloatingRow) {
    return (
      <nav
        aria-label="ページ内セクション"
        className="flex flex-row flex-wrap items-center justify-end gap-y-1"
      >
        {SECTION_LINKS.map((item, i) => (
          <span key={item.href} className="inline-flex items-center">
            {i > 0 ? (
              <span
                className="mx-2.5 select-none text-[11px] text-[#006B2B]/40 md:mx-3 md:text-[12px]"
                aria-hidden
              >
                /
              </span>
            ) : null}
            <a
              href={item.href}
              className="nav-link whitespace-nowrap py-0.5 text-[11px] leading-snug tracking-[0.12em] text-[#006B2B] underline decoration-[#006B2B]/30 decoration-1 underline-offset-[6px] transition-[color,decoration-color] hover:text-[#004d1f] hover:decoration-[#006B2B]/60 md:text-[12px]"
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
