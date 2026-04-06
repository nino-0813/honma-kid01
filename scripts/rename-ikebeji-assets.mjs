/**
 * One-shot: rename public/ikebeji assets to ASCII-safe names (git mv).
 * Run from repo root: node scripts/rename-ikebeji-assets.mjs
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const dir = join(root, "public/ikebeji");

const EVENT_MAP = new Map([
  ["10_24 稲刈り・生きもの調査.jpg", "10-24-rice-harvest-survey.jpg"],
  ["12月 お米販売.jpg", "12-rice-sale.jpg"],
  ["2月下旬 卒隊式・修了式.jpg", "2-late-winter-graduation.jpg"],
  ["4_26 入隊式・田んぼの準備・生きもの調査.jpg", "4-26-entry-rice-prep-survey.jpg"],
  ["5_31 田植え・生きもの調査.jpg", "5-31-rice-planting-survey.jpg"],
  ["8_9 川の生きもの調査.jpg", "8-9-river-life-survey.jpg"],
]);

const PNG_MAP = new Map([
  ["sadokids_png_Black_ leaf .png", "sadokids_png_Black_leaf.png"],
  ["sadokids_png_Black_cloud 1.png", "sadokids_png_Black_cloud_1.png"],
  ["sadokids_png_Black_cloud 2.png", "sadokids_png_Black_cloud_2.png"],
  ["sadokids_png_Black_flower 1.png", "sadokids_png_Black_flower_1.png"],
  ["sadokids_png_Black_flower 2.png", "sadokids_png_Black_flower_2.png"],
  ["sadokids_png_Black_insect 1.png", "sadokids_png_Black_insect_1.png"],
  ["sadokids_png_Black_insect 2.png", "sadokids_png_Black_insect_2.png"],
  ["sadokids_png_Black_insect 3.png", "sadokids_png_Black_insect_3.png"],
  ["sadokids_png_Black_insect cage.png", "sadokids_png_Black_insect_cage.png"],
  ["sadokids_png_Black_insect net.png", "sadokids_png_Black_insect_net.png"],
  ["sadokids_png_Black_leaves 1.png", "sadokids_png_Black_leaves_1.png"],
  ["sadokids_png_Black_leaves 2.png", "sadokids_png_Black_leaves_2.png"],
  ["sadokids_png_Black_leaves 3.png", "sadokids_png_Black_leaves_3.png"],
  ["sadokids_png_Black_leaves 4.png", "sadokids_png_Black_leaves_4.png"],
  ["sadokids_png_Black_symbol 1.png", "sadokids_png_Black_symbol_1.png"],
  ["sadokids_png_Black_symbol 2.png", "sadokids_png_Black_symbol_2.png"],
  ["sadokids_png_Black_symbol 3.png", "sadokids_png_Black_symbol_3.png"],
  ["sadokids_png_Black_symbol 4.png", "sadokids_png_Black_symbol_4.png"],
  ["sadokids_png_Black_symbol 5.png", "sadokids_png_Black_symbol_5.png"],
  ["sadokids_png_Black_ちょうちょ.png", "sadokids_png_Black_chocho.png"],
]);

function gitmv(from, to) {
  const a = join("public/ikebeji", from);
  const b = join("public/ikebeji", to);
  console.log(`${from} -> ${to}`);
  execFileSync("git", ["mv", a, b], { cwd: root, stdio: "inherit" });
}

for (const f of readdirSync(dir)) {
  if (EVENT_MAP.has(f)) {
    gitmv(f, EVENT_MAP.get(f));
    continue;
  }
  if (PNG_MAP.has(f)) {
    gitmv(f, PNG_MAP.get(f));
    continue;
  }
  const m = f.match(/調査隊-(\d+)\.jpg$/);
  if (m) {
    gitmv(f, `kids-survey-${m[1]}.jpg`);
  }
}

console.log("Done.");
