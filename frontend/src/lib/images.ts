type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

/**
 * Builds a deterministic, hosted image URL from a descriptive prompt.
 * Used for editorial / section imagery so no placeholder assets are needed.
 */
export function img(prompt: string, size: ImageSize = "landscape_16_9"): string {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    clean
  )}&image_size=${size}`;
}
