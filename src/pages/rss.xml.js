import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getSlug } from '../utils/getSlug';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Karam\'s Blog',
    description: 'Thoughts on development, design, and technology',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${getSlug(post.id)}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
