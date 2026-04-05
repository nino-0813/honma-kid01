import Image from "next/image";
import Reveal from "@/app/components/reveal";
import { ANNUAL_PROGRAMS } from "@/app/components/usecaseData";
import { APPLICATION_FORM_URL } from "@/app/siteUrls";

type UseCasePanelProps = {
  id?: string;
  className?: string;
  /** Smaller paddings for pinned stack panels. */
  density?: "default" | "stack";
  /** When false, the blue block backdrop is omitted (parent provides a fixed layer). */
  embeddedBackdrop?: boolean;
};

type AnnualDatePlacement = "photo" | "afterSummary";

/**
 * `4月26日` → 「4月」「26」「日」
 * - photo: 写真下（モバイルのみ表示は親で `md:hidden`）
 * - afterSummary: デスクトップ用の大きい日付（親で `hidden md:block`、パネル内は先頭に配置）
 */
function AnnualDateHeading({
  date,
  placement,
}: {
  date: string;
  placement: AnnualDatePlacement;
}) {
  const desk = placement === "afterSummary";
  const mt = desk ? "mt-0" : "mt-3";
  const monthUnit = desk
    ? "text-[clamp(51px,5.7vw,66px)] leading-none tracking-[0.06em]"
    : "text-[16px] leading-none tracking-[0.06em]";
  const dayNum = desk
    ? "text-[clamp(90px,10.5vw,126px)] font-medium tabular-nums leading-none tracking-tight"
    : "text-[32px] font-medium tabular-nums leading-none tracking-tight";
  const daySuffix = desk
    ? "text-[clamp(51px,5.7vw,66px)] leading-none tracking-[0.06em]"
    : "text-[16px] leading-none tracking-[0.06em]";

  const full = /^(\d+)月(\d+)日$/.exec(date);
  if (full) {
    return (
      <p className={`${mt} flex flex-wrap items-baseline text-white`}>
        <span className={dayNum}>{full[1]}</span>
        <span className={daySuffix}>月</span>
        <span className={dayNum}>{full[2]}</span>
        <span className={daySuffix}>日</span>
      </p>
    );
  }
  const late = /^(\d+)月下旬$/.exec(date);
  if (late) {
    if (desk) {
      return (
        <p className={`${mt} flex flex-wrap items-baseline text-white`}>
          <span className={dayNum}>{late[1]}</span>
          <span className={monthUnit}>月下旬</span>
        </p>
      );
    }
    return (
      <p className={`${mt} text-[16px] leading-none tracking-[0.06em] text-white`}>
        {late[1]}月下旬
      </p>
    );
  }
  if (desk) {
    return (
      <p
        className={`${mt} text-[clamp(54px,6vw,72px)] font-medium leading-none tracking-[0.06em] text-white`}
      >
        {date}
      </p>
    );
  }
  return (
    <p className={`${mt} text-[16px] leading-none tracking-[0.06em] text-white`}>{date}</p>
  );
}

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
    <section id={id} className={["relative px-0 py-0", className].join(" ").trim()}>
      {embeddedBackdrop ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[#7ECFDF]"
          aria-hidden
        />
      ) : null}
      <div className="relative z-10 mx-auto max-w-[1540px]">
        <div
          className={[
            "relative overflow-hidden text-white",
            density === "stack"
              ? "px-5 pb-24 pt-14 md:px-10 md:pb-28 md:pt-16"
              : "px-5 pb-44 pt-20 md:px-10 md:pb-52 md:pt-24",
          ].join(" ")}
        >
          <Reveal>
            <div>
              <p className="font-inter text-[16px] lowercase tracking-[0.16em] text-white/80">
                annual program
              </p>
              <h2 className="mt-4 text-[30px] leading-[1.15] tracking-[0.08em] text-[#006B2B] md:text-[46px] md:tracking-[0.06em]">
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
              "flex flex-col gap-14 md:gap-20 lg:gap-24",
              density === "stack" ? "mt-10" : "mt-12 md:mt-14",
            ].join(" ")}
          >
            {ANNUAL_PROGRAMS.map((p, index) => (
              <Reveal key={p.id} delay={(index % 4) * 60} variant={index % 2 === 0 ? "left" : "right"}>
                <article
                  id={p.id}
                  className={[
                    "group flex w-full flex-col gap-5 md:items-stretch md:gap-10 lg:gap-14",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  ].join(" ")}
                >
                  {/* 写真＋ラベル（モバイルは常に先頭／デスクトップは交互に左右） */}
                  <div className="w-full shrink-0 md:w-[min(42%,480px)] lg:w-[min(44%,520px)]">
                    <div className="relative overflow-hidden rounded-[16px] ring-2 ring-white ring-offset-0 lg:rounded-[20px]">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={1200}
                          height={750}
                          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(max-width: 767px) 100vw, 480px"
                        />
                      </div>
                    </div>
                    <div className="md:hidden">
                      <AnnualDateHeading date={p.date} placement="photo" />
                    </div>
                  </div>

                  {/* 右：デスクトップは日付→タイトル→説明の順で一塊のパネル */}
                  <div className="flex min-w-0 flex-1 flex-col rounded-[18px] border border-white/20 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] md:rounded-[22px] md:p-8 md:pt-7 lg:p-10 lg:pt-9">
                    <div className="flex min-w-0 flex-col gap-3 md:gap-4">
                      <div className="hidden md:block md:border-b md:border-white/15 md:pb-5">
                        <AnnualDateHeading date={p.date} placement="afterSummary" />
                      </div>
                      <h3 className="text-[clamp(20px,4.2vw,26px)] font-semibold leading-snug tracking-[0.06em] text-[#006B2B] md:text-[clamp(22px,2vw,28px)] md:leading-[1.25] md:pt-1">
                        {p.title}
                      </h3>
                      <p className="text-[15px] leading-[1.65] tracking-[0.08em] text-white/95 md:max-w-none md:text-[15px] md:leading-[1.75]">
                        {p.summary}
                      </p>
                    </div>
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
                href={APPLICATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link inline-flex items-center gap-3 rounded-[14px] bg-white px-8 py-4 text-[14px] tracking-[0.16em] text-[#7ECFDF] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
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
