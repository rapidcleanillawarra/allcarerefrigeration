<script lang="ts">
	import { resolve } from '$app/paths';

	let { children, data } = $props();
</script>

<header class="site-header">
	<div class="emergency-strip">
		<div class="header-shell emergency-content">
			<span>Emergency refrigeration help available</span>
			<a href="tel:0411532233">Call 041-1532-233</a>
		</div>
	</div>

	<div class="header-glass">
		<div class="header-shell nav-wrap">
			<a class="brand" href={resolve('/')} aria-label="AllCare Refrigeration home">
				<span class="brand-mark">AC</span>
				<span class="brand-copy">
					<span class="brand-name">AllCare Refrigeration</span>
					<span class="brand-tagline">Rapid cooling support</span>
				</span>
			</a>

			<nav aria-label="Public navigation">
				<a href={resolve('/')}>Home</a>
				<a href={resolve('/about')}>About</a>
				<a href={resolve('/services')}>Services</a>
			</nav>

			<a class="quote-btn" href="#contact">Get a Quote</a>
		</div>
	</div>
</header>

<main class="container">
	{#if data.edit}
		<p class="edit-banner" role="status">
			Edit mode: click any image area to upload or replace photos (add <code>?edit=true</code> to the URL).
		</p>
	{/if}
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
		background:
			radial-gradient(circle at top left, rgba(98, 172, 232, 0.16), transparent 32rem),
			linear-gradient(180deg, #f7fbff 0%, #ffffff 42%, #eef7ff 100%);
		color: #243040;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 30;
	}

	.header-shell {
		max-width: 1120px;
		margin: 0 auto;
		padding-inline: 1.25rem;
	}

	.emergency-strip {
		background: linear-gradient(90deg, #0f4c81, #256fa8);
		color: #ffffff;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	.emergency-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-block: 0.55rem;
		flex-wrap: wrap;
	}

	.emergency-content a {
		color: #ffffff;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.55);
	}

	.emergency-content a:hover {
		border-color: #ffffff;
	}

	.header-glass {
		background: rgba(255, 255, 255, 0.78);
		border-bottom: 1px solid rgba(148, 163, 184, 0.22);
		box-shadow: 0 16px 40px rgba(15, 76, 129, 0.08);
		backdrop-filter: blur(18px);
	}

	.nav-wrap {
		display: grid;
		grid-template-columns: minmax(13rem, 1fr) auto auto;
		align-items: center;
		gap: 1rem;
		padding-block: 1rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
		color: #243040;
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		width: 2.75rem;
		height: 2.75rem;
		flex: 0 0 auto;
		place-items: center;
		border-radius: 0.9rem;
		background: linear-gradient(135deg, #62ace8, #0f4c81);
		color: #ffffff;
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0.04em;
		box-shadow: 0 12px 28px rgba(98, 172, 232, 0.28);
	}

	.brand-copy {
		display: grid;
		line-height: 1.1;
	}

	.brand-name {
		font-size: clamp(1rem, 2vw, 1.15rem);
		font-weight: 900;
		letter-spacing: -0.02em;
	}

	.brand-tagline {
		margin-top: 0.2rem;
		color: #64748b;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	nav {
		display: flex;
		justify-content: center;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	nav a {
		color: #334155;
		text-decoration: none;
		font-weight: 600;
		padding: 0.65rem 0.85rem;
		border-radius: 999px;
		transition:
			background 160ms ease,
			color 160ms ease;
	}

	nav a:hover,
	nav a:focus-visible {
		background: rgba(98, 172, 232, 0.12);
		color: #0f4c81;
	}

	.brand:hover .brand-name,
	.brand:focus-visible .brand-name {
		color: #0f4c81;
	}

	.quote-btn {
		justify-self: end;
		background: linear-gradient(135deg, #62ace8, #2476b4);
		color: #ffffff;
		text-decoration: none;
		font-weight: 900;
		padding: 0.78rem 1.15rem;
		border-radius: 999px;
		box-shadow: 0 14px 32px rgba(36, 118, 180, 0.28);
		transition:
			box-shadow 160ms ease,
			transform 160ms ease;
	}

	.quote-btn:hover,
	.quote-btn:focus-visible {
		box-shadow: 0 18px 38px rgba(36, 118, 180, 0.36);
		transform: translateY(-1px);
	}

	.edit-banner {
		margin: 0 0 1rem;
		padding: 0.65rem 1.25rem;
		background: #fef3c7;
		border: 1px solid #facc15;
		border-radius: 12px;
		color: #713f12;
		font-weight: 700;
		font-size: 0.9rem;
	}

	.edit-banner code {
		font-size: 0.85em;
		padding: 0.1rem 0.35rem;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.65);
	}

	.container {
		width: min(100% - 2.5rem, 1120px);
		margin: 0 auto;
		padding: 2.5rem 0 4rem;
	}

	@media (max-width: 760px) {
		.nav-wrap {
			grid-template-columns: 1fr;
			justify-items: stretch;
			gap: 0.9rem;
		}

		nav {
			justify-content: flex-start;
		}

		.quote-btn {
			justify-self: start;
		}
	}

	@media (max-width: 520px) {
		.header-shell {
			padding-inline: 1rem;
		}

		.emergency-content {
			align-items: flex-start;
			flex-direction: column;
		}

		.brand-mark {
			width: 2.5rem;
			height: 2.5rem;
		}

		nav a {
			padding-inline: 0.7rem;
		}

		.container {
			width: min(100% - 2rem, 1120px);
			padding-top: 2rem;
		}
	}
</style>
