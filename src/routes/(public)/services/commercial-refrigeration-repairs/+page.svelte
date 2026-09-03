<svelte:head>
	<title>Commercial Refrigeration Repairs Wollongong & Illawarra | AllCare</title>
	<meta
		name="description"
		content="Fast commercial refrigeration repairs in Wollongong, Shellharbour & Illawarra. Display fridges, drink chillers, bottle shop fridges & compressors. 24/7 breakdown callouts: 0411 532 233."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/services/commercial-refrigeration-repairs" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Commercial Refrigeration Repairs Wollongong & Illawarra | AllCare" />
	<meta
		property="og:description"
		content="Fast commercial refrigeration repairs in Wollongong, Shellharbour & Illawarra. Display fridges, drink chillers, bottle shop fridges & compressors."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/services/commercial-refrigeration-repairs" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Commercial Refrigeration Repairs Wollongong & Illawarra | AllCare" />
	<meta name="twitter:description" content="Fast commercial refrigeration repairs in Wollongong, Shellharbour & Illawarra. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${pageJsonLd}</script>`}
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL } from '$lib/service-areas';

	const faqs = [
		{
			q: 'How quickly can you attend a commercial fridge breakdown?',
			a: 'We prioritise commercial refrigeration emergencies across Wollongong, Shellharbour and the Illawarra. Our central depot is in Albion Park, allowing typical emergency response within 30–60 minutes.'
		},
		{
			q: 'What types of commercial fridges do you repair?',
			a: 'We repair upright glass-door display fridges, under-bench prep chillers, multi-deck open displays, bottle shop cool rooms, cake showcases, and commercial blast chillers.'
		},
		{
			q: 'Why is my commercial fridge running but not cooling down?',
			a: 'Common causes include dirty or blocked condenser coils, failed evaporator fan motors, low refrigerant gas due to a leak, or a faulty electronic thermostat/TXV valve. Our technicians carry diagnostic gear to locate the exact cause quickly.'
		},
		{
			q: 'Do you carry spare parts in your service vans?',
			a: 'Yes. Our service vans are stocked with universal fans, electronic temperature controllers (Dixell, Carel), contactors, relays, defrost timers, and refrigerants so most repairs are completed on the first visit.'
		},
		{
			q: 'Are your technicians licensed for refrigerant handling?',
			a: 'Yes, AllCare Refrigeration holds ARCtick License AU53597 and all technicians are fully qualified and insured commercial refrigeration mechanics.'
		}
	];

	const systemsServiced = [
		'Glass door beverage & drink fridges',
		'Under-counter & sandwich prep benches',
		'Multi-deck supermarket display chillers',
		'Cake & deli display showcases',
		'Commercial blast chillers & freezers',
		'Remote condensing refrigeration systems',
		'Back-bar beer and wine coolers',
		'Ice machines and commercial flakers'
	];

	const commonFaults = [
		{ fault: 'Fridge not holding temperature', cause: 'Blocked condenser coils, faulty fan motor, or thermostat calibration failure' },
		{ fault: 'Icing up on evaporator coils', cause: 'Defrost heater failure, timer breakdown, or worn door gaskets letting moisture in' },
		{ fault: 'Compressor clicking or tripping circuit', cause: 'Overheating, high head pressure, or start capacitor/relay failure' },
		{ fault: 'Refrigerant gas leak', cause: 'Vibration rub-throughs on copper pipes or corroded service fittings' },
		{ fault: 'Excessive water pooling inside unit', cause: 'Blocked condensate drain lines or failed drain pan heater' }
	];

	const industries = [
		'Cafes, Bakeries & Coffee Shops',
		'Pubs, Taverns & Registered Clubs',
		'Bottle Shops & Retail Liquor Outlets',
		'Supermarkets & Independent Grocers',
		'Restaurants, Pizzerias & Commercial Kitchens',
		'Medical Suites & Pharmaceutical Storage'
	];

	const processSteps = [
		{ num: '01', title: 'Rapid Triage', text: 'Call 0411 532 233. We triage your system failure over the phone and dispatch an emergency technician immediately.' },
		{ num: '02', title: 'Diagnostic Testing', text: 'We connect digital gauges, inspect electrical components, leak-check pipework, and pinpoint the exact fault.' },
		{ num: '03', title: 'Transparent Quote', text: 'We explain the issue clearly, outline your repair options, and provide upfront pricing before replacing parts.' },
		{ num: '04', title: 'Precision OEM Repair', text: 'Using quality replacement parts, we repair the defect, verify pressures, and ensure optimal airflow.' },
		{ num: '05', title: 'Temperature Commissioning', text: 'We log pull-down temperature performance to ensure your unit reaches safe food holding standards before sign-off.' }
	];

	const pageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/services/commercial-refrigeration-repairs#service`,
				name: 'Commercial Refrigeration Repairs',
				serviceType: 'Commercial Refrigeration Repair',
				provider: {
					'@type': 'LocalBusiness',
					name: 'AllCare Refrigeration',
					url: `${SITE_ORIGIN}/`,
					telephone: '+61411532233',
					address: {
						'@type': 'PostalAddress',
						streetAddress: '157 Church St',
						addressLocality: 'Albion Park',
						addressRegion: 'NSW',
						postalCode: '2527',
						addressCountry: 'AU'
					}
				},
				areaServed: ['Wollongong', 'Shellharbour', 'Kiama', 'Nowra', 'Southern Highlands'],
				description: 'Emergency diagnostics and repairs for commercial display fridges, chillers, and cooling plant.'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/services/commercial-refrigeration-repairs#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
					{ '@type': 'ListItem', position: 3, name: 'Commercial Refrigeration Repairs', item: `${SITE_ORIGIN}/services/commercial-refrigeration-repairs` }
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_ORIGIN}/services/commercial-refrigeration-repairs#faq`,
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.q,
					acceptedAnswer: { '@type': 'Answer', text: faq.a }
				}))
			}
		]
	});
