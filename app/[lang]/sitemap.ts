import { siteConfig } from '@/config/siteConfig';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/en/editor'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    priority: 0.8,
  }));
  return [
    {
      url: siteConfig.url,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...routes,
  ];
}
