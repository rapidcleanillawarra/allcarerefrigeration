<script lang="ts">
	import type { PageData } from './$types';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import {
		SITE_ORIGIN,
		PRIMARY_PHONE,
		PRIMARY_PHONE_TEL,
		DEPOT_LOCALITY,
		ARCTICK_LICENSE
	} from '$lib/service-areas';

	let { data }: { data: PageData } = $props();
	const page = $derived(data.page);

	const canonicalUrl = $derived(`${SITE_ORIGIN}/${page.slug}`);
	const pageTitle = $derived(
		page.meta_title?.trim()
			? page.meta_title.trim()
			: `${page.title} | AllCare Refrigeration`
	);
	const pageDescription = $derived(
		page.meta_description?.trim()
			? page.meta_description.trim()
			: page.summary?.trim()
				? page.summary.trim()
				: `Professional commercial refrigeration, cool room, and HVAC services by AllCare Refrigeration across Wollongong and Illawarra.`
	);

	const COMPANY_LOGO_URL =
		'https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png';

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebPage',
					'@id': `${canonicalUrl}#webpage`,
					url: canonicalUrl,
					name: pageTitle,
					description: pageDescription,
					isPartOf: {
						'@type': 'WebSite',
						'@id': `${SITE_ORIGIN}/#website`,
						name: 'AllCare Refrigeration',
						url: `${SITE_ORIGIN}/`
					},
					datePublished: page.created_at,
					dateModified: page.updated_at
				},
				{
					'@type': 'BreadcrumbList',
					'@id': `${canonicalUrl}#breadcrumb`,
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Home',
							item: `${SITE_ORIGIN}/`
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: page.title,
							item: canonicalUrl
						}
					]
				},
				{
					'@type': ['LocalBusiness', 'HVACBusiness'],
					'@id': `${SITE_ORIGIN}/#business`,
					name: 'AllCare Refrigeration',
					url: `${SITE_ORIGIN}/`,
					telephone: PRIMARY_PHONE_TEL,
					priceRange: '$$',
					areaServed: 'Illawarra, Wollongong, Shellharbour, Kiama, NSW'
				}
			]
		})
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta
		name="robots"
		content={page.is_published
			? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
			: 'noindex, nofollow'}
	/>

	<!-- OpenGraph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content={COMPANY_LOGO_URL} />
	<meta property="article:published_time" content={page.created_at} />
	<meta property="article:modified_time" content={page.updated_at} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={COMPANY_LOGO_URL} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

