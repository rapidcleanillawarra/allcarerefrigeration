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

<main class="about-page">
	<section class="hero" aria-labelledby="about-heading">
		<div class="hero__content">
			<p class="eyebrow">About Us</p>
			<h1 id="about-heading">Reliable refrigeration and air-conditioning service you can trust.</h1>
			<p class="hero__lead">
				At <strong>AllCare Refrigeration</strong>, we are committed to delivering reliable,
				high-quality refrigeration and air-conditioning service by working as one team,
				continuously improving, and taking ownership of every job.
			</p>
			<p>
				We believe in openness and accountability, so our customers receive clear communication,
				honest advice, and respect at every step.
			</p>
		</div>
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
	</section>

	<div class="feature-stack">
		{#each featureSections as section, index (section.id)}
			<section
				class:feature--reversed={index % 2 === 1}
				class="feature"
				aria-labelledby="{section.id}-heading"
			>
				<div class="feature__copy">
					<p class="eyebrow">{section.kicker}</p>
					<h2 id="{section.id}-heading">{section.title}</h2>
					{#each section.content as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}

					{#if section.items}
						<ul class="pill-list" aria-label="{section.kicker} highlights">
							{#each section.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					{/if}
				</div>

				<div class="feature__visual">
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
			</section>
		{/each}
	</div>

	<section class="contact" aria-labelledby="contact-heading">
		<div>
			<p class="eyebrow">Get In Touch</p>
			<h2 id="contact-heading">We are here to help. Call us today.</h2>
		</div>
		<div class="contact-grid">
			{#each contactDetails as detail (detail.id)}
				<article class="contact-card">
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
	</section>
</main>

<style>
	.about-page {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.5rem);
	}

	.hero {
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		background:
			radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.26), transparent 28%),
			linear-gradient(135deg, #16466f 0%, #2f83c5 52%, #62ace8 100%);
		color: #ffffff;
		border-radius: 28px;
		padding: clamp(2rem, 5vw, 4rem);
		box-shadow: 0 24px 60px rgba(20, 56, 89, 0.2);
	}

	.hero::after {
		position: absolute;
		right: -6rem;
		bottom: -8rem;
		width: 18rem;
		height: 18rem;
		content: '';
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.15);
	}

	.hero__content,
	.hero :global(.site-image-slot.image-placeholder) {
		position: relative;
		z-index: 1;
	}

	.eyebrow {
		margin: 0;
		color: #62ace8;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	h1,
	h2,
	h3 {
		margin: 0;
		color: #353c4b;
	}

	.hero h1 {
		color: #ffffff;
		margin-top: 0.7rem;
		font-size: clamp(2.2rem, 5vw, 4.35rem);
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.hero p {
		color: rgba(255, 255, 255, 0.92);
	}

	.hero__lead {
		margin-top: 1.4rem;
		font-size: clamp(1.03rem, 1.8vw, 1.2rem);
	}

	.feature-stack {
		display: grid;
		gap: clamp(1.2rem, 3vw, 2rem);
	}

	.feature {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(280px, 0.9fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		background: #ffffff;
		border: 1px solid rgba(98, 172, 232, 0.16);
		border-radius: 24px;
		padding: clamp(1.3rem, 3vw, 2.5rem);
		box-shadow: 0 18px 44px rgba(15, 23, 42, 0.07);
	}

	.feature--reversed .feature__copy {
		order: 2;
	}

	.feature--reversed .feature__visual {
		order: 1;
	}

	.feature h2,
	.contact h2 {
		margin-top: 0.65rem;
		font-size: clamp(1.55rem, 3vw, 2.45rem);
		line-height: 1.1;
		letter-spacing: -0.035em;
	}

	.feature p,
	.contact p {
		max-width: 70ch;
	}

	:global(.site-image-slot.image-placeholder) {
		position: relative;
		display: grid;
		min-height: 21rem;
		place-items: center;
		overflow: hidden;
		border: 1px solid rgba(98, 172, 232, 0.32);
		border-radius: 24px;
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(232, 245, 255, 0.72)),
			repeating-linear-gradient(
				-45deg,
				rgba(98, 172, 232, 0.14) 0 14px,
				rgba(98, 172, 232, 0.04) 14px 28px
			);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.85);
		color: #16466f;
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
		background: rgba(255, 255, 255, 0.8);
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	:global(.site-image-slot.image-placeholder--hero) {
		min-height: 24rem;
		border-color: rgba(255, 255, 255, 0.4);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(234, 247, 255, 0.82)),
			repeating-linear-gradient(
				-45deg,
				rgba(22, 70, 111, 0.12) 0 16px,
				rgba(22, 70, 111, 0.03) 16px 32px
			);
	}

	p {
		color: #353c4b;
		line-height: 1.7;
	}

	.pill-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin: 1.3rem 0 0;
		padding: 0;
		list-style: none;
	}

	.pill-list li {
		border: 1px solid rgba(98, 172, 232, 0.3);
		border-radius: 999px;
		background: #f3f9fe;
		color: #16466f;
		font-weight: 700;
		padding: 0.55rem 0.8rem;
	}

	.contact {
		display: grid;
		gap: 1.4rem;
		border: 1px solid rgba(98, 172, 232, 0.18);
		border-radius: 24px;
		background: linear-gradient(135deg, #f5fbff, #ffffff);
		padding: clamp(1.3rem, 3vw, 2.5rem);
		box-shadow: 0 18px 44px rgba(15, 23, 42, 0.06);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.contact-card {
		border-radius: 18px;
		background: #ffffff;
		padding: 1.2rem;
		box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
	}

	.contact a {
		color: #62ace8;
		font-weight: 700;
		text-decoration: none;
	}

	@media (max-width: 920px) {
		.hero,
		.feature {
			grid-template-columns: 1fr;
		}

		.feature--reversed .feature__copy,
		.feature--reversed .feature__visual {
			order: initial;
		}

		.contact-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 620px) {
		.hero,
		.feature,
		.contact {
			border-radius: 20px;
		}

		:global(.site-image-slot.image-placeholder) {
			min-height: 16rem;
		}
	}
</style>
