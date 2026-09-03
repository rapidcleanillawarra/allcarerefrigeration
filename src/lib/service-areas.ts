/** Canonical domain and regional service area configurations for AllCare Refrigeration. */

export const DEFAULT_SITE_ORIGIN = 'https://www.allcarerefrigeration.com';

function resolveSiteOrigin(): string {
	const raw = import.meta.env.PUBLIC_SITE_URL;
	if (typeof raw === 'string' && raw.trim() !== '') {
		try {
			return new URL(raw.trim().startsWith('http') ? raw.trim() : `https://${raw.trim()}`).origin;
		} catch {
			/* fallthrough */
		}
	}
	return DEFAULT_SITE_ORIGIN;
}

/** Canonical origin (scheme + host) — robots, sitemap, meta URLs, schema. */
export const SITE_ORIGIN = resolveSiteOrigin();

/** Depot location details. */
export const DEPOT_LOCALITY = 'Albion Park';
export const DEPOT_ADDRESS = '157 Church St, Albion Park NSW 2527';
export const PRIMARY_PHONE = '0411 532 233';
export const PRIMARY_PHONE_TEL = '+61411532233';
export const ARCTICK_LICENSE = 'AU53597';

export type RegionalWorkProject = {
	title: string;
	suburb: string;
	description: string;
};

export type RegionalTestimonial = {
	quote: string;
	author: string;
	suburb: string;
	role?: string;
};

export type RegionalServiceArea = {
	slug: string;
	name: string;
	h1: string;
	metaTitle: string;
	metaDescription: string;
	tagline: string;
	suburbsCovered: string[];
	responseTime: string;
	industries: string[];
	projects: RegionalWorkProject[];
	testimonial: RegionalTestimonial;
	commonIssues: string[];
};

