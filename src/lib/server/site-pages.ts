import { getSupabaseAdmin } from '$lib/server/supabase-admin';

export * from '$lib/site-pages';

/** Fetch all pages (admin view). */
export async function getAllPages(): Promise<SitePage[]> {
	try {
		const admin = getSupabaseAdmin();
		const { data, error } = await admin
			.from('site_pages')
			.select('*')
			.order('updated_at', { ascending: false });

		if (error) {
			console.error('[getAllPages] Supabase error:', error.message);
			return [];
		}

		return (data as SitePage[]) ?? [];
	} catch (err) {
		console.error('[getAllPages] Unexpected error:', err);
		return [];
	}
}

/** Fetch all published pages for public routing & sitemap. */
export async function getPublishedPages(): Promise<SitePage[]> {
	try {
		const admin = getSupabaseAdmin();
		const { data, error } = await admin
			.from('site_pages')
			.select('*')
			.eq('is_published', true)
			.order('updated_at', { ascending: false });

		if (error) {
			console.error('[getPublishedPages] Supabase error:', error.message);
			return [];
		}

		return (data as SitePage[]) ?? [];
	} catch (err) {
		console.error('[getPublishedPages] Unexpected error:', err);
		return [];
	}
}

/** Fetch a single page by slug (public view or admin preview). */
export async function getPageBySlug(slug: string): Promise<SitePage | null> {
	try {
		const admin = getSupabaseAdmin();
		const { data, error } = await admin
			.from('site_pages')
			.select('*')
			.eq('slug', slug.toLowerCase().trim())
			.maybeSingle();

		if (error) {
			console.error('[getPageBySlug] Supabase error:', error.message);
			return null;
		}

		return (data as SitePage) ?? null;
	} catch (err) {
		console.error('[getPageBySlug] Unexpected error:', err);
		return null;
	}
}

/** Fetch a single page by UUID (admin edit view). */
export async function getPageById(id: string): Promise<SitePage | null> {
	try {
		const admin = getSupabaseAdmin();
		const { data, error } = await admin
			.from('site_pages')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (error) {
			console.error('[getPageById] Supabase error:', error.message);
			return null;
		}

		return (data as SitePage) ?? null;
	} catch (err) {
		console.error('[getPageById] Unexpected error:', err);
		return null;
	}
}

/** Create a new site page with validation. */
export async function createPage(
	input: SitePageInput
): Promise<{ page?: SitePage; error?: string }> {
	const slug = slugify(input.slug || input.title);

	if (!slug) {
		return { error: 'Page slug or title cannot be empty.' };
	}

	if (isSlugReserved(slug)) {
		return { error: `The slug "${slug}" is reserved by a core website page.` };
	}

	if (!input.title || !input.title.trim()) {
		return { error: 'Page title is required.' };
	}

	try {
		const admin = getSupabaseAdmin();

		// Check for slug collision
		const { data: existing } = await admin
			.from('site_pages')
			.select('id')
			.eq('slug', slug)
			.maybeSingle();

		if (existing) {
			return { error: `A page with the slug "${slug}" already exists.` };
		}

		const now = new Date().toISOString();
		const newRecord = {
			slug,
			title: input.title.trim(),
			summary: input.summary?.trim() || null,
			content: input.content?.trim() || '',
			meta_title: input.meta_title?.trim() || null,
			meta_description: input.meta_description?.trim() || null,
			is_published: input.is_published ?? true,
			sitemap_priority: typeof input.sitemap_priority === 'number' ? input.sitemap_priority : 0.7,
			sitemap_changefreq: input.sitemap_changefreq || 'weekly',
			created_at: now,
			updated_at: now
		};

		const { data, error } = await admin
			.from('site_pages')
			.insert(newRecord)
			.select('*')
			.single();

		if (error) {
			console.error('[createPage] Insert error:', error.message);
			return { error: `Database error: ${error.message}` };
		}

		return { page: data as SitePage };
	} catch (err) {
		console.error('[createPage] Unexpected error:', err);
		return { error: 'An unexpected error occurred while saving the page.' };
	}
}

/** Update an existing site page. */
export async function updatePage(
	id: string,
	input: Partial<SitePageInput>
): Promise<{ page?: SitePage; error?: string }> {
	try {
		const admin = getSupabaseAdmin();

		const { data: existing, error: findError } = await admin
			.from('site_pages')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (findError || !existing) {
			return { error: 'Page not found.' };
		}

		let slug = existing.slug;
		if (input.slug !== undefined) {
			slug = slugify(input.slug);
			if (!slug) {
				return { error: 'Slug cannot be empty.' };
			}
			if (isSlugReserved(slug)) {
				return { error: `The slug "${slug}" is reserved by a core website page.` };
			}

			// If changed, check uniqueness
			if (slug !== existing.slug) {
				const { data: collision } = await admin
					.from('site_pages')
					.select('id')
					.eq('slug', slug)
					.neq('id', id)
					.maybeSingle();

				if (collision) {
					return { error: `A page with the slug "${slug}" already exists.` };
				}
			}
		}

		const updatePayload: Record<string, unknown> = {
			slug,
			updated_at: new Date().toISOString()
		};

		if (input.title !== undefined) updatePayload.title = input.title.trim();
		if (input.summary !== undefined) updatePayload.summary = input.summary?.trim() || null;
		if (input.content !== undefined) updatePayload.content = input.content.trim();
		if (input.meta_title !== undefined) updatePayload.meta_title = input.meta_title?.trim() || null;
		if (input.meta_description !== undefined)
			updatePayload.meta_description = input.meta_description?.trim() || null;
		if (input.is_published !== undefined) updatePayload.is_published = input.is_published;
		if (input.sitemap_priority !== undefined)
			updatePayload.sitemap_priority = input.sitemap_priority;
		if (input.sitemap_changefreq !== undefined)
			updatePayload.sitemap_changefreq = input.sitemap_changefreq;

		const { data, error } = await admin
			.from('site_pages')
			.update(updatePayload)
			.eq('id', id)
			.select('*')
			.single();

		if (error) {
			console.error('[updatePage] Update error:', error.message);
			return { error: `Database error: ${error.message}` };
		}

		return { page: data as SitePage };
	} catch (err) {
		console.error('[updatePage] Unexpected error:', err);
		return { error: 'An unexpected error occurred while updating the page.' };
	}
}

/** Delete a site page. */
export async function deletePage(id: string): Promise<{ success: boolean; error?: string }> {
	try {
		const admin = getSupabaseAdmin();
		const { error } = await admin.from('site_pages').delete().eq('id', id);

		if (error) {
			console.error('[deletePage] Delete error:', error.message);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (err) {
		console.error('[deletePage] Unexpected error:', err);
		return { success: false, error: 'Failed to delete page.' };
	}
}
