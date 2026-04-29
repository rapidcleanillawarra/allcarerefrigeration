import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getServiceAreaBySlug } from '$lib/service-areas';

export const load: PageLoad = ({ params }) => {
	const landing = getServiceAreaBySlug(params.slug);
	if (!landing) error(404, 'Not found');
	return { landing };
};
