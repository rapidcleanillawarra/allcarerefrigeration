<script lang="ts">
	import type { PageData } from './$types';
	import SiteImageSlot from '$lib/components/site-image-slot.svelte';

	let { data }: { data: PageData } = $props();

	const featureSections = [
		{
			id: 'mission',
			kicker: 'Our Mission',
			title: 'Reliable service without compromising quality or safety.',
			imageLabel: 'Mission image placeholder: technician inspecting a refrigeration system',
			content: [
				'We strive to provide the most reliable and efficient refrigeration and air-conditioning services without compromising on quality or safety.',
				'We are committed to proven workmanship, fair pricing, and genuine customer care so we can build long-term relationships that last for years, well beyond the first job we complete.'
			]
		},
		{
			id: 'values',
			kicker: 'Core Values',
			title: 'Honest advice, careful workmanship, and the right solution.',
			imageLabel: 'Values image placeholder: friendly service team on site',
			content: [
				'Honesty is the foundation of trust and integrity. We stay open and accountable so customers receive clear communication, honest advice, and respect at every step.',
				'We focus on doing what is right, not quick shortcuts, and treat quality and safety as non-negotiables on every job.'
			],
			items: ['Honesty first', 'Do what is right', 'Excellence in workmanship']
		},
		{
			id: 'efficient-solutions',
			kicker: 'Efficient Solutions',
			title: 'Practical refrigeration and air-conditioning solutions that keep systems moving.',
			imageLabel:
				'Efficient solutions image placeholder: modern diagnostic tools beside HVAC equipment',
			content: [
				'By combining modern diagnostic tools, proven industry methods, and quality parts, we ensure your systems operate safely, efficiently, and consistently.',
				'Trust, integrity, and long-term relationships are what drive us. Our goal is simple: to keep your equipment running and earn your business for life, leaving a strong impression every time we attend a site.'
			]
		},
		{
			id: 'why-choose-us',
			kicker: 'Why Choose Us',
			title: 'Dependable results from a team that takes ownership.',
			imageLabel: 'Why choose us image placeholder: completed refrigeration service handover',
			content: [
				'We go above and beyond to deliver reliable, professional refrigeration and air-conditioning services. Our focus is quality workmanship, honest service, and dependable results every time.'
			],
			items: [
				'Qualified and experienced technicians',
				'Honest, transparent pricing',
				'Commitment to quality workmanship',
				'Service across a wide area',
				'Fast response for urgent refrigeration issues'
			]
		}
	];

	const contactDetails = [
		{
			id: 'address',
			title: 'Address',
			content: '157 Church St, Albion Park NSW 2527, Australia'
		},
		{
			id: 'phone',
			title: 'Call Us',
			content: '041-1532-233'
		},
		{
			id: 'hours',
			title: 'Operating Hours',
			content: 'Monday - Sunday: 8:00 a.m - 5:00 p.m'
		}
	];
</script>

<svelte:head>
	<title>About Us | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Learn about AllCare Refrigeration, our mission, values, and commitment to reliable refrigeration and air-conditioning services."
	/>
</svelte:head>

