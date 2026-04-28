<svelte:head>
	<title>Services | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Commercial refrigeration and air conditioning services across Illawarra and Southern Highlands, including installs, repairs, maintenance and emergency breakdown support."
	/>
</svelte:head>

<section class="hero">
	<p class="kicker">Commercial Refrigeration & Air Conditioning Services</p>
	<h1>Professional refrigeration and air conditioning services for reliable year-round performance.</h1>
	<p>
		AllCare Refrigeration & Air Conditioning delivers professional service across Illawarra and the
		Southern Highlands, from Helensburgh to Nowra and west to Bowral, Mittagong, Robertson and Moss
		Vale.
	</p>
	<p>
		We specialise in commercial refrigeration systems, condensers, evaporators and air conditioning
		installations for businesses that rely on consistent temperature control and system reliability.
	</p>
</section>

<section class="section-card">
	<p class="section-label">How can we help you?</p>
	<h2>Core Services</h2>
	<div class="service-grid">
		<article>
			<h3>Condenser Installation & Repairs</h3>
			<p>
				We install, repair and maintain commercial condenser units for cool rooms, freezer rooms
				and air conditioning systems.
			</p>
			<ul>
				<li>Condenser coil cleaning</li>
				<li>Fan motor replacement</li>
				<li>Head pressure diagnostics</li>
				<li>System optimisation</li>
				<li>Full condenser replacement</li>
			</ul>
			<p>Proper condenser performance supports energy efficiency and long-term reliability.</p>
		</article>
		<article>
			<h3>Evaporator Repairs & Servicing</h3>
			<p>
				We service evaporator units in cool rooms, freezer systems and air conditioning equipment
				across Illawarra and the Southern Highlands.
			</p>
			<ul>
				<li>Coil cleaning and sanitising</li>
				<li>Defrost system repairs</li>
				<li>Fan motor replacement</li>
				<li>Ice build-up fault diagnosis</li>
				<li>Temperature performance testing</li>
			</ul>
			<p>
				Maintained evaporator systems improve airflow, temperature stability and energy
				efficiency.
			</p>
		</article>
		<article>
			<h3>Commercial Air Conditioning Installation & Repairs</h3>
			<p>
				We provide installation, maintenance and repairs for commercial and residential clients.
			</p>
			<ul>
				<li>Split systems</li>
				<li>Ducted air conditioning</li>
				<li>Commercial packaged units</li>
				<li>Multi-head systems</li>
			</ul>
			<p>
				From system design and installation to breakdown repairs and scheduled servicing, we keep
				systems performing reliably.
			</p>
		</article>
		<article>
			<h3>Preventative Maintenance Programs</h3>
			<p>Regular servicing reduces breakdowns and extends equipment life.</p>
			<ul>
				<li>Refrigerant level checks</li>
				<li>Electrical testing</li>
				<li>Airflow verification</li>
				<li>Component inspections</li>
				<li>Performance reporting</li>
			</ul>
			<p>Scheduled maintenance protects your investment and helps prevent costly downtime.</p>
		</article>
	</div>
</section>

<section class="emergency section-card">
	<h2>24/7 Emergency Breakdown Service</h2>
	<p>
		Refrigeration failures can impact stock, safety and business operations. We provide responsive
		emergency breakdown services across:
	</p>
	<p class="locations">
		Helensburgh, Wollongong, Shellharbour, Kiama, Nowra, Bowral, Mittagong, Robertson and Moss
		Vale.
	</p>
	<a href="tel:0411532233">Call 041-1532-233</a>
</section>

<section class="contact section-card">
	<h2>Need reliable refrigeration or air conditioning services?</h2>
	<p>Contact us today.</p>
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
		font-size: clamp(1.6rem, 2.6vw, 2.3rem);
	}

	.hero p {
		color: #ffffff;
		max-width: 75ch;
	}

	.section-card {
		background: #ffffff;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
	}

	.section-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 700;
		margin: 0 0 0.35rem;
		color: #62ace8;
	}

	p {
		line-height: 1.6;
		color: #353c4b;
	}

	.service-grid {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	article {
		border: 1px solid #d9e7f4;
		border-radius: 12px;
		padding: 1rem;
	}

	article h3 {
		font-size: 1.08rem;
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

	.emergency {
		text-align: center;
	}

	.locations {
		font-weight: 600;
	}

	.emergency a {
		display: inline-block;
		margin-top: 0.7rem;
		background: #62ace8;
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
		padding: 0.72rem 1.05rem;
		border-radius: 999px;
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
		.service-grid,
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
