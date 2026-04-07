import Image from "next/image";
import Reveal from "@/app/components/reveal";
import {
  ANNUAL_PROGRAMS,
  USECASE_RECRUITMENT_NOTICE_LINES,
  type NearImageIconConfig,
} from "@/app/components/usecaseData";

/**
 * 写真の角に「はみ出して重なる」既定レイアウト（参考: 上辺・角付近に白線画を載せる）。
 * 交互レイアウトで写真が左右反転するため、内側の角（本文側）に寄せる。
 */
function nearImageIconOverlapClass(index: number): string {
  const corner =
    index % 2 === 0
      ? "right-0 left-auto origin-bottom-right -translate-x-[18%]"
      : "left-0 right-auto origin-bottom-left translate-x-[18%]";
  return [
    "pointer-events-none absolute top-0 z-[2] block h-auto w-[104px] object-contain",
    "drop-shadow-[0_6px_18px_rgba(0,0,0,0.2)]",
    "md:w-[128px] lg:w-[140px]",
    "-translate-y-[46%] md:-translate-y-[44%] lg:-translate-y-[42%]",
    corner,
  ].join(" ");
}

function resolveNearImageIcon(
  raw: string | NearImageIconConfig | undefined,
): { src: string; customClassName?: string; sizes: string } | null {
  if (!raw) return null;
  if (typeof raw === "string") {
    return { src: raw, sizes: "140px" };
  }
  return {
    src: raw.src,
    customClassName: raw.className,
    sizes: raw.sizes ?? "140px",
  };
}

const ANNUAL_PROGRAM_BODY_CLASS =
  "whitespace-pre-line text-[15px] font-medium leading-[1.65] tracking-[0.08em] text-white md:max-w-none md:text-[15px] md:leading-[1.75]";

type UseCasePanelProps = {
  id?: string;
  className?: string;
  /** Smaller paddings for pinned stack panels. */
  density?: "default" | "stack";
  /** When false, the blue block backdrop is omitted (parent provides a fixed layer). */
  embeddedBackdrop?: boolean;
};

/**
 * パネル先頭用日付。モバイルは従来写真下サイズの約2倍（数字64px・月/日32px）、md以上は従来の大きい表示。
 */
function AnnualDateHeading({
  date,
  weekdayJa,
}: {
  date: string;
  weekdayJa?: string;
}) {
  const mt = "mt-0";
  const suffix =
    "text-[32px] leading-none tracking-[0.06em] md:text-[clamp(51px,5.7vw,66px)]";
  const num =
    "text-[64px] font-medium tabular-nums leading-none tracking-tight md:text-[clamp(90px,10.5vw,126px)]";
  const weekday =
    "ml-2 shrink-0 text-[clamp(26px,3.2vw,36px)] font-medium leading-none tracking-[0.06em] text-white/90 md:ml-3 md:text-[clamp(44px,4.5vw,58px)]";

  const full = /^(\d+)月(\d+)日$/.exec(date);
  if (full) {
    return (
      <p
        className={`${mt} flex w-full flex-wrap items-baseline justify-start gap-x-0 gap-y-1 leading-none text-white`}
      >
        <span className={num}>{full[1]}</span>
        <span className={suffix}>月</span>
        <span className={num}>{full[2]}</span>
        <span className={suffix}>日</span>
        {weekdayJa ? (
          <span className={weekday}>（{weekdayJa}）</span>
        ) : null}
      </p>
    );
  }
  const late = /^(\d+)月下旬$/.exec(date);
  if (late) {
    return (
      <p
        className={`${mt} flex w-full flex-wrap items-baseline justify-start leading-none text-white`}
      >
        <span className={num}>{late[1]}</span>
        <span className={suffix}>月下旬</span>
      </p>
    );
  }
  const monthOnly = /^(\d+)月$/.exec(date);
  if (monthOnly) {
    return (
      <p
        className={`${mt} flex w-full flex-wrap items-baseline justify-start leading-none text-white`}
      >
        <span className={num}>{monthOnly[1]}</span>
        <span className={suffix}>月</span>
      </p>
    );
  }
  return (
    <p
      className={`${mt} w-full text-left text-[32px] font-medium leading-none tracking-[0.06em] text-white md:text-[clamp(54px,6vw,72px)]`}
    >
      {date}
    </p>
  );
}

