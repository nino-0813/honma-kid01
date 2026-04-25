"use client";

import Image from "next/image";
import { APPLICATION_FORM_DISABLED, APPLICATION_FORM_URL } from "@/app/siteUrls";

/** 通常表示（年間プログラムゾーン外） */
export const CTA_IMAGE_DEFAULT =
  "/ikebeji/sadokids_HP_green_symbol%20green%20dark.png";
/** 年間プログラムゾーン表示中 */
export const CTA_IMAGE_IN_USECASE =
  "/ikebeji/sadokids_HP_green_symbol%204.png";

const imgClass =
  "pointer-events-none origin-center scale-[1.92] object-cover object-center transition-opacity duration-200 ease-out";

type FloatingApplyCtaCircleProps = {
  usecaseZoneActive: boolean;
  className: string;
  /** Next/Image の sizes（ビューポート幅に合わせる） */
  sizes?: string;
};

/**
 * デスクトップ右下・モバイル（ヒーロー外）共通の円形お申し込みボタン。
 * 二重画像の opacity クロスフェードで `usecaseZoneActive` を表現する。
 */
export default function FloatingApplyCtaCircle({
  usecaseZoneActive,
  className,
  sizes = "(min-width: 1024px) 148px, (min-width: 768px) 132px, 120px",
}: FloatingApplyCtaCircleProps) {
  const inner = (
    <span className="relative block h-full w-full overflow-hidden rounded-full">
      <span className="absolute inset-0">
        <Image
          src={CTA_IMAGE_DEFAULT}
          alt=""
          fill
          className={`${imgClass} ${usecaseZoneActive ? "opacity-0" : "opacity-100"}`}
          sizes={sizes}
          priority={false}
        />
      </span>
      <span className="absolute inset-0">
        <Image
          src={CTA_IMAGE_IN_USECASE}
          alt=""
          fill
          className={`${imgClass} ${usecaseZoneActive ? "opacity-100" : "opacity-0"}`}
          sizes={sizes}
          priority={false}
        />
      </span>
    </span>
  );

  if (APPLICATION_FORM_DISABLED) {
    return (
      <span
        aria-label="お申し込み（現在は受付を終了しています）"
        aria-disabled="true"
        className={className}
      >
        {inner}
      </span>
    );
  }

  return (
    <a
      href={APPLICATION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="お申し込み（外部フォームが開きます）"
      className={className}
    >
      {inner}
    </a>
  );
}
