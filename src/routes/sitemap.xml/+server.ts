import { SITE_ORIGIN, regionalServiceAreas } from '$lib/service-areas';
import type { RequestHandler } from './$types';

const CORE_PATHS = ['/', '/services', '/service-areas', '/about', '/faq', '/get-a-quote'] as const;

const SERVICE_PATHS = [
	'/services/commercial-refrigeration-repairs',
	'/services/cool-room-freezer-repairs',
	'/services/commercial-refrigeration-installation',
	'/services/preventative-maintenance',
	'/services/emergency-refrigeration-repairs',
	'/services/air-conditioning-installation-repairs'
] as const;

function absoluteUrl(path: string): string {
	return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

/** XML sitemap — linked from /robots.txt for SEO discovery. Contains canonical .com URLs only. */
export const GET: RequestHandler = () => {
	const lastmod = new Date().toISOString().slice(0, 10);
	const entries = [
		...CORE_PATHS.map((path) => ({
			path,
			priority: path === '/' ? '1.0' : path === '/services' || path === '/service-areas' ? '0.9' : '0.8',
			changefreq: path === '/' ? 'weekly' : 'monthly'
		})),
		...SERVICE_PATHS.map((path) => ({
			path,
			priority: '0.9',
			changefreq: 'weekly'
		})),
		...regionalServiceAreas.map((area) => ({
			path: `/service-areas/${area.slug}`,
			priority: '0.85',
			changefreq: 'weekly'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		({ path, priority, changefreq }) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
