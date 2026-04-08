import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "佐渡Kids生きもの調査隊公式サイトにおける個人情報の取り扱いについて定めたプライバシーポリシーです。",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full min-w-0 flex-1 overflow-x-hidden bg-[#7ECFDF] text-black">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-0">
        <article className="rounded-none bg-white px-5 py-12 text-black sm:px-8 md:px-10 md:py-16">
          <div className="mx-auto max-w-[720px]">
            <p className="text-[14px] tracking-[0.12em] text-black">
              <Link
                href="/"
                className="text-inherit underline-offset-4 transition hover:underline"
              >
                トップへ戻る
              </Link>
            </p>
            <h1 className="mt-8 text-center text-[26px] font-bold leading-[1.25] tracking-[0.1em] text-black md:text-[32px]">
              プライバシーポリシー
            </h1>
            <p className="mt-8 text-[15px] leading-[1.95] tracking-[0.08em] text-black">
              本ウェブサイト（以下、「本サイト」といいます。）では、個人情報の重要性を認識し、適切に取り扱うことを目的として、以下のプライバシーポリシーを定めます。
            </p>

            <section className="mt-12">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                1. 個人情報の取得について
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                本サイトでは、以下の場合に個人情報を取得することがあります。
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.9] tracking-[0.07em] text-black">
                <li>お問い合わせフォームのご利用時</li>
                <li>
                  「佐渡Kids生きもの調査隊」等の申込みフォーム（Googleフォーム）へのご入力時
                </li>
              </ul>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                取得する情報には、氏名、メールアドレス、電話番号、住所、その他お問い合わせ・申込み内容に関連する情報が含まれます。
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                2. 個人情報の利用目的
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                取得した個人情報は、以下の目的のために利用いたします。
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.9] tracking-[0.07em] text-black">
                <li>お問い合わせへの対応およびご連絡</li>
                <li>イベント（佐渡Kids生きもの調査隊等）の運営および参加者管理</li>
                <li>必要に応じたご案内や連絡</li>
                <li>サービス向上のための分析</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                3. 個人情報の管理
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                本サイトは、個人情報の漏えい、滅失、改ざんを防止するため、適切な安全管理措置を講じます。
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                4. 第三者提供について
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                取得した個人情報は、以下の場合を除き第三者に提供することはありません。
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.9] tracking-[0.07em] text-black">
                <li>本人の同意がある場合</li>
                <li>法令に基づく場合</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                5. 外部サービスの利用について
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                本サイトでは、申込み受付にGoogleフォーム等の外部サービスを利用する場合があります。
                これらのサービスに入力された個人情報は、各サービス提供者のプライバシーポリシーに基づいて管理されます。
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                6. 個人情報の開示・訂正・削除について
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                ご本人から、自己の個人情報について開示・訂正・削除のご希望があった場合には、適切に対応いたします。
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                7. プライバシーポリシーの変更
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                本ポリシーは、必要に応じて予告なく変更されることがあります。
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-[17px] font-bold leading-snug tracking-[0.1em] text-black md:text-[18px]">
                8. お問い合わせ窓口
              </h2>
              <p className="mt-4 text-[15px] leading-[1.95] tracking-[0.07em] text-black">
                本ポリシーに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="mt-6 space-y-3 text-[15px] leading-[1.85] tracking-[0.08em] text-black">
                <p>
                  <span className="font-medium text-black">MAIL : </span>
                  <a
                    href="mailto:contact@ikimono-sado.com"
                    className="text-inherit underline-offset-2 transition hover:underline"
                  >
                    contact@ikimono-sado.com
                  </a>
                </p>
                <p>
                  <span className="font-medium text-black">TEL : </span>
                  <a
                    href="tel:05036345251"
                    className="text-inherit underline-offset-2 transition hover:underline"
                  >
                    050-3634-5251
                  </a>
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
