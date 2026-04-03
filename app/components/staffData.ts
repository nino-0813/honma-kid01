export type StaffMember = {
  id: string;
  role: string;
  name: string;
  reading: string;
  bio: string;
  image: string;
};

/** 写真・文言は仮（差し替え前提） */
export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "s1",
    role: "フィールドリーダー",
    name: "尾原",
    reading: "おはら",
    bio: "福祉を学ぶ学生スタッフ。子どもたちのペースに合わせて観察をサポートします。",
    image: "/figma-assets/usecase-1-23bd32.png",
  },
  {
    id: "s2",
    role: "サポーター",
    name: "野口",
    reading: "のぐち",
    bio: "長年の経験をチームに持ち込む、元気なリタイア組のサポーターです。",
    image: "/figma-assets/usecase-2-d783d7.png",
  },
  {
    id: "s3",
    role: "野外プログラム代表",
    name: "野口 剛",
    reading: "のぐち ごう",
    bio: "外資系企業での経験を経て、農業と地域貢献に取り組んでいます。",
    image: "/figma-assets/usecase-3-48e433.png",
  },
  {
    id: "s4",
    role: "記録・広報担当",
    name: "野口 樹里",
    reading: "のぐち じゅり",
    bio: "アレルギーを乗り越えて調査記録に関わる道を選び、教育にも関心を持っています。",
    image: "/figma-assets/hero-1-65a613.png",
  },
  {
    id: "s5",
    role: "ゲスト講師（例）",
    name: "佐渡 みどり",
    reading: "さど みどり",
    bio: "水辺の生きものに詳しく、季節ごとの観察ポイントを一緒に考えます。",
    image: "/figma-assets/hero-2-65a613.png",
  },
];
