<svelte:head>
	<title>AllCare Refrigeration | Reliable Service Across Illawarra NSW</title>
	<meta
		name="description"
		content="Repairs, installations, servicing and urgent refrigeration or air conditioning support for homes and businesses across Illawarra NSW."
	/>
</svelte:head>

<section class="hero">
	<p class="hero-kicker">The Most Reliable Refrigeration Services in Illawarra NSW</p>
	<h1>Repairs, installations, servicing and urgent breakdown support.</h1>
	<p>
		AllCare Refrigeration keeps homes and businesses running with dependable refrigeration and
		air conditioning work, clear communication and no hidden surprises.
	</p>
	<div class="hero-actions">
		<a href="#contact">Request a Callback</a>
		<a class="secondary" href="/services">View Services</a>
	</div>
</section>

<section class="about">
	<div>
		<p class="section-label">Who Are We?</p>
		<h2>A full-service refrigeration and air conditioning team you can rely on.</h2>
	</div>
	<p>
		From condenser faults and evaporator maintenance to complete installations, we handle each job
		end-to-end. We diagnose issues properly, explain options clearly and focus on quality
		workmanship that lasts.
	</p>
</section>

<section class="services">
	<div class="section-intro">
		<p class="section-label">How can we help you?</p>
		<h2>Core Services</h2>
	</div>
	<div class="service-grid">
		<article>
			<h3>Condenser Services</h3>
			<p>
				Installations, repairs and maintenance for rooftop and commercial condenser units,
				including fan motor replacements, coil cleaning and pressure diagnostics.
			</p>
		</article>
		<article>
			<h3>Evaporator Services</h3>
			<p>
				Service and installation for cool room, freezer and air conditioning evaporators to
				improve airflow, temperature consistency and reliability.
			</p>
		</article>
		<article>
			<h3>Air Conditioning Installation & Repairs</h3>
			<p>
				Split and ducted system supply, installation and fault finding for residential and
				commercial properties with preventative maintenance options.
			</p>
		</article>
	</div>
</section>

<section class="emergency">
	<h2>Have an Emergency?</h2>
	<p>Need urgent help with a leak, drain issue or system failure? We offer rapid-response support.</p>
	<a href="tel:0411532233">Call 041-1532-233</a>
</section>

<section class="testimonials">
	<div class="section-intro">
		<p class="section-label">What Our Customers Say</p>
		<h2>Trusted by local homes and businesses</h2>
	</div>
	<div class="testimonial-grid">
		<blockquote>
			<p>
				"Our cool room failed during business hours and the team got us back up quickly. Honest
				advice, fair pricing and excellent workmanship."
			</p>
			<cite>- Ben, Albion Park</cite>
		</blockquote>
		<blockquote>
			<p>
				"Fast response, professional technicians and everything explained in plain language.
				Exactly the kind of service you want in an emergency."
			</p>
			<cite>- Sarah, Wollongong</cite>
		</blockquote>
		<blockquote>
			<p>
				"We now use AllCare for routine servicing across all sites. Reliable, punctual and easy
				to work with."
			</p>
			<cite>- David, Shellharbour</cite>
		</blockquote>
	</div>
</section>

<section class="gallery">
	<div class="section-intro">
		<p class="section-label">Our Work</p>
		<h2>Recent projects</h2>
	</div>
	<div class="gallery-grid">
		<div>Commercial cool room fit-out</div>
		<div>Condenser replacement</div>
		<div>Split system installation</div>
		<div>Preventative maintenance program</div>
		<div>Urgent breakdown repair</div>
		<div>Evaporator performance upgrade</div>
	</div>
</section>

<section class="contact" id="contact">
	<h2>We're here to help. Call us today.</h2>
	<div class="contact-grid">
		<div>
			<h3>Address</h3>
			<p>157 Church St, Albion Park NSW 2527, Australia</p>
		</div>
		<div>
			<h3>Call Us</h3>
			<p><a href="tel:0411532233">041-1532-233</a></p>
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
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
	}

	section + section {
		margin-top: 1.3rem;
	}

	h1,
	h2,
	h3 {
		margin: 0;
		color: #353c4b;
	}

	p {
		line-height: 1.6;
		color: #353c4b;
	}

	.hero {
		padding: 2.6rem 2rem;
		background: linear-gradient(140deg, #62ace8, #4b96d4);
		color: #ffffff;
	}

	.hero h1 {
		font-size: clamp(1.75rem, 3vw, 2.8rem);
		margin-top: 0.4rem;
		color: #ffffff;
	}

	.hero p {
		max-width: 68ch;
		color: #ffffff;
	}

	.hero-kicker {
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 0.8rem;
		color: #e9f5ff;
	}

	.hero-actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 1.35rem;
	}

	.hero-actions a {
		background: #ffffff;
		color: #353c4b;
		padding: 0.7rem 1.05rem;
		font-weight: 700;
		text-decoration: none;
		border-radius: 999px;
	}

	.hero-actions a.secondary {
		background: transparent;
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.6);
	}

	.about {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	.section-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 700;
		margin-bottom: 0.35rem;
		color: #62ace8;
	}

	.section-intro {
		margin-bottom: 1rem;
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
		background: #ffffff;
		border: 1px solid #d9e7f4;
		border-radius: 12px;
		padding: 1rem;
	}

	.service-grid h3 {
		margin-bottom: 0.55rem;
		font-size: 1.1rem;
	}

	.emergency {
		text-align: center;
	}

	.emergency a {
		display: inline-block;
		margin-top: 0.8rem;
		background: #62ace8;
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
		padding: 0.7rem 1.05rem;
		border-radius: 999px;
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

	.gallery-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.gallery-grid div {
		background: linear-gradient(160deg, #ffffff, #eef6fd);
		border: 1px solid #d9e7f4;
		border-radius: 10px;
		padding: 1.1rem;
		font-weight: 600;
		color: #353c4b;
	}

	.contact-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.contact a {
		color: #62ace8;
		text-decoration: none;
		font-weight: 700;
	}

	@media (max-width: 920px) {
		.about,
		.service-grid,
		.testimonial-grid,
		.gallery-grid,
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
