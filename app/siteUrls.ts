/** 佐渡Kids生きもの調査隊 2026年度隊員申込み（Google フォーム） */
export const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe9xOhQW6Z265HKFewMOxDnJP2MP6p3pvyuKDbRTNzb_SfTEQ/viewform?usp=publish-editor" as const;

/**
 * 申し込み導線の一括ON/OFF。
 * - true: デザインは表示したまま遷移（クリック）を無効化する
 * - false: 通常どおり外部フォームへ遷移する
 */
export const APPLICATION_FORM_DISABLED = true as const;
