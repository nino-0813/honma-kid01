"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HERO_ID = "site-hero";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
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

/**
 * スマホ: ヒーロー内は右上。ヒーローをスクロールアウトしたら右下に固定。
 */
const baseClass =
  "inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--cta-visit-bg)] px-6 py-4 text-[13px] font-medium tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[var(--cta-visit-hover)]";

export default function MobileTourCta() {
  const [pastHero, setPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "0px" },
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const link = (
    <a
      href="#faq"
      className={[
        baseClass,
        pastHero
          ? "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[9999] shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
          : "shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
      ].join(" ")}
    >
      お申し込み
      <ArrowIcon />
    </a>
  );

  /* fixed 時は body へポータルして、通常のスタッキングに依存せずビューポート最前面に出す。 */
  if (pastHero && mounted) {
    return createPortal(link, document.body);
  }

  return link;
}
