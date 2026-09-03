<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL, regionalServiceAreas, DEPOT_ADDRESS } from '$lib/service-areas';

	const canonicalUrl = `${SITE_ORIGIN}/service-areas`;

	const hubJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'LocalBusiness',
				'@id': `${SITE_ORIGIN}/service-areas#business`,
				name: 'AllCare Refrigeration - Regional Service Coverage',
				url: canonicalUrl,
				telephone: '+61411532233',
				address: {
					'@type': 'PostalAddress',
					streetAddress: '157 Church St',
					addressLocality: 'Albion Park',
					addressRegion: 'NSW',
					postalCode: '2527',
					addressCountry: 'AU'
				},
				areaServed: regionalServiceAreas.flatMap((r) => r.suburbsCovered).map((s) => ({
					'@type': 'City',
					name: `${s} NSW`
				}))
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_ORIGIN}/service-areas#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
					{ '@type': 'ListItem', position: 2, name: 'Service Areas', item: canonicalUrl }
				]
			}
		]
	});
</script>

<svelte:head>
	<title>Commercial Refrigeration Service Areas | AllCare Refrigeration</title>
	<meta
		name="description"
		content="AllCare Refrigeration service coverage across Wollongong, Shellharbour, Kiama, Nowra, and the Southern Highlands. Central depot in Albion Park: 0411 532 233."
	/>
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Commercial Refrigeration Service Areas | AllCare Refrigeration" />
	<meta
		property="og:description"
		content="AllCare Refrigeration service coverage across Wollongong, Shellharbour, Kiama, Nowra, and the Southern Highlands."
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Commercial Refrigeration Service Areas | AllCare Refrigeration" />
	<meta name="twitter:description" content="AllCare Refrigeration regional coverage across Wollongong, Illawarra & Shoalhaven. Call 0411 532 233." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${hubJsonLd}</script>`}
</svelte:head>

<div class="service-areas-hub">
	<nav class="section-inner section-inner--wide breadcrumb-nav" aria-label="Breadcrumb">
		<ol>
			<li><a href={resolve('/')}>Home</a></li>
			<li><span class="sep">/</span></li>
			<li aria-current="page">Service Areas</li>
		</ol>
	</nav>

	<header class="hub-hero">
		<div class="section-inner section-inner--wide hub-hero__grid">
			<div class="hub-hero__copy">
				<p class="eyebrow eyebrow--on-dark">Regional Coverage Hub</p>
				<h1>Commercial Refrigeration & Air Conditioning Service Areas</h1>
				<p class="hero-lead">
					Centrally based at {DEPOT_ADDRESS}, AllCare Refrigeration provides rapid commercial 
					breakdown attendance, planned maintenance programs, and custom cool room installations across 5 key regions.
				</p>
				<div class="hero-ctas">
					<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">
						<span>Emergency Call: {PRIMARY_PHONE}</span>
					</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>
						Request a Service Quote
					</a>
				</div>
			</div>

			<div class="hub-hero__card">
				<div class="hero-badge-wrap">
					<ArctickLicenseBadge variant="inline" />
				</div>
				<h3>Central Depot Advantage</h3>
				<p>Our workshop in Albion Park provides immediate dual-direction highway access:</p>
				<ul class="depot-facts">
					<li><strong>30–60 Mins</strong> North to Wollongong & Bulli</li>
					<li><strong>15–30 Mins</strong> Local to Shellharbour & Oak Flats</li>
					<li><strong>30–60 Mins</strong> South to Kiama & Nowra</li>
					<li><strong>Daily Runs</strong> West up Macquarie Pass to Southern Highlands</li>
				</ul>
			</div>
		</div>
	</header>

	<!-- 5 REGIONAL HUBS -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Five Primary Service Regions</p>
				<h2>Select Your Local Coverage Region</h2>
				<p>Explore suburbs covered, response time expectations, and local project case studies.</p>
			</header>

			<div class="regions-grid">
				{#each regionalServiceAreas as reg}
					<article class="region-card">
						<div class="region-card__header">
							<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							<h3>{reg.name}</h3>
						</div>
						<p class="region-card__tagline">{reg.tagline}</p>
						<div class="region-card__meta">
							<span class="meta-label">Response Time:</span>
							<span class="meta-val">{reg.responseTime}</span>
						</div>
						<div class="region-card__suburbs">
							<span class="meta-label">Key Suburbs Covered:</span>
							<p>{reg.suburbsCovered.join(', ')}</p>
						</div>
						<a class="region-card__cta" href={resolve(`/service-areas/${reg.slug}`)}>
							<span>View {reg.name} details</span>
							<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
								<path d="M5 12h14M12 5l7 7-7 7"/>
							</svg>
						</a>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- CORE SERVICES DIRECTORY -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Service Directory</p>
				<h2>Our Commercial Refrigeration Services</h2>
			</header>

			<div class="services-nav-grid">
				<a class="srv-nav-card" href={resolve('/services/commercial-refrigeration-repairs')}>
					<h4>Commercial Refrigeration Repairs &rarr;</h4>
					<p>Display fridges, bottle shop chillers, and under-counter equipment.</p>
				</a>
				<a class="srv-nav-card" href={resolve('/services/cool-room-freezer-repairs')}>
					<h4>Cool Room & Freezer Repairs &rarr;</h4>
					<p>Walk-in room troubleshooting, defrost cycle fixes, and door seals.</p>
				</a>
				<a class="srv-nav-card" href={resolve('/services/commercial-refrigeration-installation')}>
					<h4>Refrigeration Installation & Fit-Out &rarr;</h4>
					<p>Custom cool rooms, walk-in freezers, and plant engineering.</p>
				</a>
				<a class="srv-nav-card" href={resolve('/services/preventative-maintenance')}>
					<h4>Preventative Maintenance &rarr;</h4>
					<p>Scheduled servicing, chemical coil washes, and food safety compliance.</p>
				</a>
				<a class="srv-nav-card" href={resolve('/services/emergency-refrigeration-repairs')}>
					<h4>24/7 Emergency Breakdown Response &rarr;</h4>
					<p>Fast emergency dispatch to protect your stock from spoilage.</p>
				</a>
				<a class="srv-nav-card" href={resolve('/services/air-conditioning-installation-repairs')}>
					<h4>Air Conditioning Services &rarr;</h4>
					<p>Commercial split systems, ducted HVAC, and cassette repairs.</p>
				</a>
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="section-shell cta-section">
		<div class="section-inner section-inner--wide">
			<div class="cta-box">
				<h2>Ready to Book a Service or Need Urgent Breakdown Help?</h2>
				<p>AllCare Refrigeration is on call across the Illawarra, Shoalhaven, and Highlands.</p>
				<div class="cta-actions">
					<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE}</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>Submit Online Quote</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.service-areas-hub { color: var(--color-ink); }
	.breadcrumb-nav { padding-top: 1rem; padding-bottom: 0.75rem; }
	.breadcrumb-nav ol { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; list-style: none; margin: 0; padding: 0; font-size: 0.82rem; color: var(--color-ink-soft); }
	.breadcrumb-nav a { color: var(--color-ink-soft); text-decoration: none; }
	.breadcrumb-nav a:hover { color: var(--color-brand); }
	.breadcrumb-nav .sep { color: var(--color-line); }

	.hub-hero {
		background: linear-gradient(135deg, var(--color-brand-deeper) 0%, var(--color-brand) 55%, var(--color-brand-light) 100%);
		color: #ffffff;
		padding: clamp(3rem, 6vw, 4.5rem) 0;
	}

	.hub-hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.hub-hero__grid {
			grid-template-columns: 1.3fr 0.9fr;
		}
	}

	.hub-hero h1 {
		font-size: clamp(2rem, 4vw, 3.2rem);
		color: #ffffff;
		line-height: 1.1;
		margin: 0.5rem 0 1rem;
	}

	.hub-hero .hero-lead {
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

	.hub-hero__card {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 1.8rem;
		backdrop-filter: blur(12px);
		color: #ffffff;
	}

	.hub-hero__card h3 {
		color: #ffffff;
		font-size: 1.15rem;
		margin: 1rem 0 0.4rem;
	}

	.hub-hero__card p {
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.88rem;
		margin-bottom: 1rem;
	}

	.depot-facts {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.6rem;
		font-size: 0.92rem;
	}

	.depot-facts li {
		padding-left: 1.3rem;
		position: relative;
	}

	.depot-facts li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #6ee7b7;
		font-weight: 800;
	}

	.section-shell {
		padding-block: clamp(3.5rem, 6vw, 5.5rem);
	}

	.section-shell--alt { background: var(--color-frost); }

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

	.regions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.8rem;
	}

	.region-card {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 20px;
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 24px -10px rgba(4, 45, 122, 0.1);
		transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
	}

	.region-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 16px 36px -12px rgba(15, 87, 251, 0.2);
		border-color: rgba(15, 87, 251, 0.4);
	}

	.region-card__header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.region-card__header svg {
		color: var(--color-brand);
		flex-shrink: 0;
	}

	.region-card__header h3 {
		font-size: 1.25rem;
		color: var(--color-ink);
		margin: 0;
	}

	.region-card__tagline {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
		margin: 0 0 1.2rem;
	}

	.region-card__meta {
		padding: 0.65rem 0.85rem;
		background: var(--color-frost);
		border-radius: 10px;
		font-size: 0.85rem;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.meta-label {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-brand-deeper);
	}

	.meta-val {
		font-weight: 700;
		color: var(--color-ink);
	}

	.region-card__suburbs {
		margin-bottom: 1.4rem;
		flex-grow: 1;
	}

	.region-card__suburbs p {
		font-size: 0.85rem;
		line-height: 1.5;
		margin: 0.3rem 0 0;
		color: var(--color-ink-soft);
	}

	.region-card__cta {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.8rem 1.2rem;
		background: var(--color-brand);
		color: #ffffff;
		border-radius: 12px;
		font-weight: 800;
		font-size: 0.9rem;
		text-decoration: none;
		transition: background 200ms ease;
	}

	.region-card__cta:hover {
		background: var(--color-brand-deeper);
	}

	.services-nav-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.srv-nav-card {
		padding: 1.4rem;
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 16px;
		text-decoration: none;
		color: var(--color-ink);
		transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
		box-shadow: 0 4px 12px -6px rgba(0, 0, 0, 0.06);
	}

	.srv-nav-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 28px -10px rgba(15, 87, 251, 0.2);
		border-color: rgba(15, 87, 251, 0.35);
	}

	.srv-nav-card h4 {
		margin: 0 0 0.4rem;
		font-size: 1.05rem;
		color: var(--color-brand-deeper);
	}

	.srv-nav-card p {
		margin: 0;
		font-size: 0.88rem;
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
	}
</style>
