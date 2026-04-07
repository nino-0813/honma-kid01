import Image from "next/image";
import { FAQ_GROUPS } from "@/app/components/faqData";

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#c4b8a8] px-5 py-20 text-white md:px-10 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/photo1.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1400px"
          className="object-cover object-center"
          priority={false}
        />
      </div>
      {/* 明るい写真の上でも白文字が読めるよう単一のスクリムのみ */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[880px]">
        <div className="text-center">
          <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-white/80">
            FAQ
          </p>
          <h2 className="mt-3 text-[30px] font-medium leading-[1.15] tracking-[0.08em] text-white md:text-[46px]">
            よくある質問
          </h2>
        </div>

        <div className="mt-14 space-y-12 md:mt-16 md:space-y-14">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="border-b border-white/25 pb-3 text-[15px] font-semibold leading-[1.85] tracking-[0.1em] text-white">
                {group.category}
              </h3>
              <div className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-[20px] border border-white/25 bg-white/[0.14] backdrop-blur-sm transition-colors open:bg-white/[0.18]"
                  >
                    <summary className="relative cursor-pointer list-none px-5 py-4 pr-10 text-[15px] font-medium leading-[1.85] tracking-[0.1em] text-white marker:content-none after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:text-lg after:text-white/55 after:transition-transform after:duration-200 after:content-['+'] group-open:after:rotate-45 md:px-6 md:py-5 md:pr-12 [&::-webkit-details-marker]:hidden">
                      <span className="mr-2 font-inter text-[15px] leading-[1.85] tracking-[0.1em] text-[color:var(--background)]">
                        Q.
                      </span>
                      {item.q}
                    </summary>
                    <div className="flex flex-col items-center justify-center border-t border-white/15 px-5 py-6 text-center md:px-6 md:py-7">
                      <p className="w-full text-[15px] leading-[1.85] tracking-[0.1em] text-white/95">
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

        <p className="mt-12 text-center text-[15px] font-medium leading-[1.85] tracking-[0.1em] text-white/80 md:mt-14">
          ご不明な点は、下記のお問い合わせ先までお気軽にご連絡ください。
        </p>
      </div>
    </section>
  );
}
