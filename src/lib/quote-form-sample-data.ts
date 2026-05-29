import type { Faker } from '@faker-js/faker';

export type QuoteFormValues = {
	fullName?: string;
	businessName?: string;
	phone?: string;
	email?: string;
	siteAddress?: string;
	services?: string[];
	otherService?: string;
	equipment?: string[];
	issueDescription?: string;
	preferredDateTime?: string;
	brandModel?: string;
	equipmentAge?: string;
	serialNumber?: string;
	siteAccess?: string[];
	accessNotes?: string;
	contactMethods?: string[];
};

const SERVICE_VALUES = [
	'commercial-refrigeration-repair',
	'cool-room-freezer-room',
	'air-conditioning-repair',
	'air-conditioning-installation',
	'new-refrigeration-installation',
	'preventative-maintenance',
	'other-service'
] as const;

const EQUIPMENT_VALUES = [
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

const ACCESS_VALUES = [
	'easy-access',
	'restricted-access',
	'after-hours',
	'shopping-centre-strata',
	'height-access',
	'other-access'
] as const;

const CONTACT_VALUES = ['phone', 'email', 'sms'] as const;

function pickSome<T>(faker: Faker, options: readonly T[], min = 1, max = 2): T[] {
	return faker.helpers.arrayElements(options, {
		min,
		max: Math.min(max, options.length)
	});
}

function toDatetimeLocalValue(date: Date): string {
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function buildPopulatedQuoteValues(faker: Faker): QuoteFormValues {
	const preferred = faker.date.soon({ days: 14 });
	const services = pickSome(faker, SERVICE_VALUES);

	return {
		fullName: faker.person.fullName(),
		businessName: faker.company.name(),
		phone: faker.phone.number({ style: 'national' }),
		email: faker.internet.email(),
		siteAddress: faker.location.streetAddress({ useFullAddress: true }),
		services,
		otherService: services.includes('other-service')
			? faker.commerce.productName()
			: undefined,
		equipment: pickSome(faker, EQUIPMENT_VALUES),
		issueDescription: faker.lorem.paragraph(),
		preferredDateTime: toDatetimeLocalValue(preferred),
		brandModel: `${faker.company.name()} ${faker.string.alphanumeric(6).toUpperCase()}`,
		equipmentAge: `${faker.number.int({ min: 1, max: 15 })} years`,
		serialNumber: faker.string.alphanumeric(12).toUpperCase(),
		siteAccess: pickSome(faker, ACCESS_VALUES),
		accessNotes: faker.lorem.sentence(),
		contactMethods: pickSome(faker, CONTACT_VALUES)
	};
}

export async function getPopulatedQuoteValues(): Promise<QuoteFormValues> {
	const { fakerEN_AU } = await import('@faker-js/faker');
	return buildPopulatedQuoteValues(fakerEN_AU);
}
