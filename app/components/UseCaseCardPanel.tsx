import Image from "next/image";
import type { UseCaseCard } from "@/app/components/usecaseData";

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

export default function UseCaseCardPanel({ card, showRecommended = true }: { card: UseCaseCard; showRecommended?: boolean }) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="relative overflow-hidden rounded-[24px] shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:col-span-6">
        <Image
          src={card.image}
          alt={card.title}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-8 lg:col-span-6">
        {showRecommended ? (
          <div className="rounded-[40px] border border-white/40 px-6 py-5 md:px-8">
            <p className="font-inter text-[15px] uppercase leading-[1.85] tracking-[0.1em] text-white/80 md:text-[14px] md:leading-normal md:tracking-[0.16em]">
              Recommended for
            </p>
            <ul className="mt-3 grid gap-x-10 gap-y-2 text-[15px] leading-[1.85] tracking-[0.1em] text-white/95 md:grid-cols-2">
              {card.bullets.map((bullet) => (
                <li key={bullet}>・{bullet}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <h3 className="text-[30px] leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[34px] md:leading-[1.2] md:tracking-[0.12em]">
            {card.title}
          </h3>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.85] tracking-[0.1em] text-white/88">
            {card.description}
          </p>
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
    </article>
  );
}

