"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { APPLICATION_FORM_URL } from "@/app/siteUrls";

const MD = 768;

/** 通常表示（年間プログラム外） */
const CTA_IMAGE_DEFAULT =
  "/ikebeji/sadokids_HP_green_symbol%20green%20dark.png";
/** #usecase 表示中のみ（HeroSectionNav の判定と揃える） */
const CTA_IMAGE_IN_USECASE =
  "/ikebeji/sadokids_HP_green_symbol%204.png";

const USECASE_OBSERVER_INIT: IntersectionObserverInit = {
  root: null,
  threshold: 0.12,
  rootMargin: "-48px 0px -20% 0px",
};

/**
 * md 以上: ビューポート右下に常時固定のお申し込み（画像ボタン）。モバイルは MobileTourCta を使用。
 * #usecase セクションが見えている間だけ画像を差し替える。
 */
export default function DesktopFloatingApplyCta() {
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [usecaseInView, setUsecaseInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(`(min-width: ${MD}px)`);
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!mounted || !desktop) return;
    const el = document.getElementById("usecase");
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      setUsecaseInView(entry?.isIntersecting ?? false);
    }, USECASE_OBSERVER_INIT);
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted, desktop]);

  if (!mounted || !desktop) return null;

  const imageSrc = usecaseInView ? CTA_IMAGE_IN_USECASE : CTA_IMAGE_DEFAULT;

  return createPortal(
    <a
      href={APPLICATION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="お申し込み（外部フォームが開きます）"
      className="button-chip fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-[9999] block h-[120px] w-[120px] overflow-hidden rounded-full bg-transparent shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006B2B] md:h-[132px] md:w-[132px] lg:h-[148px] lg:w-[148px]"
    >
      <span className="relative block h-full w-full overflow-hidden rounded-full">
        <Image
          key={imageSrc}
          src={imageSrc}
          alt=""
          fill
          className="origin-center scale-[1.92] object-cover object-center"
          sizes="(min-width: 1024px) 148px, (min-width: 768px) 132px, 120px"
          priority={false}
        />
      </span>
    </a>,
    document.body,
  );
}
