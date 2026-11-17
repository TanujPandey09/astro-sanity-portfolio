export function optimizeSanityImage(url?: string, width = 1200, quality = 80): string {
  if (!url) return "";
  if (!url.includes("cdn.sanity.io")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}fm=webp&auto=format&fit=max&w=${width}&q=${quality}`;
}

export function optimizePortraitImage(
  url?: string,
  preset: "home" | "about" = "home",
  hotspot?: { x?: number; y?: number } | null
): string {
  const defaultMountainUrl =
    "https://cdn.sanity.io/images/fqd3bez7/production/adbbc35d9515fd0de64f9ceebd01bdff0965fe38-3024x4032.webp";
  const target = url || defaultMountainUrl;

  if (!target.includes("cdn.sanity.io")) return target;

  // Fallback crop when the default archive mountain asset is rendered
  if (target.includes("adbbc35d9515fd0de64f9ceebd01bdff0965fe38")) {
    return `${target.split("?")[0]}?rect=720,180,1800,2250&w=900&h=1125&fm=webp&auto=format&q=90`;
  }

  const width = preset === "about" ? 1000 : 900;
  const height = preset === "about" ? 1250 : 1125;
  const fpX = typeof hotspot?.x === "number" ? hotspot.x.toFixed(2) : "0.50";
  const fpY = typeof hotspot?.y === "number" ? hotspot.y.toFixed(2) : "0.28";
  const baseUrl = target.split("?")[0];
  return `${baseUrl}?fm=webp&auto=format&fit=crop&crop=focalpoint&fp-x=${fpX}&fp-y=${fpY}&w=${width}&h=${height}&q=90`;
}
