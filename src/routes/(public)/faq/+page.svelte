<script lang="ts">
	import { resolve } from '$app/paths';
	import { SITE_ORIGIN } from '$lib/service-areas';

	type FaqItem = {
		question: string;
		answer: string;
		bullets?: string[];
	};

	type FaqSection = {
		id: string;
		title: string;
		items: FaqItem[];
	};

	const serviceAreaCopy =
		'Illawarra and the Southern Highlands, from Helensburgh and Wollongong through to Nowra and Bowral';

	const faqSections: FaqSection[] = [
		{
			id: 'general',
			title: 'General Business FAQs',
			items: [
				{
					question: 'What areas do you service?',
					answer: `We service commercial refrigeration customers across ${serviceAreaCopy}, including emergency breakdowns, maintenance, installations, and repairs.`
				},
				{
					question: 'What types of refrigeration systems do you work on?',
					answer:
						'We work on cool rooms, freezer rooms, display fridges, ice machines, supermarket refrigeration, commercial air conditioning, glycol systems, and more.'
				},
				{
					question: 'Do you offer emergency breakdown service?',
					answer:
						'Yes — we provide fast-response emergency refrigeration breakdown services to minimise downtime and protect your stock.'
				},
				{
					question: 'Are you licensed and insured?',
					answer:
						'Yes, all our technicians are fully licensed, qualified, and insured for commercial refrigeration and air conditioning work.'
				},
				{
					question: 'How quickly can you attend a breakdown?',
					answer:
						'Response times vary depending on location and workload, but we prioritise emergency refrigeration failures as quickly as possible.'
				}
			]
		},
		{
			id: 'maintenance',
			title: 'Maintenance FAQs',
			items: [
				{
					question: 'Why is regular refrigeration maintenance important?',
					answer:
						'Routine maintenance helps reduce breakdowns, improves efficiency, lowers power costs, and extends equipment lifespan.'
				},
				{
					question: 'How often should commercial refrigeration be serviced?',
					answer:
						'Most systems should be professionally serviced every 3–6 months depending on usage and environment.'
				},
				{
					question: 'Can maintenance reduce electricity costs?',
					answer:
						'Yes — dirty coils, incorrect gas charge, and failing components can increase energy use significantly.'
				},
				{
					question: 'Do you offer preventative maintenance agreements?',
					answer:
						'Yes, we can tailor scheduled maintenance plans to suit your business and equipment requirements.'
				}
			]
		},
		{
			id: 'repair',
			title: 'Repair FAQs',
			items: [
				{
					question: 'My cool room isn’t holding temperature — what should I do?',
					answer:
						'Check the power supply, thermostat settings, and whether doors are sealing correctly. If the issue continues, contact us immediately to avoid stock loss.'
				},
				{
					question: 'Can you repair all refrigeration brands?',
					answer: 'Yes, we service and repair most major commercial refrigeration brands and systems.'
				},
				{
					question: 'Is it better to repair or replace my refrigeration system?',
					answer:
						'That depends on the age, condition, repair costs, and efficiency of the existing unit. We’ll provide honest advice on the most cost-effective option.'
				},
				{
					question: 'Do you carry common parts in your service vehicles?',
					answer:
						'Yes, we stock many commonly used refrigeration parts to help complete repairs faster.'
				}
			]
		},
		{
			id: 'installation',
			title: 'Installation FAQs',
			items: [
				{
					question: 'Do you install new cool rooms and freezer rooms?',
					answer:
						'Yes — we provide complete refrigeration installations, including design, supply, installation, and commissioning.'
				},
				{
					question: 'Can you help size the right refrigeration system for my business?',
					answer:
						'Absolutely. We assess your usage, space, and operational needs to recommend the correct system.'
				},
				{
					question: 'Do you remove old refrigeration equipment?',
					answer:
						'Yes, we can safely remove and dispose of old equipment during replacement installations.'
				}
			]
		},
		{
			id: 'pricing',
			title: 'Pricing & Quotes',
			items: [
				{
					question: 'Do you provide free quotes?',
					answer:
						'We provide quotes for installations and larger works. Diagnostic call-out fees will apply for breakdown inspections.'
				},
				{
					question: 'What affects the cost of refrigeration repairs?',
					answer:
						'Costs can vary depending on parts required, labour time, refrigerant type, system accessibility, and urgency.'
				}
			]
		},
		{
			id: 'trust',
			title: 'Trust & Credibility',
			items: [
				{
					question: 'Why choose us?',
					answer: 'Customers choose AllCare Refrigeration because we combine:',
					bullets: [
						'Fast response times',
						'Honest advice',
						'Experienced technicians',
						'Quality workmanship',
						'Reliable ongoing support'
					]
				},
				{
					question: 'What industries do you work with?',
					answer:
						'We work with bottle shops, cafes, restaurants, supermarkets, pubs, clubs, medical facilities, and industrial clients.'
				}
			]
		},
		{
			id: 'hospitality',
			title: 'Bottle Shop & Hospitality',
			items: [
				{
					question: 'Do you service bottle shops and liquor stores?',
					answer:
						'Yes — we regularly maintain and repair display fridges, back-bar coolers, and cool rooms for bottle shops across the Illawarra and Southern Highlands.'
				},
				{
					question: 'Can you help with hospitality refrigeration breakdowns?',
					answer:
						'Absolutely. We understand how critical refrigeration is for pubs, clubs, cafes, and restaurants, and prioritise urgent call-outs to protect stock and keep service running.'
				},
				{
					question: 'Do you service ice machines and glycol systems for hospitality venues?',
					answer:
						'Yes. We service and repair ice machines, glycol chilling systems, and commercial refrigeration equipment commonly used in hospitality settings.'
				},
				{
					question: 'Can you set up preventative maintenance for busy venues?',
					answer:
						'Yes — we offer tailored maintenance schedules for high-use hospitality equipment to reduce unexpected breakdowns during peak trading periods.'
				}
			]
		}
	];

	const allFaqs = faqSections.flatMap((section) => section.items);

	let searchQuery = $state('');

	const normalizedQuery = $derived(searchQuery.trim().toLowerCase());

	function itemMatchesQuery(item: FaqItem, query: string): boolean {
		if (!query) return true;
		const haystack = [item.question, item.answer, ...(item.bullets ?? [])].join(' ').toLowerCase();
		return haystack.includes(query);
	}

	const filteredSections = $derived(
		normalizedQuery
			? faqSections
					.map((section) => ({
						...section,
						items: section.items.filter((item) => itemMatchesQuery(item, normalizedQuery))
					}))
					.filter((section) => section.items.length > 0)
			: faqSections
	);

	const totalVisibleItems = $derived(
		filteredSections.reduce((count, section) => count + section.items.length, 0)
	);

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${SITE_ORIGIN}${resolve('/faq')}#faq`,
		mainEntity: allFaqs.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.bullets?.length
					? `${item.answer} ${item.bullets.join('. ')}.`
					: item.answer
			}
		}))
	});
