"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
  /** 池状装飾（写真背後）の背景色 */
  accentColor?: string;
  /** 1枚目は stack、2・3枚目は grid 内の画像カラム */
  layout?: "stack" | "grid";
  className?: string;
};

/** #place：オリーブの背景をスクロールで写真枠内に収める */
export default function PlaceWildlifeFirstMedia({
  imageSrc,
  imageAlt,
  accentColor = "#C8C878",
  layout = "stack",
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const overlap = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const ratio = rect.height > 0 ? Math.max(0, overlap) / rect.height : 0;
      const fromTop = rect.top / vh;
      setSettled(ratio > 0.36 && fromTop < 0.55 && fromTop > -0.2);
    };

    const onScrollOrResize = () => {
      if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(onScrollOrResize, {
      threshold: [0, 0.08, 0.15, 0.25, 0.35, 0.5, 0.65, 0.85, 1],
    });
    observer.observe(el);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    tick();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  const shell =
    layout === "stack"
      ? "relative mx-auto w-full max-w-[min(100%,920px)] overflow-visible px-1 pb-2 pt-6 md:px-0 md:pt-14"
      : ["relative w-full overflow-visible px-0 pb-1 pt-6 md:pt-8", className]
          .filter(Boolean)
          .join(" ");

  const frameRounded =
    layout === "stack"
      ? "card-interactive relative z-10 overflow-hidden rounded-[40px]"
      : "card-interactive relative z-10 overflow-hidden rounded-3xl lg:rounded-[24px]";

  return (
    <div ref={rootRef} className={shell}>
      <div
        className="pointer-events-none absolute z-0 w-[min(72%,580px)] rounded-[40px]"
        style={{
          backgroundColor: accentColor,
          aspectRatio: "4 / 3",
          right: "max(-4%, -1.5rem)",
          top: settled ? "10%" : "max(-14%, -3.5rem)",
          transform: settled
            ? "rotate(8deg) translate3d(0,0,0)"
            : "rotate(8deg) translate3d(0,-2rem,0)",
          transition:
            "top 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden
      />
      <div className={frameRounded}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1810}
          height={1280}
          className="h-auto w-full object-cover transition-transform duration-700 ease-out"
        />
      </div>
    </div>
  );
}
