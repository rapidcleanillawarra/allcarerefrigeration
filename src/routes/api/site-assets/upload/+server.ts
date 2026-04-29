import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSupabaseAdmin } from '$lib/server/supabase-admin';

const BUCKET = 'allcare';
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);

const PLACEHOLDER_KEY = /^[a-zA-Z0-9:_-]{1,120}$/;

function extFromMime(mime: string): string {
	switch (mime) {
		case 'image/jpeg':
			return 'jpg';
		case 'image/png':
			return 'png';
		case 'image/webp':
			return 'webp';
		case 'image/gif':
			return 'gif';
		case 'image/svg+xml':
			return 'svg';
		default:
			return 'bin';
	}
}

function objectPath(placeholderKey: string, ext: string): string {
	const segments = placeholderKey.split(':').filter(Boolean);
	const safe = segments.length ? segments.join('/') : 'misc';
	return `assets/${safe}/${crypto.randomUUID()}.${ext}`;
}

export const POST: RequestHandler = async ({ request }) => {
	let admin;
	try {
		admin = getSupabaseAdmin();
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Upload is not configured';
		console.error('[api/site-assets/upload]', message);
		return json(
			{
				message: 'Upload is not configured',
				detail: import.meta.env.DEV ? message : undefined
			},
			{ status: 503 }
		);
	}

	const form = await request.formData();
	const file = form.get('file');
	const placeholderRaw = form.get('placeholder_key');

	if (!(file instanceof File)) {
		throw error(400, 'Missing file');
	}
	if (typeof placeholderRaw !== 'string' || !PLACEHOLDER_KEY.test(placeholderRaw)) {
		throw error(400, 'Invalid placeholder_key');
	}

	if (file.size > MAX_BYTES) {
		throw error(413, 'File too large');
	}

	const mime = file.type || 'application/octet-stream';
	if (!ALLOWED.has(mime)) {
		throw error(415, 'Unsupported file type');
	}

	const ext = extFromMime(mime);
	const path = objectPath(placeholderRaw, ext);

	const { data: existing } = await admin
		.from('site_asset_images')
		.select('storage_path')
		.eq('placeholder_key', placeholderRaw)
		.maybeSingle();

	if (existing?.storage_path) {
		await admin.storage.from(BUCKET).remove([existing.storage_path]);
	}

	const body = new Uint8Array(await file.arrayBuffer());
	const { error: uploadError } = await admin.storage.from(BUCKET).upload(path, body, {
		contentType: mime,
		upsert: true
	});

	if (uploadError) {
		console.error(uploadError);
		throw error(500, 'Storage upload failed');
	}

	const {
		data: { publicUrl }
	} = admin.storage.from(BUCKET).getPublicUrl(path);

	const { error: dbError } = await admin.from('site_asset_images').upsert(
		{
			placeholder_key: placeholderRaw,
			storage_path: path,
			public_url: publicUrl,
			updated_at: new Date().toISOString()
		},
		{ onConflict: 'placeholder_key' }
	);

	if (dbError) {
		console.error(dbError);
		await admin.storage.from(BUCKET).remove([path]);
		throw error(500, 'Could not save image metadata');
	}

	return json({ publicUrl });
};
