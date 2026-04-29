import type { LayoutServerLoad } from './$types';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

export const load: LayoutServerLoad = async ({ url }) => {
	const edit = url.searchParams.get('edit') === 'true';

	let imageMap: Record<string, string> = {};
	const supabaseUrl = env.PUBLIC_SUPABASE_URL;
	const anonKey = env.PUBLIC_SUPABASE_ANON_KEY;

	if (supabaseUrl && anonKey) {
		const supabase = createClient(supabaseUrl, anonKey);
		const { data } = await supabase.from('site_asset_images').select('placeholder_key, public_url');
		if (data?.length) {
			imageMap = Object.fromEntries(data.map((r) => [r.placeholder_key, r.public_url]));
		}
	}

	return { edit, imageMap };
};
