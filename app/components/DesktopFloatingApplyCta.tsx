"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FloatingApplyCtaCircle from "@/app/components/FloatingApplyCtaCircle";
import { useUsecaseCtaActive } from "@/app/components/useUsecaseCtaActive";

const MD = 768;

const FLOATING_CLASS =
  "button-chip fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-[9999] block h-[120px] w-[120px] overflow-hidden rounded-full bg-transparent shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006B2B] md:h-[132px] md:w-[132px] lg:h-[148px] lg:w-[148px]";

/**
 * md 以上: ビューポート右下に常時固定のお申し込み（画像ボタン）。モバイルは MobileTourCta を使用。
 * 年間プログラムを見ている間は画像を差し替え、#staff 以降では緑（既定）に戻す。
 */
export default function DesktopFloatingApplyCta() {
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const usecaseCtaActive = useUsecaseCtaActive(mounted && desktop);

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
    <FloatingApplyCtaCircle
      usecaseZoneActive={usecaseCtaActive}
      className={FLOATING_CLASS}
    />,
    document.body,
  );
}
