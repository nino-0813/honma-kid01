"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const CARDS = [
  {
    title: "Membership Use",
    description:
      "By becoming a member, you can enjoy daily access to Kosugiyu Tonari. Use it freely for your everyday work, meals, weekend relaxation, or community gatherings.",
    bullets: [
      "Looking for a remote work environment",
      "Want to cook or dine in a spacious kitchen",
      "Interested in community activities or events",
      "Looking to create a space outside of home",
    ],
    image: "/figma-assets/usecase-1-23bd32.png",
    id: "membership",
  },
  {
    title: "Drop in Use",
    description:
      "The co-working and cafe space is open to everyone. On weekends, the cafe menu is available from morning until early afternoon. We also offer a drop-in plan that includes a bath ticket.",
    bullets: [
      "Need a space for a work or reading",
      "Enjoy a drink after a bath",
      "Want a cozy place to relax on your day off",
      "Seeking casual neighborhood connections",
    ],
    image: "/figma-assets/usecase-2-d783d7.png",
    id: "dropin",
  },
  {
    title: "Take away",
    description:
      "Takeout drinks are available daily. Enjoy a refreshing craft cola, beer, or other beverages, perfect for that post-bath treat.",
    bullets: [
      "Pick up a drink on the way home",
      "Grab a quick refreshment after your bath",
      "Bring the neighborhood mood with you",
    ],
    image: "/figma-assets/usecase-3-48e433.png",
    id: "takeaway",
  },
] as const;

const STAGGER_MS = 100;
const ROOT_MARGIN = "0px 0px -20% 0px";

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

export default function UseCaseSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([null, null, null]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const node = containerRef.current;

    if (!node) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const tid = setTimeout(() => {
            card.classList.add("uc-visible");
          }, index * STAGGER_MS);
          timeouts.push(tid);
        });

        observer.disconnect(); // once: true
      },
      { threshold: 0, rootMargin: ROOT_MARGIN },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-14 space-y-16 md:space-y-24">
      {CARDS.map((card, index) => (
        <article
          key={card.id}
          id={card.id}
          data-usecase-card={card.id}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={[
            "uc-card-init usecase-pinned-card relative lg:sticky lg:top-10",
            index === 1 ? "lg:translate-x-10" : "",
            index === 2 ? "lg:-translate-x-6" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ zIndex: 20 - index }}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div
              className={[
                "relative min-h-[300px] overflow-hidden rounded-[24px] shadow-[0_18px_40px_rgba(0,0,0,0.18)]",
                index === 2 ? "lg:col-span-4" : "lg:col-span-5",
              ].join(" ")}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover transition-transform duration-700 ease-out"
              />
            </div>

            <div
              className={[
                "flex flex-col justify-between gap-8",
                index === 2
                  ? "lg:col-span-6 lg:col-start-7 lg:pt-6"
                  : "lg:col-span-6 lg:col-start-7 lg:pt-8",
              ].join(" ")}
            >
              <div>
                <h3 className="text-[30px] leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[34px] md:leading-[1.2] md:tracking-[0.12em]">
                  {card.title}
                </h3>
                <p className="mt-5 max-w-[720px] text-[15px] leading-[1.85] tracking-[0.1em] text-white/88">
                  {card.description}
                </p>
                <div className="mt-8 rounded-[40px] border border-white/40 px-6 py-5 backdrop-blur-[1px] md:px-8">
                  <ul className="grid gap-x-10 gap-y-2 text-[15px] leading-[1.85] tracking-[0.1em] text-white/95 md:grid-cols-2">
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>・{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <a
                  href="#faq"
                  className="arrow-link inline-flex items-center gap-3 rounded-[14px] bg-white px-8 py-4 text-[14px] tracking-[0.16em] text-[#4d84c5] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                >
                  <span>read more</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
