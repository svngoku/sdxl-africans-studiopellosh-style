export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "http://localhost:3000/api/webhook"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/webhook`
    : `${process.env.NGROK_URL}/api/webhook`;

export const DEFAULT_PATTERN =
  "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/8uiaWqu-77Maq6Zn38dfz9iWwXsyaheFfOSJPL.png";
