<svelte:head>
	<title>AllCare Refrigeration | HVAC, Refrigeration & Air Conditioning Illawarra NSW</title>
	<meta
		name="description"
		content="AllCare Refrigeration provides refrigeration, air conditioning and HVAC repairs, installations and maintenance from Albion Park across Wollongong, Shellharbour and Illawarra NSW."
	/>
	<link rel="canonical" href="https://allcarerefrigeration.com.au/" />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="AllCare Refrigeration | HVAC Services Across Illawarra NSW" />
	<meta
		property="og:description"
		content="Local refrigeration, air conditioning and HVAC repairs, installations and maintenance for homes, businesses and commercial sites across Illawarra NSW."
	/>
	<meta property="og:url" content="https://allcarerefrigeration.com.au/" />
	<meta property="og:site_name" content="AllCare Refrigeration" />
	<meta property="og:locale" content="en_AU" />
	<meta name="theme-color" content="#0f57fb" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="AllCare Refrigeration | HVAC Services Across Illawarra NSW" />
	<meta
		name="twitter:description"
		content="Refrigeration, air conditioning and HVAC service from Albion Park for customers across Wollongong, Shellharbour and Illawarra."
	/>
	<script type="application/ld+json">{localBusinessJsonLd}</script>
</svelte:head>

<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import SiteImageSlot from '$lib/components/site-image-slot.svelte';

	let { data }: { data: PageData } = $props();

	const trustHighlights = [
		'Illawarra NSW specialists',
		'Residential and commercial support',
		'Clear advice before work begins'
	];

	const stats = [
		{ value: '15+', label: 'Years on Illawarra sites' },
		{ value: '24/7', label: 'Emergency response' },
		{ value: '100%', label: 'Honest, local team' }
	];

	const serviceAreas = [
		'Albion Park',
		'Wollongong',
		'Shellharbour',
		'Kiama',
		'Warrawong',
		'Dapto',
		'Oak Flats',
		'Port Kembla',
		'Unanderra',
		'Corrimal'
	];

	const services = [
		{
			title: 'Commercial Refrigeration & Condenser Services',
			text: 'Installation, repairs and planned maintenance for cool rooms, freezers, rooftop units and commercial condensers, including fan motors, coil cleaning and pressure diagnostics.',
			label: 'Image placeholder: condenser units'
		},
		{
			title: 'Evaporator, Cool Room & Freezer Repairs',
			text: 'Cool room, freezer and air conditioning evaporator support that improves airflow, temperature consistency, stock protection and long-term system reliability.',
			label: 'Image placeholder: evaporator servicing'
		},
		{
			title: 'Air Conditioning Installation & Repairs',
			text: 'Split and ducted air conditioning supply, installation, HVAC fault finding and preventative servicing for homes, offices and light commercial properties.',
			label: 'Image placeholder: air conditioning work'
		}
	];

	const recentWork = [
		'Commercial cool room fit-out',
		'Condenser replacement',
		'Split system installation',
		'Preventative maintenance program',
		'Urgent breakdown repair',
		'Evaporator performance upgrade'
	];

	const testimonials = [
		{
			quote:
				'Our cool room failed during business hours and the team got us back up quickly. Honest advice, fair pricing and excellent workmanship.',
			name: 'Ben',
			location: 'Albion Park'
		},
		{
			quote:
				'Fast response, professional technicians and everything explained in plain language. Exactly the kind of service you want in an emergency.',
			name: 'Sarah',
			location: 'Wollongong'
		},
		{
			quote:
				'We now use AllCare for routine servicing across all sites. Reliable, punctual and easy to work with.',
			name: 'David',
			location: 'Shellharbour'
		}
	];

	const faqs = [
		{
			question: 'Do you service both refrigeration and air conditioning systems?',
			answer:
				'Yes. AllCare Refrigeration works on commercial refrigeration, cool rooms, freezers, condensers, evaporators, split systems and ducted air conditioning across the Illawarra.'
		},
		{
			question: 'Which areas do you cover?',
			answer:
				'We are based at 157 Church St, Albion Park NSW 2527 and support customers across Albion Park, Wollongong, Shellharbour, Kiama, Dapto and surrounding Illawarra NSW suburbs.'
		},
		{
			question: 'Can you help with urgent breakdowns?',
			answer:
				'Call 0411 532 233 if a refrigeration or air conditioning fault is affecting comfort, stock or trade. We will talk through the issue and help with the next practical step.'
		}
	];

	const localBusinessJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['LocalBusiness', 'HVACBusiness'],
				'@id': 'https://allcarerefrigeration.com.au/#business',
				name: 'AllCare Refrigeration',
				url: 'https://allcarerefrigeration.com.au/',
				telephone: '+61411532233',
				address: {
					'@type': 'PostalAddress',
					streetAddress: '157 Church St',
					addressLocality: 'Albion Park',
					addressRegion: 'NSW',
					postalCode: '2527',
					addressCountry: 'AU'
				},
				areaServed: [
					{
						'@type': 'AdministrativeArea',
						name: 'Illawarra NSW'
					},
					...serviceAreas.map((area) => ({
						'@type': 'City',
						name: `${area} NSW`
					}))
				],
				openingHoursSpecification: [
					{
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
						opens: '08:00',
						closes: '17:00'
					}
				],
				priceRange: '$$',
				description:
					'Refrigeration, air conditioning and HVAC repairs, installations and maintenance for homes, businesses and commercial sites across Illawarra NSW.',
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Refrigeration and air conditioning services',
					itemListElement: services.map((service) => ({
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: service.title,
							description: service.text,
							areaServed: 'Illawarra NSW'
						}
					}))
				}
			},
			{
				'@type': 'FAQPage',
				'@id': 'https://allcarerefrigeration.com.au/#faq',
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: faq.answer
					}
				}))
			}
		]
	});
