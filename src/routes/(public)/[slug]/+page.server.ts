import { error } from '@sveltejs/kit';
import { getPageBySlug, isSlugReserved } from '$lib/server/site-pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const slug = params.slug.toLowerCase().trim();

	// Reserved routes have their own static route handlers
	if (isSlugReserved(slug)) {
		error(404, 'Page not found');
	}

	const page = await getPageBySlug(slug);

	if (!page) {
		error(404, 'Page not found');
	}

	// If page is not published, only allow authenticated admins to preview
	if (!page.is_published && !locals.isAuthenticated) {
		error(404, 'Page not found');
	}

	return {
		page,
		isAdminPreview: !page.is_published
	};
};
