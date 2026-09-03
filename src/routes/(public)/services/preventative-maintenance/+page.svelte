<svelte:head>
	<title>Commercial Refrigeration Preventative Maintenance Wollongong | AllCare</title>
	<meta
		name="description"
		content="Preventative refrigeration maintenance across Wollongong, Shellharbour & Illawarra. Chemical coil cleaning, leak audits & energy optimisation. Call 0411 532 233."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/services/preventative-maintenance" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Commercial Refrigeration Preventative Maintenance Wollongong | AllCare" />
	<meta
		property="og:description"
		content="Preventative refrigeration maintenance across Wollongong, Shellharbour & Illawarra. Chemical coil cleaning, leak audits & energy optimisation."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/services/preventative-maintenance" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Commercial Refrigeration Preventative Maintenance Wollongong | AllCare" />
	<meta name="twitter:description" content="Preventative refrigeration maintenance across Wollongong, Shellharbour & Illawarra. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${pageJsonLd}</script>`}
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL } from '$lib/service-areas';

	const faqs = [
		{
			q: 'How often should commercial refrigeration equipment be professionally serviced?',
			a: 'Most commercial venues require quarterly (every 3 months) or bi-annual (every 6 months) servicing. High-grease environments like commercial kitchens and seaside venues exposed to coastal salt air benefit from quarterly checks.'
		},
		{
			q: 'How much can preventative maintenance reduce my power bills?',
			a: 'Dirty condenser coils and low refrigerant charges force compressors to run longer and hotter, increasing energy consumption by up to 25–30%. Routine coil washing and charge tuning restores optimal thermodynamic efficiency.'
		},
		{
			q: 'Do you provide formal documentation for food health inspectors?',
			a: 'Yes. After every scheduled service visit, AllCare provides a detailed digital compliance checklist recording temperature readings, pressure tests, electrical safety checks, and any recommended repairs.'
		},
		{
			q: 'Do maintenance contract clients receive priority breakdown response?',
			a: 'Yes. Our scheduled maintenance agreement clients receive VIP priority emergency dispatch during busy peak seasons and summer heatwaves.'
		},
		{
			q: 'Can you tailor maintenance plans to our specific budget and equipment inventory?',
			a: 'Absolutely. We assess your fleet of cool rooms, display chillers, and ice makers to design a customized schedule that focuses on your highest-risk plant.'
		}
	];

	const checklistItems = [
		'Condenser chemical wash & fin straightening',
		'Evaporator sanitisation & drain line de-sludging',
		'Refrigerant operating pressure & leak audit',
		'Compressor oil level & electrical motor current draw',
		'Thermostat sensor & digital controller calibration',
		'Magnetic door gasket & latch seal integrity inspection',
		'Defrost heater resistance & cycle timing tests',
		'Comprehensive digital condition & compliance report'
	];

	const maintenanceBenefits = [
		{ title: 'Lower Power Bills', desc: 'Clean heat exchangers and correct gas charge minimize compressor run-time, cutting commercial electricity tariffs.' },
		{ title: 'Zero Stock Disruption', desc: 'Catching worn contactors or failing fan bearings before they seize prevents emergency midnight breakdowns.' },
		{ title: 'NSW Food Safety Compliance', desc: 'Verifiable proof that your refrigeration plant consistently holds food-safe temperatures (+2°C to +4°C).' },
		{ title: 'Extended Equipment Lifespan', desc: 'Prevent premature compressor burnout and protect your capital investment for 10–15+ years.' }
	];

	const industries = [
		'Retail Bottle Shops & Liquor Stores',
		'Supermarkets & Independent Grocers',
		'Butchers, Seafood & Delicatessens',
		'Hotels, Pubs & Registered Clubs',
		'Busy Beachside Cafes & Restaurants',
		'Aged Care & Healthcare Facilities'
	];

	const pageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/services/preventative-maintenance#service`,
				name: 'Commercial Refrigeration Preventative Maintenance',
				serviceType: 'Preventative Maintenance Agreement',
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
				description: 'Scheduled commercial refrigeration and HVAC maintenance agreements, chemical coil cleaning, and leak testing.'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/services/preventative-maintenance#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
					{ '@type': 'ListItem', position: 3, name: 'Preventative Maintenance', item: `${SITE_ORIGIN}/services/preventative-maintenance` }
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_ORIGIN}/services/preventative-maintenance#faq`,
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
			<li aria-current="page">Preventative Maintenance</li>
		</ol>
	</nav>

	<header class="service-hero">
		<div class="section-inner section-inner--wide service-hero__grid">
			<div class="service-hero__copy">
				<p class="eyebrow eyebrow--on-dark">Reduce Breakdowns & Slash Energy Costs</p>
				<h1>Commercial Refrigeration Preventative Maintenance Wollongong</h1>
				<p class="hero-lead">
					Avoid costly emergency repairs and unexpected stock losses. Our scheduled preventative maintenance 
					programs keep your cool rooms, display fridges, and HVAC systems running efficiently year-round.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary" href={resolve('/get-a-quote')}>
						<span>Get a Maintenance Proposal</span>
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
					<li><strong>Up to 25%</strong> reduction in summer power consumption</li>
					<li><strong>Priority emergency dispatch</strong> for agreement clients</li>
					<li><strong>Comprehensive reports</strong> for food safety audits</li>
					<li><strong>Custom schedules:</strong> Quarterly, bi-annual & annual</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- BENEFITS -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Strategic Value</p>
				<h2>Why Proactive Maintenance Pays for Itself</h2>
				<p>A single prevented breakdown easily covers the cost of an entire year’s maintenance plan.</p>
			</header>

			<div class="process-grid">
				{#each maintenanceBenefits as ben}
					<div class="process-card">
						<h3>{ben.title}</h3>
						<p>{ben.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CHECKLIST -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Thorough Multi-Point Audit</p>
				<h2>What Our Routine Service Checklist Covers</h2>
				<p>Our licensed technicians execute an exhaustive checklist on every visit.</p>
			</header>

			<div class="systems-grid">
				{#each checklistItems as item}
					<div class="system-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<polyline points="20 6 9 17 4 12" />
						</svg>
						<span>{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- INDUSTRIES & COVERAGE -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<div class="two-col-grid">
				<div>
					<p class="eyebrow">Industries Protected</p>
					<h2>Tailored Service Agreements Across Illawarra</h2>
					<p>From independent cafes to high-turnover liquor stores, we protect critical cooling plant across:</p>
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
					<h3>Regional Servicing Routes</h3>
					<p>We run scheduled preventative maintenance routes from our Albion Park workshop across:</p>
					<div class="coverage-tags">
						<span>Wollongong</span>
						<span>Shellharbour</span>
						<span>Kiama</span>
						<span>Gerringong</span>
						<span>Nowra</span>
						<span>Bowral</span>
						<span>Mittagong</span>
					</div>
					<div class="coverage-cta">
						<strong>Ready to protect your cooling equipment?</strong>
						<a class="btn-primary" href={resolve('/get-a-quote')}>Request Tailored Service Plan</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Frequently Asked Questions</p>
				<h2>Preventative Maintenance FAQ</h2>
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
			<h2>Lock in Your Preventative Maintenance Schedule</h2>
			<p>Contact AllCare Refrigeration today for a tailored, cost-effective service plan for your venue.</p>
			<div class="cta-actions">
				<a class="btn-primary" href={resolve('/get-a-quote')}>Request Service Plan</a>
				<a class="btn-ghost" href="tel:{PRIMARY_PHONE_TEL}">Speak to our team: {PRIMARY_PHONE}</a>
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
	.systems-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
	.system-item { display: flex; align-items: center; gap: 0.75rem; padding: 1.1rem 1.3rem; background: #ffffff; border: 1px solid var(--color-line); border-radius: 14px; font-weight: 700; font-size: 0.92rem; color: var(--color-ink); box-shadow: 0 4px 12px -6px rgba(0, 0, 0, 0.06); }
	.system-item svg { color: var(--color-brand); flex-shrink: 0; }
	.section-shell--alt { background: var(--color-frost); }
	.process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
	.process-card { background: #ffffff; border: 1px solid var(--color-line); border-radius: 16px; padding: 1.5rem; position: relative; }
	.process-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-brand-deeper); }
	.process-card p { font-size: 0.9rem; line-height: 1.55; margin: 0; }
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
