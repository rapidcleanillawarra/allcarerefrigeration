import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getRegionalAreaBySlug, getRegionalRedirectSlug } from '$lib/service-areas';

export const load: PageLoad = ({ params }) => {
	// 301 Permanent Redirect for legacy thin suburb pages to consolidated regional hubs
	const redirectSlug = getRegionalRedirectSlug(params.slug);
	if (redirectSlug && redirectSlug !== params.slug) {
		throw redirect(301, `/service-areas/${redirectSlug}`);
	}

	const region = getRegionalAreaBySlug(params.slug);
	if (!region) {
		error(404, 'Service area not found');
	}

	return { region };
};
