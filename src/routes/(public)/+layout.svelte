<script lang="ts">
	import { resolve } from '$app/paths';

	let { children, data } = $props();

	let scrollY = $state(0);
	let mobileOpen = $state(false);

	const condensed = $derived(scrollY > 24);

	function onScroll() {
		scrollY = window.scrollY;
		if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--scroll-y', String(scrollY));
		}
	}

	$effect(() => {
		// Initial scroll sync (covers refresh-with-scroll-position case).
		onScroll();

		// Reveal-on-scroll observer.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
		);

		const observe = () => {
			const vh = window.innerHeight;
			document.querySelectorAll<HTMLElement>('.reveal:not(.is-observed)').forEach((node, idx) => {
				node.classList.add('is-observed');
				if (!node.style.getPropertyValue('--i')) {
					node.style.setProperty('--i', String(idx % 12));
				}
				// If the element is already (even partly) in viewport, reveal
				// immediately. This avoids the FOIC where elements above the
				// fold sit at opacity:0 waiting for the IO to fire.
				const rect = node.getBoundingClientRect();
				if (rect.top < vh && rect.bottom > 0) {
					node.classList.add('is-visible');
					return;
				}
				observer.observe(node);
			});
		};

		observe();
		const mutation = new MutationObserver(observe);
		mutation.observe(document.body, { childList: true, subtree: true });

		// Combined scroll RAF: parallax + reveal fallback. The IO handles
		// most reveals, but a scroll-driven check ensures any element that
		// slips through (during fast scroll, anchor jumps, or edge cases)
		// still becomes visible.
		let raf = 0;
		const updateScrollFx = () => {
			raf = 0;
			const vh = window.innerHeight;
			const revealMargin = vh * 0.04;

			document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
				const factor = parseFloat(el.dataset.parallax || '0');
				if (!factor) return;
				const rect = el.getBoundingClientRect();
				if (rect.bottom < -200 || rect.top > vh + 200) return;
				const center = rect.top + rect.height / 2;
				const offset = (center - vh / 2) * -factor;
				el.style.setProperty('--py', `${offset.toFixed(2)}px`);
			});

			document
				.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
				.forEach((el) => {
					const rect = el.getBoundingClientRect();
					if (rect.top < vh - revealMargin && rect.bottom > revealMargin) {
						el.classList.add('is-visible');
						observer.unobserve(el);
					}
				});
		};

		const onScrollFx = () => {
			if (!raf) raf = requestAnimationFrame(updateScrollFx);
		};
		window.addEventListener('scroll', onScrollFx, { passive: true });
		window.addEventListener('resize', onScrollFx);
		updateScrollFx();

		return () => {
			observer.disconnect();
			mutation.disconnect();
			window.removeEventListener('scroll', onScrollFx);
			window.removeEventListener('resize', onScrollFx);
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:window onscroll={onScroll} />

<div class="page-shell">
	<div class="atmosphere" aria-hidden="true">
		<span class="atmosphere__blob atmosphere__blob--a" data-parallax="0.05"></span>
		<span class="atmosphere__blob atmosphere__blob--b" data-parallax="0.08"></span>
		<span class="atmosphere__blob atmosphere__blob--c" data-parallax="0.04"></span>
	</div>

	<header class="site-header" class:site-header--condensed={condensed}>
		<div class="emergency-strip" aria-label="Emergency support">
			<div class="section-inner section-inner--wide emergency-strip__row">
				<span class="emergency-strip__dot pulse-ring" aria-hidden="true"></span>
				<span class="emergency-strip__copy">Emergency refrigeration help available now</span>
				<a class="emergency-strip__cta" href="tel:0411532233">
					<span>Call</span>
					<strong>0411 532 233</strong>
				</a>
			</div>
		</div>

		<div class="header-glass">
			<div class="section-inner section-inner--wide nav-wrap">
				<a class="brand" href={resolve('/')} aria-label="AllCare Refrigeration home">
					<span class="brand-mark">AC</span>
					<span class="brand-copy">
						<span class="brand-name">AllCare Refrigeration</span>
						<span class="brand-tagline">Rapid cooling support</span>
					</span>
				</a>

				<nav class="primary-nav" aria-label="Public navigation">
					<a href={resolve('/')}>Home</a>
					<a href={resolve('/about')}>About</a>
					<a href={resolve('/services')}>Services</a>
				</nav>

				<a class="quote-btn" href={resolve('/#contact')}>
					<span>Get a Quote</span>
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

				<button
					type="button"
					class="menu-toggle"
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav"
					aria-label="Toggle navigation"
					onclick={() => (mobileOpen = !mobileOpen)}
				>
					<span></span><span></span><span></span>
				</button>
			</div>

			{#if mobileOpen}
				<div id="mobile-nav" class="mobile-nav" role="navigation" aria-label="Mobile navigation">
					<a href={resolve('/')} onclick={() => (mobileOpen = false)}>Home</a>
					<a href={resolve('/about')} onclick={() => (mobileOpen = false)}>About</a>
					<a href={resolve('/services')} onclick={() => (mobileOpen = false)}>Services</a>
					<a
						class="mobile-nav__cta"
						href={resolve('/#contact')}
						onclick={() => (mobileOpen = false)}>Get a Quote</a
					>
				</div>
			{/if}
		</div>
	</header>

	<main class="site-main">
		{#if data.edit}
			<div class="section-inner section-inner--wide">
				<p class="edit-banner reveal" role="status">
					Edit mode: click any image area to upload or replace photos (add
					<code>?edit=true</code> to the URL).
				</p>
			</div>
		{/if}
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="section-inner section-inner--wide site-footer__grid">
			<div class="reveal reveal--up">
				<div class="brand">
					<span class="brand-mark">AC</span>
					<span class="brand-copy">
						<span class="brand-name">AllCare Refrigeration</span>
						<span class="brand-tagline">Albion Park, NSW</span>
					</span>
				</div>
				<p class="site-footer__lead">
					Local refrigeration, air conditioning and HVAC service for homes and businesses across
					the Illawarra.
				</p>
			</div>

			<div class="reveal reveal--up">
				<h4>Visit us</h4>
				<p>157 Church St, Albion Park NSW 2527, Australia</p>
				<p>Mon - Sat · 8:00am - 5:00pm</p>
			</div>

			<div class="reveal reveal--up">
				<h4>Contact</h4>
				<p>
					<a href="tel:0411532233">0411 532 233</a>
				</p>
				<p>24/7 emergency breakdown response</p>
			</div>

			<div class="reveal reveal--up">
				<h4>Explore</h4>
				<nav aria-label="Footer">
					<a href={resolve('/')}>Home</a>
					<a href={resolve('/about')}>About</a>
					<a href={resolve('/services')}>Services</a>
				</nav>
			</div>
		</div>
		<div class="section-inner section-inner--wide site-footer__base">
			<small>&copy; {new Date().getFullYear()} AllCare Refrigeration. All rights reserved.</small>
			<small>Crafted for the Illawarra · NSW Australia</small>
		</div>
	</footer>
</div>

<style>
	.page-shell {
		position: relative;
		isolation: isolate;
		min-height: 100vh;
		background:
			radial-gradient(1200px 600px at 90% -10%, rgba(98, 172, 232, 0.18), transparent 70%),
			radial-gradient(1000px 600px at -10% 30%, rgba(15, 76, 129, 0.12), transparent 70%),
			linear-gradient(180deg, #f7fbff 0%, #ffffff 38%, #eef7ff 100%);
		color: var(--color-ink);
		overflow: clip;
	}

	.atmosphere {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.atmosphere__blob {
		position: absolute;
		border-radius: 999px;
		filter: blur(80px);
		opacity: 0.55;
		mix-blend-mode: multiply;
		will-change: transform;
		animation: aurora-drift 22s ease-in-out infinite;
	}

	.atmosphere__blob--a {
		top: -10rem;
		left: -8rem;
		width: 30rem;
		height: 30rem;
		background: radial-gradient(circle, rgba(98, 172, 232, 0.55), rgba(98, 172, 232, 0));
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.atmosphere__blob--b {
		top: 30rem;
		right: -10rem;
		width: 36rem;
		height: 36rem;
		background: radial-gradient(circle, rgba(143, 199, 240, 0.55), rgba(143, 199, 240, 0));
		animation-duration: 28s;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.atmosphere__blob--c {
		bottom: -12rem;
		left: 30%;
		width: 32rem;
		height: 32rem;
		background: radial-gradient(circle, rgba(15, 76, 129, 0.32), rgba(15, 76, 129, 0));
		animation-duration: 32s;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		transition:
			backdrop-filter 240ms var(--ease-spring),
			box-shadow 240ms var(--ease-spring),
			background 240ms var(--ease-spring);
	}

	.emergency-strip {
		position: relative;
		background: linear-gradient(90deg, #0f4c81, #1e5f95 55%, #2476b4);
		color: #ffffff;
		font-size: 0.86rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		overflow: hidden;
	}

	.emergency-strip::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			transparent 35%,
			rgba(255, 255, 255, 0.18) 50%,
			transparent 65%
		);
		background-size: 200% 100%;
		animation: shimmer 6s linear infinite;
		pointer-events: none;
	}

	.emergency-strip__row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding-block: 0.55rem;
		flex-wrap: wrap;
		position: relative;
	}

	.emergency-strip__dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #80efd1;
		box-shadow: 0 0 0 0 rgba(128, 239, 209, 0.85);
		flex: 0 0 auto;
	}

	.emergency-strip__copy {
		flex: 1 1 auto;
		min-width: 12rem;
	}

	.emergency-strip__cta {
		display: inline-flex;
		align-items: baseline;
		gap: 0.4rem;
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
		border-bottom: 1px solid rgba(255, 255, 255, 0.45);
		transition: border-color 200ms ease;
	}

	.emergency-strip__cta strong {
		font-size: 0.92rem;
		font-weight: 800;
	}

	.emergency-strip__cta:hover,
	.emergency-strip__cta:focus-visible {
		border-color: #ffffff;
	}

	.header-glass {
		background: rgba(255, 255, 255, 0.7);
		border-bottom: 1px solid var(--color-line);
		backdrop-filter: blur(18px) saturate(140%);
		-webkit-backdrop-filter: blur(18px) saturate(140%);
		transition: inherit;
	}

	.site-header--condensed .header-glass {
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 16px 36px -22px rgba(15, 76, 129, 0.32);
	}

	.nav-wrap {
		display: grid;
		grid-template-columns: minmax(13rem, 1fr) auto auto auto;
		align-items: center;
		gap: 1rem;
		padding-block: 0.95rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
		color: var(--color-ink);
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		width: 2.6rem;
		height: 2.6rem;
		flex: 0 0 auto;
		place-items: center;
		border-radius: 0.85rem;
		background: linear-gradient(135deg, #62ace8, #0f4c81);
		color: #ffffff;
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0.04em;
		box-shadow:
			0 12px 28px -8px rgba(98, 172, 232, 0.55),
			inset 0 0 0 1px rgba(255, 255, 255, 0.35);
		transition: transform 240ms var(--ease-spring);
	}

	.brand:hover .brand-mark {
		transform: rotate(-6deg) scale(1.04);
	}

	.brand-copy {
		display: grid;
		line-height: 1.1;
	}

	.brand-name {
		font-size: clamp(1rem, 1.5vw, 1.12rem);
		font-weight: 900;
		letter-spacing: -0.02em;
	}

	.brand-tagline {
		margin-top: 0.18rem;
		color: var(--color-ink-soft);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.primary-nav {
		display: flex;
		justify-content: center;
		gap: 0.25rem;
		flex-wrap: wrap;
	}

	.primary-nav a {
		position: relative;
		color: #334155;
		text-decoration: none;
		font-weight: 600;
		padding: 0.6rem 0.95rem;
		border-radius: 999px;
		transition:
			background 200ms ease,
			color 200ms ease,
			transform 200ms ease;
	}

	.primary-nav a::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0.35rem;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, #62ace8, #0f4c81);
		border-radius: 2px;
		transform: translateX(-50%);
		transition: width 240ms var(--ease-spring);
	}

	.primary-nav a:hover,
	.primary-nav a:focus-visible {
		background: rgba(98, 172, 232, 0.12);
		color: var(--color-brand-deeper);
	}

	.primary-nav a:hover::after,
	.primary-nav a:focus-visible::after {
		width: calc(100% - 1.6rem);
	}

	.quote-btn {
		justify-self: end;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: linear-gradient(135deg, #62ace8, #1e5f95);
		color: #ffffff;
		text-decoration: none;
		font-weight: 800;
		padding: 0.7rem 1.1rem;
		border-radius: 999px;
		box-shadow: 0 14px 32px -10px rgba(36, 118, 180, 0.55);
		transition:
			box-shadow 220ms var(--ease-spring),
			transform 220ms var(--ease-spring),
			filter 220ms var(--ease-spring);
	}

	.quote-btn svg {
		width: 1rem;
		height: 1rem;
		transition: transform 220ms var(--ease-spring);
	}

	.quote-btn:hover,
	.quote-btn:focus-visible {
		box-shadow: 0 18px 38px -8px rgba(36, 118, 180, 0.6);
		transform: translateY(-1px);
		filter: brightness(1.04);
	}

	.quote-btn:hover svg {
		transform: translateX(3px);
	}

	.menu-toggle {
		display: none;
		grid-template-rows: repeat(3, auto);
		align-content: center;
		justify-self: end;
		gap: 5px;
		width: 2.6rem;
		height: 2.6rem;
		padding: 0.6rem;
		border: 1px solid var(--color-line);
		border-radius: 0.85rem;
		background: rgba(255, 255, 255, 0.85);
		cursor: pointer;
	}

	.menu-toggle span {
		display: block;
		width: 100%;
		height: 2px;
		background: #334155;
		border-radius: 999px;
		transition: transform 220ms var(--ease-spring);
	}

	.mobile-nav {
		display: none;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.6rem clamp(1rem, 4vw, 2.75rem) 1rem;
		background: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid var(--color-line);
	}

	.mobile-nav a {
		padding: 0.7rem 0.85rem;
		text-decoration: none;
		color: var(--color-ink);
		font-weight: 700;
		border-radius: 0.7rem;
	}

	.mobile-nav a:hover {
		background: rgba(98, 172, 232, 0.12);
	}

	.mobile-nav__cta {
		margin-top: 0.4rem;
		background: linear-gradient(135deg, #62ace8, #1e5f95);
		color: #ffffff !important;
		text-align: center;
	}

	.site-main {
		position: relative;
		z-index: 1;
		display: grid;
		gap: clamp(2rem, 5vw, 4rem);
		padding-bottom: clamp(2.5rem, 6vw, 5rem);
	}

	.edit-banner {
		margin: 0 0 1rem;
		padding: 0.75rem 1.1rem;
		background: linear-gradient(135deg, #fff8e1, #fef3c7);
		border: 1px solid #facc15;
		border-radius: 14px;
		color: #713f12;
		font-weight: 700;
		font-size: 0.9rem;
		box-shadow: 0 12px 28px -16px rgba(202, 138, 4, 0.4);
	}

	.edit-banner code {
		font-size: 0.85em;
		padding: 0.1rem 0.4rem;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.7);
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	}

	.site-footer {
		position: relative;
		z-index: 1;
		margin-top: clamp(3rem, 6vw, 5rem);
		padding-top: clamp(2.5rem, 5vw, 4rem);
		padding-bottom: 2rem;
		background:
			radial-gradient(800px 320px at 90% 0%, rgba(98, 172, 232, 0.18), transparent 70%),
			linear-gradient(180deg, #0f4c81, #0a2e51);
		color: #d6e8f7;
		overflow: hidden;
	}

	.site-footer::before {
		content: '';
		position: absolute;
		inset-inline: 0;
		top: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(98, 172, 232, 0.6),
			rgba(143, 199, 240, 0.6),
			transparent
		);
	}

	.site-footer .brand {
		color: #ffffff;
	}

	.site-footer .brand-mark {
		background: linear-gradient(135deg, #ffffff, #cfe6f8);
		color: #0f4c81;
	}

	.site-footer .brand-tagline {
		color: #9dc4e6;
	}

	.site-footer__grid {
		display: grid;
		grid-template-columns: minmax(16rem, 1.5fr) repeat(3, minmax(10rem, 1fr));
		gap: clamp(1.4rem, 3vw, 2.5rem);
	}

	.site-footer h4 {
		margin: 0 0 0.7rem;
		color: #ffffff;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.site-footer p {
		margin: 0 0 0.45rem;
		color: #c9dcef;
		line-height: 1.55;
		font-size: 0.95rem;
	}

	.site-footer__lead {
		margin-top: 0.85rem;
		max-width: 28rem;
	}

	.site-footer a {
		color: #ffffff;
		text-decoration: none;
		font-weight: 600;
	}

	.site-footer a:hover {
		text-decoration: underline;
	}

	.site-footer nav {
		display: grid;
		gap: 0.4rem;
	}

	.site-footer__base {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: clamp(1.6rem, 3vw, 2.5rem);
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		color: #9bb6cf;
		font-size: 0.82rem;
	}

	@media (max-width: 960px) {
		.menu-toggle {
			display: grid;
		}

		.primary-nav,
		.quote-btn {
			display: none;
		}

		.nav-wrap {
			grid-template-columns: 1fr auto;
		}

		.mobile-nav {
			display: flex;
		}

		.site-footer__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.brand-mark {
			width: 2.4rem;
			height: 2.4rem;
			font-size: 0.85rem;
		}

		.emergency-strip__row {
			gap: 0.5rem;
			padding-block: 0.5rem;
		}

		.site-footer__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
