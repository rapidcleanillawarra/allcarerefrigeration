import { SITE_ORIGIN, regionalServiceAreas } from '$lib/service-areas';
import { getPublishedPages } from '$lib/server/site-pages';
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
	return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

/** XML sitemap — linked from /robots.txt for SEO discovery. Contains canonical .com URLs only. */
export const GET: RequestHandler = async () => {
	const defaultLastmod = new Date().toISOString().slice(0, 10);
	const entries = [
		...CORE_PATHS.map((path) => ({
			path,
			priority: path === '/' ? '1.0' : path === '/services' || path === '/service-areas' ? '0.9' : '0.8',
			changefreq: path === '/' ? 'weekly' : 'monthly',
			lastmod: defaultLastmod
		})),
		...SERVICE_PATHS.map((path) => ({
			path,
			priority: '0.9',
			changefreq: 'weekly',
			lastmod: defaultLastmod
		})),
		...regionalServiceAreas.map((area) => ({
			path: `/service-areas/${area.slug}`,
			priority: '0.85',
			changefreq: 'weekly',
			lastmod: defaultLastmod
		}))
	];

	// Dynamically query custom published pages from Supabase
	try {
		const customPages = await getPublishedPages();
		for (const page of customPages) {
			const pageLastmod = page.updated_at ? page.updated_at.slice(0, 10) : defaultLastmod;
			entries.push({
				path: `/${page.slug}`,
				priority: (page.sitemap_priority ?? 0.7).toFixed(1),
				changefreq: page.sitemap_changefreq || 'weekly',
				lastmod: pageLastmod
			});
		}
	} catch (err) {
		console.warn('[sitemap.xml] Could not fetch dynamic pages:', err);
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		({ path, priority, changefreq, lastmod }) => `  <url>
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