export const regionalServiceAreas: RegionalServiceArea[] = [
	{
		slug: 'wollongong-illawarra',
		name: 'Wollongong & Northern Illawarra',
		h1: 'Commercial Refrigeration & Air Conditioning Wollongong',
		metaTitle: 'Commercial Refrigeration & Cool Rooms Wollongong | AllCare',
		metaDescription:
			'Emergency commercial refrigeration repairs, cool room servicing, and HVAC maintenance across Wollongong, Corrimal, Bulli & North Illawarra. 24/7 breakdown callouts: 0411 532 233.',
		tagline:
			'Complete commercial cooling support for Wollongong CBD, hospitality venues, university precincts, and northern coastal suburbs.',
		suburbsCovered: [
			'Wollongong CBD',
			'North Wollongong',
			'Corrimal',
			'Bulli',
			'Thirroul',
			'Austinmer',
			'Port Kembla',
			'Unanderra',
			'Warrawong',
			'Dapto',
			'Fairy Meadow',
			'Tarrawanna'
		],
		responseTime: '30–60 minutes priority breakdown response from our Albion Park base',
		industries: [
			'Hospitality, Bars & Beachside Cafes',
			'Pubs, Clubs & Entertainment Venues',
			'Butchers, Bakeries & Cold Storage Logistics',
			'Supermarkets & Independent Grocers',
			'Medical & Laboratory Cool Storage'
		],
		projects: [
			{
				title: 'Walk-in Cool Room Condenser Replacement',
				suburb: 'Wollongong CBD',
				description:
					'Replaced a failing remote condensing unit on a busy hospitality cool room with a high-efficiency Copeland unit, restoring target temperature (+2°C) before evening trade.'
			},
			{
				title: 'Emergency Evaporator Defrost Repair',
				suburb: 'Bulli',
				description:
					'Diagnosed iced-over coils causing airflow failure in a busy butcher walk-in freezer. Replaced faulty defrost timer and heaters within 2 hours of callout.'
			},
			{
				title: 'Multi-Deck Display Chiller Servicing',
				suburb: 'Corrimal',
				description:
					'Quarterly preventative maintenance including chemical coil sanitisation, thermostatic expansion valve tuning, and fan motor bearing checks.'
			}
		],
		testimonial: {
			quote:
				'When our kitchen cool room failed during Friday lunch prep, AllCare attended within 45 minutes. Found the gas leak, repaired the fitting, and saved thousands in fresh stock.',
			author: 'Sarah M.',
			suburb: 'Wollongong',
			role: 'Venue Operations Manager'
		},
		commonIssues: [
			'Cool room failing to reach food-safe holding temperatures',
			'Evaporator fans squealing or seized due to ice buildup',
			'Refrigerant gas leaks and high-pressure head trips on rooftop condensers',
			'Commercial kitchen ducted HVAC failing in humid coastal weather'
		]
	},
	{
		slug: 'shellharbour-albion-park',
		name: 'Shellharbour & Albion Park',
		h1: 'Commercial Refrigeration & Air Conditioning Shellharbour',
		metaTitle: 'Commercial Refrigeration Repairs Shellharbour & Albion Park | AllCare',
		metaDescription:
			'Local depot commercial refrigeration repairs, cool room fit-outs and preventative maintenance across Shellharbour, Albion Park & Oak Flats. Call 0411 532 233.',
		tagline:
			'Rapid on-site response right from our Albion Park home base to the Shell Cove marina precinct, Stockland retail, and local light industrial hubs.',
		suburbsCovered: [
			'Albion Park',
			'Albion Park Rail',
			'Shellharbour Village',
			'Shell Cove',
			'Oak Flats',
			'Flinders',
			'Barrack Heights',
			'Blackbutt',
			'Calderwood',
			'Cordeaux Heights'
		],
		responseTime: 'Local priority — technicians dispatched within 15–30 minutes',
		industries: [
			'Retail Bottle Shops & Liquor Outlets',
			'Marina Cafes, Bistros & Waterfront Restaurants',
			'Commercial Bakeries & Food Production Facilities',
			'Light Industrial Manufacturing & Logistics',
			'Childcare Centres & Local Clubs'
		],
		projects: [
			{
				title: 'Twin-Room Custom Cool Room & Freezer Fit-Out',
				suburb: 'Albion Park Rail',
				description:
					'Engineered, supplied, and installed insulated panel walk-in rooms with Bitzer condensing units, digital Dixell controllers, and temperature failsafe alarms.'
			},
			{
				title: 'Under-Counter Glass Door Chiller Repairs',
				suburb: 'Shellharbour Village',
				description:
					'Replaced seized evaporator fan motors and re-gassed system with R448A refrigerant to maintain crisp beverage presentation.'
			},
			{
				title: 'Preventative HVAC & Refrigeration Service Agreement',
				suburb: 'Oak Flats',
				description:
					'Scheduled bi-monthly coil cleaning, electrical terminal torque checks, and temperature logging across 4 commercial cold rooms.'
			}
		],
		testimonial: {
			quote:
				'Having AllCare right here in Albion Park gives us complete peace of mind. Their response is immediate, advice is straight-up honest, and they never over-charge.',
			author: 'Ben T.',
			suburb: 'Albion Park',
			role: 'Butchery Owner'
		},
		commonIssues: [
			'Bottle shop glass-door fridges sweating or losing cold airflow',
			'Display cabinet electronic thermostat sensor drift',
			'Drain line blockages flooding walk-in cool room floors',
			'Split AC breakdown in server rooms and commercial offices'
		]
	},
	{
		slug: 'kiama',
		name: 'Kiama & South Coast Coastal',
		h1: 'Commercial Refrigeration & Cool Rooms Kiama',
		metaTitle: 'Commercial Refrigeration & Air Conditioning Kiama | AllCare',
		metaDescription:
			'Specialist coastal commercial refrigeration repairs, ice machine servicing, and cool room maintenance in Kiama, Gerringong & Jamberoo. Call 0411 532 233.',
		tagline:
			'Corrosion-resistant coastal refrigeration care for seaside restaurants, cafes, tourist venues, and rural producers.',
		suburbsCovered: [
			'Kiama',
			'Kiama Downs',
			'Kiama Heights',
			'Gerringong',
			'Gerroa',
			'Jamberoo',
			'Minnamurra',
			'Bombo'
		],
		responseTime: 'Prompt coastal response — scheduled same-day & 24/7 breakdown callout',
		industries: [
			'Seafood Markets & Coastal Hospitality',
			'Tourist Parks, Resorts & Boutique Accommodation',
			'Dairies, Micro-Breweries & Local Producers',
			'Cafes, Bakeries & Pizzerias'
		],
		projects: [
			{
				title: 'Seaside Restaurant Cool Room Marine Coil Treatment',
				suburb: 'Kiama',
				description:
					'Cleaned salt-encrusted condenser coils, applied corrosion inhibitor protection, and replaced rusted fan brackets on rooftop plant overlooking the coast.'
			},
			{
				title: 'Commercial Ice Machine Overhaul',
				suburb: 'Gerringong',
				description:
					'Sanitised water distribution system, de-scaled evaporator grid, and replaced faulty inlet solenoid valve for high-volume seafood storage.'
			}
		],
		testimonial: {
			quote:
				'Salt air was destroying our outdoor condensers every two years. AllCare overhauled our setup with properly treated coils and our power bills dropped immediately.',
			author: 'Liam C.',
			suburb: 'Kiama',
			role: 'Head Chef'
		},
		commonIssues: [
			'Salt corrosion on outdoor condenser fins causing high-pressure lockouts',
			'Ice machine failing harvest cycle during peak holiday tourism periods',
			'Cool room doors losing seal alignment due to heavy coastal humidity',
			'Inverter compressor inverter board faults'
		]
	},
	{
		slug: 'nowra-shoalhaven',
		name: 'Nowra & Shoalhaven',
		h1: 'Commercial Refrigeration & Cool Room Repairs Nowra',
		metaTitle: 'Commercial Refrigeration Repairs Nowra & Shoalhaven | AllCare',
		metaDescription:
			'Expert commercial refrigeration and cool room repairs in Nowra, South Nowra, Bomaderry, Huskisson & Jervis Bay. Rapid emergency service: 0411 532 233.',
		tagline:
			'Reliable cooling solutions for Shoalhaven regional businesses, agricultural cold chain, supermarkets, and coastal hospitality.',
		suburbsCovered: [
			'Nowra CBD',
			'South Nowra',
			'Bomaderry',
			'Huskisson',
			'Vincentia',
			'Jervis Bay',
			'Sanctuary Point',
			'Berry',
			'Culburra Beach',
			'Shoalhaven Heads'
		],
		responseTime: 'Dedicated Shoalhaven service coverage with daily dispatch routes',
		industries: [
			'Regional Food Processing & Meat Wholesalers',
			'Jervis Bay Tourism & Maritime Hospitality',
			'Supermarkets, Fruit Barns & Produce Outlets',
			'Clubs, Pubs & Function Centres'
		],
		projects: [
			{
				title: 'Wholesale Cool Room Evaporator Motor Retrofit',
				suburb: 'South Nowra',
				description:
					'Upgraded three standard shaded-pole fan motors to high-efficiency EC motors on a 40m² produce holding room, cutting electrical draw by 60%.'
			},
			{
				title: 'Emergency Breakdown on Keg Cool Room',
				suburb: 'Huskisson',
				description:
					'Attended urgent Saturday morning breakdown on a seaside hotel glycol chilling unit. Replaced failed contactor and brought beer temperature back to +1°C before service.'
			}
		],
		testimonial: {
			quote:
				'AllCare has serviced our Huskisson venue for years. When equipment acts up during summer rush, their technicians drive down and fix it right the first time.',
			author: 'David P.',
			suburb: 'Huskisson',
			role: 'General Manager'
		},
		commonIssues: [
			'Heavy load pull-down failure during hot summer heatwaves',
			'Glycol chiller pump failures and pressure drops',
			'Cool room thermal pane condensation and frozen threshold heaters',
			'Faulty temperature recording sensors for health inspections'
		]
	},
	{
		slug: 'southern-highlands',
		name: 'Southern Highlands',
		h1: 'Commercial Refrigeration Repairs Southern Highlands',
		metaTitle: 'Commercial Refrigeration Repairs Bowral & Southern Highlands | AllCare',
		metaDescription:
			'Commercial refrigeration and cool room services in Bowral, Mittagong, Moss Vale & Southern Highlands. Emergency repairs and maintenance: 0411 532 233.',
		tagline:
			'Precision cooling and climate control for highland wineries, cool-climate horticulture, fine dining, and boutique hotels.',
		suburbsCovered: [
			'Bowral',
			'Mittagong',
			'Moss Vale',
			'Bundanoon',
			'Berrima',
			'Robertson',
			'Exeter',
			'Burradoo'
		],
		responseTime: 'Scheduled servicing & priority emergency breakdown dispatch',
		industries: [
			'Highland Wineries & Cellar Doors',
			'Fine Dining Restaurants & Boutique Hotels',
			'Speciality Delicatessens, Cheesemakers & Bakeries',
			'Equine, Veterinary & Agricultural Storage'
		],
		projects: [
			{
				title: 'Wine Cellar Temperature & Humidity Control Servicing',
				suburb: 'Bowral',
				description:
					'Calibrated low-velocity refrigeration evaporator, checked electronic expansion valve, and replaced humidistat sensor for premium wine preservation.'
			},
			{
				title: 'Bakery Retarder-Proofer & Walk-In Freezer Repair',
				suburb: 'Mittagong',
				description:
					'Diagnosed intermittent thermostatic failure preventing proper dough proofing cycle. Replaced electronic control module and verified cycle timings.'
			}
		],
		testimonial: {
			quote:
				'In the Southern Highlands it is hard to find refrigeration mechanics who understand precision climate control. AllCare was fast, meticulous, and completely reliable.',
			author: 'Claire H.',
			suburb: 'Bowral',
			role: 'Winery Estate Manager'
		},
		commonIssues: [
			'High-humidity cellar evaporator coil frosting in winter',
			'Electronic controller programme errors on specialized food equipment',
			'Commercial freezer door gasket brittleness due to highland cold snaps',
			'Ducted reverse cycle air conditioning refrigerant pressure loss'
		]
	}
];

