"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import HeroSectionNav from "@/app/components/HeroSectionNav";

const HERO_ID = "site-hero";
const MD = 768;

function subscribeMinMd(onChange: () => void) {
  const mq = window.matchMedia(`(min-width: ${MD}px)`);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMinMdSnapshot() {
  return window.matchMedia(`(min-width: ${MD}px)`).matches;
}

/** デスクトップ列の SSR ではヒーロー内ナビを出す（狭いビューは CSR で空に） */
function getServerMinMdSnapshot() {
  return true;
}

function useIsDesktopViewport() {
  return useSyncExternalStore(
    subscribeMinMd,
    getMinMdSnapshot,
    getServerMinMdSnapshot,
  );
}

/**
 * md 以上: ヒーロー内にナビ。ヒーローをスクロールアウトしたら右上に固定（1 つの nav のみ）。
 */
export default function DesktopSectionNavFollow() {
  const isDesktop = useIsDesktopViewport();
  const [pastHero, setPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isDesktop) return;
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
  }, [isDesktop]);

  if (!isDesktop) return null;

  const floating = (
    <div className="fixed right-6 top-[max(1.25rem,env(safe-area-inset-top))] z-[9998] max-w-[min(960px,calc(100vw-3rem))] text-right">
      <HeroSectionNav variant="floating" layout="row" />
    </div>
  );

  if (pastHero && mounted) {
    return createPortal(floating, document.body);
  }

  return <HeroSectionNav variant="hero" />;
}
