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
    role: "企画・運営担当",
    name: "本間 涼",
    reading: "ほんま りょう",
    bio: "天然パーマのりょうくん。みんなが好きに没頭できるように、プログラム全体を担当するリーダー。",
    image: "/images/staff-kamuki.webp",
  },
  {
    id: "s2",
    role: "生きもの調査講師",
    name: "上之山 篤人",
    reading: "うえのやま あつと",
    bio: "KidsのOBでもある、あつと先生。生きものが好きで好きで、仕事にまでしてしまった高校生。",
    image: "/images/staff-uemoyama.webp",
  },
  {
    id: "s3",
    role: "サポート講師",
    name: "佐々木 邦基",
    reading: "ささき くにもと",
    bio: "お米からお酒まで作るくにもと先生。農家の視点から生きものについて解説してくれます。",
    image: "/images/staff-sasaki.webp",
  },
  {
    id: "s4",
    role: "農家歌手",
    name: "荒井 ルカ",
    reading: "あらい るか",
    bio: "歌うのが大好きなルカ。イケベジの農業担当として、Kidsの田んぼを1年間一緒につくります。",
    image: "/images/LINE_ALBUM_ルカ写真_260406_9-2.webp",
  },
  {
    id: "s5",
    role: "運営サポーター",
    name: "合田 将晃",
    reading: "ごうだ まさあき",
    bio: "Kidsを陰で支えるごうだくん。親御さんもお子さんも、わからないことはなんでも聞いてください。",
    image: "/images/staff-goda.webp",
  },
  {
    id: "s6",
    role: "撮影・ご飯担当",
    name: "嘉向 徹",
    reading: "かむき とおる",
    bio: "ごはんが大好きなとおるくん。みんなのキラキラとした瞬間をカメラで追いかけます。",
    image: "/images/staff-honma.webp",
  },
];
