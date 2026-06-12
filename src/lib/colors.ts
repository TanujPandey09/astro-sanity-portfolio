export const tagColors = [
  "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20",
  "text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/20",
  "text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/20",
  "text-[#14B8A6] bg-[#14B8A6]/10 border-[#14B8A6]/20",
  "text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/20",
  "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/20",
  "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
  "text-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/20",
  "text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/20"
];

export const getTagColor = (tag) => {
  if (!tag) return tagColors[0];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return tagColors[Math.abs(hash) % tagColors.length];
};
