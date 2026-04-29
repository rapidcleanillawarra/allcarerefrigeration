import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
	const url = env.PUBLIC_SUPABASE_URL;
	const key = privateEnv.SUPABASE_SERVICE_ROLE_KEY;

	if (!url) {
		throw new Error('PUBLIC_SUPABASE_URL is not set');
	}
	if (!key) {
		throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
	}
	if (!client) {
		client = createClient(url, key, {
			auth: { persistSession: false, autoRefreshToken: false }
		});
	}
	return client;
}
