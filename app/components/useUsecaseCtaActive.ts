"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 右下 CTA 専用の年間プログラム判定。
 * `#usecase` がビューポートと重なっているあいだは黄色。
 * `#usecase` の矩形がまだ画面内に残っていても、`#staff` が見え始めたら緑へ戻す
 * （年間プログラムとスタッフの境目で黄色が残るのを防ぐ）。
 */
export function useUsecaseCtaActive(enabled: boolean) {
  const [active, setActive] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const usecaseEl = document.getElementById("usecase");
    const staffEl = document.getElementById("staff");
    if (!(usecaseEl instanceof HTMLElement)) return;

    const update = () => {
      const u = usecaseEl.getBoundingClientRect();
      const s = staffEl?.getBoundingClientRect();
      const vh = window.innerHeight;

      const usecaseVisible =
        Number.isFinite(u.top) &&
        Number.isFinite(u.bottom) &&
        u.top < vh &&
        u.bottom > 0;

      const staffVisible =
        s != null &&
        Number.isFinite(s.top) &&
        Number.isFinite(s.bottom) &&
        s.top < vh &&
        s.bottom > 0;

      setActive(usecaseVisible && !staffVisible);
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [enabled]);

  return active;
}
