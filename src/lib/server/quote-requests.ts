import { getSupabaseAdmin } from '$lib/server/supabase-admin';

const BUCKET = 'allcare';

export type QuoteRequestInput = {
	fullName: string;
	businessName: string;
	phone: string;
	email: string;
	siteAddress: string;
	services: string[];
	otherService: string;
	equipment: string[];
	otherEquipment: string;
	issueDescription: string;
	preferredDateTime: string;
	brandModel: string;
	equipmentAge: string;
	serialNumber: string;
	siteAccess: string[];
	otherAccess: string;
	accessNotes: string;
	contactMethods: string[];
};

function extFromMime(mime: string): string {
	switch (mime) {
		case 'image/jpeg':
			return 'jpg';
		case 'image/png':
			return 'png';
		case 'image/webp':
			return 'webp';
		case 'image/heic':
			return 'heic';
		case 'image/heif':
			return 'heif';
		default:
			return 'bin';
	}
}

function photoObjectPath(quoteRequestId: string, ext: string): string {
	return `quote-requests/${quoteRequestId}/${crypto.randomUUID()}.${ext}`;
}

function describePhotoFile(photo: File, index?: number) {
	return {
		index,
		name: photo.name,
		size: photo.size,
		type: photo.type || 'application/octet-stream',
		lastModified: photo.lastModified
	};
}

function parsePreferredDateTime(value: string): string | null {
	if (!value) return null;

	const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
	if (!match) return null;

	const [, year, month, day, hour, minute] = match;
	const date = new Date(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hour),
		Number(minute)
	);

	if (Number.isNaN(date.getTime())) return null;
	return date.toISOString();
}