</script>

<svelte:head>
	<title>Frequently Asked Questions | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Answers to common questions about commercial refrigeration service, maintenance, repairs, installations and emergency breakdown support across Illawarra NSW."
	/>
	<link rel="canonical" href="{SITE_ORIGIN}/faq" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Frequently Asked Questions | AllCare Refrigeration" />
	<meta
		property="og:description"
		content="Answers to common questions about commercial refrigeration service, maintenance, repairs, installations and emergency breakdown support across Illawarra NSW."
	/>
	<meta property="og:url" content="{SITE_ORIGIN}/faq" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta property="og:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Frequently Asked Questions | AllCare Refrigeration" />
	<meta name="twitter:description" content="Answers to common questions about commercial refrigeration service across Illawarra NSW." />
	<meta name="twitter:image" content="https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png" />
	{@html `<script type="application/ld+json">${faqJsonLd}</script>`}
</svelte:head>

<!-- HERO ------------------------------------------------------------- -->
<section class="hero" aria-labelledby="faq-heading">
	<div class="hero-bg" aria-hidden="true">
		<span class="hero-bg__layer hero-bg__layer--1" data-parallax="0.18"></span>
		<span class="hero-bg__layer hero-bg__layer--2" data-parallax="0.32"></span>
		<span class="hero-bg__grid"></span>
	</div>

	<div class="section-inner section-inner--wide hero-grid">
		<div class="hero-copy">
			<p class="eyebrow eyebrow--on-dark reveal reveal--up">FAQs</p>
			<h1 id="faq-heading" class="reveal reveal--up">
				Common questions about
				<span class="hero-highlight">commercial refrigeration service.</span>
			</h1>
			<p class="hero-lead reveal reveal--up">
				Find answers about our service areas, emergency breakdown response, maintenance programs,
				repairs, installations, and support for bottle shops and hospitality venues.
			</p>
			<p class="reveal reveal--up">
				Can’t find what you need? Call us on
				<a class="hero-phone" href="tel:0411532233">0411 532 233</a>
				for honest advice from our licensed technicians.
			</p>
		</div>
	</div>
