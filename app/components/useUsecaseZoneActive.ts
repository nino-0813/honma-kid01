"use client";

import { useEffect, useRef, useState } from "react";
import { USECASE_IN_VIEW_OBSERVER_INIT } from "@/app/components/usecaseInViewObserver";

/** #staff 表示中は年間プログラムゾーン扱いにしない（シンプルな交差のみ） */
const STAFF_OBSERVER_INIT: IntersectionObserverInit = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};

/**
 * 年間プログラムブロックを見ているが #staff より手前／スタッフ未表示のとき true。
 * 長い #usecase の下でも、スタッフに入ったら false（CTA 画像・ナビ色を緑に戻す）。
 */
export function useUsecaseZoneActive(enabled: boolean) {
  const [active, setActive] = useState(false);
  const usecaseIn = useRef(false);
  const staffIn = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const sync = () => {
      setActive(usecaseIn.current && !staffIn.current);
    };

    const usecaseEl = document.getElementById("usecase");
    const staffEl = document.getElementById("staff");
    if (!usecaseEl) return;

    const obsU = new IntersectionObserver(([entry]) => {
      usecaseIn.current = entry?.isIntersecting ?? false;
      sync();
    }, USECASE_IN_VIEW_OBSERVER_INIT);

    const obsS =
      staffEl != null
        ? new IntersectionObserver(([entry]) => {
            staffIn.current = entry?.isIntersecting ?? false;
            sync();
          }, STAFF_OBSERVER_INIT)
        : null;

    obsU.observe(usecaseEl);
    if (staffEl && obsS) obsS.observe(staffEl);

    return () => {
      obsU.disconnect();
      obsS?.disconnect();
    };
  }, [enabled]);

  return active;
}
