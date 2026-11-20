export interface ResolvedDemoMedia {
  kind: "video" | "iframe";
  src: string;
}

/**
 * Resolves a Sanity uploaded video file or external video URL (Loom, YouTube, Vimeo, MP4/WebM)
 * into a clean player descriptor for MacBook Pro showcase stages.
 */
export function resolveDemoMedia(
  uploadedVideoUrl?: string | null,
  externalVideoUrl?: string | null
): ResolvedDemoMedia | null {
  const uploaded = typeof uploadedVideoUrl === "string" ? uploadedVideoUrl.trim() : "";
  if (uploaded) {
    return { kind: "video", src: uploaded };
  }

  const raw = typeof externalVideoUrl === "string" ? externalVideoUrl.trim() : "";
  if (!raw) return null;

  // Direct video file URL (.mp4, .webm, .mov, .m4v)
  if (/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(raw) || raw.includes("cdn.sanity.io/files/")) {
    return { kind: "video", src: raw };
  }

  // Loom share -> embed
  const loomMatch = raw.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/i);
  if (loomMatch?.[1]) {
    return { kind: "iframe", src: `https://www.loom.com/embed/${loomMatch[1]}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true` };
  }

  // YouTube watch / short / youtu.be -> embed
  const ytMatch = raw.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/i);
  if (ytMatch?.[1]) {
    return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1` };
  }

  // Vimeo -> player embed
  const vimeoMatch = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch?.[1]) {
    return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  return null;
}

