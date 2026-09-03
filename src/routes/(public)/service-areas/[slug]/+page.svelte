<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { SITE_ORIGIN, PRIMARY_PHONE, PRIMARY_PHONE_TEL, regionalServiceAreas } from '$lib/service-areas';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const region = $derived(data.region);

	const canonicalUrl = $derived(`${SITE_ORIGIN}/service-areas/${region.slug}`);

	const regionJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': ['LocalBusiness', 'HVACBusiness'],
					'@id': `${SITE_ORIGIN}/service-areas/${region.slug}#business`,
					name: `AllCare Refrigeration - ${region.name}`,
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
					areaServed: region.suburbsCovered.map((suburb) => ({
						'@type': 'City',
						name: `${suburb} NSW`
					})),
					description: region.metaDescription,
					priceRange: '$$'
				},
				{
					'@type': 'BreadcrumbList',
					'@id': `${SITE_ORIGIN}/service-areas/${region.slug}#breadcrumb`,
					itemListElement: [
						{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
						{ '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_ORIGIN}/service-areas` },
						{ '@type': 'ListItem', position: 3, name: region.name, item: canonicalUrl }
					]
				}
			]
		})
	);
</script>

<svelte:head>
	<title>{region.metaTitle}</title>
	<meta name="description" content={region.metaDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={region.metaTitle} />
	<meta property="og:description" content={region.metaDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={region.metaTitle} />
	<meta name="twitter:description" content={region.metaDescription} />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${regionJsonLd}</script>`}
</svelte:head>

<div class="regional-page">
	<!-- Breadcrumbs -->
	<nav class="section-inner section-inner--wide breadcrumb-nav" aria-label="Breadcrumb">
		<ol>
			<li><a href={resolve('/')}>Home</a></li>
			<li><span class="sep">/</span></li>
			<li><a href={resolve('/service-areas')}>Service Areas</a></li>
			<li><span class="sep">/</span></li>
			<li aria-current="page">{region.name}</li>
		</ol>
	</nav>

	<!-- HERO -->
	<header class="region-hero">
		<div class="section-inner section-inner--wide region-hero__grid">
			<div class="region-hero__copy">
				<p class="eyebrow eyebrow--on-dark">Illawarra Regional Coverage</p>
				<h1>{region.h1}</h1>
				<p class="hero-lead">{region.tagline}</p>
				<p class="response-badge">
					<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
						<circle cx="12" cy="12" r="10" />
						<polyline points="12 6 12 12 16 14" />
					</svg>
					<span><strong>Response Expectation:</strong> {region.responseTime}</span>
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

			<div class="region-hero__card">
				<div class="hero-badge-wrap">
					<ArctickLicenseBadge variant="inline" />
				</div>
				<h3>Local Coverage Highlights</h3>
				<ul class="quick-suburbs-list">
					{#each region.suburbsCovered.slice(0, 6) as sub}
						<li>{sub}</li>
					{/each}
				</ul>
				<small class="depot-note">Centrally dispatched from our Albion Park depot at 157 Church St.</small>
			</div>
		</div>
	</header>

	<!-- SUBURBS COVERED -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Local Proximity</p>
				<h2>Suburbs Covered in {region.name}</h2>
				<p>We provide scheduled maintenance, rapid breakdown triage, and equipment installations across:</p>
			</header>

			<div class="suburbs-grid">
				{#each region.suburbsCovered as suburb}
					<div class="suburb-pill">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
							<circle cx="12" cy="10" r="3" />
						</svg>
						<span>{suburb}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- REAL WORK NEARBY -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Proven Experience</p>
				<h2>Recent Projects Completed in {region.name}</h2>
				<p>Authentic commercial refrigeration and air conditioning jobs completed for local venues.</p>
			</header>

			<div class="projects-grid">
				{#each region.projects as project}
					<article class="project-card">
						<span class="project-loc">{project.suburb}</span>
						<h3>{project.title}</h3>
						<p>{project.description}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- TESTIMONIAL & INDUSTRIES -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<div class="two-col-grid">
				<div class="testimonial-box">
					<p class="eyebrow">Authentic Client Feedback</p>
					<blockquote>
						<p>"{region.testimonial.quote}"</p>
						<footer>
							<strong>{region.testimonial.author}</strong>
							<small>{region.testimonial.role ? `${region.testimonial.role} · ` : ''}{region.testimonial.suburb} NSW</small>
						</footer>
					</blockquote>
				</div>

				<div class="industries-box">
					<p class="eyebrow">Sector Expertise</p>
					<h3>Key Industries Supported in {region.name}</h3>
					<ul class="industries-list">
						{#each region.industries as ind}
							<li>
								<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
									<polyline points="20 6 9 17 4 12" />
								</svg>
								<span>{ind}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- COMMON FAULTS IN THIS REGION -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Common Breakdowns</p>
				<h2>Frequent Issues We Resolve in {region.name}</h2>
			</header>

			<div class="issues-grid">
				{#each region.commonIssues as issue}
					<div class="issue-item">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
						<span>{issue}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CORE SERVICES DIRECTORY -->
	<section class="section-shell">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Complete Capabilities</p>
				<h2>Refrigeration & HVAC Services Available in {region.name}</h2>
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

	<!-- OTHER REGIONS -->
	<section class="section-shell section-shell--alt">
		<div class="section-inner section-inner--wide">
			<header class="section-intro">
				<p class="eyebrow">Explore Other Areas</p>
				<h2>Other Service Regions Covered by AllCare</h2>
			</header>

			<div class="other-regions-grid">
				{#each regionalServiceAreas.filter(r => r.slug !== region.slug) as other}
					<a class="other-region-card" href={resolve(`/service-areas/${other.slug}`)}>
						<h4>{other.name}</h4>
						<p>{other.tagline}</p>
						<span class="view-link">View area details &rarr;</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="section-shell cta-section">
		<div class="section-inner section-inner--wide cta-box">
			<h2>Need Refrigeration or Air Conditioning in {region.name}?</h2>
			<p>Connect directly with our local technicians. Honest advice, rapid response, and transparent quotes.</p>
			<div class="cta-actions">
				<a class="btn-primary" href="tel:{PRIMARY_PHONE_TEL}">Call {PRIMARY_PHONE}</a>
				<a class="btn-ghost" href={resolve('/get-a-quote')}>Submit Online Quote</a>
			</div>
		</div>
	</section>
</div>

<style>
	.regional-page { color: var(--color-ink); }
	.breadcrumb-nav { padding-top: 1rem; padding-bottom: 0.5rem; }
	.breadcrumb-nav ol { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; list-style: none; margin: 0; padding: 0; font-size: 0.82rem; color: var(--color-ink-soft); }
	.breadcrumb-nav a { color: var(--color-ink-soft); text-decoration: none; }
	.breadcrumb-nav a:hover { color: var(--color-brand); }
	.breadcrumb-nav .sep { color: var(--color-line); }

	.region-hero {
		background: linear-gradient(135deg, var(--color-brand-deeper) 0%, var(--color-brand) 55%, var(--color-brand-light) 100%);
		color: #ffffff;
		padding: clamp(2.5rem, 5vw, 4rem) 0;
	}

	.region-hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.region-hero__grid {
			grid-template-columns: 1.3fr 0.9fr;
		}
	}

	.region-hero h1 {
		font-size: clamp(2rem, 4vw, 3.2rem);
		color: #ffffff;
		line-height: 1.1;
		margin: 0.5rem 0 1rem;
	}

	.region-hero .hero-lead {
		font-size: 1.05rem;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		margin-bottom: 1.2rem;
	}

	.response-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.9rem;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		font-size: 0.88rem;
		color: #ffffff;
		margin-bottom: 1.5rem;
	}

	.response-badge svg {
		color: #6ee7b7;
		flex-shrink: 0;
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.region-hero__card {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 1.8rem;
		backdrop-filter: blur(12px);
		color: #ffffff;
	}

	.region-hero__card h3 {
		color: #ffffff;
		font-size: 1.15rem;
		margin: 1rem 0 0.6rem;
	}

	.quick-suburbs-list {
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.4rem;
		font-size: 0.9rem;
	}

	.quick-suburbs-list li {
		padding-left: 1.2rem;
		position: relative;
	}

	.quick-suburbs-list li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: #6ee7b7;
		font-weight: 900;
	}

	.depot-note {
		display: block;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.75);
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		padding-top: 0.8rem;
	}

	.section-shell--alt { background: var(--color-frost); }

	.suburbs-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		justify-content: center;
	}

	.suburb-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1.1rem;
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.92rem;
		color: var(--color-ink);
		box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 0.08);
	}

	.suburb-pill svg {
		color: var(--color-brand);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.project-card {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 18px;
		padding: 1.6rem;
		box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.08);
	}

	.project-loc {
		display: inline-block;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-brand);
		margin-bottom: 0.4rem;
	}

	.project-card h3 {
		font-size: 1.15rem;
		margin-bottom: 0.6rem;
	}

	.project-card p {
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
	}

	.two-col-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 860px) {
		.two-col-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.testimonial-box {
		background: linear-gradient(135deg, rgba(15, 87, 251, 0.06), rgba(15, 87, 251, 0.02));
		border: 1px solid rgba(15, 87, 251, 0.18);
		border-radius: 18px;
		padding: 2rem;
	}

	.testimonial-box blockquote p {
		font-size: 1.1rem;
		line-height: 1.65;
		font-style: italic;
		color: var(--color-ink);
		margin-bottom: 1.2rem;
	}

	.testimonial-box footer {
		display: flex;
		flex-direction: column;
	}

	.testimonial-box footer strong {
		font-size: 1rem;
		color: var(--color-brand-deeper);
	}

	.testimonial-box footer small {
		color: var(--color-ink-soft);
	}

	.industries-box {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 18px;
		padding: 2rem;
	}

	.industries-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
		display: grid;
		gap: 0.75rem;
	}

	.industries-list li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.industries-list svg {
		color: var(--color-brand);
		flex-shrink: 0;
	}

	.issues-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1rem;
	}

	.issue-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 14px;
		padding: 1.2rem;
		font-weight: 600;
		font-size: 0.92rem;
	}

	.issue-item svg {
		color: var(--color-brand);
		flex-shrink: 0;
		margin-top: 0.1rem;
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

	.other-regions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.25rem;
	}

	.other-region-card {
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 16px;
		padding: 1.4rem;
		text-decoration: none;
		color: var(--color-ink);
		display: flex;
		flex-direction: column;
		transition: transform 200ms ease, box-shadow 200ms ease;
	}

	.other-region-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.1);
	}

	.other-region-card h4 {
		margin: 0 0 0.4rem;
		font-size: 1.1rem;
	}

	.other-region-card p {
		margin: 0 0 0.8rem;
		font-size: 0.88rem;
		flex-grow: 1;
		color: var(--color-ink-soft);
	}

	.other-region-card .view-link {
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--color-brand);
		text-transform: uppercase;
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