</section>

<!-- SECTION NAV ------------------------------------------------------ -->
<section class="section-nav section-shell" aria-label="FAQ categories">
	<div class="section-inner section-inner--wide section-nav__inner">
		<div class="section-nav__search reveal reveal--up">
			<label class="section-nav__search-label" for="faq-search">Search FAQs</label>
			<div class="section-nav__search-field">
				<svg
					class="section-nav__search-icon"
					aria-hidden="true"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.5-3.5" />
				</svg>
				<input
					id="faq-search"
					type="search"
					class="section-nav__search-input"
					placeholder="Search questions, topics, or keywords…"
					bind:value={searchQuery}
					autocomplete="off"
					spellcheck="false"
				/>
				{#if searchQuery.trim()}
					<button
						type="button"
						class="section-nav__search-clear"
						aria-label="Clear search"
						onclick={() => (searchQuery = '')}
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
				{/if}
			</div>
			{#if normalizedQuery}
				<p class="section-nav__search-status" aria-live="polite">
					{#if totalVisibleItems === 0}
						No matching questions found.
					{:else}
						Showing {totalVisibleItems} matching question{totalVisibleItems === 1 ? '' : 's'}.
					{/if}
				</p>
			{/if}
		</div>

		{#if !normalizedQuery}
			<nav class="section-nav__links reveal reveal--up" aria-label="Jump to FAQ section">
				{#each faqSections as section (section.id)}
					<a href="#{section.id}">{section.title}</a>
				{/each}
			</nav>
		{:else if filteredSections.length > 0}
			<nav class="section-nav__links reveal reveal--up" aria-label="Matching FAQ sections">
				{#each filteredSections as section (section.id)}
					<a href="#{section.id}">{section.title}</a>
				{/each}
			</nav>
		{/if}
	</div>
</section>

<!-- FAQ SECTIONS ----------------------------------------------------- -->
{#if normalizedQuery && filteredSections.length === 0}
	<section class="faq-empty section-shell" aria-live="polite">
		<div class="section-inner section-inner--narrow">
			<div class="faq-empty__panel reveal reveal--up">
				<p>No FAQs match “{searchQuery.trim()}”. Try different keywords or call us for help.</p>
				<a class="btn-call btn-call--compact" href="tel:0411532233">Call 0411 532 233</a>
			</div>
		</div>
	</section>
{/if}

{#each filteredSections as section, sectionIndex (section.id)}
	<section
		id={section.id}
		class="faq-section section-shell"
		aria-labelledby="{section.id}-heading"
	>
		<div class="section-inner section-inner--narrow">
			<header class="faq-section__header reveal reveal--up">
				<p class="eyebrow">Section {sectionIndex + 1}</p>
				<h2 id="{section.id}-heading">{section.title}</h2>
			</header>

			<div class="faq-list" data-stagger>
				{#each section.items as item, itemIndex (item.question)}
					<details
						class="faq-item reveal reveal--up"
						style="--i: {itemIndex}"
						open={normalizedQuery !== ''}
					>
						<summary class="faq-item__question">
							<span>{item.question}</span>
							<svg
								class="faq-item__chev"
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</summary>
						<div class="faq-item__answer">
							<p>{item.answer}</p>
							{#if item.bullets?.length}
								<ul>
									{#each item.bullets as bullet (bullet)}
										<li>{bullet}</li>
									{/each}
								</ul>
							{/if}
						</div>
					</details>
				{/each}
			</div>
		</div>
	</section>
{/each}

<!-- CTA ---------------------------------------------------------------- -->
<section class="cta-section section-shell" aria-labelledby="faq-cta-heading">
	<div class="section-inner section-inner--wide">
		<div class="cta-panel reveal reveal--up">
			<div class="cta-bg" aria-hidden="true">
				<span data-parallax="0.1"></span>
			</div>
			<div class="cta-copy">
				<p class="eyebrow eyebrow--on-dark">Still have questions?</p>
				<h2 id="faq-cta-heading">Talk to a refrigeration specialist today.</h2>
				<p>
					Whether you need emergency breakdown help, scheduled maintenance, or advice on a new
					installation, our team is ready to help across Illawarra and the Southern Highlands.
				</p>
				<div class="cta-actions">
					<a class="btn-call" href="tel:0411532233">
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
							/>
						</svg>
						Call 0411 532 233
					</a>
					<a class="btn-ghost" href={resolve('/get-a-quote')}>Request a quote</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	h1,
	h2 {
		margin: 0;
		color: var(--color-ink);
	}

	h1 {
		font-size: clamp(2.2rem, 5vw, 4rem);
		line-height: 1;
		letter-spacing: -0.045em;
	}

	h2 {
		font-size: clamp(1.45rem, 2.8vw, 2.2rem);
		line-height: 1.12;
		letter-spacing: -0.035em;
	}

	p {
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0 0 1rem;
	}

	/* HERO */
	.hero {
		position: relative;
		isolation: isolate;
		padding-block: clamp(3rem, 7vw, 5rem) clamp(2rem, 4vw, 3rem);
		overflow: clip;
		color: #ffffff;
		background:
			radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.25), transparent 32%),
			linear-gradient(
				135deg,
				var(--color-brand-deeper) 0%,
				var(--color-brand) 52%,
				var(--color-brand-light) 100%
			);
	}

	.hero-bg {
		position: absolute;
		inset: -10%;
		z-index: -1;
		overflow: hidden;
	}

	.hero-bg__layer {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.55;
		transform: translate3d(0, var(--py, 0px), 0);
		will-change: transform;
	}

	.hero-bg__layer--1 {
		bottom: -6rem;
		right: -6rem;
		width: 30rem;
		height: 30rem;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent 70%);
	}

	.hero-bg__layer--2 {
		top: -8rem;
		left: -10rem;
		width: 28rem;
		height: 28rem;
		background: radial-gradient(circle, rgba(77, 132, 255, 0.58), transparent 65%);
	}

	.hero-bg__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 56px 56px;
		mask-image: radial-gradient(circle at 50% 35%, black, transparent 70%);
		-webkit-mask-image: radial-gradient(circle at 50% 35%, black, transparent 70%);
		opacity: 0.45;
	}

	.hero-grid {
		max-width: 52rem;
	}

	.hero-copy h1 {
		margin-top: 0.7rem;
		color: #ffffff;
	}

	.hero-highlight {
		display: inline-block;
		background: linear-gradient(120deg, #ffffff, #dbe8ff 65%, var(--color-brand-light));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.hero-copy p {
		color: rgba(255, 255, 255, 0.92);
		max-width: 62ch;
	}

	.hero-lead {
		margin-top: 1.4rem;
		font-size: clamp(1.03rem, 1.7vw, 1.2rem);
	}

	.hero-phone {
		color: #ffffff;
		font-weight: 800;
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.hero-phone:hover {
		text-decoration-thickness: 2px;
	}

	/* SECTION NAV */
	.section-nav {
		padding-block: 0.5rem 0;
	}

	.section-nav__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.section-nav__search {
		width: 100%;
		max-width: 32rem;
	}

	.section-nav__search-label {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.section-nav__search-field {
		position: relative;
		display: flex;
		align-items: center;
	}

	.section-nav__search-icon {
		position: absolute;
		left: 1rem;
		width: 1.1rem;
		height: 1.1rem;
		color: var(--color-brand-deep);
		pointer-events: none;
	}

	.section-nav__search-input {
		width: 100%;
		padding: 0.85rem 2.75rem 0.85rem 2.75rem;
		border: 1px solid rgba(15, 87, 251, 0.28);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.96);
		color: var(--color-ink);
		font: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		box-shadow: var(--shadow-soft);
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease;
	}

	.section-nav__search-input::placeholder {
		color: #94a3b8;
		font-weight: 500;
	}

	.section-nav__search-input:hover {
		border-color: rgba(15, 87, 251, 0.4);
	}

	.section-nav__search-input:focus-visible {
		outline: none;
		border-color: rgba(15, 87, 251, 0.55);
		box-shadow: 0 0 0 3px rgba(15, 87, 251, 0.16);
	}

	.section-nav__search-clear {
		position: absolute;
		right: 0.55rem;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: rgba(15, 87, 251, 0.1);
		color: var(--color-brand-deeper);
		cursor: pointer;
		transition: background 200ms ease;
	}

	.section-nav__search-clear svg {
		width: 0.95rem;
		height: 0.95rem;
	}

	.section-nav__search-clear:hover,
	.section-nav__search-clear:focus-visible {
		background: rgba(15, 87, 251, 0.18);
		outline: none;
	}

	.section-nav__search-status {
		margin: 0.55rem 0 0;
		text-align: center;
		font-size: 0.88rem;
		font-weight: 700;
		color: var(--color-brand-deeper);
	}

	.section-nav__links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.55rem;
		width: 100%;
	}

	.section-nav__links a {
		display: inline-flex;
		align-items: center;
		padding: 0.55rem 0.95rem;
		border: 1px solid rgba(15, 87, 251, 0.28);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		color: var(--color-brand-deeper);
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 700;
		transition:
			background 200ms ease,
			transform 200ms var(--ease-spring),
			box-shadow 200ms ease;
	}

	.section-nav__links a:hover,
	.section-nav__links a:focus-visible {
		background: #ffffff;
		transform: translateY(-1px);
		box-shadow: 0 10px 24px -14px rgba(15, 87, 251, 0.45);
		outline: none;
	}

	/* FAQ SECTIONS */
	.faq-section {
		padding-block: clamp(1.5rem, 3vw, 2.5rem);
	}

	.faq-section__header {
		margin-bottom: 1.2rem;
	}

	.faq-section__header h2 {
		margin-top: 0.55rem;
	}

	.faq-list {
		display: grid;
		gap: 0.75rem;
	}

	.faq-item {
		border: 1px solid var(--color-line);
		border-radius: var(--radius-md);
		background: #ffffff;
		box-shadow: var(--shadow-soft);
		overflow: hidden;
		transition:
			box-shadow 220ms var(--ease-spring),
			border-color 220ms ease;
	}

	.faq-item:hover {
		border-color: rgba(15, 87, 251, 0.28);
		box-shadow: 0 18px 40px -24px rgba(4, 45, 122, 0.28);
	}

	.faq-item[open] {
		border-color: rgba(15, 87, 251, 0.35);
		box-shadow: 0 22px 44px -22px rgba(4, 45, 122, 0.32);
	}

	.faq-item__question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.1rem 1.25rem;
		cursor: pointer;
		list-style: none;
		font-weight: 800;
		color: var(--color-ink);
		line-height: 1.35;
	}

	.faq-item__question::-webkit-details-marker {
		display: none;
	}

	.faq-item__chev {
		width: 1.1rem;
		height: 1.1rem;
		flex-shrink: 0;
		color: var(--color-brand-deep);
		transition: transform 220ms var(--ease-spring);
	}

	.faq-item[open] .faq-item__chev {
		transform: rotate(180deg);
	}

	.faq-item__answer {
		padding: 0 1.25rem 1.15rem;
	}

	.faq-item__answer p {
		margin: 0;
	}

	.faq-item__answer ul {
		margin: 0.75rem 0 0;
		padding-left: 1.2rem;
		color: var(--color-ink-soft);
		line-height: 1.65;
	}

	.faq-item__answer li + li {
		margin-top: 0.35rem;
	}

	.faq-empty {
		padding-block: 0.5rem 1rem;
	}

	.faq-empty__panel {
		padding: 1.5rem;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-md);
		background: #ffffff;
		box-shadow: var(--shadow-soft);
		text-align: center;
	}

	.faq-empty__panel p {
		margin: 0 0 1rem;
	}

	.btn-call--compact {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.2rem;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		color: #ffffff;
		text-decoration: none;
		font-weight: 800;
		border-radius: 999px;
		box-shadow: 0 14px 32px -12px rgba(15, 87, 251, 0.45);
		transition: transform 220ms var(--ease-spring);
	}

	.btn-call--compact:hover {
		transform: translateY(-2px);
	}

	/* CTA */
	.cta-section {
		padding-block: clamp(1rem, 3vw, 2rem) clamp(2rem, 4vw, 3rem);
	}

	.cta-panel {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: clamp(1.8rem, 4vw, 3.2rem);
		background:
			radial-gradient(circle at 80% 20%, rgba(77, 132, 255, 0.32), transparent 60%),
			linear-gradient(
				135deg,
				var(--color-brand-deeper),
				var(--color-brand) 60%,
				var(--color-brand-light)
			);
		color: #ffffff;
		box-shadow: 0 32px 80px -28px rgba(15, 23, 42, 0.45);
	}

	.cta-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		border-radius: inherit;
	}

	.cta-bg span {
		position: absolute;
		inset: -10%;
		background: repeating-linear-gradient(
			-45deg,
			rgba(255, 255, 255, 0.06) 0 14px,
			transparent 14px 28px
		);
		opacity: 0.7;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.cta-copy h2,
	.cta-copy p {
		color: #ffffff;
	}

	.cta-copy h2 {
		margin-top: 0.6rem;
	}

	.cta-copy p {
		color: rgba(255, 255, 255, 0.9);
		max-width: 56ch;
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.4rem;
	}

	.btn-call {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.85rem 1.3rem;
		background: #ffffff;
		color: var(--color-brand-deeper);
		text-decoration: none;
		font-weight: 800;
		border-radius: 999px;
		box-shadow: 0 18px 40px -14px rgba(0, 0, 0, 0.45);
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring);
	}

	.btn-call svg {
		width: 1.1rem;
		height: 1.1rem;
	}

	.btn-call:hover {
		transform: translateY(-2px);
		box-shadow: 0 22px 46px -14px rgba(0, 0, 0, 0.5);
	}

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0.85rem 1.3rem;
		border: 1px solid rgba(255, 255, 255, 0.45);
		border-radius: 999px;
		color: #ffffff;
		text-decoration: none;
		font-weight: 800;
		transition:
			background 200ms ease,
			transform 220ms var(--ease-spring);
	}

	.btn-ghost:hover {
		background: rgba(255, 255, 255, 0.12);
		transform: translateY(-2px);
	}

	@media (max-width: 720px) {
		.section-nav__search-input {
			font-size: 0.9rem;
			padding-inline: 2.5rem;
		}

		.section-nav__links a {
			font-size: 0.82rem;
			padding: 0.5rem 0.8rem;
		}

		.faq-item__question {
			padding: 1rem;
			font-size: 0.95rem;
		}

		.faq-item__answer {
			padding-inline: 1rem;
		}
	}
</style>
