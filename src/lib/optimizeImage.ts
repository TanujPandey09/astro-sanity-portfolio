export function optimizeSanityImage(url?: string, width = 1200, quality = 80): string {
  if (!url) return "";
  if (!url.includes("cdn.sanity.io")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}fm=webp&auto=format&fit=max&w=${width}&q=${quality}`;
}

export function optimizePortraitImage(url?: string, preset: "home" | "about" = "home"): string {
  const defaultMountainUrl =
    "https://cdn.sanity.io/images/fqd3bez7/production/adbbc35d9515fd0de64f9ceebd01bdff0965fe38-3024x4032.webp";
  const target = url || defaultMountainUrl;

  if (!target.includes("cdn.sanity.io")) return target;

  // Tailored focal crops for existing Sanity portrait assets so faces & upper torsos fill 4:5 editorial frames
  if (target.includes("adbbc35d9515fd0de64f9ceebd01bdff0965fe38")) {
    return `${target.split("?")[0]}?rect=720,180,1800,2250&w=900&h=1125&fm=webp&auto=format&q=90`;
  }
  if (target.includes("5e8bef4d15a1bfaecd1716aefb7de660b91e1dba")) {
    return `${target.split("?")[0]}?rect=265,330,800,1000&w=1000&h=1250&fm=webp&auto=format&q=90`;
  }

  const width = preset === "about" ? 1000 : 900;
  const height = preset === "about" ? 1250 : 1125;
  const separator = target.includes("?") ? "&" : "?";
  return `${target}${separator}fm=webp&auto=format&fit=crop&crop=faces,entropy&w=${width}&h=${height}&q=90`;
}
