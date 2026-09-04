<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctickLicenseBadge from '$lib/components/arctick-license-badge.svelte';
	import { regionalServiceAreas } from '$lib/service-areas';

	let { children, data } = $props();

	let locationsMenuOpen = $state(false);
	let servicesMenuOpen = $state(false);
	let hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

	function handleMenuPointerEnter(menu: 'services' | 'locations') {
		if (hoverCloseTimer) {
			clearTimeout(hoverCloseTimer);
			hoverCloseTimer = null;
		}
		if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
			if (menu === 'services') {
				servicesMenuOpen = true;
				locationsMenuOpen = false;
			} else {
				locationsMenuOpen = true;
				servicesMenuOpen = false;
			}
		}
	}

	function handleMenuPointerLeave() {
		if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
			if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
			hoverCloseTimer = setTimeout(() => {
				servicesMenuOpen = false;
				locationsMenuOpen = false;
			}, 180);
		}
	}

	function toggleMenu(menu: 'services' | 'locations', event: MouseEvent) {
		event.preventDefault();
		if (hoverCloseTimer) {
			clearTimeout(hoverCloseTimer);
			hoverCloseTimer = null;
		}
		if (menu === 'services') {
			servicesMenuOpen = !servicesMenuOpen;
			if (servicesMenuOpen) locationsMenuOpen = false;
		} else {
			locationsMenuOpen = !locationsMenuOpen;
			if (locationsMenuOpen) servicesMenuOpen = false;
		}
	}

	function handleDocumentClick(e: MouseEvent) {
		const target = e.target as HTMLElement | null;
		if (!target?.closest('.primary-nav')) {
			servicesMenuOpen = false;
			locationsMenuOpen = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			servicesMenuOpen = false;
			locationsMenuOpen = false;
			mobileOpen = false;
		}
	}

	const navServices = [
		{ name: 'Commercial Refrigeration Repairs', slug: 'commercial-refrigeration-repairs' },
		{ name: 'Cool Room & Freezer Repairs', slug: 'cool-room-freezer-repairs' },
		{ name: 'Refrigeration Installation', slug: 'commercial-refrigeration-installation' },
		{ name: 'Preventative Maintenance', slug: 'preventative-maintenance' },
		{ name: '24/7 Emergency Repairs', slug: 'emergency-refrigeration-repairs' },
		{ name: 'Air Conditioning Services', slug: 'air-conditioning-installation-repairs' }
	];

	/** Embed URL from Maps share → resolves without an Maps Embed API key */
	const VISIT_MAP_EMBED_SRC =
		'https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s157+Church+St,+Albion+Park+NSW+2527,+Australia';

	const COMPANY_LOGO_URL =
		'https://coywobndzyvslurwqtdt.supabase.co/storage/v1/object/public/allcare/company_logo.png';

	let condensed = $state(false);
	let mobileOpen = $state(false);

	function updateCondensed() {
		const isCondensed = window.scrollY > 24;
		if (isCondensed !== condensed) {
			condensed = isCondensed;
		}
	}

	function onScroll() {
		updateCondensed();
	}

	$effect(() => {
		// Initial scroll sync (covers refresh-with-scroll-position case).
		updateCondensed();

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

			const parallaxNodes = document.querySelectorAll<HTMLElement>('[data-parallax]');
			if (parallaxNodes.length > 0) {
				const updates: { el: HTMLElement; offset: number }[] = [];
				for (let i = 0; i < parallaxNodes.length; i++) {
					const el = parallaxNodes[i];
					const factor = parseFloat(el.dataset.parallax || '0');
					if (!factor) continue;
					const rect = el.getBoundingClientRect();
					if (rect.bottom < -200 || rect.top > vh + 200) continue;
					const center = rect.top + rect.height / 2;
					const offset = (center - vh / 2) * -factor;
					updates.push({ el, offset });
				}
				for (let i = 0; i < updates.length; i++) {
					updates[i].el.style.setProperty('--py', `${updates[i].offset.toFixed(2)}px`);
				}
			}

			const unrevealed = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
			if (unrevealed.length > 0) {
				unrevealed.forEach((el) => {
					const rect = el.getBoundingClientRect();
					if (rect.top < vh - revealMargin && rect.bottom > revealMargin) {
						el.classList.add('is-visible');
						observer.unobserve(el);
					}
				});
			}
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

<svelte:window onscroll={onScroll} onclick={handleDocumentClick} onkeydown={handleKeydown} />

<div class="page-shell">
	<div class="atmosphere" aria-hidden="true">
		<span class="atmosphere__blob atmosphere__blob--a" data-parallax="0.05"></span>
		<span class="atmosphere__blob atmosphere__blob--b" data-parallax="0.08"></span>
		<span class="atmosphere__blob atmosphere__blob--c" data-parallax="0.04"></span>
	</div>

	<header class="site-header" class:site-header--condensed={condensed}>
		<div class="emergency-strip" aria-label="Emergency support">
			<div class="section-inner section-inner--header emergency-strip__row">
				<span class="emergency-strip__dot pulse-ring" aria-hidden="true"></span>
				<span class="emergency-strip__copy">Emergency refrigeration help available now</span>
				<a class="emergency-strip__cta" href="tel:0411532233">
					<span>Call</span>
					<strong>0411 532 233</strong>
				</a>
			</div>
		</div>

		<div class="header-glass">
			<div class="section-inner section-inner--header nav-wrap">
				<a class="brand" href={resolve('/')} aria-label="AllCare Refrigeration home">
					<img
						class="brand-logo"
						src={COMPANY_LOGO_URL}
						alt="Allcare Refrigeration"
						width="275"
						height="90"
						decoding="async"
					/>
				</a>

				<nav class="primary-nav" aria-label="Public navigation">
					<a href={resolve('/')} class="nav-link">Home</a>
					<a href={resolve('/about')} class="nav-link">About</a>

					<details
						class="nav-dropdown"
						bind:open={servicesMenuOpen}
						onpointerenter={() => handleMenuPointerEnter('services')}
						onpointerleave={handleMenuPointerLeave}
					>
						<summary
							class="nav-dropdown__summary"
							onclick={(e) => toggleMenu('services', e)}
						>
							<span>Services</span>
							<svg
								class="nav-dropdown__chev"
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</summary>
						<div class="nav-dropdown__panel" role="group" aria-label="Services">
							<a
								href={resolve('/services')}
								class="nav-dropdown__overview"
								onclick={() => (servicesMenuOpen = false)}
							>
								<div class="nav-dropdown__overview-content">
									<span class="nav-dropdown__overview-title">All Services Overview</span>
									<span class="nav-dropdown__overview-sub">Commercial cooling, cool rooms & HVAC</span>
								</div>
								<span class="nav-dropdown__arrow-badge" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M5 12h14" />
										<path d="m12 5 7 7-7 7" />
									</svg>
								</span>
							</a>
							<div class="nav-dropdown__list">
								{#each navServices as srv (srv.slug)}
									<a
										href={`/services/${srv.slug}`}
										class="nav-dropdown__link"
										onclick={() => (servicesMenuOpen = false)}
									>
										<span class="nav-dropdown__bullet" aria-hidden="true"></span>
										<span class="nav-dropdown__text">{srv.name}</span>
										<svg
											class="nav-dropdown__link-arrow"
											aria-hidden="true"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="m9 18 6-6-6-6" />
										</svg>
									</a>
								{/each}
							</div>
						</div>
					</details>

					<details
						class="nav-dropdown"
						bind:open={locationsMenuOpen}
						onpointerenter={() => handleMenuPointerEnter('locations')}
						onpointerleave={handleMenuPointerLeave}
					>
						<summary
							class="nav-dropdown__summary"
							onclick={(e) => toggleMenu('locations', e)}
						>
							<span>Locations</span>
							<svg
								class="nav-dropdown__chev"
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</summary>
						<div class="nav-dropdown__panel" role="group" aria-label="Service locations">
							<a
								href={resolve('/service-areas')}
								class="nav-dropdown__overview"
								onclick={() => (locationsMenuOpen = false)}
							>
								<div class="nav-dropdown__overview-content">
									<span class="nav-dropdown__overview-title">All Service Areas</span>
									<span class="nav-dropdown__overview-sub">Rapid dispatch across Illawarra & Shoalhaven</span>
								</div>
								<span class="nav-dropdown__arrow-badge" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M5 12h14" />
										<path d="m12 5 7 7-7 7" />
									</svg>
								</span>
							</a>
							<div class="nav-dropdown__list">
								{#each regionalServiceAreas as region (region.slug)}
									<a
										href={resolve(`/service-areas/${region.slug}`)}
										class="nav-dropdown__link"
										onclick={() => (locationsMenuOpen = false)}
									>
										<span class="nav-dropdown__bullet nav-dropdown__bullet--loc" aria-hidden="true"></span>
										<span class="nav-dropdown__text">{region.name}</span>
										<svg
											class="nav-dropdown__link-arrow"
											aria-hidden="true"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="m9 18 6-6-6-6" />
										</svg>
									</a>
								{/each}
							</div>
						</div>
					</details>

					<a href={resolve('/faq')} class="nav-link">FAQs</a>
				</nav>

				<div class="nav-actions">
					<a class="quote-btn" href={resolve('/get-a-quote')}>
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
						class:menu-toggle--open={mobileOpen}
						aria-expanded={mobileOpen}
						aria-controls="mobile-nav"
						aria-label="Toggle navigation"
						onclick={() => (mobileOpen = !mobileOpen)}
					>
						<span></span><span></span><span></span>
					</button>
				</div>
			</div>

			{#if mobileOpen}
				<div id="mobile-nav" class="mobile-nav" role="navigation" aria-label="Mobile navigation">
					<a href={resolve('/')} onclick={() => (mobileOpen = false)}>Home</a>
					<a href={resolve('/about')} onclick={() => (mobileOpen = false)}>About</a>
					<details class="mobile-nav__dropdown">
						<summary class="mobile-nav__summary">
							<span>Services</span>
							<svg class="mobile-nav__chev" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
								<path d="m6 9 6 6 6-6" />
							</svg>
						</summary>
						<div class="mobile-nav__sub" role="group" aria-label="Services">
							<a href={resolve('/services')} onclick={() => (mobileOpen = false)}>
								<strong>All Services Overview &rarr;</strong>
							</a>
							{#each navServices as srv (srv.slug)}
								<a
									href={`/services/${srv.slug}`}
									onclick={() => (mobileOpen = false)}
								>
									{srv.name}
								</a>
							{/each}
						</div>
					</details>
					<details class="mobile-nav__dropdown">
						<summary class="mobile-nav__summary">
							<span>Locations</span>
							<svg class="mobile-nav__chev" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
								<path d="m6 9 6 6 6-6" />
							</svg>
						</summary>
						<div class="mobile-nav__sub" role="group" aria-label="Service locations">
							<a href={resolve('/service-areas')} onclick={() => (mobileOpen = false)}>
								<strong>All Service Areas &rarr;</strong>
							</a>
							{#each regionalServiceAreas as region (region.slug)}
								<a
									href={resolve(`/service-areas/${region.slug}`)}
									onclick={() => (mobileOpen = false)}
								>
									{region.name}
								</a>
							{/each}
						</div>
					</details>
					<a href={resolve('/faq')} onclick={() => (mobileOpen = false)}>FAQs</a>
					<a
						class="mobile-nav__cta"
						href={resolve('/get-a-quote')}
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
				<div class="brand brand--stack">
					<img
						class="brand-logo brand-logo--footer"
						src={COMPANY_LOGO_URL}
						alt="Allcare Refrigeration"
						width="275"
						height="90"
						decoding="async"
					/>
					<span class="brand-loc">Albion Park, NSW</span>
				</div>
				<p class="site-footer__lead">
					Local refrigeration, air conditioning and HVAC service for homes and businesses across
					the Illawarra.
				</p>
				<ArctickLicenseBadge variant="inline" />
			</div>

			<div class="reveal reveal--up">
				<h4>Services</h4>
				<nav aria-label="Footer Services">
					<a href={resolve('/services')}>All Services Overview</a>
					{#each navServices as srv (srv.slug)}
						<a href={`/services/${srv.slug}`}>{srv.name}</a>
					{/each}
				</nav>
			</div>

			<div class="reveal reveal--up">
				<h4>Service Areas</h4>
				<nav aria-label="Footer Service Areas">
					<a href={resolve('/service-areas')}>Regional Hub Overview</a>
					{#each regionalServiceAreas as region (region.slug)}
						<a href={resolve(`/service-areas/${region.slug}`)}>{region.name}</a>
					{/each}
				</nav>
			</div>

			<div class="reveal reveal--up site-footer__visit">
				<h4>Albion Park Depot</h4>
				<p>157 Church St, Albion Park NSW 2527</p>
				<p>
					<a href="tel:0411532233" style="color: #6ee7b7; font-weight: 800;">0411 532 233</a>
				</p>
				<p>Mon - Fri: 7am - 5pm · 24/7 Breakdown</p>
				<div class="site-footer__map-shell">
					<iframe
						class="site-footer__map"
						src={VISIT_MAP_EMBED_SRC}
						title="Google Map — AllCare Refrigeration, 157 Church St, Albion Park NSW"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						allowfullscreen
					></iframe>
				</div>
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
			radial-gradient(1200px 600px at 90% -10%, rgba(15, 87, 251, 0.16), transparent 70%),
			radial-gradient(1000px 600px at -10% 30%, rgba(4, 45, 122, 0.1), transparent 70%),
			linear-gradient(180deg, var(--color-mist) 0%, #ffffff 38%, var(--color-frost) 100%);
		color: var(--color-ink);
		overflow-x: clip;
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
		background: radial-gradient(circle, rgba(15, 87, 251, 0.5), rgba(15, 87, 251, 0));
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.atmosphere__blob--b {
		top: 30rem;
		right: -10rem;
		width: 36rem;
		height: 36rem;
		background: radial-gradient(circle, rgba(77, 132, 255, 0.52), rgba(77, 132, 255, 0));
		animation-duration: 28s;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.atmosphere__blob--c {
		bottom: -12rem;
		left: 30%;
		width: 32rem;
		height: 32rem;
		background: radial-gradient(circle, rgba(4, 45, 122, 0.34), rgba(4, 45, 122, 0));
		animation-duration: 32s;
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.section-inner--header {
		width: 100%;
		max-width: 114rem;
		margin-inline: auto;
		padding-inline: clamp(1.25rem, 3.5vw, 3.5rem);
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		transition: transform 260ms var(--ease-spring);
	}

	.emergency-strip {
		position: relative;
		background: linear-gradient(
			90deg,
			var(--color-brand-deeper),
			var(--color-brand) 55%,
			var(--color-brand-light)
		);
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

	@keyframes radar-pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(128, 239, 209, 0.85);
		}
		70% {
			box-shadow: 0 0 0 9px rgba(128, 239, 209, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(128, 239, 209, 0);
		}
	}

	.emergency-strip__dot {
		width: 0.58rem;
		height: 0.58rem;
		border-radius: 999px;
		background: #80efd1;
		animation: radar-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
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
		padding: 0.15rem 0.45rem;
		border-radius: 6px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.45);
		transition:
			border-color 200ms ease,
			background 200ms ease,
			transform 200ms var(--ease-spring);
	}

	.emergency-strip__cta strong {
		font-size: 0.92rem;
		font-weight: 800;
	}

	.emergency-strip__cta:hover,
	.emergency-strip__cta:focus-visible {
		border-color: #ffffff;
		background: rgba(255, 255, 255, 0.14);
		transform: translateY(-1px);
	}

	.header-glass {
		background: rgba(255, 255, 255, 0.76);
		border-bottom: 1px solid var(--color-line);
		backdrop-filter: blur(20px) saturate(150%);
		-webkit-backdrop-filter: blur(20px) saturate(150%);
		transition:
			background 280ms ease,
			box-shadow 280ms ease,
			border-color 280ms ease;
	}

	.site-header--condensed .header-glass {
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 14px 40px -12px rgba(4, 45, 122, 0.22);
		border-bottom-color: rgba(15, 87, 251, 0.15);
	}

	.nav-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: clamp(1.25rem, 2.5vw, 3rem);
		padding-block: 0.95rem;
		transition: padding-block 260ms var(--ease-spring);
	}

	.site-header--condensed .nav-wrap {
		padding-block: 0.65rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		flex: 0 0 auto;
		min-width: 0;
		color: var(--color-ink);
		text-decoration: none;
	}

	.brand--stack {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
	}

	.brand-logo {
		display: block;
		height: 4.75rem;
		width: auto;
		max-width: min(280px, 52vw);
		object-fit: contain;
		transform-origin: left center;
		transition: transform 260ms var(--ease-spring);
	}

	a.brand:hover .brand-logo,
	a.brand:focus-visible .brand-logo {
		transform: scale(1.02);
	}

	.brand-logo--footer {
		height: 3.85rem;
		max-width: min(310px, 90vw);
	}

	.brand-loc {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #a8c5f5;
	}

	.site-header--condensed .brand-logo {
		transform: scale(0.92);
	}

	a.brand:hover .site-header--condensed .brand-logo,
	.site-header--condensed a.brand:hover .brand-logo {
		transform: scale(0.95);
	}

	.primary-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.5rem, 1.2vw, 1.25rem);
		flex: 1 1 auto;
	}

	.primary-nav a.nav-link,
	.nav-dropdown__summary {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.98rem;
		font-weight: 600;
		color: #334155;
		text-decoration: none;
		padding: 0.65rem 1.15rem;
		border-radius: 999px;
		letter-spacing: -0.01em;
		white-space: nowrap;
		cursor: pointer;
		user-select: none;
		transition:
			background 200ms ease,
			color 200ms ease,
			transform 200ms var(--ease-spring);
	}

	.primary-nav a.nav-link::after,
	.nav-dropdown__summary::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0.32rem;
		width: 0;
		height: 2.5px;
		background: linear-gradient(90deg, var(--color-brand-light), var(--color-brand-deep));
		border-radius: 999px;
		transform: translateX(-50%);
		transition: width 260ms var(--ease-spring);
		pointer-events: none;
	}

	.primary-nav a.nav-link:hover,
	.primary-nav a.nav-link:focus-visible,
	.nav-dropdown__summary:hover,
	.nav-dropdown__summary:focus-visible,
	.nav-dropdown[open] .nav-dropdown__summary {
		background: rgba(15, 87, 251, 0.08);
		color: var(--color-brand-deep);
		outline: none;
	}

	.primary-nav a.nav-link:hover,
	.nav-dropdown__summary:hover {
		transform: translateY(-1px);
	}

	.primary-nav a.nav-link:hover::after,
	.primary-nav a.nav-link:focus-visible::after,
	.nav-dropdown__summary:hover::after,
	.nav-dropdown[open] .nav-dropdown__summary::after,
	.nav-dropdown__summary:focus-visible::after {
		width: calc(100% - 1.8rem);
	}

	.nav-dropdown {
		position: relative;
		align-self: center;
	}

	/* Bridge pseudo-element to prevent cursor dropouts */
	.nav-dropdown::before {
		content: '';
		position: absolute;
		inset-inline: -1rem;
		top: 100%;
		height: 0.75rem;
		pointer-events: auto;
	}

	.nav-dropdown__summary::-webkit-details-marker {
		display: none;
	}

	.nav-dropdown__chev {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		opacity: 0.7;
		transition:
			transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 200ms ease;
	}

	.nav-dropdown[open] .nav-dropdown__chev {
		transform: rotate(180deg);
		opacity: 1;
		color: var(--color-brand);
	}

	@keyframes dropdown-enter {
		0% {
			opacity: 0;
			transform: translateX(-50%) translateY(-10px) scale(0.96);
			filter: blur(4px);
		}
		100% {
			opacity: 1;
			transform: translateX(-50%) translateY(0) scale(1);
			filter: blur(0px);
		}
	}

	.nav-dropdown__panel {
		position: absolute;
		top: calc(100% + 0.55rem);
		left: 50%;
		transform: translateX(-50%);
		width: max-content;
		min-width: 24rem;
		max-width: min(28rem, calc(100vw - 2rem));
		max-height: min(78vh, 32rem);
		overflow-y: auto;
		padding: 0.55rem;
		background: rgba(255, 255, 255, 0.97);
		backdrop-filter: blur(24px) saturate(160%);
		-webkit-backdrop-filter: blur(24px) saturate(160%);
		border: 1px solid rgba(15, 87, 251, 0.15);
		border-radius: 1.15rem;
		box-shadow:
			0 24px 50px -12px rgba(4, 45, 122, 0.22),
			0 0 0 1px rgba(255, 255, 255, 0.9) inset;
		z-index: 50;
		animation: dropdown-enter 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transform-origin: top center;
	}

	.nav-dropdown__overview {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.85rem;
		padding: 0.8rem 1rem;
		border-radius: 0.85rem;
		background: linear-gradient(135deg, rgba(15, 87, 251, 0.08), rgba(77, 132, 255, 0.04));
		border: 1px solid rgba(15, 87, 251, 0.12);
		text-decoration: none;
		margin-bottom: 0.45rem;
		transition:
			background 200ms ease,
			border-color 200ms ease,
			transform 200ms var(--ease-spring),
			box-shadow 200ms ease;
	}

	.nav-dropdown__overview:hover,
	.nav-dropdown__overview:focus-visible {
		background: linear-gradient(135deg, rgba(15, 87, 251, 0.14), rgba(77, 132, 255, 0.08));
		border-color: rgba(15, 87, 251, 0.25);
		transform: translateY(-1px);
		box-shadow: 0 6px 18px -4px rgba(15, 87, 251, 0.18);
		outline: none;
	}

	.nav-dropdown__overview-content {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.nav-dropdown__overview-title {
		font-size: 0.92rem;
		font-weight: 800;
		color: var(--color-brand-deep);
		letter-spacing: -0.01em;
	}

	.nav-dropdown__overview-sub {
		font-size: 0.76rem;
		font-weight: 500;
		color: var(--color-ink-soft);
	}

	.nav-dropdown__arrow-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.85rem;
		height: 1.85rem;
		border-radius: 999px;
		background: rgba(15, 87, 251, 0.12);
		color: var(--color-brand);
		flex-shrink: 0;
		transition:
			transform 200ms var(--ease-spring),
			background 200ms ease,
			color 200ms ease;
	}

	.nav-dropdown__arrow-badge svg {
		width: 0.95rem;
		height: 0.95rem;
	}

	.nav-dropdown__overview:hover .nav-dropdown__arrow-badge {
		transform: translateX(3px);
		background: var(--color-brand);
		color: #ffffff;
	}

	.nav-dropdown__list {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.nav-dropdown__link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.85rem;
		border-radius: 0.7rem;
		color: #334155;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.92rem;
		white-space: nowrap;
		transition:
			background 180ms ease,
			color 180ms ease,
			transform 180ms var(--ease-spring),
			padding 180ms ease;
	}

	.nav-dropdown__link::after {
		display: none !important;
	}

	.nav-dropdown__bullet {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: rgba(15, 87, 251, 0.35);
		flex-shrink: 0;
		transition:
			transform 200ms var(--ease-spring),
			background 200ms ease,
			box-shadow 200ms ease;
	}

	.nav-dropdown__bullet--loc {
		background: rgba(16, 185, 129, 0.45);
	}

	.nav-dropdown__text {
		flex: 1 1 auto;
		font-weight: 600;
	}

	.nav-dropdown__link-arrow {
		width: 0.9rem;
		height: 0.9rem;
		color: var(--color-brand);
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity 180ms ease,
			transform 180ms var(--ease-spring);
		flex-shrink: 0;
	}

	.nav-dropdown__link:hover,
	.nav-dropdown__link:focus-visible {
		background: rgba(15, 87, 251, 0.08);
		color: var(--color-brand-deep);
		transform: translateX(4px);
		outline: none;
	}

	.nav-dropdown__link:hover .nav-dropdown__bullet {
		transform: scale(1.4);
		background: var(--color-brand);
		box-shadow: 0 0 8px rgba(15, 87, 251, 0.5);
	}

	.nav-dropdown__link:hover .nav-dropdown__bullet--loc {
		transform: scale(1.4);
		background: #10b981;
		box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
	}

	.nav-dropdown__link:hover .nav-dropdown__link-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		flex: 0 0 auto;
	}

	.quote-btn {
		position: relative;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(
			135deg,
			var(--color-brand-light) 0%,
			var(--color-brand) 55%,
			var(--color-brand-deep) 100%
		);
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.98rem;
		padding: 0.72rem 1.4rem;
		border-radius: 999px;
		box-shadow: 0 12px 30px -8px rgba(15, 87, 251, 0.5);
		letter-spacing: -0.01em;
		white-space: nowrap;
		transition:
			box-shadow 240ms var(--ease-spring),
			transform 240ms var(--ease-spring),
			filter 240ms var(--ease-spring);
	}

	.quote-btn::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -80%;
		width: 50%;
		height: 200%;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.35) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		transform: rotate(25deg);
		transition: transform 600ms ease;
		pointer-events: none;
	}

	.quote-btn:hover::after {
		transform: rotate(25deg) translateX(400%);
	}

	.quote-btn svg {
		width: 1.05rem;
		height: 1.05rem;
		transition: transform 240ms var(--ease-spring);
	}

	.quote-btn:hover,
	.quote-btn:focus-visible {
		box-shadow: 0 16px 38px -6px rgba(15, 87, 251, 0.62);
		transform: translateY(-2px);
		filter: brightness(1.05);
		outline: none;
	}

	.quote-btn:active {
		transform: translateY(0);
		box-shadow: 0 8px 20px -4px rgba(15, 87, 251, 0.45);
	}

	.quote-btn:hover svg {
		transform: translateX(4px);
	}

	.menu-toggle {
		position: relative;
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0.6rem;
		border: 1px solid var(--color-line);
		border-radius: 0.85rem;
		background: rgba(255, 255, 255, 0.9);
		cursor: pointer;
		transition:
			background 200ms ease,
			border-color 200ms ease,
			transform 200ms ease;
	}

	.menu-toggle:hover {
		background: rgba(15, 87, 251, 0.08);
		border-color: rgba(15, 87, 251, 0.25);
	}

	.menu-toggle span {
		display: block;
		width: 1.35rem;
		height: 2px;
		background: #1e293b;
		border-radius: 999px;
		transition:
			transform 260ms var(--ease-spring),
			opacity 200ms ease;
		transform-origin: center;
	}

	.menu-toggle--open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.menu-toggle--open span:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}

	.menu-toggle--open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	@keyframes mobile-nav-slide {
		0% {
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-nav {
		display: none;
		flex-direction: column;
		gap: 0.35rem;
		padding: 0.75rem clamp(1rem, 4vw, 2.75rem) 1.25rem;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--color-line);
		box-shadow: 0 16px 36px -12px rgba(4, 45, 122, 0.15);
		animation: mobile-nav-slide 250ms var(--ease-spring) forwards;
	}

	.mobile-nav a {
		padding: 0.7rem 0.85rem;
		text-decoration: none;
		color: var(--color-ink);
		font-weight: 700;
		border-radius: 0.7rem;
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	.mobile-nav a:hover {
		background: rgba(15, 87, 251, 0.12);
		color: var(--color-brand-deep);
	}

	.mobile-nav__dropdown {
		border-radius: 0.7rem;
	}

	.mobile-nav__summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		list-style: none;
		padding: 0.7rem 0.85rem;
		cursor: pointer;
		font-weight: 700;
		color: var(--color-ink);
		border-radius: 0.7rem;
		transition: background 180ms ease;
	}

	.mobile-nav__summary::-webkit-details-marker {
		display: none;
	}

	.mobile-nav__chev {
		width: 1rem;
		height: 1rem;
		opacity: 0.7;
		transition: transform 240ms var(--ease-spring);
	}

	.mobile-nav__dropdown[open] .mobile-nav__summary {
		background: rgba(15, 87, 251, 0.08);
	}

	.mobile-nav__dropdown[open] .mobile-nav__chev {
		transform: rotate(180deg);
	}

	.mobile-nav__sub {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.25rem 0 0.45rem 0.75rem;
	}

	.mobile-nav__sub a {
		padding: 0.55rem 0.75rem;
		font-weight: 600;
		font-size: 0.92rem;
		color: #475569;
		text-decoration: none;
		border-radius: 0.55rem;
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	.mobile-nav__sub a:hover {
		background: rgba(15, 87, 251, 0.1);
		color: var(--color-brand-deep);
	}

	.mobile-nav__cta {
		margin-top: 0.5rem;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		color: #ffffff !important;
		text-align: center;
		box-shadow: 0 8px 24px -6px rgba(15, 87, 251, 0.4);
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
			radial-gradient(800px 320px at 90% 0%, rgba(15, 87, 251, 0.16), transparent 70%),
			linear-gradient(180deg, var(--color-brand-deeper), var(--color-brand-night));
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
			rgba(77, 132, 255, 0.55),
			rgba(15, 87, 251, 0.55),
			transparent
		);
	}

	.site-footer .brand {
		color: #ffffff;
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

	.site-footer__visit .site-footer__map-shell {
		margin-top: 0.85rem;
		position: relative;
		aspect-ratio: 16 / 10;
		max-height: 14rem;
		min-height: 10rem;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.14);
		box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
		background: rgba(10, 46, 81, 0.35);
	}

	.site-footer__map {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
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
			display: flex;
		}

		.primary-nav {
			display: none;
		}

		.mobile-nav {
			display: flex;
		}

		.site-footer__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.nav-actions .quote-btn {
			display: none;
		}
	}

	@media (max-width: 560px) {
		.brand-logo {
			height: 2.85rem;
			max-width: min(260px, 58vw);
		}

		.site-header--condensed .brand-logo {
			transform: scale(0.92);
		}

		.brand-logo--footer {
			height: 3.35rem;
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
