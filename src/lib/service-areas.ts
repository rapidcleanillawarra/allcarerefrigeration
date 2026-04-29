/** Illawarra service areas shown on the home page — shared with nav and JSON-LD. */
export const serviceAreas = [
	'Albion Park',
	'Wollongong',
	'Shellharbour',
	'Kiama',
	'Warrawong',
	'Dapto',
	'Oak Flats',
	'Port Kembla',
	'Unanderra',
	'Corrimal'
] as const;

export type ServiceArea = (typeof serviceAreas)[number];

/** Default production host (Vercel). Override with PUBLIC_SITE_URL when using a custom domain. */
const DEFAULT_SITE_ORIGIN = 'https://allcarerefrigeration.vercel.app';

function resolveSiteOrigin(): string {
	const raw = import.meta.env.PUBLIC_SITE_URL;
	if (typeof raw === 'string' && raw.trim() !== '') {
		try {
			return new URL(raw.trim().startsWith('http') ? raw.trim() : `https://${raw.trim()}`)
				.origin;
		} catch {
			/* fallthrough */
		}
	}
	return DEFAULT_SITE_ORIGIN;
}

/** Canonical origin (scheme + host) — robots, sitemap, meta URLs, schema. */
export const SITE_ORIGIN = resolveSiteOrigin();

/** Depot name (physical address locality). */
export const DEPOT_LOCALITY = 'Albion Park';

/** Fragment id for in-page anchors (e.g. #location-albion-park). */
export function locationAnchorId(area: string): string {
	return `location-${area.toLowerCase().replace(/\s+/g, '-')}`;
}

/** Kebab-case slug from a suburb name — must match `[slug]` route segments. */
export function areaNameToSlug(name: string): string {
	return name.toLowerCase().replace(/\s+/g, '-');
}

/** One row per suburb we expose at `/service-areas/[slug]`. Built from {@link serviceAreas}. */
const serviceAreaLandingBySlug: Record<string, { name: (typeof serviceAreas)[number] }> =
	Object.fromEntries(serviceAreas.map((name) => [areaNameToSlug(name), { name }] as const));

export type ServiceAreaLanding = {
	/** Highlight suburb for copy and hero (matches a {@link serviceAreas} entry). */
	name: typeof serviceAreas[number];
	/** Path-only URL: `/` for the main landing, `/service-areas/{slug}` for area pages. */
	pathname: string;
};

export function getServiceAreaBySlug(slug: string): ServiceAreaLanding | undefined {
	const row = serviceAreaLandingBySlug[slug];
	if (!row) return undefined;
	return { name: row.name, pathname: `/service-areas/${slug}` };
}

/** Default landing context for `/` — same emphasis suburb as the depot. */
export function homeLandingDefaults(): ServiceAreaLanding {
	return { name: DEPOT_LOCALITY, pathname: '/' };
}
