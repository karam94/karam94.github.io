/**
 * Generate a clean slug from a post ID
 * Removes date prefix (YYYY-MM-DD-) and .md extension
 *
 * @param id - The post ID (e.g., "2017/2017-03-09-post-name.md")
 * @returns The clean slug (e.g., "post-name")
 */
export function getSlug(id: string): string {
  const filename = id.split('/').pop() || id;
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}
