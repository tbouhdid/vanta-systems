/**
 * Shared viewport hierarchy for Concept Case Study interactions.
 * Keeping these levels named prevents independent demos from competing for
 * arbitrary z-index values.
 */
export const demoViewportLayers = {
  content: "z-0",
  stickyCta: "z-30",
  toast: "z-40",
  modal: "z-[60]",
} as const;