export async function saveQuoteRequest(
	input: QuoteRequestInput,
	photos: File[],
	recaptchaScore?: number
): Promise<{ id: string }> {
	const admin = getSupabaseAdmin();

	console.info('[quote-requests][photos] saveQuoteRequest called', {
		photoCount: photos.length,
		photos: photos.map((photo, index) => describePhotoFile(photo, index))
	});

	const { data: requestRow, error: insertError } = await admin
		.from('allcare_quote_requests')
		.insert({
			recaptcha_score: recaptchaScore ?? null,
			full_name: input.fullName,
			business_name: input.businessName || null,
			phone: input.phone,
			email: input.email,
			site_address: input.siteAddress,
			services: input.services,
			other_service: input.otherService || null,
			equipment: input.equipment,
			other_equipment: input.otherEquipment || null,
			issue_description: input.issueDescription,
			preferred_date_time: parsePreferredDateTime(input.preferredDateTime),
			brand_model: input.brandModel || null,
			equipment_age: input.equipmentAge || null,
			serial_number: input.serialNumber || null,
			site_access: input.siteAccess,
			other_access: input.otherAccess || null,
			access_notes: input.accessNotes || null,
			contact_methods: input.contactMethods
		})
		.select('id')
		.single();

	if (insertError || !requestRow) {
		console.error('[quote-requests] insert failed', insertError);
		throw new Error('Could not save quote request');
	}

		const quoteRequestId = requestRow.id;
		const uploadedPaths: string[] = [];
		let savedPhotos: {
			id: string;
			quote_request_id: string;
			storage_path: string;
			public_url: string;
			original_name: string;
			mime_type: string;
			size_bytes: number;
			sort_order: number;
		}[] = [];

		console.info('[quote-requests][photos] quote request row created', {
		quoteRequestId,
		bucket: BUCKET
	});

	try {
		const photoRows: {
			quote_request_id: string;
			storage_path: string;
			public_url: string;
			original_name: string;
			mime_type: string;
			size_bytes: number;
			sort_order: number;
		}[] = [];

		for (const [index, photo] of photos.entries()) {
			const mime = photo.type || 'application/octet-stream';
			const ext = extFromMime(mime);
			const storagePath = photoObjectPath(quoteRequestId, ext);
			const body = new Uint8Array(await photo.arrayBuffer());

			console.info('[quote-requests][photos] uploading to storage', {
				quoteRequestId,
				bucket: BUCKET,
				storagePath,
				...describePhotoFile(photo, index),
				bodyBytes: body.byteLength
			});

			const { data: uploadData, error: uploadError } = await admin.storage.from(BUCKET).upload(storagePath, body, {
				contentType: mime,
				upsert: false
			});

			if (uploadError) {
				console.error('[quote-requests][photos] storage upload failed', {
					quoteRequestId,
					storagePath,
					...describePhotoFile(photo, index),
					uploadError
				});
				throw new Error('Could not upload photos');
			}

			console.info('[quote-requests][photos] storage upload succeeded', {
				quoteRequestId,
				storagePath,
				uploadData,
				...describePhotoFile(photo, index)
			});

			uploadedPaths.push(storagePath);

			const {
				data: { publicUrl }
			} = admin.storage.from(BUCKET).getPublicUrl(storagePath);

			photoRows.push({
				quote_request_id: quoteRequestId,
				storage_path: storagePath,
				public_url: publicUrl,
				original_name: photo.name,
				mime_type: mime,
				size_bytes: photo.size,
				sort_order: index
			});
		}

		if (photoRows.length > 0) {
			console.info('[quote-requests][photos] inserting photo metadata rows', {
				quoteRequestId,
				rowCount: photoRows.length,
				rows: photoRows.map(({ storage_path, original_name, mime_type, size_bytes, sort_order }) => ({
					storage_path,
					original_name,
					mime_type,
					size_bytes,
					sort_order
				}))
			});

			const { data: insertedPhotoRows, error: photoInsertError } = await admin
				.from('allcare_quote_request_photos')
				.insert(photoRows)
				.select(
					'id, quote_request_id, storage_path, public_url, original_name, mime_type, size_bytes, sort_order'
				);

			if (photoInsertError) {
				console.error('[quote-requests][photos] photo metadata insert failed', {
					quoteRequestId,
					photoInsertError
				});
				throw new Error('Could not save photo details');
			}

			savedPhotos = insertedPhotoRows ?? [];

			console.info('[quote-requests][photos] photo metadata insert succeeded', {
				quoteRequestId,
				insertedPhotoRows: savedPhotos
			});

			for (const photo of savedPhotos) {
				console.log('[quote-requests][photos] saved photo record', {
					id: photo.id,
					quoteRequestId: photo.quote_request_id,
					storagePath: photo.storage_path,
					publicUrl: photo.public_url,
					originalName: photo.original_name,
					mimeType: photo.mime_type,
					sizeBytes: photo.size_bytes,
					sortOrder: photo.sort_order
				});
			}
		} else {
			console.info('[quote-requests][photos] no photos to upload for quote request', {
				quoteRequestId
			});
		}

		console.log('[quote-requests] saved quote request payload for external api', {
			quoteRequestId,
			recaptchaScore: recaptchaScore ?? null,
			form: input,
			photos: savedPhotos.map((photo) => ({
				id: photo.id,
				storagePath: photo.storage_path,
				publicUrl: photo.public_url,
				originalName: photo.original_name,
				mimeType: photo.mime_type,
				sizeBytes: photo.size_bytes,
				sortOrder: photo.sort_order
			}))
		});

		return { id: quoteRequestId };
	} catch (error) {
		console.error('[quote-requests][photos] saveQuoteRequest photo pipeline failed', {
			quoteRequestId,
			uploadedPathCount: uploadedPaths.length,
			uploadedPaths,
			error
		});

		if (uploadedPaths.length > 0) {
			await admin.storage.from(BUCKET).remove(uploadedPaths);
		}

		await admin.from('allcare_quote_requests').delete().eq('id', quoteRequestId);
		throw error;
	}
}
