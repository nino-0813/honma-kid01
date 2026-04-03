import ScrollJackPin from "@/app/components/ScrollJackPin";
import UseCasePanel from "@/app/components/UseCasePanel";

export default function UseCasePage() {
  return (
    <main className="bg-white text-[#444]">
      <ScrollJackPin
        previous={
          <div className="mx-auto flex h-dvh max-w-[1920px] flex-col items-center justify-center gap-6 px-4 py-6 md:px-6">
            <div className="max-w-[920px] text-center">
              <p className="font-inter text-[16px] uppercase tracking-[0.16em] text-[#444]/70">
                Scroll Jack
              </p>
              <h1 className="mt-4 text-[32px] leading-[1.2] tracking-[0.08em] text-[#444] md:text-[46px]">
                前のページが止まって、次がせり上がる
              </h1>
              <p className="mt-6 text-[15px] leading-[2] tracking-[0.12em] text-[#444]/80">
                下にスクロールすると、次のセクションが連続的に上がってきて前の面を覆います。
              </p>
            </div>
          </div>
        }
        next={
          <div className="mx-auto flex h-dvh max-w-[1920px] items-center justify-center px-4 py-6 md:px-6">
            <UseCasePanel id="usecase" className="w-full rounded-[32px]" />
          </div>
        }
      />
    </main>
  );
}

