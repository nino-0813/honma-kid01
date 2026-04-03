import Image from "next/image";
import { FAQ_GROUPS } from "@/app/components/faqData";

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden rounded-[32px] bg-[#568CBE] px-5 py-20 text-white shadow-[0_32px_100px_-24px_rgba(25,55,95,0.28)] md:px-10 md:py-24"
    >
      {/* 奥行き：ポスター → 青のベール（従来のトーン）→ 従来どおり薄いテクスチャ */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/figma-assets/スクリーンショット 2026-04-03 14.03.42.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1400px"
          className="object-cover object-center"
          priority={false}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[#568CBE]/[0.88]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/figma-assets/footer-bg-5c67b6.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[880px]">
        <div className="text-center">
          <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-white/80">
            FAQ
          </p>
          <h2 className="mt-3 text-[30px] leading-[1.15] tracking-[0.08em] text-white md:text-[46px]">
            よくある質問
          </h2>
        </div>

        <div className="mt-14 space-y-12 md:mt-16 md:space-y-14">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="border-b border-white/25 pb-3 text-[15px] font-semibold tracking-[0.12em] text-[#FB876D] md:text-[16px]">
                {group.category}
              </h3>
              <div className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-[20px] border border-white/25 bg-white/[0.14] backdrop-blur-sm transition-colors open:bg-white/[0.18]"
                  >
                    <summary className="relative cursor-pointer list-none px-5 py-4 pr-10 text-[15px] font-medium leading-relaxed tracking-[0.06em] text-white marker:content-none after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:text-lg after:text-white/55 after:transition-transform after:duration-200 after:content-['+'] group-open:after:rotate-45 md:px-6 md:py-5 md:text-[16px] md:pr-12 [&::-webkit-details-marker]:hidden">
                      <span className="mr-2 font-inter text-[13px] text-[#FB876D]">Q.</span>
                      {item.q}
                    </summary>
                    <div className="border-t border-white/15 px-5 pb-5 pt-0 md:px-6 md:pb-6">
                      <p className="text-[14px] leading-[2] tracking-[0.06em] text-white/95 md:text-[15px]">
                        <span className="mr-2 font-inter font-semibold text-white/90">A.</span>
                        {item.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-[13px] leading-relaxed tracking-[0.08em] text-white/80 md:mt-14 md:text-[14px]">
          その他のご質問は、募集のご案内時に記載の連絡先までお問い合わせください。
        </p>
      </div>
    </section>
  );
}
