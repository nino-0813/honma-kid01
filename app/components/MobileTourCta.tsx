"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { APPLICATION_FORM_DISABLED, APPLICATION_FORM_URL } from "@/app/siteUrls";
import FloatingApplyCtaCircle from "@/app/components/FloatingApplyCtaCircle";
import { useUsecaseCtaActive } from "@/app/components/useUsecaseCtaActive";

const HERO_ID = "site-hero";
/** Tailwind `md` と揃える（これ以上は DesktopFloatingApplyCta のみ） */
const MD = 768;
const mobileMq = `(max-width: ${MD - 1}px)`;

function subscribeMobileMq(onChange: () => void) {
  const mq = window.matchMedia(mobileMq);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMobileMqSnapshot() {
  return window.matchMedia(mobileMq).matches;
}

/** SSR はモバイル想定でヒーロー内リンクを出す（デスクトップは CSR で null になり二重 FAB を防ぐ） */
function getServerMobileMqSnapshot() {
  return true;
}

function useIsMobileViewport() {
  return useSyncExternalStore(
    subscribeMobileMq,
    getMobileMqSnapshot,
    getServerMobileMqSnapshot,
  );
}

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
 * スマホ: ヒーロー内は右上のテキストボタン。ヒーローをスクロールアウトしたら右下固定の円形画像ボタン
 * （DesktopFloatingApplyCta と同じ画像・年間プログラムゾーンのクロスフェード）。
 */
const heroLinkClass =
  "inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--cta-visit-bg)] px-6 py-4 text-[13px] font-medium tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[var(--cta-visit-hover)]";

/** デスクトップ円形 CTA のベースサイズ（md 未満では固定 120px）に合わせる */
const MOBILE_FLOATING_CLASS =
  "button-chip fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-[9999] block h-[120px] w-[120px] overflow-hidden rounded-full bg-transparent shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006B2B]";

export default function MobileTourCta() {
  const isMobile = useIsMobileViewport();
  const [pastHero, setPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);
  const usecaseCtaActive = useUsecaseCtaActive(mounted && isMobile);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isMobile) return;
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
  }, [isMobile]);

  if (!isMobile) return null;

  const heroLink = APPLICATION_FORM_DISABLED ? (
    <span
      aria-label="お申し込み（現在は受付を終了しています）"
      aria-disabled="true"
      className={`${heroLinkClass} shadow-[0_8px_24px_rgba(0,0,0,0.2)]`}
    >
      お申し込み
      <ArrowIcon />
    </span>
  ) : (
    <a
      href={APPLICATION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${heroLinkClass} shadow-[0_8px_24px_rgba(0,0,0,0.2)]`}
    >
      お申し込み
      <ArrowIcon />
    </a>
  );

  if (pastHero && mounted) {
    return createPortal(
      <FloatingApplyCtaCircle
        usecaseZoneActive={usecaseCtaActive}
        className={MOBILE_FLOATING_CLASS}
      />,
      document.body,
    );
  }

  return heroLink;
}
