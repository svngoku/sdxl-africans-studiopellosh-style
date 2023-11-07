import { kv } from "@vercel/kv";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids: string[] = [];
  let cursor = 0;
  do {
    const [nextCursor, keys] = await kv.scan(cursor, {
      match: "*",
      count: 1000,
    });
    cursor = nextCursor;
    ids.push(...keys);

    // recommended max sitemap size is 50,000 URLs
  } while (cursor !== 0 && ids.length < 50000);

  console.log(ids.length);

  return [
    {
      url: "http://localhost:3000",
      lastModified: new Date().toISOString(),
    },
    ...ids.map((id) => ({
      url: `http://localhost:3000/t/${id}`,
      lastModified: new Date().toISOString(),
    })),
  ];
}
