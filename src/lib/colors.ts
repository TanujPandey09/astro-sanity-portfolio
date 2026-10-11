export const tagColors = [
  "text-text-muted bg-surface-elevated/80 border-border-subtle hover:border-border-hover hover:text-text-primary",
  "text-accent-primary bg-accent-primary/10 border-accent-primary/20 hover:bg-accent-primary/15 hover:border-accent-primary/30",
  "text-text-primary bg-surface-card border-border-subtle hover:border-border-hover",
  "text-text-muted bg-surface-card/60 border-border-subtle hover:text-text-primary"
];

export const getTagColor = (tag) => {
  if (!tag) return tagColors[0];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return tagColors[Math.abs(hash) % tagColors.length];
};
