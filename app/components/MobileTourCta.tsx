"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HERO_ID = "site-hero";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
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
  "inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#FB876D] px-5 py-3.5 text-[12px] font-medium tracking-[0.12em] text-white";

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

  /* ヒーローは z-index なし・後続セクションは z-10 などで、fixed 子は PLACE の下に隠れる。
     body へポータルしてビューポート最前面に出す。 */
  if (pastHero && mounted) {
    return createPortal(link, document.body);
  }

  return link;
}
