import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';
import { blogPosts } from '@/lib/blog-data';
import { seoToolPages } from '@/lib/seo-pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticLastModified = new Date('2026-06-28');
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: staticLastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const toolRoutes: MetadataRoute.Sitemap = seoToolPages.map((page) => ({
    url: `${siteUrl}/tools/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
