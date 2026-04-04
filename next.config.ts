import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Vercel（Linux）で `/_next/image` が 400 になる対策。
     * 日本語＋合成文字（NFD）のファイル名は、オプティマイザ内部フェッチのパス解決と
     * `public` 実体がずれやすく、404 HTML を「画像ではない」として 400 になることがある。
     * 最適化をオフにして `/ikebeji/...` を静的配信のまま読み込む（`?dpl=` は img のみに付与）。
     */
    unoptimized: true,
    localPatterns: [{ pathname: "/**" }],
    qualities: [60, 65, 70, 75, 80, 85, 90, 100],
  },
};

export default nextConfig;