export default function UseCasePanel({
  id = "usecase",
  className = "",
  density = "default",
  embeddedBackdrop = true,
}: UseCasePanelProps) {
  return (
    <section
      id={id}
      className={[
        "relative w-full min-w-0 px-0 py-0",
        embeddedBackdrop ? "bg-[rgb(111,174,202)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")
        .trim()}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1540px]">
        <div
          className={[
            "relative w-full overflow-hidden bg-[rgb(111,174,202)] text-white",
            density === "stack"
              ? "px-5 pb-24 pt-14 md:px-10 md:pb-28 md:pt-16"
              : "px-5 pb-44 pt-20 md:px-10 md:pb-52 md:pt-24",
          ].join(" ")}
        >
          <Reveal>
            <div className="relative" data-usecase-cta-trigger>
              <p className="font-inter text-[16px] tracking-[0.16em] text-white">
                Program
              </p>
              <h2 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-[0.08em] text-white md:text-[46px] md:tracking-[0.06em]">
                年間プログラム
              </h2>
              <p className="mt-5 max-w-[820px] text-[15px] font-medium leading-[1.85] tracking-[0.1em] text-white">
                2026年度は全<strong className="font-semibold text-white">8回</strong>
                を予定しています。季節に合わせて田んぼ・水辺などのフィールドで観察と記録を重ねます。
              </p>
            </div>
          </Reveal>

          <div
            className={[
              "flex flex-col gap-14 md:gap-20 lg:gap-24",
              density === "stack" ? "mt-10" : "mt-12 md:mt-14",
            ].join(" ")}
          >
            <Reveal delay={0} variant="left">
              <aside
                className="w-full max-w-[820px] rounded-[16px] border border-white/25 bg-white/10 px-5 py-4 md:px-7 md:py-5"
                aria-label="募集情報"
              >
                <div className="flex flex-col gap-2 text-[14px] font-medium leading-[1.75] tracking-[0.08em] text-white md:gap-2.5 md:text-[15px]">
                  {USECASE_RECRUITMENT_NOTICE_LINES.map((line, i) => (
                    <p
                      key={`recruit-${i}`}
                      className={
                        line.startsWith("※")
                          ? "text-[13px] leading-[1.7] text-white/90 md:text-[14px]"
                          : ""
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </aside>
            </Reveal>

            {ANNUAL_PROGRAMS.map((p, index) => {
              const nearIcon = resolveNearImageIcon(p.nearImageIcon);
              const showFrame = p.showImageFrame !== false;
              const useContain = p.imageFit === "contain";
              const fitClass = useContain ? "object-contain" : "object-cover";
              const coverFocus =
                useContain || !p.imageObjectPosition
                  ? ""
                  : p.imageObjectPosition === "left"
                    ? "object-left"
                    : p.imageObjectPosition === "right"
                      ? "object-right"
                      : "";
              const objectPositionClass =
                !useContain && p.imageObjectPositionClass
                  ? p.imageObjectPositionClass
                  : coverFocus;
              return (
                <Reveal key={p.id} delay={(index % 4) * 60} variant={index % 2 === 0 ? "left" : "right"}>
                  <article
                    id={p.id}
                    className={[
                      "group relative flex w-full flex-col gap-5 md:items-stretch md:gap-10 lg:gap-14",
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                    ].join(" ")}
                  >
                    {/* 写真＋任意の装飾アイコン（モバイルは常に先頭／デスクトップは交互に左右） */}
                    <div className="relative w-full shrink-0 md:w-[min(42%,480px)] lg:w-[min(44%,520px)]">
                      <div
                        className={
                          showFrame
                            ? "relative overflow-hidden rounded-[16px] ring-2 ring-white ring-offset-0 lg:rounded-[20px]"
                            : "relative overflow-hidden rounded-[16px] lg:rounded-[20px]"
                        }
                      >
                        <div
                          className={[
                            "relative aspect-[16/10] w-full",
                            useContain ? "bg-[rgb(111,174,202)]" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            width={1200}
                            height={750}
                            className={[
                              "h-full w-full transition duration-500 ease-out group-hover:scale-[1.02]",
                              fitClass,
                              objectPositionClass,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            sizes="(max-width: 767px) 100vw, 480px"
                          />
                        </div>
                      </div>
                      {nearIcon ? (
                        <Image
                          src={nearIcon.src}
                          alt=""
                          width={426}
                          height={426}
                          className={
                            nearIcon.customClassName ??
                            nearImageIconOverlapClass(index)
                          }
                          sizes={nearIcon.sizes}
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    {/* 日付→タイトル→説明（カード枠なし） */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div
                        className={[
                          "flex min-w-0 flex-col gap-5 text-left md:gap-4",
                          index % 2 !== 0 ? "md:pl-8 xl:pl-16" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <AnnualDateHeading date={p.date} weekdayJa={p.weekdayJa} />
                        <h3 className="text-[clamp(20px,4.2vw,26px)] font-semibold leading-snug tracking-[0.06em] text-white md:text-[clamp(22px,2vw,28px)] md:leading-[1.25]">
                          {p.title}
                        </h3>
                        {p.summary ? (
                          <p className={ANNUAL_PROGRAM_BODY_CLASS}>{p.summary}</p>
                        ) : null}
                        {p.detail ? <p className={ANNUAL_PROGRAM_BODY_CLASS}>{p.detail}</p> : null}
                      </div>
                    </div>

                    {p.articleInsectDecoration ? (
                      <Image
                        src={
                          p.articleInsectDecoration.src ??
                          "/ikebeji/green/sadokids_green_insect%201.png"
                        }
                        alt=""
                        width={p.articleInsectDecoration.width ?? 230}
                        height={p.articleInsectDecoration.height ?? 180}
                        className={p.articleInsectDecoration.className}
                        sizes={p.articleInsectDecoration.sizes ?? "230px"}
                        aria-hidden
                      />
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
