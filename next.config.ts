import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * `public/ikebeji` は ASCII ファイル名に統一済み（`next/image` の本番最適化と相性良好）。
     * pathname のみマッチ（search 未指定＝クエリ無視）。
     */
    localPatterns: [{ pathname: "/**" }],
    qualities: [60, 65, 70, 75, 80, 85, 90, 100],
  },
};

export default nextConfig;
