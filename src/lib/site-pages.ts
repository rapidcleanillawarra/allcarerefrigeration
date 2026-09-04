export type SitePage = {
	id: string;
	slug: string;
	title: string;
	summary: string | null;
	content: string;
	meta_title: string | null;
	meta_description: string | null;
	is_published: boolean;
	sitemap_priority: number;
	sitemap_changefreq: string;
	created_at: string;
	updated_at: string;
};

export type SitePageInput = {
	slug: string;
	title: string;
	summary?: string | null;
	content: string;
	meta_title?: string | null;
	meta_description?: string | null;
	is_published?: boolean;
	sitemap_priority?: number;
	sitemap_changefreq?: string;
};

export const RESERVED_SLUGS = [
	'admin',
	'api',
	'about',
	'faq',
	'get-a-quote',
	'login',
	'service-areas',
	'services',
	'sitemap.xml',
	'robots.txt'
] as const;

/** Clean and format a string into an SEO-friendly URL slug. */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Check if a slug collides with core system routes. */
export function isSlugReserved(slug: string): boolean {
	const normalized = slug.toLowerCase().trim();
	return (RESERVED_SLUGS as readonly string[]).includes(normalized);
}
