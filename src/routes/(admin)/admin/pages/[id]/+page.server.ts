import { error, fail, redirect } from '@sveltejs/kit';
import { deletePage, getPageById, isSlugReserved, slugify, updatePage } from '$lib/server/site-pages';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = await getPageById(params.id);
	if (!page) {
		error(404, 'Page not found');
	}

	return { page };
};

export const actions: Actions = {
	update: async ({ params, request }) => {
		const form = await request.formData();
		const title = String(form.get('title') || '').trim();
		const rawSlug = String(form.get('slug') || '').trim();
		const summary = String(form.get('summary') || '').trim();
		const content = String(form.get('content') || '').trim();
		const meta_title = String(form.get('meta_title') || '').trim();
		const meta_description = String(form.get('meta_description') || '').trim();
		const is_published = form.get('is_published') === 'true';
		const rawPriority = parseFloat(String(form.get('sitemap_priority') || '0.7'));
		const sitemap_priority = isNaN(rawPriority) ? 0.7 : Math.min(1.0, Math.max(0.1, rawPriority));
		const sitemap_changefreq = String(form.get('sitemap_changefreq') || 'weekly').trim();

		const slug = slugify(rawSlug || title);

		if (!title) {
			return fail(400, { error: 'Title is required.' });
		}

		if (!slug) {
			return fail(400, { error: 'A valid URL slug is required.' });
		}

		if (isSlugReserved(slug)) {
			return fail(400, {
				error: `The slug "/${slug}" is reserved for core website pages. Please choose another slug.`
			});
		}

		if (!content) {
			return fail(400, { error: 'Page content cannot be empty.' });
		}

		const result = await updatePage(params.id, {
			title,
			slug,
			summary,
			content,
			meta_title: meta_title || null,
			meta_description: meta_description || null,
			is_published,
			sitemap_priority,
			sitemap_changefreq
		});

		if (result.error) {
			return fail(400, { error: result.error });
		}

		return { success: true, page: result.page };
	},

	delete: async ({ params }) => {
		const result = await deletePage(params.id);
		if (!result.success) {
			return fail(500, { error: result.error || 'Failed to delete page.' });
		}

		redirect(303, '/admin/pages');
	}
};
