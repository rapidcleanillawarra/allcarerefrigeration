<script lang="ts">
	let { children } = $props();
</script>

<header>
	<div class="nav-wrap">
		<a class="brand" href="/">AllCare Refrigeration</a>
		<nav aria-label="Public navigation">
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/services">Services</a>
			<a href="/login">Admin Login</a>
		</nav>
		<a class="quote-btn" href="#contact">Get a Quote</a>
	</div>
	<div class="emergency">Emergency? Call: <a href="tel:0411532233">041-1532-233</a></div>
	<div class="container-line"></div>
</header>

<main class="container">
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		background: #ffffff;
		color: #353c4b;
	}

	header {
		background: #ffffff;
		position: sticky;
		top: 0;
		z-index: 20;
		box-shadow: 0 2px 14px rgba(2, 6, 23, 0.06);
	}

	.nav-wrap {
		max-width: 1120px;
		margin: 0 auto;
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.brand {
		color: #353c4b;
		font-weight: 800;
		text-decoration: none;
		letter-spacing: 0.015em;
	}

	nav {
		display: flex;
		gap: 1.15rem;
		flex-wrap: wrap;
	}

	nav a {
		color: #353c4b;
		text-decoration: none;
		font-weight: 600;
	}

	nav a:hover,
	.brand:hover {
		color: #62ace8;
	}

	.quote-btn {
		background: #62ace8;
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
		padding: 0.6rem 1rem;
		border-radius: 999px;
	}

	.quote-btn:hover {
		background: #4b96d4;
	}

	.emergency {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.25rem 0.8rem;
		font-size: 0.93rem;
		color: #475569;
	}

	.emergency a {
		color: #62ace8;
		text-decoration: none;
		font-weight: 700;
	}

	.container-line {
		border-top: 1px solid #d9e7f4;
	}

	.container {
		max-width: 1120px;
		margin: 0 auto;
		padding: 2rem 1.25rem 3rem;
	}
</style>
