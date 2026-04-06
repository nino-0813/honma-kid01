"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 固定ヘッダー付近の判定ライン（ON の入り — ここは変えない）。
 */
const ACTIVE_LINE_PX = 96;

/**
 * `#staff` の上端がこの Y より上に来たら OFF（値を大きくするとより早く戻る）。
 * `#usecase` が高いと y=ACTIVE_LINE がセクション内に残り続けるため、
 * 「スタッフに入った」の判定は `#staff` の矩形だけで切る。
 */
const STAFF_TOP_OFF_PX = 720;

/**
 * 固定ヘッダーが差しかかっているセクションを矩形ベースで判定する。
 * ON: `#usecase` が ACTIVE_LINE をまたいでいる（入りは従来どおり）。
 * OFF: 上に加え、`#staff` が画面上部付近に入ったら必ず false。
 */
export function useUsecaseZoneActive(enabled: boolean) {
  const [active, setActive] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const usecaseEl = document.getElementById("usecase");
    const staffEl = document.getElementById("staff");
    if (!usecaseEl) return;

    const update = () => {
      const u = usecaseEl.getBoundingClientRect();
      const s = staffEl?.getBoundingClientRect();

      const usecaseClaimsLine =
        Number.isFinite(u.top) &&
        Number.isFinite(u.bottom) &&
        u.top <= ACTIVE_LINE_PX &&
        u.bottom > ACTIVE_LINE_PX;

      const staffEnteredUpperViewport =
        s != null &&
        Number.isFinite(s.top) &&
        s.top < STAFF_TOP_OFF_PX;

      setActive(usecaseClaimsLine && !staffEnteredUpperViewport);
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
