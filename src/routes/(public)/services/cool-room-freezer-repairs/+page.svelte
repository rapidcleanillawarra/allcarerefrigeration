<svelte:head>
	<title>Cool Room & Freezer Repairs Wollongong & Illawarra | AllCare</title>
	<meta
		name="description"
		content="Walk-in cool room and freezer repairs in Wollongong, Shellharbour & Illawarra. Evaporator de-icing, door seal swaps & compressor fixes. 24/7 breakdown callouts: 0411 532 233."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/services/cool-room-freezer-repairs" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Cool Room & Freezer Repairs Wollongong & Illawarra | AllCare" />
	<meta
		property="og:description"
		content="Walk-in cool room and freezer repairs in Wollongong, Shellharbour & Illawarra. Evaporator de-icing, door seal swaps & compressor fixes."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/services/cool-room-freezer-repairs" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Cool Room & Freezer Repairs Wollongong & Illawarra | AllCare" />
	<meta name="twitter:description" content="Walk-in cool room and freezer repairs in Wollongong, Shellharbour & Illawarra. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${pageJsonLd}</script>`}
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL } from '$lib/service-areas';

	const faqs = [
		{
			q: 'My cool room temperature is rising above 5°C. What should I do first?',
			a: 'Keep the door closed to retain existing cold air. Check that power is on and the controller is not showing an alarm code (e.g. "HA" or "def"). Then call AllCare on 0411 532 233 immediately for priority breakdown attendance before stock breaches food safety limits.'
		},
		{
			q: 'Why are my walk-in freezer evaporator coils covered in solid ice?',
			a: 'Solid icing indicates a defrost cycle failure. Common culprits are a burnt-out defrost element, faulty termination sensor, defective defrost timer/controller, or damaged door gaskets allowing moist ambient air into the room.'
		},
		{
			q: 'How fast can you replace damaged cool room door seals?',
			a: 'We measure, custom-weld, and fit heavy-duty food-grade magnetic door gaskets. We can attend quickly across Wollongong, Shellharbour, and Nowra to restore room thermal sealing.'
		},
		{
			q: 'Do you service commercial freezer rooms after hours?',
			a: 'Yes, AllCare provides 24/7 emergency breakdown response. Our service mechanics carry universal defrost heaters, fan motors, and R404A / R448A / R449A refrigerants to handle urgent freezer callouts.'
		},
		{
			q: 'Can an older cool room be upgraded rather than replaced?',
			a: 'In many cases, yes. Upgrading older shaded-pole fan motors to EC motors, installing modern digital thermostats (Dixell/Carel), and refreshing door seals can extend room life and reduce power consumption significantly.'
		}
	];

	const roomTypes = [
		'Commercial walk-in cool rooms (0°C to +4°C)',
		'Commercial walk-in freezers (-18°C to -25°C)',
		'Glass insert bottle shop walk-in rooms',
		'Butcher meat hanging & ageing rooms',
		'Bakery retarder-proofer cool rooms',
		'Hospital & laboratory cold storage',
		'Fast-freeze and blast chilling facilities',
		'Modular polyurethane panel cold rooms'
	];

	const commonFaults = [
		{ fault: 'Evaporator fans seized or vibrating', cause: 'Bearing failure, ice impact, or motor winding breakdown', solution: 'Replace with high-efficiency commercial fan motor and balance blades' },
		{ fault: 'Coils heavily blocked with ice', cause: 'Faulty defrost element, defective klixon sensor, or controller failure', solution: 'Perform safe forced defrost, replace heater rods & calibrate cycle timers' },
		{ fault: 'Worn or split magnetic door seals', cause: 'Daily wear-and-tear letting humid outside air penetrate the cold zone', solution: 'Install custom-welded commercial door gaskets with airtight seal' },
		{ fault: 'Compressor tripping on high pressure', cause: 'Dirty condenser coils or failed outdoor condenser fan motor', solution: 'Chemical coil sanitisation, fan replacement & pressure switch reset' },
		{ fault: 'Drain line freezing up and leaking onto floor', cause: 'Defective drain trace heater or incorrect drain line slope', solution: 'Fit new heavy-duty silicone drain line heater cable and verify flow' }
	];

	const industries = [
		'Butchers, Abattoirs & Meat Processors',
		'Commercial Bakeries & Pastry Kitchens',
		'Pubs, Clubs & Hotel Cold Rooms',
		'Seafood Markets & Coastal Wholesalers',
		'Fruit & Vegetable Packaging Sheds',
		'Medical Laboratories & Pharmaceutical Cold Storage'
	];

	const processSteps = [
		{ num: '01', title: 'Emergency Dispatch', text: 'Prompt attendance from our Albion Park workshop across the Illawarra to protect vulnerable perishable inventory.' },
		{ num: '02', title: 'Temperature Triage', text: 'We inspect digital controllers, check probe accuracy, measure delta-T across coils, and inspect airflow.' },
		{ num: '03', title: 'Refrigerant & Pressure Check', text: 'Using digital manifolds, we assess high/low side pressures, superheat, and subcooling to detect leaks or valve faults.' },
		{ num: '04', title: 'Part Replacement', text: 'We install genuine OEM components including Bitzer, Copeland, Danfoss, and Kirby parts designed for cold storage duty.' },
		{ num: '05', title: 'Food-Safe Compliance Check', text: 'We verify temperature pull-down and log run-cycles to ensure your room complies with NSW Food Authority standards.' }
	];

	const pageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/services/cool-room-freezer-repairs#service`,
				name: 'Cool Room and Freezer Repairs',
				serviceType: 'Commercial Cool Room Repair',
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
				description: 'Specialist walk-in cool room and commercial freezer breakdown repairs, de-icing, and maintenance.'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/services/cool-room-freezer-repairs#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
					{ '@type': 'ListItem', position: 3, name: 'Cool Room & Freezer Repairs', item: `${SITE_ORIGIN}/services/cool-room-freezer-repairs` }
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_ORIGIN}/services/cool-room-freezer-repairs#faq`,
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
			<li aria-current="page">Cool Room & Freezer Repairs</li>
		</ol>
	</nav>

	<header class="service-hero">
		<div class="section-inner section-inner--wide service-hero__grid">
			<div class="service-hero__copy">
				<p class="eyebrow eyebrow--on-dark">Commercial Cold Storage Specialists</p>
				<h1>Cool Room & Freezer Repairs Wollongong & Illawarra</h1>
				<p class="hero-lead">
					Protect your perishables and meet NSW food safety requirements. AllCare Refrigeration provides 
					expert breakdown repairs, defrost troubleshooting, and fan motor replacements for walk-in cool rooms and freezers.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">
						<span>Emergency Cool Room Callout: {PRIMARY_PHONE}</span>
					</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>
						Request a Quote
					</a>
				</div>
			</div>

			<div class="service-hero__card">
				<div class="hero-badge-wrap">
					<ArctickLicenseBadge variant="inline" />
				</div>
				<ul class="hero-quick-points">
					<li><strong>24/7 Breakdown triage</strong> for cool rooms & freezers</li>
					<li><strong>NSW Food Safety</strong> compliant calibration (+2°C to -22°C)</li>
					<li><strong>Fast de-icing:</strong> Defrost elements & timers stocked in vans</li>
					<li><strong>Central depot:</strong> Rapid arrival from Albion Park</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- SYSTEMS SERVICED -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Cold Storage Plant</p>
				<h2>Cool Rooms & Freezer Systems We Support</h2>
				<p>From small back-of-house kitchen cool rooms to large multi-door distribution freezers.</p>
			</header>

			<div class="systems-grid">
				{#each roomTypes as room}
					<div class="system-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<polyline points="20 6 9 17 4 12" />
						</svg>
						<span>{room}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- COMMON FAULTS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Troubleshooting</p>
				<h2>Common Cool Room & Freezer Breakdowns</h2>
				<p>We provide long-term fixes that protect food safety and eliminate repeat service callouts.</p>
			</header>

			<div class="faults-table-wrap">
				<table class="faults-table">
					<thead>
						<tr>
							<th>Symptom</th>
							<th>Probable Technical Cause</th>
							<th>AllCare Engineering Solution</th>
						</tr>
					</thead>
					<tbody>
						{#each commonFaults as item}
							<tr>
								<td><strong>{item.fault}</strong></td>
								<td>{item.cause}</td>
								<td>{item.solution}</td>
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
				<p class="eyebrow">Systematic Care</p>
				<h2>Our Cool Room Repair Protocol</h2>
				<p>How we ensure your cold room is diagnosed properly and operating efficiently.</p>
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
					<p class="eyebrow">Critical Cold Chain</p>
					<h2>Reliable Protection for Food Service & Retail</h2>
					<p>When stock loss can cost tens of thousands in an afternoon, having a dependable local technician is essential:</p>
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
					<h3>Illawarra Cold Storage Hub</h3>
					<p>Our technicians carry pressure test equipment, leak detectors, and replacement fans across:</p>
					<div class="coverage-tags">
						<span>Albion Park Depot</span>
						<span>Wollongong</span>
						<span>Shellharbour</span>
						<span>Oak Flats</span>
						<span>Kiama</span>
						<span>South Nowra</span>
						<span>Bowral</span>
					</div>
					<div class="coverage-cta">
						<strong>Experiencing an active cool room failure?</strong>
						<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE} Now</a>
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
				<h2>Cool Room & Freezer Repairs FAQ</h2>
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
		<div class="section-inner section-inner--wide">
			<div class="cta-box">
				<h2>Get Your Cool Room or Freezer Back Online</h2>
				<p>Direct contact with qualified technicians. Don't let valuable food or inventory spoil.</p>
				<div class="cta-actions">
					<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE}</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>Submit Online Quote</a>
				</div>
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
		padding-bottom: 0.75rem;
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
		padding: clamp(3rem, 6vw, 4.5rem) 0;
	}

	.service-hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
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

	.btn-primary,
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.85rem 1.4rem;
		font-weight: 800;
		font-size: 0.95rem;
		text-decoration: none;
		border-radius: 999px;
		transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease;
		cursor: pointer;
	}

	.btn-primary {
		background: #ffffff;
		color: var(--color-brand);
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 14px 30px -5px rgba(0, 0, 0, 0.25);
		color: var(--color-brand-deeper);
	}

	.btn-ghost {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.45);
		backdrop-filter: blur(8px);
	}

	.btn-ghost:hover {
		background: rgba(255, 255, 255, 0.22);
		transform: translateY(-2px);
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

	.section-shell {
		padding-block: clamp(3.5rem, 6vw, 5.5rem);
	}

	.section-shell--alt {
		background: var(--color-frost);
	}

	.cta-section {
		padding-block: clamp(2.5rem, 5vw, 4rem) clamp(1rem, 2vw, 2rem);
	}

	.section-intro {
		max-width: 52rem;
		margin: 0 auto clamp(2rem, 4vw, 3rem);
		text-align: center;
		display: grid;
		gap: 0.65rem;
		justify-items: center;
	}

	.section-intro h2 {
		font-size: clamp(1.75rem, 3.2vw, 2.5rem);
		line-height: 1.15;
		color: var(--color-ink);
		margin: 0;
	}

	.section-intro p {
		margin: 0;
		max-width: 44rem;
		font-size: 1rem;
		color: var(--color-ink-soft);
		line-height: 1.6;
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
		margin: 0 0 0.5rem;
		color: var(--color-brand-deeper);
	}

	.process-card p {
		font-size: 0.88rem;
		line-height: 1.55;
		margin: 0;
		color: var(--color-ink-soft);
	}

	.two-col-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: stretch;
	}

	@media (min-width: 860px) {
		.two-col-grid {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	.two-col-grid h2 {
		font-size: clamp(1.65rem, 3vw, 2.4rem);
		line-height: 1.2;
		color: var(--color-ink);
		margin: 0.4rem 0 0.8rem;
	}

	.two-col-grid p {
		margin: 0 0 1rem;
		line-height: 1.6;
		color: var(--color-ink-soft);
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
		padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem);
		text-align: center;
	}

	.cta-box h2 {
		color: #ffffff;
		font-size: clamp(1.8rem, 3.5vw, 2.6rem);
		margin: 0 0 0.8rem;
		line-height: 1.2;
	}

	.cta-box p {
		color: rgba(255, 255, 255, 0.9);
		max-width: 38rem;
		margin: 0 auto 1.8rem;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.cta-actions {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	@media (max-width: 640px) {
		.hero-ctas,
		.cta-actions {
			flex-direction: column;
			width: 100%;
		}

		.btn-primary,
		.btn-ghost {
			width: 100%;
			text-align: center;
		}

		.two-col-grid {
			gap: 1.5rem;
		}
	}
</style>
