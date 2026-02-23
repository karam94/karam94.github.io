export function getReadingTime(content: string | undefined): number {
  if (!content) {
    return 5; // Default fallback
  }

  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
