"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
  /**
   * `children-only`: ルートは常に不透明のまま、子の `.about-collage-photo-inner` だけを
   * インターセクションで段階表示（コラージュ写真向け）。
   */
  mode?: "default" | "children-only";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  mode = "default",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const show = () => {
      setIsVisible(true);
    };

    // マウント時点でビューポートと交差していれば即表示（厳しい threshold で永遠に透明のままになるのを防ぐ）
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom > 0 && rect.top < vh) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const rootClass =
    mode === "children-only"
      ? `reveal-children-root${isVisible ? " is-visible" : ""}`
      : `reveal reveal-${variant} ${isVisible ? "is-visible" : ""}`;

  return (
    <div
      ref={ref}
      className={`${rootClass} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
