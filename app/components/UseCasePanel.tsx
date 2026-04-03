import Reveal from "@/app/components/reveal";
import UseCaseCardPanel from "@/app/components/UseCaseCardPanel";
import { USECASE_CARDS } from "@/app/components/usecaseData";

type UseCasePanelProps = {
  id?: string;
  className?: string;
  /** Which card to render. Use "all" to render the full list. */
  card?: 0 | 1 | 2 | "all";
  /** Smaller paddings for pinned stack panels. */
  density?: "default" | "stack";
  /** When false, the blue block backdrop is omitted (parent provides a fixed layer). */
  embeddedBackdrop?: boolean;
};

export default function UseCasePanel({
  id = "usecase",
  className = "",
  card = "all",
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
            <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-t-[32px] bg-[#568CBE] md:rounded-t-[24px]" />
          ) : null}

          <Reveal>
            <div>
              <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-white/80">
                Use Case
              </p>
              <h2 className="mt-4 text-[32px] leading-[1.12] tracking-[0.08em] text-[#FB876D] md:text-[46px]">
                こんな方におすすめ
              </h2>
            </div>
          </Reveal>

          {card === "all" ? (
            <div
              className={[
                "mt-14",
                density === "stack" ? "space-y-10 md:space-y-14" : "space-y-16 md:space-y-24",
              ].join(" ")}
            >
              {USECASE_CARDS.map((c, idx) => (
                <div key={c.id} id={c.id}>
                  <UseCaseCardPanel card={c} showRecommended={idx !== 2} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-14">
              <UseCaseCardPanel card={USECASE_CARDS[card]} showRecommended={card !== 2} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

