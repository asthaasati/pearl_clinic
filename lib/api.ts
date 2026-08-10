export function getApiBaseUrl(): string {
  let url = (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://pearl-clinic-abd0.onrender.com")
  )
    .trim()
    .replace(/\/$/, "");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  return url;
}

export const API_BASE_URL = getApiBaseUrl();
