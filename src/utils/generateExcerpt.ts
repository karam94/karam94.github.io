/**
 * Generate an excerpt from post content
 * Strips markdown and HTML, limits to specified length
 */
export function generateExcerpt(
  content: string | undefined,
  maxLength: number = 200
): string {
  if (!content) {
    return '';
  }

  // Remove markdown syntax
  let excerpt = content
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/___([^_]+)___/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Truncate to max length
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength - 3).trim();
    // Find last complete word
    const lastSpace = excerpt.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.7) {
      excerpt = excerpt.substring(0, lastSpace);
    }
    excerpt += '...';
  }

  return excerpt;
}
