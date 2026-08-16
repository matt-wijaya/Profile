const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeUrl(value: string) {
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return normalizeUrl(configuredUrl);

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return vercelUrl ? normalizeUrl(vercelUrl) : LOCAL_SITE_URL;
}
