import Image from "next/image";
import Reveal from "@/app/components/reveal";
import { ANNUAL_PROGRAMS, ANNUAL_PROGRAM_RECOMMENDED_GRAPHIC } from "@/app/components/usecaseData";

type UseCasePanelProps = {
  id?: string;
  className?: string;
  /** Smaller paddings for pinned stack panels. */
  density?: "default" | "stack";
  /** When false, the blue block backdrop is omitted (parent provides a fixed layer). */
  embeddedBackdrop?: boolean;
};

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

export default function UseCasePanel({
  id = "usecase",
  className = "",
  density = "default",
  embeddedBackdrop = true,
}: UseCasePanelProps) {
  return (
    <section id={id} className={["px-0 py-0", className].join(" ").trim()}>
      <div className="mx-auto max-w-[1540px]">
        <div
          className={[
            "relative z-10 overflow-hidden text-white",
            density === "stack"
              ? "px-5 pb-24 pt-14 md:px-10 md:pb-28 md:pt-16"
              : "px-5 pb-44 pt-20 md:px-10 md:pb-52 md:pt-24",
          ].join(" ")}
        >
          {embeddedBackdrop ? (
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[#568CBE]" />
          ) : null}

          <Reveal>
            <div>
              <p className="font-inter text-[16px] lowercase tracking-[0.16em] text-white/80">
                annual program
              </p>
              <h2 className="mt-4 text-[30px] leading-[1.15] tracking-[0.08em] text-[#FF8E7D] md:text-[46px]">
                年間プログラム
              </h2>
              <p className="mt-5 max-w-[820px] text-[15px] leading-[1.85] tracking-[0.1em] text-white/88">
                2026年度は全<strong className="font-semibold text-white">8回</strong>
                を予定しています。季節に合わせて田んぼ・水辺などのフィールドで観察と記録を重ねます。開催日・対象年齢・参加方法は決まり次第お知らせします（内容は仮のイメージです）。
              </p>
            </div>
          </Reveal>

          <div
            className={[
              "grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16",
              density === "stack" ? "mt-10" : "mt-12 md:mt-14",
            ].join(" ")}
          >
            {ANNUAL_PROGRAMS.map((p, index) => (
              <Reveal key={p.id} delay={(index % 4) * 60} variant={index % 2 === 0 ? "left" : "right"}>
                <article
                  id={p.id}
                  className="group flex h-full w-full flex-col gap-5"
                >
                  {/* 参考モック：白枠の角丸写真 */}
                  <div className="relative overflow-hidden rounded-[16px] ring-2 ring-white ring-offset-0">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={p.image}
                        alt={p.title}
                        width={1200}
                        height={750}
                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-inter text-[12px] tracking-[0.12em] text-white/70">
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-white/90">{p.label}</span>
                    <span className="tabular-nums text-white/55">
                      {String(index + 1).padStart(2, "0")} / 08
                    </span>
                  </p>
                  <h3 className="text-[clamp(20px,4.2vw,26px)] font-semibold leading-snug tracking-[0.06em] text-[#F7A89A]">
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] tracking-[0.08em] text-white/95">
                    {p.summary}
                  </p>
                  {/* 仮：説明直下に共通の「おすすめ」ビジュアル（後で個別化） */}
                  <div className="w-full overflow-hidden rounded-[12px]">
                    <Image
                      src={ANNUAL_PROGRAM_RECOMMENDED_GRAPHIC}
                      alt=""
                      width={800}
                      height={420}
                      aria-hidden
                      className="h-auto w-full object-contain object-left"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <a
                      href="#faq"
                      className="arrow-link inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[13px] font-medium tracking-[0.14em] text-[#568CBE] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-white/95"
                    >
                      <span className="lowercase">read more</span>
                      <ArrowIcon />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-col items-center gap-4 md:mt-20">
              <p className="text-center text-[15px] leading-[1.85] tracking-[0.1em] text-white/80">
                参加をご希望の方は、お気軽にお問い合わせください。
              </p>
              <a
                href="#faq"
                className="arrow-link inline-flex items-center gap-3 rounded-[14px] bg-white px-8 py-4 text-[14px] tracking-[0.16em] text-[#4d84c5] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
              >
                <span>お問い合わせ・お申し込み</span>
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
