import { fail } from '@sveltejs/kit';
import { saveQuoteRequest } from '$lib/server/quote-requests';
import { verifyRecaptchaToken } from '$lib/server/recaptcha';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => ({
	populate: url.searchParams.get('populate') === 'true'
});

const RECAPTCHA_ACTION = 'quote_submit';

const SERVICE_OPTIONS = [
	'commercial-refrigeration-repair',
	'cool-room-freezer-room',
	'air-conditioning-repair',
	'air-conditioning-installation',
	'new-refrigeration-installation',
	'preventative-maintenance',
	'other-service'
] as const;

const EQUIPMENT_OPTIONS = [
	'cool-room',
	'freezer-room',
	'display-fridge',
	'upright-fridge-freezer',
	'under-bench-fridge',
	'ice-machine',
	'split-system-ac',
	'ducted-ac',
	'other-equipment'
] as const;

const ACCESS_OPTIONS = [
	'easy-access',
	'restricted-access',
	'after-hours',
	'shopping-centre-strata',
	'height-access',
	'other-access'
] as const;

const CONTACT_OPTIONS = ['phone', 'email', 'sms'] as const;

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

function readText(form: FormData, key: string): string {
	return String(form.get(key) ?? '').trim();
}

function readSelections(form: FormData, key: string, allowed: readonly string[]): string[] {
	return form
		.getAll(key)
		.map((value) => String(value))
		.filter((value) => allowed.includes(value));
}

function isValidEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function describeIncomingPhoto(photo: File, index: number) {
	return {
		index,
		name: photo.name,
		size: photo.size,
		type: photo.type || 'application/octet-stream',
		lastModified: photo.lastModified
	};
}

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const fullName = readText(form, 'fullName');
		const businessName = readText(form, 'businessName');
		const phone = readText(form, 'phone');
		const email = readText(form, 'email');
		const siteAddress = readText(form, 'siteAddress');
		const services = readSelections(form, 'services', SERVICE_OPTIONS);
		const otherService = readText(form, 'otherService');
		const equipment = readSelections(form, 'equipment', EQUIPMENT_OPTIONS);
		const otherEquipment = readText(form, 'otherEquipment');
		const issueDescription = readText(form, 'issueDescription');
		const preferredDateTime = readText(form, 'preferredDateTime');
		const brandModel = readText(form, 'brandModel');
		const equipmentAge = readText(form, 'equipmentAge');
		const serialNumber = readText(form, 'serialNumber');
		const siteAccess = readSelections(form, 'siteAccess', ACCESS_OPTIONS);
		const otherAccess = readText(form, 'otherAccess');
		const accessNotes = readText(form, 'accessNotes');
		const contactMethods = readSelections(form, 'contactMethods', CONTACT_OPTIONS);

		const values = {
			fullName,
			businessName,
			phone,
			email,
			siteAddress,
			services,
			otherService,
			equipment,
			otherEquipment,
			issueDescription,
			preferredDateTime,
			brandModel,
			equipmentAge,
			serialNumber,
			siteAccess,
			otherAccess,
			accessNotes,
			contactMethods
		};

		const errors: Record<string, string> = {};

		if (!fullName) errors.fullName = 'Full name is required.';
		if (!phone) errors.phone = 'Phone number is required.';
		if (!email) {
			errors.email = 'Email address is required.';
		} else if (!isValidEmail(email)) {
			errors.email = 'Enter a valid email address.';
		}
		if (!siteAddress) errors.siteAddress = 'Site address is required.';
		if (services.length === 0) errors.services = 'Select at least one service.';
		if (services.includes('other-service') && !otherService) {
			errors.otherService = 'Please specify the other service.';
		}
		if (equipment.includes('other-equipment') && !otherEquipment) {
			errors.otherEquipment = 'Please specify the other equipment.';
		}
		if (siteAccess.includes('other-access') && !otherAccess) {
			errors.otherAccess = 'Please specify the other access requirement.';
		}
		if (!issueDescription) errors.issueDescription = 'Please describe the issue or request.';
		if (contactMethods.length === 0) {
			errors.contactMethods = 'Select at least one preferred contact method.';
		}

		const photos = form.getAll('photos').filter((entry): entry is File => entry instanceof File && entry.size > 0);
		const rawPhotoEntries = form.getAll('photos');

		console.info('[get-a-quote][photos] received form photo entries', {
			rawEntryCount: rawPhotoEntries.length,
			rawEntries: rawPhotoEntries.map((entry, index) => ({
				index,
				type: Object.prototype.toString.call(entry),
				isFile: entry instanceof File,
				size: entry instanceof File ? entry.size : null,
				name: entry instanceof File ? entry.name : String(entry)
			})),
			validPhotoCount: photos.length,
			validPhotos: photos.map(describeIncomingPhoto)
		});

		if (photos.length > MAX_PHOTOS) {
			errors.photos = `You can upload up to ${MAX_PHOTOS} photos.`;
		}

		for (const photo of photos) {
			if (photo.size > MAX_PHOTO_BYTES) {
				errors.photos = 'Each photo must be 10 MB or smaller.';
				break;
			}
			const mime = photo.type || 'application/octet-stream';
			if (!ALLOWED_PHOTO_TYPES.has(mime)) {
				errors.photos = 'Photos must be JPG, PNG, or WEBP files.';
				break;
			}
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values, success: false as const });
		}

		const recaptchaToken = readText(form, 'recaptchaToken');
		const recaptcha = await verifyRecaptchaToken(recaptchaToken, RECAPTCHA_ACTION);
		if (!recaptcha.ok) {
			return fail(400, {
				errors: { form: recaptcha.message },
				values,
				success: false as const
			});
		}

		try {
			const saved = await saveQuoteRequest(values, photos, recaptcha.score);
			console.info('[get-a-quote][photos] quote request saved', {
				id: saved.id,
				photoCount: photos.length,
				photos: photos.map(describeIncomingPhoto)
			});
		} catch (error) {
			console.error('[get-a-quote] Failed to save quote request', error);
			return fail(500, {
				errors: {
					form: 'We could not submit your quote request. Please try again or contact us directly.'
				},
				values,
				success: false as const
			});
		}

		return {
			success: true as const,
			values
		};
	}
} satisfies Actions;
