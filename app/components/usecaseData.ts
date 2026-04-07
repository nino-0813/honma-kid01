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
  /** 1段落目（任意・y1 のみなど） */
  summary?: string;
  image: string;
  /** 装飾 PNG。文字列＝パスのみ／オブジェクトで位置・サイズを調整 */
  nearImageIcon?: string | NearImageIconConfig;
  /** 記事右下付近の昆虫装飾（回ごとに className で個別指定） */
  articleInsectDecoration?: ArticleInsectDecoration;
  /** 開催日の曜日（「日」「土」など）。`date` が「◯月◯日」のときだけ表示 */
  weekdayJa?: string;
  /** `summary` に続く本文（任意・2段落目） */
  detail?: string;
  /** `object-cover` の基準（横長で片側だけ見せたいとき） */
  imageObjectPosition?: "left" | "center" | "right";
  /** `object-position` を上書き（例: `object-[42%_center]` で左寄りの微調整） */
  imageObjectPositionClass?: string;
  /** `contain`＝枠内に全体表示（横長ポスターなど）。既定は `cover` */
  imageFit?: "cover" | "contain";
  /** false で白 ring・角丸なし（既定は枠あり） */
  showImageFrame?: boolean;
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
    title: "入隊式・田んぼの準備",
    summary:
      "田んぼに水が入り冬のあいだじっとしていた生きものたちがいっせいに動き出して、とてもにぎやかになるよ。ニホンアマガエルみたいなカエルが元気に動き回って、水に落ちた虫を食べるヒメアメンボも見られるかも。",
    image: "/ikebeji/1_0.png",
    imageObjectPositionClass: "object-[30%_center]",
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
    title: "田植え",
    detail:
      "田植えのころになると、ドジョウがよく見られるようになるよ。そして、そのドジョウを食べるサギみたいな鳥もやってくるんだ。水の中の虫やカメムシの仲間もふえて、ヤゴやハシリグモ、コモリグモも見つけやすくなるよ。",
    image: "/ikebeji/2_0.png",
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
    title: "田んぼの管理",
    detail:
      "6月になると、虫たちがもっとたくさん見られるよ。コガムシやヒメゲンゴロウみたいな水の中の虫や、ミズカマキリ、コミズムシもいるよ。それから、トンボの子どもであるヤゴが大人のトンボになる時期でもあるんだ。",
    image: "/ikebeji/3_01.png",
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
    title: "夏休みスペシャル",
    detail:
      "川に行くと、田んぼとはちがう生きものがたくさん。アユやヤマメみたいな魚や、ウキゴリ、ヨシノボリもくらしているんだ。虫では、ヘビトンボの子どもや、石や葉っぱでおうちを作るトビケラの仲間もいるよ。",
    image: "/ikebeji/4_0.png",
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
    title: "稲刈り",
    detail:
      "秋になると、夏のあいだ山にいたアキアカネが田んぼにおりてきて、赤ちゃんをふやしはじめるよ。田んぼの上がトンボでいっぱいになることもあるんだ。ウスバキトンボやノシメトンボも見られて、秋の終わりごろには水におなかをつけてたまごをうむよ。",
    image: "/ikebeji/5_0.png",
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
    title: "収穫祭",
    detail:
      "自分たちでつくったお米と他のお米を食べ比べてみよう。お米の勉強をみんなでして、お米を買ってもらう人たちに作り手としてどんなことが伝えられるか一緒に考えてみよう。あったかい豚汁と自分たちでつくったご飯は最高だよね。",
    image: "/ikebeji/6_02.png",
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
    title: "お米を届ける",
    detail:
      "この1年学んできたことを発表してみよう。佐渡の人だけでなく、都会の人たちにも佐渡の魅力と美味しいお米を教えてあげよう。どんな人たちが買ってくれるか、楽しみだね。",
    image: "/ikebeji/7_0.3png.png",
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
    date: "2月",
    title: "卒隊式・修了式",
    detail:
      "一緒に学んできたお友だちともお別れ。また次の年も一緒に遊ぼうね。最後はみんなで餅つきをしたりして思いっきり楽しもう！",
    image: "/ikebeji/8_0.4png.png",
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

