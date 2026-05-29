import { fail } from '@sveltejs/kit';
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

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const fullName = readText(form, 'fullName');
		const businessName = readText(form, 'businessName');
		const phone = readText(form, 'phone');
		const email = readText(form, 'email');
		const siteAddress = readText(form, 'siteAddress');
		const services = readSelections(form, 'services', SERVICE_OPTIONS);
		const equipment = readSelections(form, 'equipment', EQUIPMENT_OPTIONS);
		const issueDescription = readText(form, 'issueDescription');
		const preferredDateTime = readText(form, 'preferredDateTime');
		const brandModel = readText(form, 'brandModel');
		const equipmentAge = readText(form, 'equipmentAge');
		const serialNumber = readText(form, 'serialNumber');
		const siteAccess = readSelections(form, 'siteAccess', ACCESS_OPTIONS);
		const accessNotes = readText(form, 'accessNotes');
		const contactMethods = readSelections(form, 'contactMethods', CONTACT_OPTIONS);

		const values = {
			fullName,
			businessName,
			phone,
			email,
			siteAddress,
			services,
			equipment,
			issueDescription,
			preferredDateTime,
			brandModel,
			equipmentAge,
			serialNumber,
			siteAccess,
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
		if (!issueDescription) errors.issueDescription = 'Please describe the issue or request.';
		if (contactMethods.length === 0) {
			errors.contactMethods = 'Select at least one preferred contact method.';
		}

		const photos = form.getAll('photos').filter((entry): entry is File => entry instanceof File && entry.size > 0);

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

		// Submission handling can be wired to email, CRM, or Supabase later.
		console.info('[get-a-quote] New quote request', {
			...values,
			photoCount: photos.length
		});

		return {
			success: true as const,
			values
		};
	}
} satisfies Actions;
