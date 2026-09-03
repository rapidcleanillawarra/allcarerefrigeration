<svelte:head>
	<title>Commercial Refrigeration Installation Wollongong & Illawarra | AllCare</title>
	<meta
		name="description"
		content="Custom commercial refrigeration installation across Wollongong, Shellharbour & Illawarra. Cool rooms, walk-in freezers & condensing plant design. Call 0411 532 233."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/services/commercial-refrigeration-installation" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Commercial Refrigeration Installation Wollongong & Illawarra | AllCare" />
	<meta
		property="og:description"
		content="Custom commercial refrigeration installation across Wollongong, Shellharbour & Illawarra. Cool rooms, walk-in freezers & condensing plant design."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/services/commercial-refrigeration-installation" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Commercial Refrigeration Installation Wollongong & Illawarra | AllCare" />
	<meta name="twitter:description" content="Custom cool rooms and commercial refrigeration installations across the Illawarra. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${pageJsonLd}</script>`}
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL } from '$lib/service-areas';

	const faqs = [
		{
			q: 'How do you determine the correct refrigeration capacity for a new cool room?',
			a: 'We perform formal heat load engineering calculations considering room dimensions, insulation thickness, ambient temperature extremes, product daily turnover, door openings, and internal lighting/fan motor heat dissipation.'
		},
		{
			q: 'Do you design and install custom-sized cool rooms for tight kitchen footprints?',
			a: 'Yes. We supply and erect custom modular insulated panel rooms (PIR/EPS) cut precisely to fit difficult spaces, low-clearance ceilings, or irregular room layouts.'
		},
		{
			q: 'Can you relocate or safely dispose of old refrigeration equipment?',
			a: 'Yes, we safely decommission old refrigeration plant, recover remaining refrigerants according to Australian environmental regulations (ARC AU53597), and dispose of obsolete panels and machinery.'
		},
		{
			q: 'What warranty is provided on new refrigeration installations?',
			a: 'All new equipment installations are backed by manufacturer warranties on major components (compressors, coils, fans) plus our comprehensive AllCare installation workmanship guarantee.'
		},
		{
			q: 'How long does a typical cool room installation take?',
			a: 'A standard hospitality cool room or freezer fit-out typically takes 2–4 business days from panel delivery to final commissioning and temperature logging.'
		}
	];

	const installationServices = [
		'Custom walk-in cool room design & build',
		'Walk-in freezer room installation (-18°C to -25°C)',
		'Remote condensing unit placement & refrigeration pipework',
		'Bottle shop glass display door insert rooms',
		'Butcher & meat processing climate rooms',
		'Commercial kitchen refurbishment & cold storage upgrades',
		'Energy-efficient inverter condensing plant',
		'Digital temperature controllers & alarm integrations'
	];

	const engineeringConsiderations = [
		{ factor: 'Heat Load Sizing', detail: 'Calculation of product pull-down demands and Illawarra summer ambient peak loads (40°C+).' },
		{ factor: 'Insulation Specification', detail: 'High-density insulated sandwich panels (PIR/EPS) with thermal break floor construction.' },
		{ factor: 'Refrigerant Selection', detail: 'Low-GWP, high-efficiency modern refrigerants (R448A, R449A, R452A) compliant with phase-down legislation.' },
		{ factor: 'Airflow Optimization', detail: 'Even air distribution to prevent warm dead-spots and avoid excessive product moisture dehydration.' },
		{ factor: 'Condenser Ventilation', detail: 'Strategic positioning to ensure outdoor units receive unobstructed airflow away from salt-corrosion zones.' }
	];

	const industries = [
		'New Restaurant, Bistro & Cafe Fit-Outs',
		'Supermarket & Independent Grocer Expansions',
		'Butcher Shops & Specialty Meat Processors',
		'Retail Liquor Stores & Bottle Shop Renovations',
		'Boutique Wineries, Breweries & Distilleries',
		'Commercial Food Packaging & Distribution Hubs'
	];

	const processSteps = [
		{ num: '01', title: 'Site Inspection', text: 'On-site survey to assess dimensions, electrical capacity, ventilation paths, and delivery access.' },
		{ num: '02', title: 'Heat Load Engineering', text: 'Rigorous thermal modeling to size the exact kilowatt capacity required for your product volume.' },
		{ num: '03', title: 'Detailed Proposal', text: 'Clear scope of work, technical specifications, equipment brand options, and fixed pricing.' },
		{ num: '04', title: 'Installation & Piping', text: 'Panel construction, refrigeration pipework brazing with dry nitrogen purge, and electrical control wiring.' },
		{ num: '05', title: 'Pressure Testing & Handover', text: 'High-pressure nitrogen leak testing, deep vacuum evacuation, precision charging, and complete staff handover.' }
	];

	const pageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/services/commercial-refrigeration-installation#service`,
				name: 'Commercial Refrigeration Installation',
				serviceType: 'Refrigeration Installation & Fit-Out',
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
				description: 'Custom commercial cool room and walk-in freezer design, supply, installation, and commissioning.'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/services/commercial-refrigeration-installation#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
					{ '@type': 'ListItem', position: 3, name: 'Commercial Refrigeration Installation', item: `${SITE_ORIGIN}/services/commercial-refrigeration-installation` }
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_ORIGIN}/services/commercial-refrigeration-installation#faq`,
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
	<nav class="section-inner section-inner--wide breadcrumb-nav" aria-label="Breadcrumb">
		<ol>
			<li><a href={resolve('/')}>Home</a></li>
			<li><span class="sep">/</span></li>
			<li><a href={resolve('/services')}>Services</a></li>
			<li><span class="sep">/</span></li>
			<li aria-current="page">Commercial Refrigeration Installation</li>
		</ol>
	</nav>

	<header class="service-hero">
		<div class="section-inner section-inner--wide service-hero__grid">
			<div class="service-hero__copy">
				<p class="eyebrow eyebrow--on-dark">Engineered For Australian Conditions</p>
				<h1>Commercial Refrigeration Installation Wollongong & Illawarra</h1>
				<p class="hero-lead">
					Custom walk-in cool rooms, freezer rooms, and commercial refrigeration plant engineered 
					for food businesses across Wollongong, Shellharbour, Kiama, and the Southern Highlands.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary" href={resolve('/get-a-quote')}>
						<span>Request an Installation Quote</span>
					</a>
					<a class="btn-ghost" href="tel:{PRIMARY_PHONE_TEL}">
						Call Direct: {PRIMARY_PHONE}
					</a>
				</div>
			</div>

			<div class="service-hero__card">
				<div class="hero-badge-wrap">
					<ArctickLicenseBadge variant="inline" />
				</div>
				<ul class="hero-quick-points">
					<li><strong>Custom sizing:</strong> Built precisely for your site layout</li>
					<li><strong>Heat load calculations:</strong> Guaranteed performance in 40°C+ summer peaks</li>
					<li><strong>Tier-1 plant:</strong> Bitzer, Copeland, Kirby, Heatcraft</li>
					<li><strong>Complete commissioning:</strong> Food safety compliance certified</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- SYSTEMS SERVICED -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Installation Scope</p>
				<h2>Commercial Systems Engineered & Installed</h2>
				<p>From single walk-in rooms to complete supermarket and hospitality refrigeration plant.</p>
			</header>

			<div class="systems-grid">
				{#each installationServices as srv}
					<div class="system-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<polyline points="20 6 9 17 4 12" />
						</svg>
						<span>{srv}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ENGINEERING STANDARDS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Quality Engineering</p>
				<h2>Precision Design & Engineering Factors</h2>
				<p>We build refrigeration systems that maintain target temperatures effortlessly while minimizing power bills.</p>
			</header>

			<div class="process-grid">
				{#each engineeringConsiderations as eng}
					<div class="process-card">
						<h3>{eng.factor}</h3>
						<p>{eng.detail}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- PROCESS -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Seamless Execution</p>
				<h2>Our 5-Stage Installation Process</h2>
				<p>From initial site consult to final pressure testing and temperature handover.</p>
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
					<p class="eyebrow">Client Sectors</p>
					<h2>Trusted by Commercial Fit-Out Specialists</h2>
					<p>We work with commercial builders, business owners, and shopfitters across the South Coast:</p>
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
					<h3>Supply & Build Across the Region</h3>
					<p>We fabricate and install systems throughout the Illawarra, Shoalhaven, and Highlands:</p>
					<div class="coverage-tags">
						<span>Wollongong</span>
						<span>Shellharbour</span>
						<span>Albion Park</span>
						<span>Kiama</span>
						<span>Nowra</span>
						<span>Bowral</span>
						<span>Moss Vale</span>
					</div>
					<div class="coverage-cta">
						<strong>Planning a new cool room or fit-out?</strong>
						<a class="btn-primary" href={resolve('/get-a-quote')}>Request Site Consultation</a>
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
				<h2>Commercial Refrigeration Installation FAQ</h2>
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
			<h2>Build a High-Efficiency Cold Storage System</h2>
			<p>Get in touch with AllCare Refrigeration for expert advice, accurate sizing, and competitive quotes.</p>
			<div class="cta-actions">
				<a class="btn-primary" href={resolve('/get-a-quote')}>Request Installation Quote</a>
				<a class="btn-ghost" href="tel:{PRIMARY_PHONE_TEL}">Speak to a Technician: {PRIMARY_PHONE}</a>
			</div>
		</div>
	</section>
</div>

<style>
	.service-detail-page { color: var(--color-ink); }
	.breadcrumb-nav { padding-top: 1rem; padding-bottom: 0.5rem; }
	.breadcrumb-nav ol { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; list-style: none; margin: 0; padding: 0; font-size: 0.82rem; color: var(--color-ink-soft); }
	.breadcrumb-nav a { color: var(--color-ink-soft); text-decoration: none; }
	.breadcrumb-nav a:hover { color: var(--color-brand); }
	.breadcrumb-nav .sep { color: var(--color-line); }
	.service-hero { background: linear-gradient(135deg, var(--color-brand-deeper) 0%, var(--color-brand) 55%, var(--color-brand-light) 100%); color: #ffffff; padding: clamp(2.5rem, 5vw, 4rem) 0; }
	.service-hero__grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
	@media (min-width: 900px) { .service-hero__grid { grid-template-columns: 1.3fr 0.9fr; } }
	.service-hero h1 { font-size: clamp(2rem, 4vw, 3.2rem); color: #ffffff; line-height: 1.1; margin: 0.5rem 0 1rem; }
	.service-hero .hero-lead { font-size: 1.05rem; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin-bottom: 1.5rem; }
	.hero-ctas { display: flex; flex-wrap: wrap; gap: 0.8rem; }
	.service-hero__card { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 1.8rem; backdrop-filter: blur(12px); }
	.hero-quick-points { list-style: none; margin: 1.2rem 0 0; padding: 0; display: grid; gap: 0.8rem; font-size: 0.95rem; color: #ffffff; }
	.hero-quick-points li { padding-left: 1.4rem; position: relative; }
	.hero-quick-points li::before { content: '✓'; position: absolute; left: 0; color: #6ee7b7; font-weight: 800; }
	.systems-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
	.system-item { display: flex; align-items: center; gap: 0.75rem; padding: 1.1rem 1.3rem; background: #ffffff; border: 1px solid var(--color-line); border-radius: 14px; font-weight: 700; font-size: 0.92rem; color: var(--color-ink); box-shadow: 0 4px 12px -6px rgba(0, 0, 0, 0.06); }
	.system-item svg { color: var(--color-brand); flex-shrink: 0; }
	.section-shell--alt { background: var(--color-frost); }
	.process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }
	.process-card { background: #ffffff; border: 1px solid var(--color-line); border-radius: 16px; padding: 1.5rem; position: relative; }
	.process-num { font-size: 1.8rem; font-weight: 900; color: var(--color-brand); opacity: 0.35; margin-bottom: 0.4rem; display: block; }
	.process-card h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
	.process-card p { font-size: 0.88rem; line-height: 1.55; margin: 0; }
	.two-col-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
	@media (min-width: 860px) { .two-col-grid { grid-template-columns: 1.2fr 1fr; } }
	.check-list { list-style: none; padding: 0; margin: 1.2rem 0 0; display: grid; gap: 0.75rem; }
	.check-list li { display: flex; align-items: center; gap: 0.65rem; font-weight: 600; color: var(--color-ink); }
	.check-list svg { color: var(--color-brand); flex-shrink: 0; }
	.coverage-box { background: #ffffff; border: 1px solid var(--color-line); border-radius: 18px; padding: 1.8rem; box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.1); }
	.coverage-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 1.5rem; }
	.coverage-tags span { padding: 0.35rem 0.75rem; background: var(--color-frost); border-radius: 8px; font-size: 0.82rem; font-weight: 700; color: var(--color-brand-deeper); }
	.coverage-cta { padding-top: 1.2rem; border-top: 1px solid var(--color-line); display: flex; flex-direction: column; gap: 0.8rem; }
	.faq-list { max-width: 48rem; margin: 0 auto; display: grid; gap: 0.85rem; }
	.faq-item { background: #ffffff; border: 1px solid var(--color-line); border-radius: 14px; padding: 1.1rem 1.4rem; }
	.faq-question { display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 1rem; cursor: pointer; color: var(--color-ink); }
	.faq-question svg { transition: transform 200ms ease; color: var(--color-brand); }
	details[open] .faq-question svg { transform: rotate(180deg); }
	.faq-answer { margin: 0.8rem 0 0; font-size: 0.92rem; line-height: 1.6; color: var(--color-ink-soft); }
	.cta-box { background: linear-gradient(135deg, var(--color-brand-deeper), var(--color-brand)); color: #ffffff; border-radius: 22px; padding: clamp(2rem, 5vw, 3.5rem); text-align: center; }
	.cta-box h2 { color: #ffffff; font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-bottom: 0.6rem; }
	.cta-box p { color: rgba(255, 255, 255, 0.9); max-width: 36rem; margin: 0 auto 1.5rem; }
	.cta-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.8rem; }
</style>