</script>

<!-- HERO ------------------------------------------------------------- -->
<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-bg" aria-hidden="true">
		<span class="hero-bg__layer hero-bg__layer--1" data-parallax="0.18"></span>
		<span class="hero-bg__layer hero-bg__layer--2" data-parallax="0.32"></span>
		<span class="hero-bg__grid"></span>
	</div>

	<div class="section-inner section-inner--wide hero-grid">
		<div class="hero-visual">
			<div class="hero-cutout">
				<SiteImageSlot
					placeholderKey="home:hero"
					ariaLabel="Image placeholder for a refrigeration technician working on a commercial system"
					edit={data.edit}
					imageUrl={data.imageMap['home:hero']}
					wrapperClass="image-placeholder hero-cutout-slot"
				>
					{#snippet children()}
						<span>Hero Image Placeholder</span>
						<small>Upload a cutout PNG of your technician (transparent background) for best results</small>
					{/snippet}
				</SiteImageSlot>
			</div>

			<div class="hero-card hero-card--badge" aria-hidden="true">
				<span class="hero-card__icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 2v6" />
						<path d="M12 16v6" />
						<path d="m4.93 4.93 4.24 4.24" />
						<path d="m14.83 14.83 4.24 4.24" />
						<path d="M2 12h6" />
						<path d="M16 12h6" />
						<path d="m4.93 19.07 4.24-4.24" />
						<path d="m14.83 9.17 4.24-4.24" />
					</svg>
				</span>
				<div>
					<strong>Rapid response</strong>
					<small>Same-day diagnostics</small>
				</div>
			</div>

			<div class="hero-card hero-card--rating" aria-hidden="true">
				<div class="hero-card__stars">★★★★★</div>
				<small>Trusted across Illawarra</small>
			</div>
		</div>

		<div class="hero-copy">
			<p class="hero-kicker reveal reveal--up">
				<span class="dot pulse-ring"></span>
				Local refrigeration, HVAC & air conditioning · Illawarra NSW
			</p>
			<h1 id="hero-heading" class="reveal reveal--up">
				Refrigeration and air conditioning service for
				<span class="hero-highlight">Albion Park</span>
				and the Illawarra.
			</h1>
			<p class="hero-lead reveal reveal--up">
				AllCare Refrigeration helps local homes, shops, cafes, offices and commercial sites with
				HVAC repairs, refrigeration installations, preventative servicing and urgent breakdown
				support delivered with clear communication and no hidden surprises.
			</p>

			<div class="hero-actions reveal reveal--up" aria-label="Primary actions">
				<a class="btn-primary" href="#contact">
					<span>Request a Callback</span>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.4"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M5 12h14" />
						<path d="m13 5 7 7-7 7" />
					</svg>
				</a>
				<a class="btn-ghost" href={resolve('/services')}>View Services</a>
			</div>

			<ul
				class="trust-list reveal reveal--up"
				aria-label="Why customers choose AllCare Refrigeration"
				data-stagger
			>
				{#each trustHighlights as highlight, i (highlight)}
					<li class="reveal reveal--up" style="--i: {i}">{highlight}</li>
				{/each}
			</ul>

			<div class="hero-stats" data-stagger>
				{#each stats as stat, i (stat.label)}
					<div class="hero-stat reveal reveal--up" style="--i: {i}">
						<strong>{stat.value}</strong>
						<span>{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ABOUT ------------------------------------------------------------ -->
<section class="about-section section-shell" aria-labelledby="about-heading">
	<div class="section-inner section-inner--wide about-grid">
		<div class="about-copy">
			<p class="eyebrow reveal reveal--up">Who Are We?</p>
			<h2 id="about-heading" class="reveal reveal--up">
				A full-service refrigeration and air conditioning team
				<span class="text-gradient">based in Albion Park.</span>
			</h2>
			<p class="reveal reveal--up">
				From condenser faults and evaporator maintenance to cool room repairs and complete air
				conditioning installations, we handle each job end-to-end. We diagnose issues properly,
				explain options clearly and focus on quality workmanship that lasts.
			</p>
			<p class="reveal reveal--up">
				Whether you manage a commercial site in Wollongong, need dependable support at home in
				Shellharbour or operate a business elsewhere in the Illawarra, our goal is simple: restore
				comfort, protect stock and keep your equipment running efficiently.
			</p>
		</div>
		<div class="about-visual reveal reveal--scale" data-parallax="0.05">
			<SiteImageSlot
				placeholderKey="home:about"
				ariaLabel="Image placeholder for the AllCare Refrigeration team or service vehicle"
				edit={data.edit}
				imageUrl={data.imageMap['home:about']}
				wrapperClass="image-placeholder"
			>
				{#snippet children()}
					<span>About Image Placeholder</span>
					<small>Replace with team, van or workshop photo</small>
				{/snippet}
			</SiteImageSlot>
		</div>
	</div>
</section>

<!-- SERVICES --------------------------------------------------------- -->
<section class="services-section section-shell" aria-labelledby="services-heading">
	<div class="section-inner section-inner--wide">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">How can we help you?</p>
			<h2 id="services-heading" class="reveal reveal--up">
				HVAC, refrigeration and air conditioning services for local properties
			</h2>
			<p class="reveal reveal--up">
				Get practical support for the equipment that matters most, from urgent refrigeration faults
				and air conditioning repairs through to planned servicing that reduces downtime.
			</p>
		</header>

		<div class="service-grid" data-stagger>
			{#each services as service, idx (service.title)}
				<article class="service-card reveal reveal--up" style="--i: {idx}">
					<div class="service-card__media">
						<SiteImageSlot
							placeholderKey={`home:service:${idx}`}
							ariaLabel={service.label}
							edit={data.edit}
							imageUrl={data.imageMap[`home:service:${idx}`]}
							wrapperClass="image-placeholder card-placeholder"
						>
							{#snippet children()}
								<span>{service.title} Image</span>
							{/snippet}
						</SiteImageSlot>
					</div>
					<div class="service-card__body">
						<span class="service-card__num">0{idx + 1}</span>
						<h3>{service.title}</h3>
						<p>{service.text}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- SERVICE AREAS ---------------------------------------------------- -->
<section class="areas-section section-shell" aria-labelledby="service-areas-heading">
	<div class="section-inner section-inner--wide">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">Service Areas</p>
			<h2 id="service-areas-heading" class="reveal reveal--up">
				Refrigeration and air conditioning support
				<span class="text-gradient">across Illawarra NSW</span>
			</h2>
			<p class="reveal reveal--up">
				Based in Albion Park, AllCare Refrigeration services nearby homes, businesses and commercial
				sites across Wollongong, Shellharbour, Kiama and the wider Illawarra region.
			</p>
		</header>

		<ul class="area-grid reveal reveal--up" aria-label="Illawarra service areas" data-stagger>
			{#each serviceAreas as area, i (area)}
				<li class="area-pill reveal reveal--up" style="--i: {i}">
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
					{area}
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- EMERGENCY -------------------------------------------------------- -->
<section class="emergency-section section-shell" aria-labelledby="emergency-heading">
	<div class="emergency-bg" aria-hidden="true">
		<span class="emergency-bg__layer" data-parallax="0.18"></span>
	</div>
	<div class="section-inner section-inner--wide emergency-grid">
		<div class="emergency-copy">
			<p class="eyebrow eyebrow--on-dark reveal reveal--up">Emergency Support</p>
			<h2 id="emergency-heading" class="reveal reveal--up">
				Have an urgent refrigeration or air conditioning problem?
			</h2>
			<p class="reveal reveal--up">
				When a system failure threatens comfort, stock or trade, call AllCare Refrigeration for
				rapid-response support, clear advice and practical next steps from a local Illawarra team.
			</p>
			<a class="btn-emergency reveal reveal--up" href="tel:0411532233">
				<span class="btn-emergency__pulse pulse-ring" aria-hidden="true"></span>
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
				<span class="btn-emergency__copy">
					<small>Call us now</small>
					<strong>0411 532 233</strong>
				</span>
			</a>
		</div>
		<div class="emergency-visual reveal reveal--scale" data-parallax="0.04">
			<SiteImageSlot
				placeholderKey="home:emergency"
				ariaLabel="Image placeholder for urgent refrigeration repair support"
				edit={data.edit}
				imageUrl={data.imageMap['home:emergency']}
				wrapperClass="image-placeholder emergency-placeholder"
			>
				{#snippet children()}
					<span>Emergency Image Placeholder</span>
					<small>Replace with after-hours repair or response vehicle photo</small>
				{/snippet}
			</SiteImageSlot>
		</div>
	</div>
</section>

<!-- TESTIMONIALS ----------------------------------------------------- -->
<section class="testimonials-section section-shell" aria-labelledby="testimonials-heading">
	<div class="section-inner section-inner--wide">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">Testimonials & Recent Work</p>
			<h2 id="testimonials-heading" class="reveal reveal--up">
				Trusted by local homes and businesses across the Illawarra
			</h2>
		</header>

		<div class="proof-grid">
			<div class="testimonial-grid" data-stagger>
				{#each testimonials as testimonial, i (testimonial.name)}
					<blockquote class="testimonial reveal reveal--up" style="--i: {i}">
						<svg
							class="testimonial__quote"
							aria-hidden="true"
							viewBox="0 0 32 32"
							fill="currentColor"
						>
							<path
								d="M9.5 8.5c-3.6 0-6.5 2.9-6.5 6.5 0 3.6 2.9 6.5 6.5 6.5 0 3.3-2.7 6-6 6V30c5.5 0 10-4.5 10-10V15c0-3.6-2.9-6.5-6.5-6.5zm13 0c-3.6 0-6.5 2.9-6.5 6.5 0 3.6 2.9 6.5 6.5 6.5 0 3.3-2.7 6-6 6V30c5.5 0 10-4.5 10-10V15c0-3.6-2.9-6.5-6.5-6.5z"
							/>
						</svg>
						<p>"{testimonial.quote}"</p>
						<footer>
							<span class="testimonial__avatar" aria-hidden="true">
								{testimonial.name.charAt(0)}
							</span>
							<cite>
								<strong>{testimonial.name}</strong>
								<small>{testimonial.location}</small>
							</cite>
						</footer>
					</blockquote>
				{/each}
			</div>

			<aside class="recent-work reveal reveal--up" aria-labelledby="recent-work-heading">
				<SiteImageSlot
					placeholderKey="home:recent-work"
					ariaLabel="Image placeholder for a recent completed refrigeration project"
					edit={data.edit}
					imageUrl={data.imageMap['home:recent-work']}
					wrapperClass="image-placeholder recent-placeholder"
				>
					{#snippet children()}
						<span>Recent Work Image Placeholder</span>
					{/snippet}
				</SiteImageSlot>
				<div class="recent-work__body">
					<h3 id="recent-work-heading">Recent work highlights</h3>
					<ul>
						{#each recentWork.slice(0, 4) as item (item)}
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
				</div>
			</aside>
		</div>
	</div>
</section>

<!-- FAQ -------------------------------------------------------------- -->
<section class="faq-section section-shell" aria-labelledby="faq-heading">
	<div class="section-inner section-inner--narrow">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">Frequently Asked Questions</p>
			<h2 id="faq-heading" class="reveal reveal--up">
				Common questions about our refrigeration and HVAC services
			</h2>
			<p class="reveal reveal--up">
				Planning a service visit or dealing with a breakdown? These answers cover the basics for
				local customers across Albion Park and Illawarra NSW.
			</p>
		</header>

		<div class="faq-grid" data-stagger>
			{#each faqs as faq, i (faq.question)}
				<details class="faq-item reveal reveal--up" style="--i: {i}">
					<summary>
						<span>{faq.question}</span>
						<span class="faq-item__icon" aria-hidden="true"></span>
					</summary>
					<p>{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<!-- GALLERY ---------------------------------------------------------- -->
<section class="gallery-section section-shell" aria-labelledby="gallery-heading">
	<div class="section-inner section-inner--wide">
		<header class="section-intro">
			<p class="eyebrow reveal reveal--up">Gallery & Work</p>
			<h2 id="gallery-heading" class="reveal reveal--up">Recent Work</h2>
		</header>

		<div class="gallery-grid" data-stagger>
			{#each recentWork as item, idx (item)}
				<article class="gallery-item reveal reveal--up" style="--i: {idx}">
					<SiteImageSlot
						placeholderKey={`home:gallery:${idx}`}
						ariaLabel={`Image placeholder for ${item.toLowerCase()}`}
						edit={data.edit}
						imageUrl={data.imageMap[`home:gallery:${idx}`]}
						wrapperClass="image-placeholder gallery-placeholder"
					>
						{#snippet children()}
							<span>{item}</span>
							<small>Replace with project image</small>
						{/snippet}
					</SiteImageSlot>
					<span class="gallery-item__caption">{item}</span>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- CONTACT ---------------------------------------------------------- -->
<section class="contact-section section-shell" id="contact" aria-labelledby="contact-heading">
	<div class="section-inner section-inner--wide">
		<div class="contact-panel">
			<div class="contact-bg" aria-hidden="true">
				<span data-parallax="0.1"></span>
			</div>
			<div class="contact-copy reveal reveal--up">
				<p class="eyebrow eyebrow--on-dark">Contact AllCare Refrigeration</p>
				<h2 id="contact-heading">We're here to help. Call us today.</h2>
				<p>
					Tell us what is happening with your refrigeration or air conditioning system and we will
					help you choose the next practical step.
				</p>
				<a class="btn-primary btn-primary--light" href="tel:0411532233">
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
			<div class="contact-visual reveal reveal--scale" data-parallax="0.04">
				<SiteImageSlot
					placeholderKey="home:contact"
					ariaLabel="Image placeholder for customer support or booking contact"
					edit={data.edit}
					imageUrl={data.imageMap['home:contact']}
					wrapperClass="image-placeholder contact-placeholder"
				>
					{#snippet children()}
						<span>Contact Image Placeholder</span>
						<small>Replace with office, technician or phone support photo</small>
					{/snippet}
				</SiteImageSlot>
			</div>
		</div>

		<div class="contact-grid" data-stagger>
			<div class="contact-card reveal reveal--up">
				<span class="contact-card__icon">
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
				</span>
				<h3>Address</h3>
				<p>157 Church St, Albion Park NSW 2527, Australia</p>
			</div>
			<div class="contact-card reveal reveal--up">
				<span class="contact-card__icon">
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
				</span>
				<h3>Call Us</h3>
				<p><a href="tel:0411532233">0411 532 233</a></p>
			</div>
			<div class="contact-card reveal reveal--up">
				<span class="contact-card__icon">
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
				</span>
				<h3>Operating Hours</h3>
				<p>Monday - Saturday<br />8:00 a.m - 5:00 p.m</p>
			</div>
		</div>
	</div>
</section>

<style>
	/* ============================================================
	 *  Generic typography & helpers
	 * ============================================================ */
	h1,
	h2,
	h3 {
		margin: 0;
		color: var(--color-ink);
	}

	h1 {
		font-size: clamp(2.4rem, 5.6vw, 4.6rem);
		line-height: 1;
		letter-spacing: -0.045em;
	}

	h2 {
		font-size: clamp(1.85rem, 3.6vw, 3.05rem);
		line-height: 1.08;
		letter-spacing: -0.035em;
	}

	h3 {
		font-size: 1.12rem;
		line-height: 1.3;
	}

	p {
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0 0 1rem;
	}

	.section-intro {
		max-width: 52rem;
		margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
		text-align: center;
		display: grid;
		gap: 0.6rem;
		justify-items: center;
	}

	.section-intro p {
		margin: 0;
		max-width: 44rem;
	}

	/* ============================================================
	 *  HERO
	 * ============================================================ */
	.hero {
		position: relative;
		isolation: isolate;
		padding-block: clamp(3rem, 7vw, 6rem) 0;
		overflow: clip;
		color: #ffffff;
		background:
			radial-gradient(ellipse 90% 70% at 12% 88%, rgba(4, 28, 100, 0.5), transparent 52%),
			radial-gradient(circle at 88% 14%, rgba(255, 255, 255, 0.22), transparent 26%),
			linear-gradient(115deg, var(--color-brand-light) 0%, var(--color-brand) 45%, var(--color-brand-deeper) 100%);
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
		top: -10%;
		left: -10%;
		width: 36rem;
		height: 36rem;
		background: radial-gradient(circle, rgba(77, 132, 255, 0.48), transparent 70%);
	}

	.hero-bg__layer--2 {
		top: 30%;
		right: -12%;
		width: 30rem;
		height: 30rem;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.28), transparent 65%);
	}

	.hero-bg__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(circle at 50% 35%, black, transparent 70%);
		-webkit-mask-image: radial-gradient(circle at 50% 35%, black, transparent 70%);
		opacity: 0.5;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(280px, 0.95fr) minmax(0, 1.08fr);
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: end;
		position: relative;
	}

	.hero-copy {
		max-width: 38rem;
		padding-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.hero-kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 0.85rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.28);
		backdrop-filter: blur(6px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.7rem;
		color: #e9f5ff;
		margin: 0;
	}

	.hero-kicker .dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #80efd1;
	}

	.hero h1 {
		margin: 1.2rem 0 0;
		color: #ffffff;
	}

	.hero-highlight {
		color: #e8edff;
		font-weight: 900;
	}

	.hero-lead {
		margin-top: 1.3rem;
		max-width: 56ch;
		font-size: clamp(1rem, 1.5vw, 1.18rem);
		color: rgba(255, 255, 255, 0.92);
	}

	.hero-actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 1.6rem;
	}

	.btn-primary,
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.85rem 1.35rem;
		font-weight: 800;
		text-decoration: none;
		border-radius: 999px;
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring),
			filter 220ms var(--ease-spring);
		cursor: pointer;
	}

	.btn-primary {
		background: #ffffff;
		color: var(--color-brand);
		box-shadow: 0 14px 30px -10px rgba(15, 23, 42, 0.4);
		border-radius: 0.65rem;
	}

	.btn-primary svg {
		width: 1rem;
		height: 1rem;
		transition: transform 220ms var(--ease-spring);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 34px -10px rgba(15, 23, 42, 0.45);
	}

	.btn-primary:hover svg {
		transform: translateX(3px);
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

	.trust-list {
		display: grid;
		gap: 0.55rem;
		margin: 1.6rem 0 0;
		padding: 0;
		list-style: none;
	}

	.trust-list li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: #ffffff;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.trust-list li::before {
		content: '';
		width: 0.6rem;
		height: 0.6rem;
		flex: 0 0 auto;
		border-radius: 999px;
		background: #ffffff;
		box-shadow: 0 0 0 0.35rem rgba(255, 255, 255, 0.2);
	}

	/* Hero cutout + floating cards */
	.hero-visual {
		position: relative;
		min-height: clamp(24rem, 44vw, 40rem);
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.hero-cutout {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		min-height: clamp(18rem, 42vw, 34rem);
	}

	.hero-card {
		position: absolute;
		z-index: 2;
		transition: transform 320ms var(--ease-spring);
	}

	.hero-card--badge {
		left: -1rem;
		bottom: 2rem;
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
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
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

	.hero-card--rating {
		right: -1rem;
		top: 1.5rem;
		padding: 0.85rem 1rem;
		background: rgba(255, 255, 255, 0.96);
		color: var(--color-brand-deeper);
		border-radius: 1rem;
		box-shadow: 0 22px 40px -18px rgba(15, 23, 42, 0.35);
		text-align: center;
	}

	.hero-card__stars {
		color: #f5b400;
		font-size: 1.05rem;
		letter-spacing: 0.1em;
	}

	.hero-card--rating small {
		display: block;
		color: var(--color-ink-soft);
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 0.25rem;
	}

	.hero-stats {
		margin-top: clamp(1.75rem, 3vw, 2.25rem);
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.hero-stat {
		padding: 0.9rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.22);
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(8px);
		border-radius: var(--radius-md);
		color: #ffffff;
		display: grid;
		gap: 0.2rem;
	}

	.hero-stat strong {
		font-size: clamp(1.4rem, 2.4vw, 2rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.hero-stat span {
		color: rgba(255, 255, 255, 0.85);
		font-weight: 600;
		font-size: 0.82rem;
	}

	/* ============================================================
	 *  ABOUT
	 * ============================================================ */
	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.about-copy h2 {
		margin-top: 0.6rem;
	}

	.about-copy p {
		max-width: 38rem;
	}

	/* ============================================================
	 *  SERVICES
	 * ============================================================ */
	.service-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.2rem;
	}

	.service-card {
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
		background: linear-gradient(180deg, #ffffff, #f8fbff);
		border: 1px solid var(--color-line);
		border-radius: var(--radius-lg);
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
		overflow: hidden;
	}

	.service-card__media :global(.image-placeholder) {
		min-height: 14rem;
		border-radius: 0;
		border: 0;
		transition: transform 700ms var(--ease-spring);
	}

	.service-card:hover .service-card__media :global(.image-placeholder) {
		transform: scale(1.04);
	}

	.service-card__body {
		padding: 1.4rem 1.4rem 1.6rem;
		display: grid;
		gap: 0.55rem;
		position: relative;
	}

	.service-card__num {
		position: absolute;
		right: 1.4rem;
		top: 1.2rem;
		font-size: 0.78rem;
		font-weight: 800;
		color: var(--color-brand);
		letter-spacing: 0.12em;
	}

	.service-card h3 {
		font-size: 1.18rem;
		padding-right: 2.5rem;
	}

	.service-card p {
		margin: 0;
	}

	/* ============================================================
	 *  SERVICE AREAS
	 * ============================================================ */
	.area-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin: 0;
		padding: 0;
		list-style: none;
		justify-content: center;
	}

	.area-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.6rem 0.95rem;
		background: #ffffff;
		border: 1px solid var(--color-line);
		border-radius: 999px;
		color: var(--color-ink);
		font-weight: 700;
		font-size: 0.9rem;
		box-shadow: 0 4px 14px -8px rgba(4, 45, 122, 0.18);
		transition:
			transform 220ms var(--ease-spring),
			border-color 220ms var(--ease-spring),
			background 220ms var(--ease-spring),
			color 220ms var(--ease-spring);
	}

	.area-pill svg {
		width: 0.95rem;
		height: 0.95rem;
		color: var(--color-brand);
		transition: color 220ms var(--ease-spring);
	}

	.area-pill:hover {
		transform: translateY(-3px);
		border-color: rgba(15, 87, 251, 0.5);
		background: linear-gradient(135deg, #ffffff, #eef7ff);
		color: var(--color-brand-deeper);
	}

	.area-pill:hover svg {
		color: var(--color-brand-deeper);
	}

	/* ============================================================
	 *  EMERGENCY
	 * ============================================================ */
	.emergency-section {
		position: relative;
		isolation: isolate;
		overflow: hidden;
	}

	.emergency-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: var(--radius-xl);
		margin: 0 clamp(1rem, 4vw, 2.75rem);
		background:
			radial-gradient(ellipse at 90% 20%, rgba(77, 132, 255, 0.38), transparent 60%),
			linear-gradient(135deg, var(--color-brand-deeper), var(--color-brand) 60%, var(--color-brand-night));
		box-shadow: 0 32px 80px -28px rgba(15, 23, 42, 0.5);
	}

	.emergency-bg__layer {
		position: absolute;
		inset: 0;
		background:
			repeating-linear-gradient(
				45deg,
				rgba(255, 255, 255, 0.05) 0 12px,
				transparent 12px 24px
			);
		opacity: 0.6;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.emergency-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem);
		color: #ffffff;
	}

	.emergency-copy h2,
	.emergency-copy p {
		color: #ffffff;
	}

	.emergency-copy p {
		max-width: 50ch;
		color: rgba(255, 255, 255, 0.85);
	}

	.emergency-copy h2 {
		margin-top: 0.6rem;
	}

	.btn-emergency {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		margin-top: 1.4rem;
		padding: 1rem 1.4rem;
		background: #ffffff;
		color: var(--color-brand-deeper);
		text-decoration: none;
		border-radius: 999px;
		box-shadow: 0 22px 50px -18px rgba(255, 255, 255, 0.45);
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring);
	}

	.btn-emergency:hover {
		transform: translateY(-2px);
		box-shadow: 0 26px 56px -18px rgba(255, 255, 255, 0.55);
	}

	.btn-emergency svg {
		width: 1.25rem;
		height: 1.25rem;
		color: #ffffff;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		padding: 0.55rem;
		border-radius: 999px;
		box-sizing: content-box;
	}

	.btn-emergency__copy {
		display: grid;
		line-height: 1.1;
	}

	.btn-emergency__copy small {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
	}

	.btn-emergency__copy strong {
		font-weight: 900;
		font-size: 1.15rem;
	}

	.btn-emergency__pulse {
		position: absolute;
		left: 0.85rem;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 999px;
		background: rgba(15, 87, 251, 0.5);
		pointer-events: none;
	}

	.emergency-visual :global(.image-placeholder) {
		min-height: 22rem;
	}

	/* ============================================================
	 *  TESTIMONIALS
	 * ============================================================ */
	.proof-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
		gap: 1.3rem;
		align-items: stretch;
	}

	.testimonial-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.testimonial {
		position: relative;
		margin: 0;
		padding: 1.6rem 1.6rem 1.4rem;
		background: linear-gradient(180deg, #ffffff, #f8fbff);
		border: 1px solid var(--color-line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-soft);
		display: grid;
		gap: 0.85rem;
		transition:
			transform 320ms var(--ease-spring),
			box-shadow 320ms var(--ease-spring);
	}

	.testimonial:hover {
		transform: translateY(-3px);
		box-shadow: 0 24px 52px -22px rgba(4, 45, 122, 0.28);
	}

	.testimonial__quote {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-brand);
		opacity: 0.6;
	}

	.testimonial p {
		margin: 0;
		font-size: 1.02rem;
		color: var(--color-ink);
		line-height: 1.6;
	}

	.testimonial footer {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.testimonial__avatar {
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 999px;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		color: #ffffff;
		font-weight: 900;
		font-size: 0.95rem;
	}

	.testimonial cite {
		display: grid;
		font-style: normal;
		line-height: 1.15;
	}

	.testimonial cite strong {
		font-weight: 800;
		color: var(--color-ink);
	}

	.testimonial cite small {
		color: var(--color-ink-soft);
		font-size: 0.82rem;
	}

	.recent-work {
		display: grid;
		gap: 0;
		align-content: start;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-lg);
		background: #ffffff;
		overflow: hidden;
		box-shadow: var(--shadow-soft);
	}

	.recent-work__body {
		padding: 1.2rem 1.4rem 1.4rem;
	}

	.recent-work h3 {
		margin: 0 0 0.7rem;
	}

	.recent-work ul {
		display: grid;
		gap: 0.55rem;
		margin: 0;
		padding: 0;
		list-style: none;
		color: var(--color-ink);
	}

	.recent-work li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		font-size: 0.95rem;
	}

	.recent-work li svg {
		width: 1rem;
		height: 1rem;
		flex: 0 0 auto;
		padding: 0.2rem;
		background: rgba(15, 87, 251, 0.16);
		border-radius: 999px;
		color: var(--color-brand-deep);
	}

	/* ============================================================
	 *  FAQ
	 * ============================================================ */
	.faq-grid {
		display: grid;
		gap: 0.8rem;
	}

	.faq-item {
		border: 1px solid var(--color-line);
		border-radius: var(--radius-md);
		background: #ffffff;
		padding: 1.1rem 1.25rem;
		box-shadow: 0 4px 16px -10px rgba(4, 45, 122, 0.18);
		transition:
			border-color 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring);
	}

	.faq-item[open] {
		border-color: rgba(15, 87, 251, 0.45);
		box-shadow: 0 14px 30px -16px rgba(4, 45, 122, 0.28);
	}

	.faq-item summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		list-style: none;
		cursor: pointer;
		color: var(--color-ink);
		font-weight: 800;
	}

	.faq-item summary::-webkit-details-marker {
		display: none;
	}

	.faq-item__icon {
		position: relative;
		flex: 0 0 auto;
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 999px;
		background: rgba(15, 87, 251, 0.16);
		transition: transform 280ms var(--ease-spring);
	}

	.faq-item__icon::before,
	.faq-item__icon::after {
		content: '';
		position: absolute;
		background: var(--color-brand-deep);
		border-radius: 2px;
		transition: transform 280ms var(--ease-spring);
	}

	.faq-item__icon::before {
		inset: 50% 25% auto;
		height: 2px;
		transform: translateY(-50%);
	}

	.faq-item__icon::after {
		inset: 25% 50% auto;
		width: 2px;
		transform: translateX(-50%);
	}

	.faq-item[open] .faq-item__icon {
		transform: rotate(180deg);
	}

	.faq-item[open] .faq-item__icon::after {
		transform: translateX(-50%) scaleY(0);
	}

	.faq-item p {
		margin: 0.8rem 0 0;
	}

	/* ============================================================
	 *  GALLERY
	 * ============================================================ */
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.gallery-item {
		position: relative;
		display: grid;
		min-width: 0;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-soft);
		transition:
			transform 320ms var(--ease-spring),
			box-shadow 320ms var(--ease-spring);
	}

	.gallery-item:hover {
		transform: translateY(-4px);
		box-shadow: 0 28px 56px -22px rgba(4, 45, 122, 0.3);
	}

	.gallery-item :global(.image-placeholder) {
		min-height: 16rem;
		border: 0;
	}

	.gallery-item__caption {
		position: absolute;
		left: 0.85rem;
		bottom: 0.85rem;
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.65);
		color: #ffffff;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		backdrop-filter: blur(6px);
	}

	/* ============================================================
	 *  CONTACT
	 * ============================================================ */
	.contact-panel {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(circle at 80% 20%, rgba(77, 132, 255, 0.32), transparent 60%),
			linear-gradient(135deg, var(--color-brand-deeper), var(--color-brand) 60%, var(--color-brand-light));
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
		background:
			repeating-linear-gradient(
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
		color: rgba(255, 255, 255, 0.85);
		max-width: 50ch;
	}

	.btn-primary--light {
		background: #ffffff;
		color: var(--color-brand-deeper);
		margin-top: 0.4rem;
		box-shadow: 0 18px 40px -14px rgba(0, 0, 0, 0.45);
	}

	.btn-primary--light svg {
		width: 1.05rem;
		height: 1.05rem;
	}

	.contact-visual :global(.image-placeholder) {
		min-height: 20rem;
		border-radius: var(--radius-lg);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(232, 245, 255, 0.78)),
			repeating-linear-gradient(
				-45deg,
				rgba(15, 87, 251, 0.16) 0 14px,
				rgba(255, 255, 255, 0.24) 14px 28px
			);
	}

	.contact-grid {
		margin-top: clamp(1.5rem, 3vw, 2rem);
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.contact-card {
		padding: 1.25rem 1.4rem;
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

	.contact-card h3 {
		font-size: 0.95rem;
		font-weight: 800;
	}

	.contact-card p {
		margin: 0;
		color: var(--color-ink-soft);
		line-height: 1.5;
	}

	.contact-card a {
		color: var(--color-brand-deeper);
		text-decoration: none;
		font-weight: 800;
	}

	.contact-card a:hover {
		text-decoration: underline;
	}

	/* ============================================================
	 *  Image placeholders (shared)
	 * ============================================================ */
	:global(.site-image-slot.image-placeholder) {
		position: relative;
		display: grid;
		min-height: 16rem;
		place-items: center;
		overflow: hidden;
		border: 1px solid rgba(15, 87, 251, 0.28);
		border-radius: var(--radius-lg);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(217, 231, 244, 0.72)),
			repeating-linear-gradient(
				-45deg,
				rgba(15, 87, 251, 0.16) 0 12px,
				rgba(255, 255, 255, 0.24) 12px 24px
			);
		color: var(--color-ink);
		text-align: center;
	}

	:global(.site-image-slot.image-placeholder) :global(span),
	:global(.site-image-slot.image-placeholder) :global(small) {
		position: relative;
		z-index: 1;
		display: block;
		max-width: 18rem;
		padding-inline: 1rem;
	}

	:global(.site-image-slot.image-placeholder) :global(span) {
		font-weight: 800;
	}

	:global(.site-image-slot.image-placeholder) :global(small) {
		margin-top: 0.4rem;
		color: var(--color-ink-soft);
	}

	:global(.site-image-slot.hero-cutout-slot) {
		position: relative;
		width: 100%;
		max-width: 36rem;
		min-height: clamp(16rem, 40vw, 30rem);
		margin-inline: 0 auto;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 0;
		overflow: visible;
		border: none;
		border-radius: 0;
		background: transparent !important;
		box-shadow: none;
	}

	:global(.site-image-slot.hero-cutout-slot:not(.site-image-slot--has-image)) {
		border: 2px dashed rgba(255, 255, 255, 0.38);
		border-radius: 14px;
		min-height: clamp(14rem, 36vw, 22rem);
		color: #ffffff;
		align-items: center;
	}

	:global(.site-image-slot.hero-cutout-slot.site-image-slot--has-image) {
		border: 0 solid transparent !important;
		box-shadow: none !important;
		background: transparent !important;
		min-height: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	/* Edit mode uses <button>: ensure no UA / component border shows as a white frame */
	:global(button.site-image-slot.hero-cutout-slot.site-image-slot--has-image) {
		border-style: none !important;
	}

	:global(.site-image-slot.hero-cutout-slot .site-image-slot__placeholder-inner) {
		padding: 1.5rem 1rem;
	}

	:global(.site-image-slot.hero-cutout-slot:not(.site-image-slot--has-image) small) {
		color: rgba(255, 255, 255, 0.85);
	}

	:global(.site-image-slot.hero-cutout-slot .site-image-slot__img) {
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: min(85vh, 100%);
		min-height: 0;
		object-fit: contain;
		object-position: bottom left;
		display: block;
		border: 0;
		box-shadow: none;
		outline: none;
	}

	/* ============================================================
	 *  Responsive
	 * ============================================================ */
	@media (max-width: 1100px) {
		.about-grid,
		.emergency-grid,
		.contact-panel {
			grid-template-columns: 1fr;
		}

		.proof-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 1100px) {
		.hero-grid {
			grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.15fr);
			gap: clamp(1.5rem, 3vw, 2.5rem);
		}

		.hero-stats {
			gap: 0.5rem;
		}

		.hero-stat {
			padding: 0.75rem 0.85rem;
		}

		.hero-card--badge {
			left: -0.5rem;
		}

		.hero-card--rating {
			right: -0.5rem;
		}
	}

	@media (max-width: 880px) {
		.hero-grid {
			grid-template-columns: 1fr;
			align-items: stretch;
		}

		.hero-copy {
			padding-bottom: 0;
			order: 1;
		}

		.hero-visual {
			min-height: 24rem;
			max-width: 36rem;
			margin-inline: auto;
			width: 100%;
			align-self: center;
			order: 2;
		}

		.hero-cutout {
			justify-content: center;
		}

		.hero-card--badge {
			left: 0.5rem;
		}

		.hero-card--rating {
			right: 0.5rem;
		}

		:global(.site-image-slot.hero-cutout-slot) {
			min-height: clamp(14rem, 50vw, 24rem);
			max-width: 28rem;
			margin-inline: auto;
		}

		:global(.site-image-slot.hero-cutout-slot .site-image-slot__img) {
			object-position: bottom center;
		}
	}

	@media (max-width: 820px) {
		.service-grid,
		.gallery-grid,
		.contact-grid,
		.hero-stats {
			grid-template-columns: 1fr;
		}

		.testimonial-grid {
			grid-template-columns: 1fr;
		}

		.emergency-bg {
			margin-inline: 1rem;
			border-radius: var(--radius-lg);
		}
	}

	@media (max-width: 560px) {
		.btn-primary,
		.btn-ghost {
			width: 100%;
			justify-content: center;
		}

		.hero-card--badge,
		.hero-card--rating {
			position: static;
			margin-top: 0.6rem;
			width: 100%;
			justify-content: flex-start;
		}

		.hero-visual {
			min-height: auto;
			max-width: 100%;
		}

		.hero-cutout {
			position: relative;
			inset: auto;
			min-height: auto;
			justify-content: center;
		}

		:global(.site-image-slot.hero-cutout-slot) {
			max-width: 100%;
		}
	}
</style>
