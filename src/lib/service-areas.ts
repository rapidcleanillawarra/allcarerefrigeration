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

/** Fragment id for in-page anchors (e.g. #location-albion-park). */
export function locationAnchorId(area: string): string {
	return `location-${area.toLowerCase().replace(/\s+/g, '-')}`;
}
