<svelte:head>
	<title>Services | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Commercial refrigeration and air conditioning services across Illawarra and Southern Highlands, including installs, repairs, maintenance and emergency breakdown support."
	/>
</svelte:head>

<script>
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

<section class="hero">
	<div class="hero-content">
		<p class="kicker">Commercial Refrigeration & Air Conditioning Services</p>
		<h1>Professional refrigeration and air conditioning services for reliable year-round performance.</h1>
		<p class="hero-lead">
			AllCare Refrigeration & Air Conditioning delivers professional service across Illawarra and
			the Southern Highlands, from Helensburgh to Nowra and west to Bowral, Mittagong, Robertson
			and Moss Vale.
		</p>
		<p>
			We specialise in commercial refrigeration systems, condensers, evaporators and air
			conditioning installations for businesses that rely on consistent temperature control and
			system reliability.
		</p>
		<div class="hero-actions" aria-label="Services page actions">
			<a class="primary-link" href="tel:0411532233">Call 041-1532-233</a>
			<a class="secondary-link" href="#core-services">Explore services</a>
		</div>
	</div>
	<div class="hero-panel" aria-label="Service highlights">
		<p>Responsive support for commercial refrigeration and air conditioning</p>
		<div class="hero-stat">
			<strong>24/7</strong>
			<span>Emergency breakdown service</span>
		</div>
		<div class="hero-stat">
			<strong>9</strong>
			<span>Key service area locations</span>
		</div>
	</div>
</section>

