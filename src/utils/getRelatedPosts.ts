import type { CollectionEntry } from 'astro:content';
import { getSlug } from './getSlug';

export interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  heroImage?: string;
  category: string;
  readingTime?: number;
}

/**
 * Find related posts based on category match
 * @param currentPostCategory - Category of the current post
 * @param allPosts - All blog posts to search through
 * @param currentPostSlug - Slug of current post to exclude
 * @param limit - Maximum number of related posts to return
 */
export function getRelatedPosts(
  currentPostCategory: string,
  allPosts: CollectionEntry<'blog'>[],
  currentPostSlug: string,
  limit: number = 2
): RelatedPost[] {
  // Filter posts by matching category
  const related = allPosts
    .filter((post) => post.slug !== currentPostSlug && !post.data.draft && post.data.category === currentPostCategory)
    .sort((a, b) => {
      // Sort by date (more recent first)
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    })
    .slice(0, limit);

  return related.map((post) => ({
    slug: getSlug(post.id),
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    heroImage: post.data.heroImage,
    category: post.data.category,
    readingTime: post.data.readingTime,
  }));
}