/** Mapping of legacy 19 suburb slugs to their 5 regional hub targets (for 301 redirects). */
export const legacySuburbToRegionalSlug: Record<string, string> = {
	'wollongong': 'wollongong-illawarra',
	'bulli': 'wollongong-illawarra',
	'corrimal': 'wollongong-illawarra',
	'thirroul': 'wollongong-illawarra',
	'port-kembla': 'wollongong-illawarra',
	'unanderra': 'wollongong-illawarra',
	'warrawong': 'wollongong-illawarra',
	'dapto': 'wollongong-illawarra',
	'shellharbour': 'shellharbour-albion-park',
	'albion-park': 'shellharbour-albion-park',
	'oak-flats': 'shellharbour-albion-park',
	'kiama': 'kiama',
	'nowra': 'nowra-shoalhaven',
	'south-nowra': 'nowra-shoalhaven',
	'huskisson': 'nowra-shoalhaven',
	'jervis-bay': 'nowra-shoalhaven',
	'bowral': 'southern-highlands',
	'mittagong': 'southern-highlands',
	'moss-vale': 'southern-highlands'
};

/** All individual suburbs for backward compatibility and footer/JSON-LD coverage references. */
export const serviceAreas = [
	'Albion Park',
	'Bowral',
	'Bulli',
	'Corrimal',
	'Dapto',
	'Huskisson',
	'Jervis Bay',
	'Kiama',
	'Mittagong',
	'Moss Vale',
	'Nowra',
	'Oak Flats',
	'Port Kembla',
	'Shellharbour',
	'South Nowra',
	'Thirroul',
	'Unanderra',
	'Warrawong',
	'Wollongong'
] as const;

export type ServiceArea = (typeof serviceAreas)[number];

export function areaNameToSlug(name: string): string {
	return name.toLowerCase().replace(/\s+/g, '-');
}

export function locationAnchorId(area: string): string {
	return `location-${area.toLowerCase().replace(/\s+/g, '-')}`;
}

export function getRegionalAreaBySlug(slug: string): RegionalServiceArea | undefined {
	return regionalServiceAreas.find((area) => area.slug === slug);
}

export function getRegionalRedirectSlug(slug: string): string | undefined {
	return legacySuburbToRegionalSlug[slug];
}

export type ServiceAreaLanding = {
	name: typeof serviceAreas[number];
	pathname: string;
};

export function homeLandingDefaults(): ServiceAreaLanding {
	return { name: DEPOT_LOCALITY, pathname: '/' };
}
