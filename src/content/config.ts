import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    excerpt: z.string().optional(),
    series: z.string().optional(),
    readingTime: z.number().optional(),
  }),
  // Generate slugs without the year folder prefix
  slug: ({ data, id }) => {
    // id is the full path like "2017/2017-03-09-post-name.md"
    // We want just the filename without the date prefix
    const filename = id.split('/').pop() || id;
    // Remove date prefix if it exists (YYYY-MM-DD- format)
    return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  },
});

export const collections = {
  blog: blogCollection,
};
