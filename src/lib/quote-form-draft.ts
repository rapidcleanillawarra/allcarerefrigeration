import type { QuoteFormValues } from '$lib/quote-form-sample-data';

export const QUOTE_FORM_DRAFT_KEY = 'allcare-quote-form-draft';

const TEXT_FIELDS = [
	'fullName',
	'businessName',
	'phone',
	'email',
	'siteAddress',
	'otherService',
	'otherEquipment',
	'issueDescription',
	'preferredDateTime',
	'brandModel',
	'equipmentAge',
	'serialNumber',
	'otherAccess',
	'accessNotes'
] as const satisfies readonly (keyof QuoteFormValues)[];

const ARRAY_FIELDS = ['services', 'equipment', 'siteAccess', 'contactMethods'] as const satisfies readonly (keyof QuoteFormValues)[];

export function readQuoteFormValues(form: HTMLFormElement): QuoteFormValues {
	const formData = new FormData(form);
	const values: QuoteFormValues = {};

	for (const key of TEXT_FIELDS) {
		values[key] = String(formData.get(key) ?? '');
	}

	for (const key of ARRAY_FIELDS) {
		values[key] = formData.getAll(key).map(String);
	}

	return values;
}

export function saveQuoteFormDraft(values: QuoteFormValues): void {
	if (typeof localStorage === 'undefined') return;

	try {
		localStorage.setItem(QUOTE_FORM_DRAFT_KEY, JSON.stringify(values));
	} catch {
		// Ignore quota or privacy mode errors.
	}
}

export function loadQuoteFormDraft(): QuoteFormValues | null {
	if (typeof localStorage === 'undefined') return null;

	try {
		const raw = localStorage.getItem(QUOTE_FORM_DRAFT_KEY);
		if (!raw) return null;

		const parsed = JSON.parse(raw) as QuoteFormValues;
		if (!parsed || typeof parsed !== 'object') return null;

		return parsed;
	} catch {
		return null;
	}
}

export function clearQuoteFormDraft(): void {
	if (typeof localStorage === 'undefined') return;

	try {
		localStorage.removeItem(QUOTE_FORM_DRAFT_KEY);
	} catch {
		// Ignore storage errors.
	}
}
