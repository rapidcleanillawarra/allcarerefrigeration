<svelte:head>
	<title>Services | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Commercial refrigeration and air conditioning services across Illawarra and Southern Highlands, including installs, repairs, maintenance and emergency breakdown support."
	/>
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	import SiteImageSlot from '$lib/components/site-image-slot.svelte';

	let { data }: { data: PageData } = $props();

	function cardKey(accent: string): string {
		return accent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	}

	const services = [
		{
			title: 'Condenser Installation & Repairs',
			accent: 'Condenser',
			summary:
				'We install, repair and maintain commercial condenser units for cool rooms, freezer rooms and air conditioning systems.',
			items: [
				'Condenser coil cleaning',
				'Fan motor replacement',
				'Head pressure diagnostics',
				'System optimisation',
				'Full condenser replacement'
			],
			outcome: 'Proper condenser performance supports energy efficiency and long-term reliability.'
		},
		{
			title: 'Evaporator Repairs & Servicing',
			accent: 'Evaporator',
			summary:
				'We service evaporator units in cool rooms, freezer systems and air conditioning equipment across Illawarra and the Southern Highlands.',
			items: [
				'Coil cleaning and sanitising',
				'Defrost system repairs',
				'Fan motor replacement',
				'Ice build-up fault diagnosis',
				'Temperature performance testing'
			],
			outcome: 'Maintained evaporator systems improve airflow, temperature stability and energy efficiency.'
		},
		{
			title: 'Commercial Air Conditioning Installation & Repairs',
			accent: 'Air Conditioning',
			summary:
				'We provide installation, maintenance and repairs for commercial and residential clients.',
			items: [
				'Split systems',
				'Ducted air conditioning',
				'Commercial packaged units',
				'Multi-head systems'
			],
			outcome:
				'From system design and installation to breakdown repairs and scheduled servicing, we keep systems performing reliably.'
		},
		{
			title: 'Preventative Maintenance Programs',
			accent: 'Maintenance',
			summary: 'Regular servicing reduces breakdowns and extends equipment life.',
			items: [
				'Refrigerant level checks',
				'Electrical testing',
				'Airflow verification',
				'Component inspections',
				'Performance reporting'
			],
			outcome: 'Scheduled maintenance protects your investment and helps prevent costly downtime.'
		}
	];

	const serviceAreas = [
		'Helensburgh',
		'Wollongong',
		'Shellharbour',
		'Kiama',
		'Nowra',
		'Bowral',
		'Mittagong',
		'Robertson',
		'Moss Vale'
	];

	const contactDetails = [
		{
			title: 'Address',
			value: '157 Church St, Albion Park NSW 2527, Australia'
		},
		{
			title: 'Call Us',
			value: '041-1532-233'
		},
		{
			title: 'Operating Hours',
			value: 'Monday - Sunday: 8:00 a.m - 5:00 p.m'
		}
	];
</script>

<!-- HERO ------------------------------------------------------------- -->
<section class="hero" aria-labelledby="services-heading">
	<div class="hero-bg" aria-hidden="true">
		<span class="hero-bg__layer hero-bg__layer--1" data-parallax="0.18"></span>
		<span class="hero-bg__layer hero-bg__layer--2" data-parallax="0.32"></span>
		<span class="hero-bg__grid"></span>
	</div>

	<div class="section-inner section-inner--wide hero-grid">
		<div class="hero-content">
			<p class="eyebrow eyebrow--on-dark reveal reveal--up">
				Commercial Refrigeration & Air Conditioning Services
			</p>
			<h1 id="services-heading" class="reveal reveal--up">
				Professional service for
				<span class="hero-highlight">reliable year-round performance.</span>
			</h1>
			<p class="hero-lead reveal reveal--up">
				AllCare Refrigeration & Air Conditioning delivers professional service across Illawarra
				and the Southern Highlands, from Helensburgh to Nowra and west to Bowral, Mittagong,
				Robertson and Moss Vale.
			</p>
			<p class="reveal reveal--up">
				We specialise in commercial refrigeration systems, condensers, evaporators and air
				conditioning installations for businesses that rely on consistent temperature control and
				system reliability.
			</p>
			<div class="hero-actions reveal reveal--up" aria-label="Services page actions">
				<a class="btn-primary" href="tel:0411532233">
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
					Call 041-1532-233
				</a>
				<a class="btn-ghost" href="#core-services">Explore services</a>
			</div>
		</div>

		<div
			class="hero-panel reveal reveal--scale"
			data-parallax="-0.05"
			aria-label="Service highlights"
		>
			<p class="hero-panel__intro">
				Responsive support for commercial refrigeration and air conditioning
			</p>
			<div class="hero-stat">
				<strong>24/7</strong>
				<span>Emergency breakdown service</span>
			</div>
			<div class="hero-stat">
				<strong>{services.length}</strong>
				<span>Core service categories</span>
			</div>
			<div class="hero-stat">
				<strong>{serviceAreas.length}</strong>
				<span>Key service area locations</span>
			</div>
		</div>
	</div>
