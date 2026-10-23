type PortableTextBlock = {
  _type?: string;
  children?: Array<{ text?: string }>;
};

export function portableTextToPlainText(blocks?: PortableTextBlock[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block?._type === "block")
    .map((block) => (block.children || []).map((child) => child?.text || "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
