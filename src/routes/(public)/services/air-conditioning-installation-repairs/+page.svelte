<svelte:head>
	<title>Commercial Air Conditioning Installation & Repairs Wollongong | AllCare</title>
	<meta
		name="description"
		content="Commercial air conditioning installation and repairs in Wollongong, Shellharbour & Illawarra. Split systems, ducted HVAC & cassette units. ARCtick AU53597. Call 0411 532 233."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/services/air-conditioning-installation-repairs" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Commercial Air Conditioning Installation & Repairs Wollongong | AllCare" />
	<meta
		property="og:description"
		content="Commercial air conditioning installation and repairs in Wollongong, Shellharbour & Illawarra. Split systems, ducted HVAC & cassette units."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/services/air-conditioning-installation-repairs" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Commercial Air Conditioning Installation & Repairs Wollongong | AllCare" />
	<meta name="twitter:description" content="Commercial air conditioning installations and repairs in Wollongong & Illawarra. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${pageJsonLd}</script>`}
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL } from '$lib/service-areas';

	const faqs = [
		{
			q: 'What air conditioning brands do you service and install?',
			a: 'We work with all leading commercial and residential HVAC brands including Daikin, Mitsubishi Heavy Industries, ActronAir, Panasonic, Fujitsu, and Carrier.'
		},
		{
			q: 'Do you service commercial ducted systems for offices and retail stores?',
			a: 'Yes. We provide complete maintenance, fault diagnosis, fan motor repairs, damper motor calibrations, and filter sanitisation for commercial ducted systems across the Illawarra.'
		},
		{
			q: 'Why is my commercial air conditioner blowing warm air?',
			a: 'The most frequent causes are low refrigerant charge from a pipework pinhole leak, a failed outdoor condenser fan motor, a faulty capacitor/inverter drive board, or dirty blocked air filters. Our technicians diagnose the exact defect on site.'
		},
		{
			q: 'Are your HVAC technicians fully licensed in NSW?',
			a: 'Yes. AllCare Refrigeration holds national ARCtick certification (License AU53597), certifying our team for safe refrigerant recovery, handling, pressure testing, and installations.'
		},
		{
			q: 'Can you recommend energy-efficient replacements for older R22 air conditioners?',
			a: 'Yes. Obsolete R22 systems are expensive to run and repair. We calculate heat loads and recommend modern high-COP inverter split or ducted systems running R32 or R410A that cut power consumption substantially.'
		}
	];

	const acSystems = [
		'Commercial wall-mounted split systems',
		'Multi-head variable refrigerant systems (VRF/VRV)',
		'Ceiling cassette units for retail & hospitality',
		'Ducted reverse-cycle commercial HVAC',
		'Server room & IT precision cooling units',
		'Under-ceiling suspended commercial split systems',
		'Package rooftop reverse-cycle HVAC units',
		'Fresh air ventilation & exhaust fan integrations'
	];

	const commonFaults = [
		{ fault: 'System blowing room-temperature air', cause: 'Refrigerant leak, failed compressor contactor, or inverter board lockout' },
		{ fault: 'Water leaking from indoor head unit', cause: 'Blocked condensate drain tray, clogged drain pipe, or failed condensate pump' },
		{ fault: 'Noisy indoor or outdoor fan', cause: 'Worn motor bearings, unbalanced blower wheel, or fan shroud contact' },
		{ fault: 'Thermostat or wall controller error code', cause: 'Thermistor sensor open/short circuit, communication bus error, or power glitch' },
		{ fault: 'Foul or musty odour from air vents', cause: 'Bacterial and mold growth across damp evaporator coils and filter media' }
	];

	const industries = [
		'Corporate Offices & Professional Suites',
		'Retail Stores, Boutiques & Shopping Centres',
		'Medical Practices, Dentists & Health Clinics',
		'Beachside Hospitality, Pubs & Bistros',
		'Schools, Childcare & Educational Facilities',
		'IT Server Rooms & Critical Tech Infrastructure'
	];

	const processSteps = [
		{ num: '01', title: 'Consultation & Site Review', text: 'We assess thermal loads, ceiling space, electrical capacity, and outdoor unit placement options.' },
		{ num: '02', title: 'Brand & Capacity Sizing', text: 'We select the right kilowatt sizing from proven manufacturers like Daikin, Mitsubishi, and ActronAir.' },
		{ num: '03', title: 'Clean Installation', text: 'Neat, compliant installation of pipework, ducting, condensate drains, and electrical supply.' },
		{ num: '04', title: 'Pressure Testing & Evacuation', text: 'Deep vacuum testing and precise refrigerant charging to verify sealed system integrity.' },
		{ num: '05', title: 'Commissioning & Handover', text: 'Airflow balancing, controller programming, zone setup, and client walk-through.' }
	];

	const pageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/services/air-conditioning-installation-repairs#service`,
				name: 'Commercial Air Conditioning Installation and Repairs',
				serviceType: 'Commercial HVAC Installation & Repair',
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
				description: 'Commercial and light commercial split system, ducted HVAC, and cassette installation, repair, and maintenance.'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/services/air-conditioning-installation-repairs#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
					{ '@type': 'ListItem', position: 3, name: 'Air Conditioning Installation & Repairs', item: `${SITE_ORIGIN}/services/air-conditioning-installation-repairs` }
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_ORIGIN}/services/air-conditioning-installation-repairs#faq`,
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
			<li aria-current="page">Air Conditioning Installation & Repairs</li>
		</ol>
	</nav>

	<header class="service-hero">
		<div class="section-inner section-inner--wide service-hero__grid">
			<div class="service-hero__copy">
				<p class="eyebrow eyebrow--on-dark">ARCtick AU53597 Certified HVAC</p>
				<h1>Commercial Air Conditioning Installation & Repairs Wollongong</h1>
				<p class="hero-lead">
					Reliable climate control for offices, retail, hospitality, and commercial premises across Wollongong, 
					Shellharbour, Kiama, and the Southern Highlands. Complete split, ducted, and cassette HVAC services.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary" href={resolve('/get-a-quote')}>
						<span>Get an Air Conditioning Quote</span>
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
					<li><strong>ARCtick AU53597:</strong> Fully licensed refrigerant technicians</li>
					<li><strong>Specialist brands:</strong> Daikin, Mitsubishi, ActronAir</li>
					<li><strong>Commercial & Light Commercial:</strong> Split, ducted, cassette</li>
					<li><strong>Fast fault finding:</strong> Sensor, leak & compressor diagnostics</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- SYSTEMS SERVICED -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">HVAC Plant</p>
				<h2>Air Conditioning Systems We Service & Install</h2>
				<p>From single office split systems to multi-story ducted commercial buildings.</p>
			</header>

			<div class="systems-grid">
				{#each acSystems as sys}
					<div class="system-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<polyline points="20 6 9 17 4 12" />
						</svg>
						<span>{sys}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- COMMON FAULTS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">HVAC Diagnostics</p>
				<h2>Common Air Conditioning Problems We Resolve</h2>
				<p>Restoring cooling, heating, and clean airflow across Illawarra commercial sites.</p>
			</header>

			<div class="faults-table-wrap">
				<table class="faults-table">
					<thead>
						<tr>
							<th>Common Fault</th>
							<th>Technical Root Cause</th>
							<th>AllCare Service Solution</th>
						</tr>
					</thead>
					<tbody>
						{#each commonFaults as item}
							<tr>
								<td><strong>{item.fault}</strong></td>
								<td>{item.cause}</td>
								<td>Thorough electrical testing, precision de-sludging, leak repair & re-gassing</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- PROCESS -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Quality Installation</p>
				<h2>Our HVAC Installation & Replacement Process</h2>
				<p>How we ensure clean, quiet, and long-lasting air conditioning operation.</p>
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
					<p class="eyebrow">Commercial Clients</p>
					<h2>Comfort & Reliability for Illawarra Workplaces</h2>
					<p>We keep customers, staff, and essential tech equipment cool throughout the warmer months:</p>
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
					<h3>Regional HVAC Service Fleet</h3>
					<p>Dispatched daily from 157 Church St, Albion Park across:</p>
					<div class="coverage-tags">
						<span>Wollongong</span>
						<span>Shellharbour</span>
						<span>Albion Park</span>
						<span>Kiama</span>
						<span>Nowra</span>
						<span>Bowral</span>
						<span>Mittagong</span>
					</div>
					<div class="coverage-cta">
						<strong>Need an air conditioning quote or repair?</strong>
						<a class="btn-primary" href={resolve('/get-a-quote')}>Request Air Conditioning Service</a>
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
				<h2>Commercial Air Conditioning FAQ</h2>
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
			<h2>Upgrade or Repair Your Air Conditioning Today</h2>
			<p>Speak to an ARCtick licensed HVAC mechanic. Clear advice, quality units, and competitive pricing.</p>
			<div class="cta-actions">
				<a class="btn-primary" href={resolve('/get-a-quote')}>Get an Air Conditioning Quote</a>
				<a class="btn-ghost" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE}</a>
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
	.faults-table-wrap { overflow-x: auto; background: #ffffff; border-radius: 16px; border: 1px solid var(--color-line); box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.08); }
	.faults-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem; }
	.faults-table th, .faults-table td { padding: 1.1rem 1.4rem; border-bottom: 1px solid var(--color-line); }
	.faults-table th { background: var(--color-frost); font-weight: 800; color: var(--color-brand-deeper); text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.06em; }
	.process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
	.process-card { background: #ffffff; border: 1px solid var(--color-line); border-radius: 16px; padding: 1.5rem; position: relative; }
	.process-num { font-size: 1.8rem; font-weight: 900; color: var(--color-brand); opacity: 0.35; margin-bottom: 0.4rem; display: block; }
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
