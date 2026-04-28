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
	<meta name="theme-color" content="#62ace8" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="AllCare Refrigeration | HVAC Services Across Illawarra NSW" />
	<meta
		name="twitter:description"
		content="Refrigeration, air conditioning and HVAC service from Albion Park for customers across Wollongong, Shellharbour and the Illawarra."
	/>
	<script type="application/ld+json">{localBusinessJsonLd}</script>
</svelte:head>

<script>
	import { resolve } from '$app/paths';

	const trustHighlights = [
		'Illawarra NSW specialists',
		'Residential and commercial support',
		'Clear advice before work begins'
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
			name: 'Ben, Albion Park'
		},
		{
			quote:
				'Fast response, professional technicians and everything explained in plain language. Exactly the kind of service you want in an emergency.',
			name: 'Sarah, Wollongong'
		},
		{
			quote:
				'We now use AllCare for routine servicing across all sites. Reliable, punctual and easy to work with.',
			name: 'David, Shellharbour'
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

<section class="hero">
	<div class="hero-copy">
		<p class="hero-kicker">Local Refrigeration, HVAC and Air Conditioning in Illawarra NSW</p>
		<h1>Refrigeration and air conditioning service for Albion Park and the Illawarra.</h1>
		<p class="hero-lead">
			AllCare Refrigeration helps local homes, shops, cafes, offices and commercial sites with
			HVAC repairs, refrigeration installations, preventative servicing and urgent breakdown
			support delivered with clear communication and no hidden surprises.
		</p>
		<div class="hero-actions" aria-label="Primary actions">
			<a href="#contact">Request a Callback</a>
			<a class="secondary" href={resolve('/services')}>View Services</a>
		</div>
		<ul class="trust-list" aria-label="Why customers choose AllCare Refrigeration">
			{#each trustHighlights as highlight (highlight)}
				<li>{highlight}</li>
			{/each}
		</ul>
	</div>
	<div
		class="image-placeholder hero-placeholder"
		role="img"
		aria-label="Image placeholder for a refrigeration technician working on a commercial system"
	>
		<span>Hero Image Placeholder</span>
		<small>Replace with technician, vehicle or completed refrigeration project photo</small>
	</div>
</section>

<section class="about">
	<div class="section-copy">
		<p class="section-label">Who Are We?</p>
		<h2>A full-service refrigeration and air conditioning team based in Albion Park.</h2>
		<p>
			From condenser faults and evaporator maintenance to cool room repairs and complete air
			conditioning installations, we handle each job end-to-end. We diagnose issues properly,
			explain options clearly and focus on quality workmanship that lasts.
		</p>
		<p>
			Whether you manage a commercial site in Wollongong, need dependable support at home in
			Shellharbour or operate a business elsewhere in the Illawarra, our goal is simple: restore
			comfort, protect stock and keep your equipment running efficiently.
		</p>
	</div>
	<div
		class="image-placeholder"
		role="img"
		aria-label="Image placeholder for the AllCare Refrigeration team or service vehicle"
	>
		<span>About Image Placeholder</span>
		<small>Replace with team, van or workshop photo</small>
	</div>
</section>

<section class="services">
	<div class="section-intro">
		<p class="section-label">How can we help you?</p>
		<h2>HVAC, refrigeration and air conditioning services for local properties</h2>
		<p>
			Get practical support for the equipment that matters most, from urgent refrigeration faults
			and air conditioning repairs through to planned servicing that reduces downtime.
		</p>
	</div>
	<div class="service-grid">
		{#each services as service (service.title)}
			<article>
				<div class="image-placeholder card-placeholder" role="img" aria-label={service.label}>
					<span>{service.title} Image</span>
				</div>
				<h3>{service.title}</h3>
				<p>{service.text}</p>
			</article>
		{/each}
	</div>
</section>

<section class="service-areas" aria-labelledby="service-areas-heading">
	<div class="section-intro">
		<p class="section-label">Service Areas</p>
		<h2 id="service-areas-heading">Refrigeration and air conditioning support across Illawarra NSW</h2>
		<p>
			Based in Albion Park, AllCare Refrigeration services nearby homes, businesses and
			commercial sites across Wollongong, Shellharbour, Kiama and the wider Illawarra region.
		</p>
	</div>
	<ul class="area-list" aria-label="Illawarra service areas">
		{#each serviceAreas as area (area)}
			<li>{area}</li>
		{/each}
	</ul>
</section>

<section class="emergency">
	<div class="emergency-copy">
		<p class="section-label">Emergency Support</p>
		<h2>Have an urgent refrigeration or air conditioning problem?</h2>
		<p>
			When a system failure threatens comfort, stock or trade, call AllCare Refrigeration for
			rapid-response support, clear advice and practical next steps from a local Illawarra team.
		</p>
		<a href="tel:0411532233">Call 0411 532 233</a>
	</div>
	<div
		class="image-placeholder emergency-placeholder"
		role="img"
		aria-label="Image placeholder for urgent refrigeration repair support"
	>
		<span>Emergency Image Placeholder</span>
		<small>Replace with after-hours repair or response vehicle photo</small>
	</div>
</section>

<section class="testimonials">
	<div class="section-intro">
		<p class="section-label">Testimonials & Recent Work</p>
		<h2>Trusted by local homes and businesses across the Illawarra</h2>
	</div>
	<div class="proof-grid">
		<div class="testimonial-grid">
			{#each testimonials as testimonial (testimonial.name)}
				<blockquote>
					<p>"{testimonial.quote}"</p>
					<cite>- {testimonial.name}</cite>
				</blockquote>
			{/each}
		</div>
		<aside class="recent-work" aria-labelledby="recent-work-heading">
			<div
				class="image-placeholder recent-placeholder"
				role="img"
				aria-label="Image placeholder for a recent completed refrigeration project"
			>
				<span>Recent Work Image Placeholder</span>
			</div>
			<h3 id="recent-work-heading">Recent work highlights</h3>
			<ul>
				{#each recentWork.slice(0, 4) as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</aside>
	</div>
</section>

<section class="faq" aria-labelledby="faq-heading">
	<div class="section-intro">
		<p class="section-label">Frequently Asked Questions</p>
		<h2 id="faq-heading">Common questions about our refrigeration and HVAC services</h2>
		<p>
			Planning a service visit or dealing with a breakdown? These answers cover the basics for
			local customers across Albion Park and Illawarra NSW.
		</p>
	</div>
	<div class="faq-grid">
		{#each faqs as faq (faq.question)}
			<details>
				<summary>{faq.question}</summary>
				<p>{faq.answer}</p>
			</details>
		{/each}
	</div>
</section>

<section class="gallery">
	<div class="section-intro">
		<p class="section-label">Gallery & Work</p>
		<h2>Project examples ready for real photography</h2>
		<p>
			Use these placeholders for finished installations, maintenance visits and before-and-after
			project images when photos are available.
		</p>
	</div>
	<div class="gallery-grid">
		{#each recentWork as item (item)}
			<article>
				<div
					class="image-placeholder gallery-placeholder"
					role="img"
					aria-label={`Image placeholder for ${item.toLowerCase()}`}
				>
					<span>{item}</span>
					<small>Replace with project image</small>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="contact" id="contact">
	<div class="contact-panel">
		<div class="contact-copy">
			<p class="section-label">Contact AllCare Refrigeration</p>
			<h2>We're here to help. Call us today.</h2>
			<p>
				Tell us what is happening with your refrigeration or air conditioning system and we will
				help you choose the next practical step.
			</p>
		</div>
		<div
			class="image-placeholder contact-placeholder"
			role="img"
			aria-label="Image placeholder for customer support or booking contact"
		>
			<span>Contact Image Placeholder</span>
			<small>Replace with office, technician or phone support photo</small>
		</div>
	</div>
	<div class="contact-grid">
		<div>
			<h3>Address</h3>
			<p>157 Church St, Albion Park NSW 2527, Australia</p>
		</div>
		<div>
			<h3>Call Us</h3>
			<p><a href="tel:0411532233">0411 532 233</a></p>
		</div>
		<div>
			<h3>Operating Hours</h3>
			<p>Monday - Saturday: 8:00 a.m - 5:00 p.m</p>
		</div>
	</div>
</section>

<style>
	section {
		background: #ffffff;
		border: 1px solid rgba(98, 172, 232, 0.12);
		border-radius: 24px;
		padding: clamp(1.5rem, 4vw, 3rem);
		box-shadow: 0 18px 45px rgba(15, 23, 42, 0.07);
	}

	section + section {
		margin-top: 1.5rem;
	}

	h1,
	h2,
	h3 {
		margin: 0;
		color: #353c4b;
	}

	h1 {
		font-size: clamp(2.25rem, 6vw, 4.7rem);
		line-height: 0.98;
		letter-spacing: -0.05em;
	}

	h2 {
		font-size: clamp(1.8rem, 3.5vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.035em;
	}

	h3 {
		font-size: 1.08rem;
		line-height: 1.25;
	}

	p {
		line-height: 1.6;
		color: #353c4b;
	}

	a {
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			background 160ms ease;
	}

	a:hover {
		transform: translateY(-1px);
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
		gap: clamp(1.5rem, 4vw, 3.5rem);
		align-items: center;
		overflow: hidden;
		padding: clamp(2rem, 6vw, 4rem);
		background:
			radial-gradient(circle at 84% 18%, rgba(255, 255, 255, 0.32), transparent 24rem),
			linear-gradient(140deg, #62ace8, #3d8fce 58%, #2f75ae);
		color: #ffffff;
	}

	.hero h1,
	.hero p {
		color: #ffffff;
	}

	.hero-copy {
		max-width: 710px;
	}

	.hero-kicker {
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.8rem;
		color: #e9f5ff;
	}

	.hero-lead {
		max-width: 60ch;
		font-size: clamp(1rem, 2vw, 1.18rem);
	}

	.hero-actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 1.6rem;
	}

	.hero-actions a {
		background: #ffffff;
		color: #353c4b;
		box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
		padding: 0.85rem 1.25rem;
		font-weight: 700;
		text-decoration: none;
		border-radius: 999px;
	}

	.hero-actions a.secondary {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: none;
	}

	.trust-list {
		display: grid;
		gap: 0.6rem;
		margin: 1.6rem 0 0;
		padding: 0;
		list-style: none;
	}

	.trust-list li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: #ffffff;
		font-weight: 700;
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

	.about,
	.emergency,
	.contact-panel {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(280px, 0.78fr);
		gap: clamp(1.2rem, 3vw, 2.5rem);
		align-items: center;
	}

	.section-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 700;
		margin-bottom: 0.35rem;
		color: #62ace8;
	}

	.section-intro {
		max-width: 760px;
		margin-bottom: 1.4rem;
	}

	.section-copy p:last-child,
	.section-intro p:last-child,
	.contact-copy p:last-child {
		margin-bottom: 0;
	}

	.image-placeholder {
		position: relative;
		display: grid;
		min-height: 240px;
		place-items: center;
		overflow: hidden;
		border: 1px solid rgba(98, 172, 232, 0.28);
		border-radius: 22px;
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(217, 231, 244, 0.72)),
			repeating-linear-gradient(
				-45deg,
				rgba(98, 172, 232, 0.16) 0,
				rgba(98, 172, 232, 0.16) 12px,
				rgba(255, 255, 255, 0.24) 12px,
				rgba(255, 255, 255, 0.24) 24px
			);
		color: #353c4b;
		text-align: center;
	}

	.image-placeholder::before,
	.image-placeholder::after {
		position: absolute;
		content: '';
		background: rgba(98, 172, 232, 0.24);
	}

	.image-placeholder::before {
		inset: auto 1.5rem 1.5rem auto;
		width: 34%;
		height: 34%;
		border-radius: 999px;
	}

	.image-placeholder::after {
		inset: 1.5rem auto auto 1.5rem;
		width: 38%;
		height: 26%;
		border-radius: 18px;
		transform: rotate(-8deg);
	}

	.image-placeholder span,
	.image-placeholder small {
		position: relative;
		z-index: 1;
		display: block;
		max-width: 18rem;
		padding-inline: 1rem;
	}

	.image-placeholder span {
		font-weight: 800;
	}

	.image-placeholder small {
		margin-top: 0.4rem;
		color: #5d6676;
	}

	.hero-placeholder {
		min-height: 460px;
		border-color: rgba(255, 255, 255, 0.4);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(232, 245, 255, 0.68)),
			repeating-linear-gradient(
				-45deg,
				rgba(255, 255, 255, 0.24) 0,
				rgba(255, 255, 255, 0.24) 14px,
				rgba(53, 60, 75, 0.08) 14px,
				rgba(53, 60, 75, 0.08) 28px
			);
		box-shadow: 0 24px 50px rgba(15, 23, 42, 0.18);
	}

	.service-grid,
	.testimonial-grid,
	.gallery-grid,
	.contact-grid {
		display: grid;
		gap: 0.9rem;
	}

	.service-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.service-grid article,
	blockquote {
		background: linear-gradient(180deg, #ffffff, #f8fbff);
		border: 1px solid #d9e7f4;
		border-radius: 18px;
		padding: 1rem;
	}

	.service-grid article {
		display: grid;
		gap: 1rem;
	}

	.card-placeholder {
		min-height: 175px;
		border-radius: 14px;
	}

	.service-grid h3 {
		margin-bottom: -0.35rem;
	}

	.emergency a {
		display: inline-block;
		margin-top: 0.9rem;
		background: #62ace8;
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
		padding: 0.85rem 1.2rem;
		border-radius: 999px;
		box-shadow: 0 12px 28px rgba(98, 172, 232, 0.28);
	}

	.emergency-placeholder {
		min-height: 280px;
	}

	.proof-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(280px, 0.44fr);
		gap: 1rem;
		align-items: stretch;
	}

	.testimonial-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	blockquote p {
		margin-top: 0;
	}

	cite {
		font-style: normal;
		font-weight: 700;
		color: #62ace8;
	}

	.recent-work {
		display: grid;
		gap: 1rem;
		align-content: start;
		border: 1px solid #d9e7f4;
		border-radius: 18px;
		padding: 1rem;
		background: #f8fbff;
	}

	.recent-work ul {
		display: grid;
		gap: 0.65rem;
		margin: 0;
		padding-left: 1.2rem;
		color: #353c4b;
	}

	.recent-placeholder {
		min-height: 210px;
	}

	.area-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.area-list li {
		border: 1px solid #d9e7f4;
		border-radius: 999px;
		background: #f8fbff;
		color: #353c4b;
		font-weight: 700;
		padding: 0.65rem 0.95rem;
	}

	.faq-grid {
		display: grid;
		gap: 0.85rem;
	}

	.faq details {
		border: 1px solid #d9e7f4;
		border-radius: 16px;
		background: #f8fbff;
		padding: 1rem;
	}

	.faq summary {
		cursor: pointer;
		color: #353c4b;
		font-weight: 800;
	}

	.faq details p {
		margin-bottom: 0;
	}

	.gallery-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.gallery-grid article {
		min-width: 0;
	}

	.gallery-placeholder {
		min-height: 220px;
		border-radius: 18px;
	}

	.contact-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 1rem;
	}

	.contact-grid > div {
		border: 1px solid #d9e7f4;
		border-radius: 16px;
		padding: 1rem;
		background: #f8fbff;
	}

	.contact a {
		color: #62ace8;
		text-decoration: none;
		font-weight: 700;
	}

	@media (max-width: 920px) {
		.hero,
		.about,
		.emergency,
		.proof-grid,
		.contact-panel {
			grid-template-columns: 1fr;
		}

		.hero-placeholder {
			min-height: 340px;
		}
	}

	@media (max-width: 760px) {
		section {
			border-radius: 18px;
		}

		.service-grid,
		.testimonial-grid,
		.gallery-grid,
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.hero {
			padding: 1.5rem;
		}

		.hero-actions a {
			width: 100%;
			text-align: center;
		}

		.image-placeholder {
			min-height: 220px;
		}
	}
</style>
