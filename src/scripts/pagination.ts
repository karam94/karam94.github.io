/**
 * Pagination state management utilities
 * Handles URL-based pagination to support browser back/forward navigation
 */

/**
 * Get the current page number from URL query parameters
 * @returns The page number (defaults to 1 if invalid or not present)
 */
export function getPageFromURL(): number {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1');
  return isNaN(page) || page < 1 ? 1 : page;
}

/**
 * Update the URL with the current page number
 * Uses replaceState to avoid adding extra history entries
 * @param page - The page number to set in the URL
 * @param totalPages - The total number of pages (for clamping)
 */
export function updateURLForPage(page: number, totalPages: number): void {
  const url = new URL(window.location.href);

  // Remove query param for page 1 (cleaner URL)
  if (page === 1) {
    url.searchParams.delete('page');
  } else {
    url.searchParams.set('page', page.toString());
  }

  window.history.replaceState({ page }, '', url.toString());
}
