import { areaNameToSlug, SITE_ORIGIN, serviceAreas } from '$lib/service-areas';
import type { RequestHandler } from './$types';

const PATHS = ['/', '/about', '/services'] as const;

function absoluteUrl(path: string): string {
	return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

/** XML sitemap — linked from /robots.txt for SEO discovery. */
export const GET: RequestHandler = () => {
	const lastmod = new Date().toISOString().slice(0, 10);
	const entries = [
		...PATHS.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.9' })),
		...serviceAreas.map((name) => ({
			path: `/service-areas/${areaNameToSlug(name)}`,
			priority: '0.8'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		({ path, priority }) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
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
