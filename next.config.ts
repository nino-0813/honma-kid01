import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * 開発時の `/_next/image` 遅延・環境差を避け、確実に `public` を直配信する。
     * （ASCII リネーム後もオプティマイザを戻す場合は false に）
     */
    unoptimized: true,
    localPatterns: [{ pathname: "/**" }],
    qualities: [60, 65, 70, 75, 80, 85, 90, 100],
  },
};

export default nextConfig;
