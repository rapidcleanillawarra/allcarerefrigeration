<svelte:head>
	<title>About Us | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Learn about AllCare Refrigeration, our mission, values, and commitment to reliable refrigeration and air-conditioning services."
	/>
</svelte:head>

<section class="hero">
	<p class="kicker">About Us</p>
	<h1>Reliable refrigeration and air-conditioning service you can trust.</h1>
	<p>
		At <strong>AllCare Refrigeration</strong>, we are committed to delivering reliable,
		high-quality refrigeration and air-conditioning service by working as one team, continuously
		improving, and taking ownership of every job.
	</p>
	<p>
		We believe in openness and accountability, so our customers receive clear communication, honest
		advice, and respect at every step.
	</p>
</section>

<section class="section-card">
	<h2>Efficient Solutions for Refrigeration and Air-Conditioning Systems</h2>
	<p>
		By combining modern diagnostic tools, proven industry methods, and quality parts, we ensure
		your systems operate safely, efficiently, and consistently.
	</p>
	<p>
		Trust, integrity, and long-term relationships are what drive us. Our goal is simple: to keep
		your equipment running and earn your business for life, leaving a strong impression every time
		we attend a site.
	</p>
</section>

<section class="section-card">
	<h2>Our Mission</h2>
	<p>
		We strive to provide the most reliable and efficient refrigeration and air-conditioning services
		without compromising on quality or safety.
	</p>
	<p>
		We are committed to proven workmanship, fair pricing, and genuine customer care so we can build
		long-term relationships that last for years, well beyond the first job we complete.
	</p>
</section>

<section class="section-card">
	<h2>Core Values</h2>
	<ul>
		<li><strong>Honesty first:</strong> honesty is the foundation of trust and integrity.</li>
		<li><strong>Do what is right:</strong> we focus on the right solution, not quick shortcuts.</li>
		<li>
			<strong>Excellence in workmanship:</strong> quality and safety are non-negotiables on every
			job.
		</li>
	</ul>
</section>

<section class="section-card">
	<h2>Why Choose Us?</h2>
	<p>
		We go above and beyond to deliver reliable, professional refrigeration and air-conditioning
		services. Our focus is quality workmanship, honest service, and dependable results every time.
	</p>
	<ul>
		<li>Qualified and experienced technicians</li>
		<li>Honest, transparent pricing</li>
		<li>Commitment to quality workmanship</li>
		<li>Service across a wide area</li>
		<li>Fast response for urgent refrigeration issues</li>
	</ul>
</section>

<section class="contact section-card">
	<h2>We are here to help. Call us today.</h2>
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
			<p>Monday - Sunday: 8:00 a.m - 5:00 p.m</p>
		</div>
	</div>
</section>

<style>
	section + section {
		margin-top: 1.2rem;
	}

	.hero {
		background: linear-gradient(145deg, #62ace8, #4b96d4);
		color: #ffffff;
		border-radius: 16px;
		padding: 2.4rem 2rem;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
	}

	.kicker {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 700;
		margin: 0;
		color: #e9f5ff;
	}

	h1,
	h2,
	h3 {
		margin: 0;
		color: #353c4b;
	}

	.hero h1 {
		color: #ffffff;
		margin-top: 0.45rem;
		font-size: clamp(1.7rem, 2.8vw, 2.6rem);
	}

	.hero p {
		color: #ffffff;
		max-width: 70ch;
	}

	.section-card {
		background: #ffffff;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
	}

	p {
		line-height: 1.6;
		color: #353c4b;
	}

	ul {
		margin: 0.75rem 0 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.45rem;
	}

	li {
		color: #353c4b;
		line-height: 1.55;
	}

	.contact-grid {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.contact a {
		color: #62ace8;
		text-decoration: none;
		font-weight: 700;
	}

	@media (max-width: 920px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
