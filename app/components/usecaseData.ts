export type UseCaseCard = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

/**
 * 年間プログラムの写真まわりに仮置きする装飾アイコン。
 * - `className` を省略 → `UseCasePanel` の既定（写真の上辺付近・角に重なる）
 * - 大きさ例: `w-[96px]` `md:w-[120px]`
 * - 位置の完全上書き: 任意の `absolute` 系ユーティリティを `className` に指定
 */
export type NearImageIconConfig = {
  src: string;
  className?: string;
  /** Next/Image の `sizes`（省略時はパネル側デフォルト） */
  sizes?: string;
};

/**
 * 記事ブロック内の緑昆虫などの装飾。
 * `ANNUAL_PROGRAMS` の各要素に直書きしているので、1回分の `className` を変えても他の回に影響しません。
 */
export type ArticleInsectDecoration = {
  /** 位置・サイズの Tailwind（`absolute` 系を含む） */
  className: string;
  width?: number;
  height?: number;
  sizes?: string;
  /** 省略時は既定の緑昆虫 PNG */
  src?: string;
};

/** ホーム #usecase — 年間プログラム（全8回・文言は仮） */
export type AnnualProgramItem = {
  id: string;
  label: string;
  date: string;
  title: string;
  summary: string;
  image: string;
  /** 装飾 PNG。文字列＝パスのみ／オブジェクトで位置・サイズを調整 */
  nearImageIcon?: string | NearImageIconConfig;
  /** 記事右下付近の昆虫装飾（回ごとに className で個別指定） */
  articleInsectDecoration?: ArticleInsectDecoration;
  /** 開催日の曜日（「日」「土」など）。`date` が「◯月◯日」のときだけ表示 */
  weekdayJa?: string;
};

/** 年間プログラム1回目（y1）の直前に表示する募集情報 */
export const USECASE_RECRUITMENT_NOTICE_LINES: readonly string[] = [
  "参加費 無料",
  "定員 40名",
  "対象 小学1年〜6年生",
  "※小学1年〜2年生は保護者同伴必須",
  "〆切 4月24日（金）",
  "年間を通して活動することが条件となります。",
];

export const ANNUAL_PROGRAMS: AnnualProgramItem[] = [
  {
    id: "y1",
    label: "4月",
    date: "4月26日",
    weekdayJa: "日",
    title: "入隊式・田んぼの準備・生きもの調査",
    summary:
      "田んぼに水が入り冬のあいだじっとしていた生きものたちがいっせいに動き出して、とてもにぎやかになるよ。ニホンアマガエルみたいなカエルが元気に動き回って、水に落ちた虫を食べるヒメアメンボも見られるかも。",
    image: "/ikebeji/4-26-entry-rice-prep-survey.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_insect%201.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[431px] top-[-96px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:0ms]",
    },
  },
  {
    id: "y2",
    label: "5月",
    date: "5月31日",
    weekdayJa: "日",
    title: "田植え・生きもの調査",
    summary:
      "稲が育ちはじめた田んぼ周りを歩き、昆虫や鳥の気配を拾い上げます。",
    image: "/ikebeji/5-31-rice-planting-survey.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_ちょうちょ.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[835px] top-[-125px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:220ms]",
    },
  },
  {
    id: "y3",
    label: "6月",
    date: "6月21日",
    weekdayJa: "日",
    title: "田んぼの草とり・生きもの調査",
    summary:
      "水路やため池のそばで、水温や水草とともに誰が暮らしているか観察します。",
    image: "/ikebeji/kids-survey-19.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_insect%20net.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[411px] top-[-115px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:440ms]",
    },
  },
  {
    id: "y4",
    label: "8月",
    date: "8月9日",
    weekdayJa: "日",
    title: "川の生きもの調査",
    summary: "時間を少し長めにとり、昼と夕方で見え方の違いを比べる回です。",
    image: "/ikebeji/8-9-river-life-survey.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_Fish.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[849px] top-[-131px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:660ms]",
    },
  },
  {
    id: "y5",
    label: "10月",
    date: "10月24日",
    weekdayJa: "土",
    title: "稲刈り・生きもの調査",
    summary:
      "稲穂が出てくる季節。食べものをめぐる生きものたちのつながりを調べます。",
    image: "/ikebeji/10-24-rice-harvest-survey.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_insect%202.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[429px] top-[-103px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:880ms]",
    },
  },
  {
    id: "y6",
    label: "11月",
    date: "11月22日",
    weekdayJa: "日",
    title: "収穫祭・お米販売準備",
    summary:
      "春の記録と見比べ、同じ場所で何が変わったかを隊員同士で話し合います。",
    image: "/ikebeji/kids-survey-22.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_rice.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[865px] top-[-125px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:1100ms]",
    },
  },
  {
    id: "y7",
    label: "12月",
    date: "12月",
    title: "お米販売",
    summary:
      "一年の観察を振り返り、写真やスケッチをまとめるワークに取り組みます。",
    image: "/ikebeji/12-rice-sale.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_toki.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[421px] top-[-114px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:1320ms]",
    },
  },
  {
    id: "y8",
    label: "2月",
    date: "2月下旬",
    title: "卒隊式・修了式",
    summary: "簡単な発表の時間と、次年度に向けたアイデア出し。",
    image: "/ikebeji/2-late-winter-graduation.jpg",
    articleInsectDecoration: {
      src: "/ikebeji/White/sadokids_png_White_flower%202.png",
      width: 230,
      height: 180,
      sizes: "230px",
      className:
        "absolute left-[865px] top-[-129px] z-20 h-[180px] w-[230px] object-contain gentle-float will-change-transform [animation-delay:1540ms]",
    },
  },
];

export const USECASE_CARDS: UseCaseCard[] = [
  {
    title: "Membership Use",
    description:
      "By becoming a member, you can enjoy daily access to Kosugiyu Tonari. Use it freely for your everyday work, meals, weekend relaxation, or community gatherings.",
    bullets: [
      "Looking for a remote work environment",
      "Want to cook or dine in a spacious kitchen",
      "Interested in community activities or events",
      "Looking to create a space outside of home",
    ],
    image: "/figma-assets/usecase-1-23bd32.png",
    id: "membership",
  },
  {
    title: "Drop in Use",
    description:
      "The co-working and cafe space is open to everyone. On weekends, the cafe menu is available from morning until early afternoon. We also offer a drop-in plan that includes a bath ticket.",
    bullets: [
      "Need a space for a work or reading",
      "Enjoy a drink after a bath",
      "Want a cozy place to relax on your day off",
      "Seeking casual neighborhood connections",
    ],
    image: "/figma-assets/usecase-2-d783d7.png",
    id: "dropin",
  },
  {
    title: "Take away",
    description:
      "Takeout drinks are available daily. Enjoy a refreshing craft cola, beer, or other beverages, perfect for that post-bath treat.",
    bullets: [
      "Pick up a drink on the way home",
      "Grab a quick refreshment after your bath",
      "Bring the neighborhood mood with you",
    ],
    image: "/figma-assets/usecase-3-48e433.png",
    id: "takeaway",
  },
];

