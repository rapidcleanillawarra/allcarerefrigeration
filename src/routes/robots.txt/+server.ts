import { SITE_ORIGIN } from '$lib/service-areas';
import type { RequestHandler } from './$types';

/** Crawl policy + sitemap URL for search engines. */
export const GET: RequestHandler = () => {
	const body = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