{#if data.isAdminPreview}
	<div class="admin-preview-banner">
		<div class="banner-content">
			<span>⚠️ <strong>Admin Preview Mode:</strong> This page is currently a Draft and not publicly indexed.</span>
			<a href="/admin/pages/{page.id}" class="banner-edit-btn">Edit in Admin →</a>
		</div>
	</div>
{/if}

<article class="custom-page">
	<!-- Hero Section -->
	<header class="page-hero">
		<div class="hero-container">
			<nav aria-label="Breadcrumbs" class="breadcrumbs">
				<ol>
					<li><a href="/">Home</a></li>
					<li class="separator">/</li>
					<li aria-current="page">{page.title}</li>
				</ol>
			</nav>

			<div class="hero-content">
				<div class="hero-badges">
					<span class="hero-badge">Refrigeration & Air Conditioning</span>
					<ArctickLicenseBadge compact />
				</div>

				<h1 class="page-title">{page.title}</h1>

				{#if page.summary}
					<p class="page-summary">{page.summary}</p>
				{/if}

				<div class="hero-meta">
					<span class="depot-tag">📍 Central Depot: {DEPOT_LOCALITY}</span>
					<span class="support-tag">⚡ 24/7 Breakdown Dispatch</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Body Content -->
	<section class="page-content-wrapper">
		<div class="content-container">
			<div class="prose-body">
				{#each page.content.split('\n\n') as block}
					{#if block.startsWith('### ')}
						<h3>{block.replace('### ', '')}</h3>
					{:else if block.startsWith('## ')}
						<h2>{block.replace('## ', '')}</h2>
					{:else if block.startsWith('> ')}
						<blockquote>{block.replace(/^>\s*/gm, '')}</blockquote>
					{:else if block.startsWith('- ')}
						<ul>
							{#each block.split('\n') as li}
								{#if li.trim()}
									<li>{li.replace(/^- \s*/, '')}</li>
								{/if}
							{/each}
						</ul>
					{:else if block.startsWith('1. ')}
						<ol>
							{#each block.split('\n') as li}
								{#if li.trim()}
									<li>{li.replace(/^\d+\.\s*/, '')}</li>
								{/if}
							{/each}
						</ol>
					{:else}
						<p>{@html block.replace(/\n/g, '<br/>')}</p>
					{/if}
				{/each}
			</div>

			<!-- Bottom CTA Block -->
			<div class="cta-banner">
				<div class="cta-content">
					<span class="cta-kicker">Wollongong & Illawarra Wide Service</span>
					<h3 class="cta-heading">Need Commercial Refrigeration Support?</h3>
					<p class="cta-text">
						Whether you need fast emergency repairs, equipment maintenance, or a new system installation, our licensed refrigeration technicians are ready to help.
					</p>
					<div class="cta-actions">
						<a href="/get-a-quote" class="btn-cta-primary">
							Request a Free Quote →
						</a>
						<a href="tel:{PRIMARY_PHONE_TEL}" class="btn-cta-call">
							📞 Call {PRIMARY_PHONE}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</article>

<style>
	.admin-preview-banner {
		background: #fef3c7;
		border-bottom: 1px solid #fde68a;
		padding: 0.75rem 1rem;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.banner-content {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.88rem;
		color: #92400e;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.banner-edit-btn {
		background: #92400e;
		color: #ffffff;
		padding: 0.3rem 0.7rem;
		border-radius: 0.35rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.8rem;
	}

	.banner-edit-btn:hover {
		background: #78350f;
	}

	/* Hero */
	.page-hero {
		background: linear-gradient(180deg, #f0f5ff 0%, #ffffff 100%);
		padding: 3rem 1.25rem 2.5rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.hero-container {
		max-width: 52rem;
		margin: 0 auto;
	}

	.breadcrumbs ol {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem 0;
		font-size: 0.85rem;
		color: #64748b;
	}

	.breadcrumbs a {
		color: #0f57fb;
		text-decoration: none;
	}

	.breadcrumbs a:hover {
		text-decoration: underline;
	}

	.breadcrumbs .separator {
		color: #cbd5e1;
	}

	.hero-badges {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.hero-badge {
		background: #e0edff;
		color: #0b4dd4;
		font-weight: 700;
		font-size: 0.75rem;
		padding: 0.25rem 0.65rem;
		border-radius: 9999px;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.page-title {
		font-size: 2.25rem;
		line-height: 1.2;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 1rem 0;
		letter-spacing: -0.02em;
	}

	.page-summary {
		font-size: 1.15rem;
		line-height: 1.55;
		color: #475569;
		margin: 0 0 1.25rem 0;
		font-weight: 400;
	}

	.hero-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.85rem;
		color: #64748b;
		flex-wrap: wrap;
	}

	/* Content Body */
	.page-content-wrapper {
		padding: 3rem 1.25rem 5rem;
		background: #ffffff;
	}

	.content-container {
		max-width: 52rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
	}

	.prose-body {
		font-size: 1.05rem;
		line-height: 1.75;
		color: #1e293b;
	}

	.prose-body h2 {
		font-size: 1.6rem;
		font-weight: 700;
		color: #0f172a;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		letter-spacing: -0.015em;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.prose-body h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1e293b;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	.prose-body p {
		margin-bottom: 1.35rem;
	}

	.prose-body ul,
	.prose-body ol {
		margin: 1.2rem 0 1.5rem 1.5rem;
		padding: 0;
	}

	.prose-body li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	.prose-body blockquote {
		border-left: 4px solid #0f57fb;
		background: #f0f7ff;
		padding: 1rem 1.25rem;
		margin: 1.75rem 0;
		border-radius: 0 0.5rem 0.5rem 0;
		color: #1e3a8a;
		font-style: normal;
		font-weight: 500;
	}

	/* Bottom CTA */
	.cta-banner {
		background: linear-gradient(135deg, #0b4dd4 0%, #042d7a 100%);
		color: #ffffff;
		border-radius: 1rem;
		padding: 2.5rem 2rem;
		box-shadow: 0 18px 48px -16px rgba(4, 45, 122, 0.25);
	}

	.cta-kicker {
		display: inline-block;
		font-size: 0.8rem;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #93c5fd;
		margin-bottom: 0.5rem;
	}

	.cta-heading {
		font-size: 1.7rem;
		font-weight: 800;
		margin: 0 0 0.75rem 0;
		line-height: 1.25;
	}

	.cta-text {
		font-size: 1rem;
		line-height: 1.55;
		color: #e0edff;
		margin: 0 0 1.75rem 0;
		max-width: 36rem;
	}

	.cta-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn-cta-primary {
		background: #ffffff;
		color: #0b4dd4;
		padding: 0.75rem 1.4rem;
		border-radius: 0.5rem;
		font-weight: 700;
		font-size: 0.95rem;
		text-decoration: none;
		transition: transform 0.15s ease, background 0.15s ease;
	}

	.btn-cta-primary:hover {
		background: #f8fafc;
		transform: translateY(-1px);
	}

	.btn-cta-call {
		background: rgba(255, 255, 255, 0.15);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.75rem 1.4rem;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.95rem;
		text-decoration: none;
		transition: background 0.15s ease;
	}

	.btn-cta-call:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	@media (max-width: 640px) {
		.page-title {
			font-size: 1.75rem;
		}

		.page-summary {
			font-size: 1rem;
		}

		.cta-banner {
			padding: 1.75rem 1.25rem;
		}

		.cta-heading {
			font-size: 1.4rem;
		}
	}
</style>