<!-- HERO ------------------------------------------------------------- -->
<section class="hero" aria-labelledby="about-heading">
	<div class="hero-bg" aria-hidden="true">
		<span class="hero-bg__layer hero-bg__layer--1" data-parallax="0.18"></span>
		<span class="hero-bg__layer hero-bg__layer--2" data-parallax="0.32"></span>
		<span class="hero-bg__grid"></span>
	</div>

	<div class="section-inner section-inner--wide hero-grid">
		<div class="hero-copy">
			<p class="eyebrow eyebrow--on-dark reveal reveal--up">About Us</p>
			<h1 id="about-heading" class="reveal reveal--up">
				Reliable refrigeration and air-conditioning service
				<span class="hero-highlight">you can trust.</span>
			</h1>
			<p class="hero-lead reveal reveal--up">
				At <strong>AllCare Refrigeration</strong>, we are committed to delivering reliable,
				high-quality refrigeration and air-conditioning service by working as one team,
				continuously improving, and taking ownership of every job.
			</p>
			<p class="reveal reveal--up">
				We believe in openness and accountability, so our customers receive clear communication,
				honest advice, and respect at every step.
			</p>
		</div>
		<div class="hero-visual reveal reveal--scale" data-parallax="-0.05">
			<div class="hero-card hero-card--main float-y-slow">
				<SiteImageSlot
					placeholderKey="about:hero"
					ariaLabel="Hero image placeholder: AllCare Refrigeration technician servicing commercial equipment"
					edit={data.edit}
					imageUrl={data.imageMap['about:hero']}
					wrapperClass="image-placeholder image-placeholder--hero"
				>
					{#snippet children()}
						<span>Replace with service team image</span>
					{/snippet}
				</SiteImageSlot>
			</div>
			<div class="hero-card hero-card--badge float-y" aria-hidden="true">
				<span class="hero-card__icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 6 9 17l-5-5" />
					</svg>
				</span>
				<div>
					<strong>Quality first</strong>
					<small>Every visit, every job</small>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FEATURE STACK ---------------------------------------------------- -->
<section class="feature-stack section-shell">
	<div class="section-inner section-inner--wide">
		{#each featureSections as section, index (section.id)}
			<article
				class="feature"
				class:feature--reversed={index % 2 === 1}
				aria-labelledby="{section.id}-heading"
			>
				<div class="feature__copy">
					<p class="eyebrow reveal reveal--up">{section.kicker}</p>
					<h2 id="{section.id}-heading" class="reveal reveal--up">{section.title}</h2>
					{#each section.content as paragraph, p (paragraph)}
						<p class="reveal reveal--up" style="--i: {p}">{paragraph}</p>
					{/each}

					{#if section.items}
						<ul class="pill-list reveal reveal--up" aria-label="{section.kicker} highlights">
							{#each section.items as item, i (item)}
								<li class="reveal reveal--up" style="--i: {i}">
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
					{/if}
				</div>

				<div class="feature__visual reveal reveal--scale" data-parallax={index % 2 === 0 ? 0.05 : -0.05}>
					<SiteImageSlot
						placeholderKey={`about:feature:${section.id}`}
						ariaLabel={section.imageLabel}
						edit={data.edit}
						imageUrl={data.imageMap[`about:feature:${section.id}`]}
						wrapperClass="image-placeholder"
					>
						{#snippet children()}
							<span>{section.imageLabel}</span>
						{/snippet}
					</SiteImageSlot>
				</div>
			</article>
		{/each}
	</div>
</section>

<!-- CONTACT ---------------------------------------------------------- -->
<section class="contact-section section-shell" aria-labelledby="contact-heading">
	<div class="section-inner section-inner--wide">
		<div class="contact-panel">
			<div class="contact-bg" aria-hidden="true">
				<span data-parallax="0.1"></span>
			</div>
			<div class="contact-copy reveal reveal--up">
				<p class="eyebrow eyebrow--on-dark">Get In Touch</p>
				<h2 id="contact-heading">We are here to help. Call us today.</h2>
				<p>
					Reach out about a refrigeration or air-conditioning issue, planned servicing, or a new
					installation across Illawarra NSW.
				</p>
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
			</div>
		</div>

		<div class="contact-grid" data-stagger>
			{#each contactDetails as detail, i (detail.id)}
				<article class="contact-card reveal reveal--up" style="--i: {i}">
					<span class="contact-card__icon">
						{#if detail.id === 'address'}
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
						{:else if detail.id === 'phone'}
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
						{#if detail.id === 'phone'}
							<a href="tel:0411532233">{detail.content}</a>
						{:else}
							{detail.content}
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
		font-size: clamp(2.2rem, 5vw, 4.3rem);
		line-height: 1;
		letter-spacing: -0.045em;
	}

	h2 {
		font-size: clamp(1.65rem, 3.2vw, 2.7rem);
		line-height: 1.1;
		letter-spacing: -0.035em;
	}

	h3 {
		font-size: 1rem;
		font-weight: 800;
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
		padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2.5rem, 5vw, 4rem);
		overflow: clip;
		color: #ffffff;
		background:
			radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.25), transparent 32%),
			linear-gradient(135deg, #16466f 0%, #2f83c5 52%, #62ace8 100%);
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
		background: radial-gradient(circle, rgba(143, 199, 240, 0.6), transparent 65%);
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
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
		gap: clamp(2rem, 4vw, 4rem);
		align-items: center;
		position: relative;
	}

	.hero-copy h1 {
		margin-top: 0.7rem;
		color: #ffffff;
	}

	.hero-highlight {
		display: inline-block;
		background: linear-gradient(120deg, #ffffff, #cfe6f8 65%, #80c0eb);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.hero-copy p {
		color: rgba(255, 255, 255, 0.92);
		max-width: 56ch;
	}

	.hero-lead {
		margin-top: 1.4rem;
		font-size: clamp(1.03rem, 1.7vw, 1.2rem);
	}

	.hero-visual {
		position: relative;
		min-height: 26rem;
	}

	.hero-card {
		position: absolute;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.hero-card--main {
		inset: 0;
		box-shadow: var(--shadow-deep);
		border: 1px solid rgba(255, 255, 255, 0.4);
	}

	.hero-card--badge {
		left: -1rem;
		bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.85rem 1rem;
		background: rgba(255, 255, 255, 0.96);
		color: var(--color-brand-deeper);
		border-radius: 1rem;
		box-shadow: 0 22px 40px -18px rgba(15, 23, 42, 0.35);
		font-size: 0.92rem;
	}

	.hero-card__icon {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, #62ace8, #1e5f95);
		color: #ffffff;
	}

	.hero-card__icon svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.hero-card--badge strong {
		display: block;
		font-weight: 900;
		font-size: 0.95rem;
	}

	.hero-card--badge small {
		display: block;
		color: var(--color-ink-soft);
		font-size: 0.78rem;
		font-weight: 600;
	}

	/* FEATURE STACK */
	.feature-stack {
		padding-block: clamp(1rem, 3vw, 2.5rem);
	}

	.section-inner > .feature + .feature {
		margin-top: clamp(1.4rem, 3vw, 2.2rem);
	}

	.feature {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
		gap: clamp(1.8rem, 4vw, 3.5rem);
		align-items: center;
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-xl);
		padding: clamp(1.5rem, 3vw, 2.6rem);
		box-shadow: var(--shadow-card);
		position: relative;
		overflow: hidden;
		transition:
			transform 320ms var(--ease-spring),
			box-shadow 320ms var(--ease-spring);
	}

	.feature:hover {
		transform: translateY(-4px);
		box-shadow: 0 32px 70px -28px rgba(15, 76, 129, 0.32);
	}

	.feature::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 100% 0%, rgba(98, 172, 232, 0.1), transparent 35%),
			radial-gradient(circle at 0% 100%, rgba(15, 76, 129, 0.08), transparent 40%);
		pointer-events: none;
	}

	.feature--reversed .feature__copy {
		order: 2;
	}

	.feature--reversed .feature__visual {
		order: 1;
	}

	.feature__copy,
	.feature__visual {
		position: relative;
		z-index: 1;
	}

	.feature h2 {
		margin-top: 0.6rem;
	}

	.feature p {
		max-width: 64ch;
	}

	.pill-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 1.2rem 0 0;
		padding: 0;
		list-style: none;
	}

	.pill-list li {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		border: 1px solid rgba(98, 172, 232, 0.32);
		border-radius: 999px;
		background: linear-gradient(135deg, #f3f9fe, #ffffff);
		color: var(--color-brand-deeper);
		font-weight: 700;
		padding: 0.5rem 0.85rem;
		font-size: 0.88rem;
		transition:
			transform 220ms var(--ease-spring),
			background 220ms var(--ease-spring);
	}

	.pill-list li svg {
		width: 0.85rem;
		height: 0.85rem;
		padding: 0.18rem;
		background: rgba(98, 172, 232, 0.16);
		border-radius: 999px;
		color: var(--color-brand-deep);
	}

	.pill-list li:hover {
		transform: translateY(-2px);
		background: linear-gradient(135deg, #ffffff, #e6f3fc);
	}

	/* IMAGE PLACEHOLDERS */
	:global(.site-image-slot.image-placeholder) {
		position: relative;
		display: grid;
		min-height: 21rem;
		place-items: center;
		overflow: hidden;
		border: 1px solid rgba(98, 172, 232, 0.32);
		border-radius: var(--radius-lg);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(232, 245, 255, 0.72)),
			repeating-linear-gradient(
				-45deg,
				rgba(98, 172, 232, 0.14) 0 14px,
				rgba(98, 172, 232, 0.04) 14px 28px
			);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.85);
		color: var(--color-brand-deeper);
		text-align: center;
	}

	:global(.site-image-slot.image-placeholder)::before {
		position: absolute;
		inset: 1rem;
		content: '';
		border: 1px dashed rgba(22, 70, 111, 0.25);
		border-radius: 18px;
	}

	:global(.site-image-slot.image-placeholder)::after {
		position: absolute;
		width: 9rem;
		height: 9rem;
		content: '';
		border-radius: 999px;
		background: rgba(98, 172, 232, 0.18);
		filter: blur(2px);
	}

	:global(.site-image-slot.image-placeholder) :global(span) {
		position: relative;
		z-index: 1;
		max-width: 18rem;
		padding: 0.8rem 1rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.85);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	:global(.site-image-slot.image-placeholder--hero) {
		min-height: 26rem;
		border-color: rgba(255, 255, 255, 0.4);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(234, 247, 255, 0.82)),
			repeating-linear-gradient(
				-45deg,
				rgba(22, 70, 111, 0.12) 0 16px,
				rgba(22, 70, 111, 0.03) 16px 32px
			);
	}

	/* CONTACT */
	.contact-section {
		display: grid;
		gap: 1.4rem;
	}

	.contact-panel {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: clamp(1.8rem, 4vw, 3.5rem);
		background:
			radial-gradient(circle at 80% 20%, rgba(143, 199, 240, 0.35), transparent 60%),
			linear-gradient(135deg, #0f4c81, #1e5f95 60%, #2476b4);
		color: #ffffff;
		box-shadow: 0 32px 80px -28px rgba(15, 23, 42, 0.45);
	}

	.contact-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		border-radius: inherit;
	}

	.contact-bg span {
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

	.contact-copy h2,
	.contact-copy p {
		color: #ffffff;
	}

	.contact-copy h2 {
		margin-top: 0.6rem;
	}

	.contact-copy p {
		color: rgba(255, 255, 255, 0.9);
		max-width: 50ch;
	}

	.btn-call {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 0.4rem;
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

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.2rem;
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
		box-shadow: 0 22px 44px -22px rgba(15, 76, 129, 0.3);
	}

	.contact-card__icon {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, rgba(98, 172, 232, 0.18), rgba(15, 76, 129, 0.18));
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
		.feature {
			grid-template-columns: 1fr;
		}

		.feature--reversed .feature__copy,
		.feature--reversed .feature__visual {
			order: initial;
		}

		.hero-visual {
			min-height: 22rem;
			max-width: 36rem;
			margin-inline: auto;
			width: 100%;
		}
	}

	@media (max-width: 720px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		:global(.site-image-slot.image-placeholder) {
			min-height: 16rem;
		}

		:global(.site-image-slot.image-placeholder--hero) {
			min-height: 18rem;
		}

		.hero-card--badge {
			left: 0.5rem;
		}
	}
</style>
