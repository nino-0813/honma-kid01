"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { APPLICATION_FORM_URL } from "@/app/siteUrls";

const MD = 768;

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

/**
 * md 以上: ビューポート右下に常時固定の「お申し込み」（モバイルは MobileTourCta を使用）。
 */
export default function DesktopFloatingApplyCta() {
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(`(min-width: ${MD}px)`);
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!mounted || !desktop) return null;

  return createPortal(
    <a
      href={APPLICATION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="button-chip fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-[9999] inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[14px] tracking-[0.16em] shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-all duration-300 bg-[var(--cta-visit-bg)] text-white hover:bg-[var(--cta-visit-hover)]"
    >
      <span>お申し込み</span>
      <ArrowIcon />
    </a>,
    document.body,
  );
}