</script>

<div class="service-detail-page">
	<!-- Breadcrumbs -->
	<nav class="section-inner section-inner--wide breadcrumb-nav" aria-label="Breadcrumb">
		<ol>
			<li><a href={resolve('/')}>Home</a></li>
			<li><span class="sep">/</span></li>
			<li><a href={resolve('/services')}>Services</a></li>
			<li><span class="sep">/</span></li>
			<li aria-current="page">Commercial Refrigeration Repairs</li>
		</ol>
	</nav>

	<!-- HERO -->
	<header class="service-hero">
		<div class="section-inner section-inner--wide service-hero__grid">
			<div class="service-hero__copy">
				<p class="eyebrow eyebrow--on-dark">Emergency & Scheduled Cooling Support</p>
				<h1>Commercial Refrigeration Repairs Wollongong & Illawarra</h1>
				<p class="hero-lead">
					When your commercial fridge, bottle cooler, or display cabinet stops chilling, every minute counts. 
					AllCare Refrigeration provides rapid on-site diagnosis and repair across Wollongong, Shellharbour, Kiama, and Shoalhaven.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">
						<span>Emergency Call: {PRIMARY_PHONE}</span>
					</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>
						Request a Repair Quote
					</a>
				</div>
			</div>

			<div class="service-hero__card">
				<div class="hero-badge-wrap">
					<ArctickLicenseBadge variant="inline" />
				</div>
				<ul class="hero-quick-points">
					<li><strong>Rapid dispatch</strong> from Albion Park depot</li>
					<li><strong>24/7 Breakdown</strong> callout availability</li>
					<li><strong>All major brands:</strong> Skope, Williams, Bromic, Bitzer, Kirby</li>
					<li><strong>Stocked vans</strong> with genuine replacement parts</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- SYSTEMS SERVICED -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Equipment Coverage</p>
				<h2>Commercial Refrigeration Systems We Service</h2>
				<p>We work on all self-contained and remote commercial cooling systems across retail and food service venues.</p>
			</header>

			<div class="systems-grid">
				{#each systemsServiced as system}
					<div class="system-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<polyline points="20 6 9 17 4 12" />
						</svg>
						<span>{system}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- COMMON FAULTS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Diagnostics</p>
				<h2>Common Faults We Diagnose & Repair Daily</h2>
				<p>Our technicians identify the root cause, not just the symptom, preventing recurring breakdowns.</p>
			</header>

			<div class="faults-table-wrap">
				<table class="faults-table">
					<thead>
						<tr>
							<th>Reported Problem</th>
							<th>Underlying Technical Cause</th>
							<th>Our Repair Solution</th>
						</tr>
					</thead>
					<tbody>
						{#each commonFaults as item}
							<tr>
								<td><strong>{item.fault}</strong></td>
								<td>{item.cause}</td>
								<td>Thorough component testing, OEM part swap & temperature recalibration</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- REPAIR PROCESS -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">How We Work</p>
				<h2>Our 5-Step Commercial Repair Process</h2>
				<p>Structured, professional service designed to restore your operations with zero guesswork.</p>
			</header>

			<div class="process-grid">
				{#each processSteps as step}
					<div class="process-card">
						<span class="process-num">{step.num}</span>
						<h3>{step.title}</h3>
						<p>{step.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- INDUSTRIES & COVERAGE -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<div class="two-col-grid">
				<div>
					<p class="eyebrow">Industries Served</p>
					<h2>Built for Illawarra Food & Hospitality Businesses</h2>
					<p>We understand that a broken fridge risks thousands of dollars in stock and threatens food safety compliance. We partner with:</p>
					<ul class="check-list">
						{#each industries as ind}
							<li>
								<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
									<polyline points="20 6 9 17 4 12" />
								</svg>
								{ind}
							</li>
						{/each}
					</ul>
				</div>

				<div class="coverage-box">
					<h3>Regional Coverage From Albion Park</h3>
					<p>Based at 157 Church St, Albion Park, our fleet operates across the entire coastal corridor and Southern Highlands:</p>
					<div class="coverage-tags">
						<span>Wollongong CBD</span>
						<span>Corrimal</span>
						<span>Bulli & Thirroul</span>
						<span>Shellharbour</span>
						<span>Kiama</span>
						<span>Nowra & Shoalhaven</span>
						<span>Bowral & Mittagong</span>
					</div>
					<div class="coverage-cta">
						<strong>Need an on-site technician today?</strong>
						<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE}</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQS -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Frequently Asked Questions</p>
				<h2>Commercial Refrigeration Repairs FAQ</h2>
			</header>

			<div class="faq-list">
				{#each faqs as faq}
					<details class="faq-item">
						<summary class="faq-question">
							<span>{faq.q}</span>
							<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</summary>
						<p class="faq-answer">{faq.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="section-shell cta-section">
		<div class="section-inner section-inner--wide cta-box">
			<h2>Restore Your Commercial Refrigeration Fast</h2>
			<p>Speak directly with a licensed refrigeration mechanic. Same-day emergency diagnostics available.</p>
			<div class="cta-actions">
				<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE}</a>
				<a class="btn-ghost" href={resolve('/get-a-quote')}>Submit Online Quote</a>
			</div>
		</div>
	</section>
</div>

<style>
	.service-detail-page {
		color: var(--color-ink);
	}

	.breadcrumb-nav {
		padding-top: 1rem;
		padding-bottom: 0.5rem;
	}

	.breadcrumb-nav ol {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 0.82rem;
		color: var(--color-ink-soft);
	}

	.breadcrumb-nav a {
		color: var(--color-ink-soft);
		text-decoration: none;
	}

	.breadcrumb-nav a:hover {
		color: var(--color-brand);
	}

	.breadcrumb-nav .sep {
		color: var(--color-line);
	}

	.service-hero {
		background: linear-gradient(135deg, var(--color-brand-deeper) 0%, var(--color-brand) 55%, var(--color-brand-light) 100%);
		color: #ffffff;
		padding: clamp(2.5rem, 5vw, 4rem) 0;
	}

	.service-hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.service-hero__grid {
			grid-template-columns: 1.3fr 0.9fr;
		}
	}

	.service-hero h1 {
		font-size: clamp(2rem, 4vw, 3.2rem);
		color: #ffffff;
		line-height: 1.1;
		margin: 0.5rem 0 1rem;
	}

	.service-hero .hero-lead {
		font-size: 1.05rem;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.service-hero__card {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 1.8rem;
		backdrop-filter: blur(12px);
	}

	.hero-quick-points {
		list-style: none;
		margin: 1.2rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.8rem;
		font-size: 0.95rem;
		color: #ffffff;
	}

	.hero-quick-points li {
		padding-left: 1.4rem;
		position: relative;
	}

	.hero-quick-points li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #6ee7b7;
		font-weight: 800;
	}

	.systems-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.system-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.1rem 1.3rem;
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 14px;
		font-weight: 700;
		font-size: 0.92rem;
		color: var(--color-ink);
		box-shadow: 0 4px 12px -6px rgba(0, 0, 0, 0.06);
	}

	.system-item svg {
		color: var(--color-brand);
		flex-shrink: 0;
	}

	.section-shell--alt {
		background: var(--color-frost);
	}

	.faults-table-wrap {
		overflow-x: auto;
		background: #ffffff;
		border-radius: 16px;
		border: 1px solid var(--color-line);
		box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.08);
	}

	.faults-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		font-size: 0.92rem;
	}

	.faults-table th,
	.faults-table td {
		padding: 1.1rem 1.4rem;
		border-bottom: 1px solid var(--color-line);
	}

	.faults-table th {
		background: var(--color-frost);
		font-weight: 800;
		color: var(--color-brand-deeper);
		text-transform: uppercase;
		font-size: 0.78rem;
		letter-spacing: 0.06em;
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.25rem;
	}

	.process-card {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 16px;
		padding: 1.5rem;
		position: relative;
	}

	.process-num {
		font-size: 1.8rem;
		font-weight: 900;
		color: var(--color-brand);
		opacity: 0.35;
		margin-bottom: 0.4rem;
		display: block;
	}

	.process-card h3 {
		font-size: 1.05rem;
		margin-bottom: 0.5rem;
	}

	.process-card p {
		font-size: 0.88rem;
		line-height: 1.55;
		margin: 0;
	}

	.two-col-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 860px) {
		.two-col-grid {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	.check-list {
		list-style: none;
		padding: 0;
		margin: 1.2rem 0 0;
		display: grid;
		gap: 0.75rem;
	}

	.check-list li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-weight: 600;
		color: var(--color-ink);
	}

	.check-list svg {
		color: var(--color-brand);
		flex-shrink: 0;
	}

	.coverage-box {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 18px;
		padding: 1.8rem;
		box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.1);
	}

	.coverage-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1rem 0 1.5rem;
	}

	.coverage-tags span {
		padding: 0.35rem 0.75rem;
		background: var(--color-frost);
		border-radius: 8px;
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--color-brand-deeper);
	}

	.coverage-cta {
		padding-top: 1.2rem;
		border-top: 1px solid var(--color-line);
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.faq-list {
		max-width: 48rem;
		margin: 0 auto;
		display: grid;
		gap: 0.85rem;
	}

	.faq-item {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 14px;
		padding: 1.1rem 1.4rem;
	}

	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 800;
		font-size: 1rem;
		cursor: pointer;
		color: var(--color-ink);
	}

	.faq-question svg {
		transition: transform 200ms ease;
		color: var(--color-brand);
	}

	details[open] .faq-question svg {
		transform: rotate(180deg);
	}

	.faq-answer {
		margin: 0.8rem 0 0;
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-ink-soft);
	}

	.cta-box {
		background: linear-gradient(135deg, var(--color-brand-deeper), var(--color-brand));
		color: #ffffff;
		border-radius: 22px;
		padding: clamp(2rem, 5vw, 3.5rem);
		text-align: center;
	}

	.cta-box h2 {
		color: #ffffff;
		font-size: clamp(1.8rem, 3.5vw, 2.6rem);
		margin-bottom: 0.6rem;
	}

	.cta-box p {
		color: rgba(255, 255, 255, 0.9);
		max-width: 36rem;
		margin: 0 auto 1.5rem;
	}

	.cta-actions {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.8rem;
	}
</style>
