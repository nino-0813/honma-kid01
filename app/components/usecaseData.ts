export type UseCaseCard = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

/** ホーム #usecase — 年間プログラム（全8回・文言は仮） */
export type AnnualProgramItem = {
  id: string;
  label: string;
  title: string;
  summary: string;
  image: string;
};

export const ANNUAL_PROGRAMS: AnnualProgramItem[] = [
  {
    id: "y1",
    label: "4月",
    title: "春の田んぼはじめ — 苗と水の生きもの",
    summary:
      "水田に水が入りはじめるころ。泥の中や水面を観察し、春だけの顔ぶれを記録します。",
    image: "/figma-assets/usecase-1-23bd32.png",
  },
  {
    id: "y2",
    label: "5月",
    title: "緑が広がる頃のフィールドウォーク",
    summary:
      "稲が育ちはじめた田んぼ周りを歩き、昆虫や鳥の気配を拾い上げます。",
    image: "/figma-assets/usecase-2-d783d7.png",
  },
  {
    id: "y3",
    label: "6月",
    title: "初夏の水辺 — 光と影の生きもの",
    summary:
      "水路やため池のそばで、水温や水草とともに誰が暮らしているか観察します。",
    image: "/figma-assets/usecase-3-48e433.png",
  },
  {
    id: "y4",
    label: "7月〜8月",
    title: "夏休みスペシャル・ロングフィールド",
    summary:
      "時間を少し長めにとり、昼と夕方で見え方の違いを比べる回です。詳細は追って案内します。",
    image: "/figma-assets/hero-1-65a613.png",
  },
  {
    id: "y5",
    label: "9月",
    title: "秋の田んぼ — 実りの手前の生きもの",
    summary:
      "稲穂が出てくる季節。食べものをめぐる生きものたちのつながりを調べます。",
    image: "/figma-assets/hero-2-65a613.png",
  },
  {
    id: "y6",
    label: "10月",
    title: "収穫のころの記録と比較",
    summary:
      "春の記録と見比べ、同じ場所で何が変わったかを隊員同士で話し合います。",
    image: "/figma-assets/hero-3-65a613.png",
  },
  {
    id: "y7",
    label: "11月",
    title: "冬にむけて — ノートと写真の整理",
    summary:
      "一年の観察を振り返り、写真やスケッチをまとめるワークに取り組みます。",
    image: "/figma-assets/hero-4-65a613.png",
  },
  {
    id: "y8",
    label: "3月",
    title: "年度まとめ — 発表と次のテーマ",
    summary:
      "簡単な発表の時間と、次年度に向けたアイデア出し。未就学〜中学生を想定した仮スケジュールです。",
    image: "/figma-assets/usecase-1-23bd32.png",
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

