import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JD Desktop - POS Platform',
    short_name: 'JD Desktop',
    description: 'Modern Point of Sale system for all business types',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity', 'finance'],
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
  };
}