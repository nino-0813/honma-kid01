import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 既定の localPatterns は `{ pathname: "**", search: "" }` のみ。
     * `url` にクエリが付くケースで 400 "url parameter is not allowed" になるのを避けるため、
     * pathname のみマッチ（search 未指定＝クエリ無視）。
     */
    localPatterns: [{ pathname: "/**" }],
    /**
     * 既定は [75] のみ。プロキシや将来の quality 指定で 400 にならないよう余裕を持たせる。
     */
    qualities: [60, 65, 70, 75, 80, 85, 90, 100],
  },
};

export default nextConfig;
