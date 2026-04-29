<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Snippet } from 'svelte';

	type Props = {
		placeholderKey: string;
		ariaLabel: string;
		edit: boolean;
		imageUrl?: string | null;
		wrapperClass?: string;
		children: Snippet;
	};

	let {
		placeholderKey,
		ariaLabel,
		edit,
		imageUrl = null,
		wrapperClass = '',
		children
	}: Props = $props();

	let inputEl: HTMLInputElement | undefined = $state();
	let busy = $state(false);
	let err = $state<string | null>(null);

	const staticRole = $derived<'img' | undefined>(
		edit ? undefined : imageUrl ? undefined : 'img'
	);

	async function onFile(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		input.value = '';
		if (!file) return;

		err = null;
		busy = true;
		try {
			const fd = new FormData();
			fd.set('file', file);
			fd.set('placeholder_key', placeholderKey);
			const res = await fetch('/api/site-assets/upload', { method: 'POST', body: fd });
			if (!res.ok) {
				const text = await res.text();
				let m = res.statusText;
				try {
					const body = JSON.parse(text) as { message?: string; detail?: string };
					if (import.meta.env.DEV && body.detail) m = body.detail;
					else if (body.message) m = body.message;
					else m = text.slice(0, 500) || m;
				} catch {
					m = text.slice(0, 500) || m;
				}
				throw new Error(m);
			}
			await invalidateAll();
		} catch (e) {
			err = e instanceof Error ? e.message : 'Upload failed';
		} finally {
			busy = false;
		}
	}
</script>

<svelte:element
	this={edit ? 'button' : 'div'}
	type={edit ? 'button' : undefined}
	class="site-image-slot {wrapperClass}"
	class:site-image-slot--edit={edit}
	class:site-image-slot--has-image={!!imageUrl}
	role={staticRole}
	aria-label={ariaLabel}
	onclick={edit ? () => inputEl?.click() : undefined}
>
	{#if imageUrl}
		<img src={imageUrl} alt="" class="site-image-slot__img" loading="lazy" decoding="async" />
	{:else}
		<div class="site-image-slot__placeholder-inner">
			{@render children()}
		</div>
	{/if}

	{#if edit}
		<input
			bind:this={inputEl}
			class="site-image-slot__file"
			type="file"
			accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
			disabled={busy}
			onclick={(e) => e.stopPropagation()}
			onchange={onFile}
		/>
		{#if busy}
			<div class="site-image-slot__overlay" aria-live="polite">Uploading…</div>
		{:else}
			<div class="site-image-slot__hint">
				{imageUrl ? 'Click to replace image' : 'Click to upload image'}
			</div>
		{/if}
		{#if err}
			<p class="site-image-slot__error" role="alert">{err}</p>
		{/if}
	{/if}
</svelte:element>

<style>
	.site-image-slot {
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

	button.site-image-slot {
		width: 100%;
		margin: 0;
		font: inherit;
		color: inherit;
		text-align: inherit;
		appearance: none;
		border-width: 1px;
		border-style: solid;
		cursor: pointer;
		outline-offset: 4px;
	}

	button.site-image-slot:focus-visible {
		outline: 2px solid #62ace8;
	}

	.site-image-slot--has-image {
		padding: 0;
		border-color: rgba(98, 172, 232, 0.35);
		background: #0f172a;
	}

	.site-image-slot__img {
		width: 100%;
		height: 100%;
		min-height: inherit;
		object-fit: cover;
		display: block;
	}

	.site-image-slot__placeholder-inner {
		position: relative;
		z-index: 1;
		display: grid;
		gap: 0.35rem;
		place-items: center;
		padding: 1rem;
	}

	.site-image-slot__file {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.site-image-slot__hint {
		position: absolute;
		right: 0.65rem;
		bottom: 0.65rem;
		z-index: 3;
		padding: 0.35rem 0.6rem;
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.72);
		color: #f8fafc;
		font-size: 0.72rem;
		font-weight: 700;
		pointer-events: none;
	}

	.site-image-slot__overlay {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: grid;
		place-items: center;
		background: rgba(15, 23, 42, 0.45);
		color: #ffffff;
		font-weight: 800;
	}

	.site-image-slot__error {
		position: absolute;
		left: 0.5rem;
		right: 0.5rem;
		bottom: 2.4rem;
		z-index: 4;
		margin: 0;
		padding: 0.4rem 0.55rem;
		border-radius: 10px;
		background: rgba(185, 28, 28, 0.92);
		color: #ffffff;
		font-size: 0.75rem;
		font-weight: 700;
	}
</style>