</section>

<!-- SERVICES --------------------------------------------------------- -->
<section class="services-section section-shell" id="core-services" aria-labelledby="core-heading">
	<div class="section-inner section-inner--wide">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">How can we help you?</p>
			<h2 id="core-heading" class="reveal reveal--up">Core Services</h2>
			<p class="reveal reveal--up">
				Comprehensive refrigeration and air conditioning support tailored for commercial sites
				across Illawarra and the Southern Highlands.
			</p>
		</header>

		<div class="service-grid" data-stagger>
			{#each services as service, i (service.title)}
				<article class="service-card reveal reveal--up" style="--i: {i}">
					<div class="service-card__media">
						<SiteImageSlot
							placeholderKey={`services:card:${cardKey(service.accent)}`}
							ariaLabel={`${service.accent} service image`}
							edit={data.edit}
							imageUrl={data.imageMap[`services:card:${cardKey(service.accent)}`]}
							wrapperClass="service-image"
						>
							{#snippet children()}
								<span>{service.accent}</span>
							{/snippet}
						</SiteImageSlot>
						<span class="service-card__num">0{i + 1}</span>
					</div>
					<div class="service-content">
						<h3>{service.title}</h3>
						<p>{service.summary}</p>
						<ul>
							{#each service.items as item (item)}
								<li>
									<svg
										aria-hidden="true"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.4"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="m5 12 5 5L20 7" />
									</svg>
									{item}
								</li>
							{/each}
						</ul>
						<p class="service-outcome">{service.outcome}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- EMERGENCY -------------------------------------------------------- -->
<section
	class="emergency-section section-shell"
	aria-labelledby="emergency-services-heading"
>
	<div class="section-inner section-inner--wide">
		<div class="emergency-panel">
			<div class="emergency-bg" aria-hidden="true">
				<span data-parallax="0.12"></span>
			</div>
			<div class="emergency-copy reveal reveal--up">
				<p class="eyebrow eyebrow--on-dark">Emergency support</p>
				<h2 id="emergency-services-heading">24/7 Emergency Breakdown Service</h2>
				<p>
					Refrigeration failures can impact stock, safety and business operations. We provide
					responsive emergency breakdown services across:
				</p>
				<ul class="locations" aria-label="Emergency service locations" data-stagger>
					{#each serviceAreas as location, i (location)}
						<li class="reveal reveal--up" style="--i: {i}">
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							{location}
						</li>
					{/each}
				</ul>
			</div>
			<a class="emergency-call reveal reveal--scale" href="tel:0411532233">
				<span class="emergency-call__pulse pulse-ring" aria-hidden="true"></span>
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
				<span>Call emergency support</span>
				<strong>041-1532-233</strong>
			</a>
		</div>
	</div>
</section>

<!-- CONTACT ---------------------------------------------------------- -->
<section class="contact-section section-shell" aria-labelledby="contact-heading">
	<div class="section-inner section-inner--wide">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">Contact AllCare</p>
			<h2 id="contact-heading" class="reveal reveal--up">
				Need reliable refrigeration or air conditioning services?
			</h2>
			<p class="reveal reveal--up">Contact us today.</p>
		</header>

		<div class="contact-grid" data-stagger>
			{#each contactDetails as detail, i (detail.title)}
				<article class="contact-card reveal reveal--up" style="--i: {i}">
					<span class="contact-card__icon">
						{#if detail.title === 'Address'}
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
						{:else if detail.title === 'Call Us'}
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
						{:else}
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<polyline points="12 6 12 12 16 14" />
							</svg>
						{/if}
					</span>
					<h3>{detail.title}</h3>
					<p>
						{#if detail.title === 'Call Us'}
							<a href="tel:0411532233">{detail.value}</a>
						{:else}
							{detail.value}
						{/if}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	h1,
	h2,
	h3 {
		margin: 0;
		color: var(--color-ink);
	}

	h1 {
		font-size: clamp(2.1rem, 4.8vw, 4.1rem);
		line-height: 1.05;
		letter-spacing: -0.04em;
	}

	h2 {
		font-size: clamp(1.65rem, 3.2vw, 2.6rem);
		line-height: 1.1;
		letter-spacing: -0.035em;
	}

	h3 {
		font-size: clamp(1.05rem, 1.6vw, 1.2rem);
		font-weight: 800;
	}

	p {
		line-height: 1.6;
		color: var(--color-ink-soft);
		margin: 0 0 1rem;
	}

	.section-intro {
		max-width: 50rem;
		margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
		text-align: center;
		display: grid;
		gap: 0.5rem;
		justify-items: center;
	}

	.section-intro p {
		margin: 0;
	}

	/* HERO */
	.hero {
		position: relative;
		isolation: isolate;
		padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2.5rem, 5vw, 4rem);
		overflow: clip;
		color: #ffffff;
		background:
			radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.28), transparent 26rem),
			linear-gradient(135deg, var(--color-brand-deeper) 0%, var(--color-brand) 52%, var(--color-brand-light) 100%);
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
	}

	.hero-bg__layer--1 {
		top: -10%;
		right: -10%;
		width: 32rem;
		height: 32rem;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.55), transparent 65%);
	}

	.hero-bg__layer--2 {
		bottom: -8rem;
		left: -8rem;
		width: 30rem;
		height: 30rem;
		background: radial-gradient(circle, rgba(77, 132, 255, 0.58), transparent 65%);
	}

	.hero-bg__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(circle at 50% 35%, black, transparent 70%);
		-webkit-mask-image: radial-gradient(circle at 50% 35%, black, transparent 70%);
		opacity: 0.45;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.65fr);
		gap: clamp(2rem, 4vw, 4rem);
		align-items: stretch;
		position: relative;
	}

	.hero-content {
		max-width: 44rem;
	}

	.hero-content h1 {
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

	.hero-content p {
		color: rgba(255, 255, 255, 0.92);
		max-width: 60ch;
	}

	.hero-lead {
		font-size: clamp(1.05rem, 1.7vw, 1.25rem);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.4rem;
	}

	.btn-primary,
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1.3rem;
		font-weight: 800;
		text-decoration: none;
		border-radius: 999px;
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring),
			filter 220ms var(--ease-spring);
	}

	.btn-primary {
		background: #ffffff;
		color: var(--color-brand-deep);
		box-shadow: 0 14px 30px -10px rgba(15, 23, 42, 0.4);
	}

	.btn-primary svg {
		width: 1rem;
		height: 1rem;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 34px -10px rgba(15, 23, 42, 0.45);
	}

	.btn-ghost {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.55);
		backdrop-filter: blur(8px);
	}

	.btn-ghost:hover {
		background: rgba(255, 255, 255, 0.18);
		transform: translateY(-2px);
	}

	.hero-panel {
		display: grid;
		gap: 1rem;
		align-content: start;
		border: 1px solid rgba(255, 255, 255, 0.34);
		border-radius: var(--radius-lg);
		padding: clamp(1.4rem, 3vw, 1.9rem);
		background: rgba(255, 255, 255, 0.12);
		backdrop-filter: blur(14px);
		box-shadow: 0 20px 40px -16px rgba(15, 23, 42, 0.4);
	}

	.hero-panel__intro {
		margin: 0;
		font-weight: 700;
		color: #ffffff;
	}

	.hero-stat {
		display: grid;
		gap: 0.2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.26);
		padding-top: 0.85rem;
	}

	.hero-stat strong {
		color: #ffffff;
		font-size: clamp(1.65rem, 3vw, 2.5rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.hero-stat span {
		color: rgba(238, 248, 255, 0.92);
		font-weight: 700;
		font-size: 0.92rem;
	}

	/* SERVICES */
	.service-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1rem, 2vw, 1.4rem);
	}

	.service-card {
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-lg);
		background: linear-gradient(180deg, #ffffff, #f8fbff);
		box-shadow: var(--shadow-soft);
		transition:
			transform 320ms var(--ease-spring),
			box-shadow 320ms var(--ease-spring),
			border-color 320ms var(--ease-spring);
	}

	.service-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 28px 60px -22px rgba(4, 45, 122, 0.32);
		border-color: rgba(15, 87, 251, 0.45);
	}

	.service-card__media {
		position: relative;
		overflow: hidden;
	}

	:global(.site-image-slot.service-image) {
		position: relative;
		display: grid;
		min-height: 11rem;
		place-items: center;
		background:
			linear-gradient(135deg, rgba(15, 87, 251, 0.95), rgba(4, 45, 122, 0.95)),
			repeating-linear-gradient(
				-45deg,
				rgba(255, 255, 255, 0.18) 0 8px,
				rgba(255, 255, 255, 0.08) 8px 16px
			);
		color: #ffffff;
		transition: transform 700ms var(--ease-spring);
	}

	.service-card:hover :global(.site-image-slot.service-image) {
		transform: scale(1.04);
	}

	:global(.site-image-slot.service-image) :global(span) {
		border: 1px solid rgba(255, 255, 255, 0.45);
		border-radius: 999px;
		padding: 0.55rem 0.95rem;
		background: rgba(255, 255, 255, 0.16);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		backdrop-filter: blur(4px);
	}

	.service-card__num {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		padding: 0.3rem 0.55rem;
		background: rgba(15, 23, 42, 0.35);
		color: #ffffff;
		border-radius: 0.5rem;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		backdrop-filter: blur(6px);
	}

	.service-content {
		padding: clamp(1.1rem, 2.5vw, 1.5rem);
		display: grid;
		gap: 0.6rem;
	}

	.service-content ul {
		display: grid;
		gap: 0.45rem;
		margin: 0.65rem 0;
		padding: 0;
		list-style: none;
	}

	.service-content li {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--color-ink);
		font-weight: 600;
		line-height: 1.45;
	}

	.service-content li svg {
		width: 0.95rem;
		height: 0.95rem;
		flex: 0 0 auto;
		padding: 0.2rem;
		border-radius: 999px;
		background: rgba(15, 87, 251, 0.16);
		color: var(--color-brand-deep);
	}

	.service-outcome {
		margin-bottom: 0;
		padding: 0.7rem 0.85rem;
		border-radius: 0.7rem;
		background: linear-gradient(135deg, rgba(15, 87, 251, 0.12), rgba(15, 87, 251, 0.04));
		border: 1px solid rgba(15, 87, 251, 0.22);
		font-weight: 700;
		color: var(--color-brand-deep);
	}

	/* EMERGENCY */
	.emergency-section {
		position: relative;
	}

	.emergency-panel {
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: clamp(1.2rem, 4vw, 2rem);
		align-items: center;
		overflow: hidden;
		padding: clamp(1.8rem, 4vw, 3rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(ellipse at 90% 20%, rgba(77, 132, 255, 0.28), transparent 60%),
			linear-gradient(135deg, rgba(4, 45, 122, 0.96), rgba(53, 60, 75, 0.97));
		color: #ffffff;
		box-shadow: 0 32px 80px -28px rgba(15, 23, 42, 0.45);
	}

	.emergency-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		border-radius: inherit;
	}

	.emergency-bg span {
		position: absolute;
		inset: -10%;
		background: repeating-linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.05) 0 12px,
			transparent 12px 24px
		);
		opacity: 0.7;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.emergency-copy h2,
	.emergency-copy p {
		color: #ffffff;
	}

	.emergency-copy h2 {
		margin-top: 0.6rem;
	}

	.emergency-copy p {
		color: rgba(255, 255, 255, 0.85);
		max-width: 56ch;
	}

	.locations {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 1.2rem 0 0;
		padding: 0;
		list-style: none;
	}

	.locations li {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		border: 1px solid rgba(255, 255, 255, 0.28);
		border-radius: 999px;
		padding: 0.4rem 0.8rem;
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
		font-weight: 700;
		font-size: 0.88rem;
		transition:
			background 220ms var(--ease-spring),
			transform 220ms var(--ease-spring);
	}

	.locations li svg {
		width: 0.85rem;
		height: 0.85rem;
		color: #d6e4ff;
	}

	.locations li:hover {
		transform: translateY(-2px);
		background: rgba(255, 255, 255, 0.18);
	}

	.emergency-call {
		position: relative;
		display: grid;
		justify-items: start;
		gap: 0.18rem;
		min-width: min(100%, 280px);
		padding: 1.1rem 1.4rem;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		color: #ffffff;
		text-decoration: none;
		font-weight: 800;
		border-radius: var(--radius-lg);
		box-shadow: 0 22px 48px -18px rgba(15, 87, 251, 0.55);
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring),
			filter 220ms var(--ease-spring);
		overflow: hidden;
		isolation: isolate;
	}

	.emergency-call::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			120deg,
			transparent 30%,
			rgba(255, 255, 255, 0.4) 45%,
			transparent 60%
		);
		background-size: 200% 100%;
		animation: shimmer 3.6s linear infinite;
		pointer-events: none;
	}

	.emergency-call:hover {
		transform: translateY(-3px);
		box-shadow: 0 26px 56px -18px rgba(15, 87, 251, 0.7);
		filter: brightness(1.04);
	}

	.emergency-call svg {
		width: 1.6rem;
		height: 1.6rem;
		padding: 0.35rem;
		background: rgba(255, 255, 255, 0.18);
		border-radius: 999px;
	}

	.emergency-call span {
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.85);
	}

	.emergency-call strong {
		font-size: 1.5rem;
		letter-spacing: -0.02em;
	}

	.emergency-call__pulse {
		position: absolute;
		right: 1.3rem;
		top: 1.3rem;
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #80efd1;
		box-shadow: 0 0 0 0 rgba(128, 239, 209, 0.85);
	}

	/* CONTACT */
	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.contact-card {
		padding: 1.4rem;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-md);
		background: #ffffff;
		display: grid;
		gap: 0.5rem;
		box-shadow: var(--shadow-soft);
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring);
	}

	.contact-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 22px 44px -22px rgba(4, 45, 122, 0.3);
	}

	.contact-card__icon {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, rgba(15, 87, 251, 0.18), rgba(4, 45, 122, 0.18));
		color: var(--color-brand-deep);
	}

	.contact-card__icon svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.contact-card p {
		margin: 0;
		color: var(--color-ink-soft);
	}

	.contact-card a {
		color: var(--color-brand-deeper);
		text-decoration: none;
		font-weight: 800;
	}

	.contact-card a:hover {
		text-decoration: underline;
	}

	@media (max-width: 1024px) {
		.hero-grid,
		.emergency-panel {
			grid-template-columns: 1fr;
		}

		.service-grid {
			grid-template-columns: 1fr;
		}

		.emergency-call {
			justify-self: start;
		}
	}

	@media (max-width: 720px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.hero-actions {
			flex-direction: column;
		}

		.btn-primary,
		.btn-ghost,
		.emergency-call {
			width: 100%;
		}

		.hero-panel {
			align-content: stretch;
		}
	}
</style>
