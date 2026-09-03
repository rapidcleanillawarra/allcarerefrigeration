<svelte:head>
	<title>24/7 Emergency Refrigeration Repairs Wollongong & Illawarra | AllCare</title>
	<meta
		name="description"
		content="24/7 emergency commercial refrigeration breakdown repairs in Wollongong, Shellharbour, Kiama & Nowra. Rapid response to protect your stock. Call 0411 532 233."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/services/emergency-refrigeration-repairs" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="24/7 Emergency Refrigeration Repairs Wollongong & Illawarra | AllCare" />
	<meta
		property="og:description"
		content="24/7 emergency commercial refrigeration breakdown repairs in Wollongong, Shellharbour, Kiama & Nowra. Rapid response to protect your stock."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/services/emergency-refrigeration-repairs" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="24/7 Emergency Refrigeration Repairs Wollongong & Illawarra | AllCare" />
	<meta name="twitter:description" content="24/7 emergency refrigeration breakdown repairs across Illawarra. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${pageJsonLd}</script>`}
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL } from '$lib/service-areas';

	const faqs = [
		{
			q: 'How fast can a technician arrive for an emergency after-hours breakdown?',
			a: 'Because our central depot is located in Albion Park, our on-call technicians can typically reach sites in Shellharbour, Wollongong, and Kiama within 30 to 60 minutes of your call.'
		},
		{
			q: 'What should we do while waiting for your emergency technician?',
			a: 'Keep all cool room or fridge doors strictly shut to retain existing cold air. Do not switch off the main isolator unless there is an electrical burning smell or smoke. Make note of any controller error codes or unusual sounds.'
		},
		{
			q: 'Can most emergency faults be repaired on the first callout?',
			a: 'Yes. Our emergency vans carry universal fan motors, contactors, capacitors, electronic Dixell/Carel controllers, defrost timers, expansion valves, and common refrigerants (R404A, R134a, R448A/R449A) to get systems cooling on the first visit.'
		},
		{
			q: 'Do you attend breakdowns on weekends and public holidays?',
			a: 'Yes, AllCare operates an active 24/7 breakdown roster 365 days a year across Wollongong, Shellharbour, Kiama, Nowra, and the Southern Highlands.'
		},
		{
			q: 'What are your emergency call-out fees?',
			a: 'We provide clear, honest pricing before any repairs begin. Call-out fees depend on the time of day (standard business hours vs. after-hours/weekend), and our technician will quote parts and labour transparently on site.'
		}
	];

	const emergencySituations = [
		'Walk-in cool room warming up towards 5°C+',
		'Walk-in freezer defrost failure with thick ice blockages',
		'Bottle shop display fridges tripping main electrical circuit',
		'Refrigerant gas leak causing total loss of cooling',
		'Rooftop condensing unit motor seized during a summer heatwave',
		'Commercial ice machine failure on a busy weekend service',
		'Kitchen under-bench prep counter failing during trade',
		'Glycol beer system chilling failure in pubs and clubs'
	];

	const emergencyAdvantages = [
		{ title: 'Immediate Phone Triage', desc: 'Speak directly with an experienced technician who guides you through initial containment steps.' },
		{ title: 'Rapid Regional Dispatch', desc: 'Strategic depot in Albion Park means fast transit north to Wollongong and south to Kiama & Nowra.' },
		{ title: 'Parts on Board', desc: 'Fully equipped service vehicles carry critical parts to restore cooling without waiting for suppliers to open.' },
		{ title: 'Stock Protection First', desc: 'Our primary objective is safeguarding your perishable food, dairy, and beverage inventory.' }
	];

	const pageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/services/emergency-refrigeration-repairs#service`,
				name: '24/7 Emergency Refrigeration Repairs',
				serviceType: 'Emergency Breakdown Repair',
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
				description: '24/7 emergency commercial refrigeration breakdown response, temperature containment, and parts replacement.'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/services/emergency-refrigeration-repairs#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
					{ '@type': 'ListItem', position: 3, name: 'Emergency Refrigeration Repairs', item: `${SITE_ORIGIN}/services/emergency-refrigeration-repairs` }
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_ORIGIN}/services/emergency-refrigeration-repairs#faq`,
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
			<li aria-current="page">Emergency Refrigeration Repairs</li>
		</ol>
	</nav>

	<header class="service-hero service-hero--emergency">
		<div class="section-inner section-inner--wide service-hero__grid">
			<div class="service-hero__copy">
				<p class="eyebrow eyebrow--alert">
					<span class="pulse-dot"></span> 24/7 Priority Breakdown Service
				</p>
				<h1>Emergency Refrigeration Repairs Wollongong & Illawarra</h1>
				<p class="hero-lead">
					Refrigeration failure threatening your inventory or weekend trade? AllCare Refrigeration provides 
					rapid 24/7 emergency breakdown attendance across Wollongong, Shellharbour, Kiama, Nowra, and the Highlands.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary btn-primary--emergency" href="tel:{PRIMARY_PHONE_TEL}">
						<span>Emergency Hotline: {PRIMARY_PHONE}</span>
					</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>
						Non-Urgent Quote Request
					</a>
				</div>
			</div>

			<div class="service-hero__card">
				<div class="hero-badge-wrap">
					<ArctickLicenseBadge variant="inline" />
				</div>
				<ul class="hero-quick-points">
					<li><strong>30–60 Minute target</strong> arrival across coastal Illawarra</li>
					<li><strong>Available 24/7/365</strong> including nights & public holidays</li>
					<li><strong>Immediate stock containment</strong> & temperature stabilization</li>
					<li><strong>Equipped service fleet</strong> stocked with universal parts</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- ADVANTAGES -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">When Minutes Matter</p>
				<h2>Why Illawarra Businesses Rely on AllCare in Emergencies</h2>
				<p>We treat every commercial breakdown with urgency because your livelihood depends on it.</p>
			</header>

			<div class="process-grid">
				{#each emergencyAdvantages as adv}
					<div class="process-card">
						<h3>{adv.title}</h3>
						<p>{adv.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- SITUATIONS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Urgent Callouts</p>
				<h2>Refrigeration Emergencies We Attend Daily</h2>
				<p>Call us immediately if you encounter any of the following urgent cooling failures:</p>
			</header>

			<div class="systems-grid">
				{#each emergencySituations as sit}
					<div class="system-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<polyline points="20 6 9 17 4 12" />
						</svg>
						<span>{sit}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- RESPONSE DISPATCH -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<div class="two-col-grid">
				<div>
					<p class="eyebrow">Albion Park Depot</p>
					<h2>Immediate Dispatch Across the Region</h2>
					<p>Our workshop and mobile fleet are centrally positioned at Albion Park, giving us rapid dual-direction highway access:</p>
					<ul class="check-list">
						<li><strong>North:</strong> Wollongong CBD, Corrimal, Bulli, Thirroul (30–45 mins)</li>
						<li><strong>Local:</strong> Shellharbour, Albion Park Rail, Oak Flats, Flinders (15–20 mins)</li>
						<li><strong>South:</strong> Kiama, Gerringong, Nowra, Bomaderry (30–60 mins)</li>
						<li><strong>West:</strong> Macquarie Pass corridor to Bowral, Mittagong, Moss Vale</li>
					</ul>
				</div>

				<div class="coverage-box">
					<h3>Emergency Containment Checklist</h3>
					<p>Before our technician arrives on site:</p>
					<div class="emergency-steps-mini">
						<p>1. Keep all cold room and fridge doors tightly closed.</p>
						<p>2. Record the current temperature on the digital controller.</p>
						<p>3. Do not pack extra warm goods into a failing unit.</p>
						<p>4. Call our emergency hotline for immediate triage advice.</p>
					</div>
					<div class="coverage-cta">
						<a class="btn-primary btn-primary--emergency" href="tel:{PRIMARY_PHONE_TEL}">Call Emergency Tech: {PRIMARY_PHONE}</a>
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
				<h2>Emergency Refrigeration Breakdown FAQ</h2>
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
		<div class="section-inner section-inner--wide cta-box cta-box--emergency">
			<h2>Speak Directly to an On-Call Refrigeration Mechanic</h2>
			<p>Don't wait until food spoilage starts. Our vans are on the road and ready to assist.</p>
			<div class="cta-actions">
				<a class="btn-primary btn-primary--emergency" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE} Now</a>
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
	.service-hero--emergency { background: linear-gradient(135deg, #091e42 0%, #0c3374 50%, #0f57fb 100%); }
	.service-hero__grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
	@media (min-width: 900px) { .service-hero__grid { grid-template-columns: 1.3fr 0.9fr; } }
	.service-hero h1 { font-size: clamp(2rem, 4vw, 3.2rem); color: #ffffff; line-height: 1.1; margin: 0.5rem 0 1rem; }
	.service-hero .hero-lead { font-size: 1.05rem; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin-bottom: 1.5rem; }
	.eyebrow--alert { display: inline-flex; align-items: center; gap: 0.5rem; color: #f87171; font-weight: 800; }
	.pulse-dot { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 12px #ef4444; animation: pulse 1.5s infinite; }
	@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.3); } 100% { opacity: 1; transform: scale(1); } }
	.hero-ctas { display: flex; flex-wrap: wrap; gap: 0.8rem; }
	.btn-primary--emergency { background: linear-gradient(135deg, #ef4444, #dc2626) !important; border-color: #dc2626 !important; }
	.btn-primary--emergency:hover { background: #b91c1c !important; }
	.service-hero__card { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 1.8rem; backdrop-filter: blur(12px); }
	.hero-quick-points { list-style: none; margin: 1.2rem 0 0; padding: 0; display: grid; gap: 0.8rem; font-size: 0.95rem; color: #ffffff; }
	.hero-quick-points li { padding-left: 1.4rem; position: relative; }
	.hero-quick-points li::before { content: '✓'; position: absolute; left: 0; color: #6ee7b7; font-weight: 800; }
	.systems-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
	.system-item { display: flex; align-items: center; gap: 0.75rem; padding: 1.1rem 1.3rem; background: #ffffff; border: 1px solid var(--color-line); border-radius: 14px; font-weight: 700; font-size: 0.92rem; color: var(--color-ink); box-shadow: 0 4px 12px -6px rgba(0, 0, 0, 0.06); }
	.system-item svg { color: #ef4444; flex-shrink: 0; }
	.section-shell--alt { background: var(--color-frost); }
	.process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
	.process-card { background: #ffffff; border: 1px solid var(--color-line); border-radius: 16px; padding: 1.5rem; position: relative; }
	.process-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-brand-deeper); }
	.process-card p { font-size: 0.9rem; line-height: 1.55; margin: 0; }
	.two-col-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
	@media (min-width: 860px) { .two-col-grid { grid-template-columns: 1.2fr 1fr; } }
	.check-list { list-style: none; padding: 0; margin: 1.2rem 0 0; display: grid; gap: 0.75rem; }
	.check-list li { font-weight: 600; color: var(--color-ink); font-size: 0.95rem; }
	.coverage-box { background: #ffffff; border: 1px solid var(--color-line); border-radius: 18px; padding: 1.8rem; box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.1); }
	.emergency-steps-mini { margin: 1rem 0 1.2rem; display: grid; gap: 0.5rem; font-size: 0.9rem; color: var(--color-ink-soft); }
	.coverage-cta { padding-top: 1.2rem; border-top: 1px solid var(--color-line); }
	.faq-list { max-width: 48rem; margin: 0 auto; display: grid; gap: 0.85rem; }
	.faq-item { background: #ffffff; border: 1px solid var(--color-line); border-radius: 14px; padding: 1.1rem 1.4rem; }
	.faq-question { display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 1rem; cursor: pointer; color: var(--color-ink); }
	.faq-question svg { transition: transform 200ms ease; color: var(--color-brand); }
	details[open] .faq-question svg { transform: rotate(180deg); }
	.faq-answer { margin: 0.8rem 0 0; font-size: 0.92rem; line-height: 1.6; color: var(--color-ink-soft); }
	.cta-box { background: linear-gradient(135deg, var(--color-brand-deeper), var(--color-brand)); color: #ffffff; border-radius: 22px; padding: clamp(2rem, 5vw, 3.5rem); text-align: center; }
	.cta-box--emergency { background: linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #991b1b 100%); }
	.cta-box h2 { color: #ffffff; font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-bottom: 0.6rem; }
	.cta-box p { color: rgba(255, 255, 255, 0.9); max-width: 36rem; margin: 0 auto 1.5rem; }
	.cta-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.8rem; }
</style>
