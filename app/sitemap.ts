import { MetadataRoute } from 'next';
import { getBlogDate, getBlogPath, getBlogs } from '@/lib/blogs';
import { getSiteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    const blogs = await getBlogs();
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${siteUrl}${getBlogPath(blog)}`,
      lastModified: getBlogDate(blog) ? new Date(getBlogDate(blog)) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error(error);
    return staticRoutes;
  }
}
