<script lang="ts">
	let { variant = 'card' }: { variant?: 'card' | 'inline' } = $props();

	const arctickLogoUrl = 'https://arctick.org/images/ARCtick_Logo.jpg';
	const arctickLicense = 'AU53597';
</script>

<div class="arctick-badge arctick-badge--{variant}">
	<p class="arctick-badge__heading">
		<span class="arctick-badge__check" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
				<path d="M20 6 9 17l-5-5" />
			</svg>
		</span>
		Licensed
	</p>
	<div class="arctick-badge__logo-wrap">
		<img
			class="arctick-badge__logo"
			src={arctickLogoUrl}
			alt="ARCtick — Australian Refrigeration Council licensed technician"
			width="132"
			height="48"
			loading="lazy"
			decoding="async"
		/>
	</div>
	<small class="arctick-badge__license">{arctickLicense}</small>
</div>

<style>
	.arctick-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.arctick-badge__heading {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		margin: 0 0 0.55rem;
		color: var(--color-brand-deeper);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		line-height: 1;
	}

	.arctick-badge__check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 1.35rem;
		height: 1.35rem;
		border-radius: 999px;
		background: linear-gradient(135deg, #34d399, #059669);
		color: #ffffff;
		box-shadow: 0 6px 14px -6px rgba(5, 150, 105, 0.65);
	}

	.arctick-badge__check svg {
		width: 0.72rem;
		height: 0.72rem;
	}

	.arctick-badge__logo-wrap {
		display: flex;
		justify-content: center;
	}

	.arctick-badge__logo {
		display: block;
		width: min(8.25rem, 100%);
		height: auto;
		margin-inline: auto;
	}

	.arctick-badge__license {
		display: block;
		color: var(--color-ink-soft);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		margin-top: 0.35rem;
	}

	.arctick-badge--inline {
		width: fit-content;
		margin-top: 1rem;
		text-align: left;
		align-items: flex-start;
		padding: 0.85rem 1rem;
		border-radius: 0.85rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
	}

	.arctick-badge--inline .arctick-badge__heading {
		color: #ffffff;
	}

	.arctick-badge--inline .arctick-badge__logo-wrap {
		padding: 0.4rem 0.55rem;
		border-radius: 0.55rem;
		background: rgba(255, 255, 255, 0.96);
	}

	.arctick-badge--inline .arctick-badge__license {
		color: #c9dcef;
	}
</style>
