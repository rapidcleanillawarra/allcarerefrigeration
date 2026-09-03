import { redirect, type Handle } from '@sveltejs/kit';
import { legacySuburbToRegionalSlug } from '$lib/service-areas';

export const handle: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') || event.url.host;

	// Critical 301 redirect: redirect all *.vercel.app requests to the canonical .com domain
	if (host.includes('vercel.app')) {
		throw redirect(301, `https://www.allcarerefrigeration.com${event.url.pathname}${event.url.search}`);
	}

	// 301 redirect legacy thin suburb pages to their consolidated regional hubs
	const pathname = event.url.pathname.replace(/\/$/, '');
	const serviceAreaMatch = pathname.match(/^\/service-areas\/([a-z0-9-]+)$/);
	if (serviceAreaMatch) {
		const slug = serviceAreaMatch[1];
		const targetSlug = legacySuburbToRegionalSlug[slug];
		if (targetSlug && targetSlug !== slug) {
			throw redirect(301, `/service-areas/${targetSlug}`);
		}
	}

	const session = event.cookies.get('allcare_session');
	event.locals.isAuthenticated = session === 'authenticated';

	return resolve(event);
};
