import type { MetadataRoute } from "next";

const baseUrl = "https://www.ikimono-sado.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/privacy`, lastModified },
    { url: `${baseUrl}/usecase`, lastModified },
  ];
}

