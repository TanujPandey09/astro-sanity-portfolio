export function optimizeSanityImage(url?: string, width = 1200, quality = 80): string {
  if (!url) return "";
  if (!url.includes("cdn.sanity.io")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=format&fit=max&w=${width}&q=${quality}`;
}
