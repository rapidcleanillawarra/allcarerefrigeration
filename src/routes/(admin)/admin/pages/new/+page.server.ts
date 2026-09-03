import { fail, redirect } from '@sveltejs/kit';
import { createPage, isSlugReserved, slugify } from '$lib/server/site-pages';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
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

		const values = {
			title,
			slug,
			summary,
			content,
			meta_title,
			meta_description,
			is_published,
			sitemap_priority,
			sitemap_changefreq
		};

		if (!title) {
			return fail(400, { error: 'Title is required.', values });
		}

		if (!slug) {
			return fail(400, { error: 'A valid URL slug is required.', values });
		}

		if (isSlugReserved(slug)) {
			return fail(400, {
				error: `The slug "/${slug}" is reserved for core website pages. Please choose another slug.`,
				values
			});
		}

		if (!content) {
			return fail(400, { error: 'Page content cannot be empty.', values });
		}

		const result = await createPage({
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
			return fail(400, { error: result.error, values });
		}

		redirect(303, '/admin/pages');
	}
};