<section class="section-card services-section" id="core-services">
	<p class="section-label">How can we help you?</p>
	<h2>Core Services</h2>
	<div class="service-grid">
		{#each services as service (service.title)}
			<article class="service-card">
				<div class="service-image" aria-hidden="true">
					<span>{service.accent}</span>
				</div>
				<div class="service-content">
					<h3>{service.title}</h3>
					<p>{service.summary}</p>
					<ul>
						{#each service.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
					<p class="service-outcome">{service.outcome}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="emergency section-card">
	<div>
		<p class="section-label">Emergency support</p>
		<h2>24/7 Emergency Breakdown Service</h2>
		<p>
			Refrigeration failures can impact stock, safety and business operations. We provide
			responsive emergency breakdown services across:
		</p>
		<ul class="locations" aria-label="Emergency service locations">
			{#each serviceAreas as location (location)}
				<li>{location}</li>
			{/each}
		</ul>
	</div>
	<a class="emergency-call" href="tel:0411532233">
		<span>Call emergency support</span>
		<strong>041-1532-233</strong>
	</a>
</section>

<section class="contact section-card">
	<div class="contact-intro">
		<p class="section-label">Contact AllCare</p>
		<h2>Need reliable refrigeration or air conditioning services?</h2>
		<p>Contact us today.</p>
	</div>
	<div class="contact-grid">
		{#each contactDetails as detail (detail.title)}
			<div class="contact-item">
				<h3>{detail.title}</h3>
				<p>
					{#if detail.title === 'Call Us'}
						<a href="tel:0411532233">{detail.value}</a>
					{:else}
						{detail.value}
					{/if}
				</p>
			</div>
		{/each}
	</div>
</section>

<style>
	section + section {
		margin-top: clamp(1.25rem, 3vw, 2.5rem);
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(240px, 0.42fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: stretch;
		background:
			radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.28), transparent 26rem),
			linear-gradient(135deg, #1e5f95 0%, #4b96d4 52%, #62ace8 100%);
		color: #ffffff;
		border-radius: 24px;
		padding: clamp(2rem, 5vw, 4rem);
		box-shadow: 0 24px 60px rgba(15, 23, 42, 0.16);
		overflow: hidden;
	}

	.hero-content {
		max-width: 780px;
	}

	.kicker {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 700;
		margin: 0;
		color: #dff2ff;
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
		font-size: clamp(2rem, 4.8vw, 4rem);
		line-height: 1.05;
		letter-spacing: -0.04em;
	}

	.hero p {
		color: #ffffff;
		max-width: 75ch;
	}

	.hero-lead {
		font-size: clamp(1.05rem, 2vw, 1.25rem);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		margin-top: 1.6rem;
	}

	.primary-link,
	.secondary-link,
	.emergency-call {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		text-decoration: none;
		font-weight: 800;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}

	.primary-link {
		background: #ffffff;
		color: #1e5f95;
		padding: 0.85rem 1.25rem;
		box-shadow: 0 14px 34px rgba(15, 23, 42, 0.18);
	}

	.secondary-link {
		border: 1px solid rgba(255, 255, 255, 0.58);
		color: #ffffff;
		padding: 0.82rem 1.2rem;
	}

	.primary-link:hover,
	.secondary-link:hover,
	.emergency-call:hover {
		transform: translateY(-2px);
	}

	.hero-panel {
		display: grid;
		gap: 1rem;
		align-content: end;
		border: 1px solid rgba(255, 255, 255, 0.34);
		border-radius: 22px;
		padding: clamp(1.2rem, 3vw, 1.6rem);
		background: rgba(255, 255, 255, 0.14);
		backdrop-filter: blur(10px);
	}

	.hero-panel p {
		margin: 0;
		font-weight: 700;
	}

	.hero-stat {
		display: grid;
		gap: 0.25rem;
		border-top: 1px solid rgba(255, 255, 255, 0.26);
		padding-top: 1rem;
	}

	.hero-stat strong {
		font-size: clamp(2rem, 4vw, 3.1rem);
		line-height: 1;
	}

	.hero-stat span {
		color: #eef8ff;
		font-weight: 700;
	}

	.section-card {
		background: #ffffff;
		border: 1px solid #e3edf7;
		border-radius: 22px;
		padding: clamp(1.4rem, 4vw, 2.5rem);
		box-shadow: 0 18px 46px rgba(15, 23, 42, 0.07);
	}

	.section-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 700;
		margin: 0 0 0.35rem;
		color: #62ace8;
	}

	.services-section h2,
	.contact h2,
	.emergency h2 {
		font-size: clamp(1.55rem, 3vw, 2.3rem);
		line-height: 1.15;
	}

	p {
		line-height: 1.6;
		color: #353c4b;
	}

	.service-grid {
		margin-top: clamp(1.2rem, 3vw, 2rem);
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1rem, 2vw, 1.4rem);
	}

	.service-card {
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
		border: 1px solid #d9e7f4;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: 0 12px 30px rgba(53, 60, 75, 0.07);
	}

	.service-image {
		display: grid;
		min-height: 165px;
		place-items: center;
		background:
			linear-gradient(135deg, rgba(98, 172, 232, 0.9), rgba(30, 95, 149, 0.92)),
			repeating-linear-gradient(
				-45deg,
				rgba(255, 255, 255, 0.18) 0 8px,
				rgba(255, 255, 255, 0.08) 8px 16px
			);
		color: #ffffff;
	}

	.service-image span {
		border: 1px solid rgba(255, 255, 255, 0.42);
		border-radius: 999px;
		padding: 0.55rem 0.85rem;
		background: rgba(255, 255, 255, 0.14);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.service-content {
		padding: clamp(1rem, 2.5vw, 1.35rem);
	}

	.service-card h3 {
		font-size: clamp(1.08rem, 2vw, 1.3rem);
		line-height: 1.25;
		margin-bottom: 0.55rem;
	}

	ul {
		margin: 0.75rem 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.35rem;
	}

	li {
		color: #353c4b;
		line-height: 1.5;
	}

	.service-outcome {
		margin-bottom: 0;
		font-weight: 700;
		color: #2d647f;
	}

	.emergency {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: clamp(1.2rem, 4vw, 2rem);
		align-items: center;
		background:
			linear-gradient(135deg, rgba(30, 95, 149, 0.95), rgba(53, 60, 75, 0.96)),
			#353c4b;
	}

	.emergency h2,
	.emergency p,
	.emergency .section-label {
		color: #ffffff;
	}

	.locations {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 1.1rem 0 0;
		padding: 0;
		list-style: none;
	}

	.locations li {
		border: 1px solid rgba(255, 255, 255, 0.28);
		border-radius: 999px;
		padding: 0.4rem 0.7rem;
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
		font-weight: 700;
	}

	.emergency-call {
		flex-direction: column;
		gap: 0.15rem;
		min-width: min(100%, 250px);
		padding: 1rem 1.3rem;
		background: #62ace8;
		color: #ffffff;
		box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22);
	}

	.emergency-call span {
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.emergency-call strong {
		font-size: 1.35rem;
	}

	.contact {
		display: grid;
		gap: clamp(1.2rem, 3vw, 2rem);
	}

	.contact-intro {
		max-width: 680px;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.contact-item {
		border: 1px solid #d9e7f4;
		border-radius: 16px;
		padding: 1rem;
		background: #f7fbff;
	}

	.contact-item h3 {
		font-size: 1rem;
	}

	.contact-item p {
		margin-bottom: 0;
	}

	.contact a {
		color: #62ace8;
		text-decoration: none;
		font-weight: 700;
	}

	.contact a:hover {
		text-decoration: underline;
	}

	@media (max-width: 920px) {
		.hero,
		.emergency {
			grid-template-columns: 1fr;
		}

		.service-grid,
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.emergency-call {
			justify-self: start;
		}
	}

	@media (max-width: 560px) {
		.hero-actions {
			flex-direction: column;
		}

		.primary-link,
		.secondary-link,
		.emergency-call {
			width: 100%;
		}

		.hero-panel {
			align-content: stretch;
		}
	}
</style>
