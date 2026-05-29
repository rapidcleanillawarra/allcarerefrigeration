<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { env } from '$env/dynamic/public';
	import SiteImageSlot from '$lib/components/site-image-slot.svelte';
	import { getPopulatedQuoteValues, type QuoteFormValues } from '$lib/quote-form-sample-data';
	import { executeRecaptcha, loadRecaptcha } from '$lib/recaptcha';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	const RECAPTCHA_ACTION = 'quote_submit';
	const MAX_PHOTOS = 8;
	const recaptchaSiteKey = env.PUBLIC_RECAPTCHA_SITE_KEY ?? '';

	type SelectedPhoto = {
		id: string;
		file: File;
		previewUrl: string;
	};

	let { form, data }: PageProps = $props();

	let draftValues = $state<QuoteFormValues | undefined>(undefined);

	const serviceOptions = [
		{ value: 'commercial-refrigeration-repair', label: 'Commercial refrigeration repair' },
		{ value: 'cool-room-freezer-room', label: 'Cool room / freezer room service' },
		{ value: 'air-conditioning-repair', label: 'Air conditioning repair' },
		{ value: 'air-conditioning-installation', label: 'Air conditioning installation' },
		{ value: 'new-refrigeration-installation', label: 'New refrigeration installation' },
		{ value: 'preventative-maintenance', label: 'Preventative maintenance' },
		{ value: 'other-service', label: 'Other' }
	];

	const equipmentOptions = [
		{ value: 'cool-room', label: 'Cool room' },
		{ value: 'freezer-room', label: 'Freezer room' },
		{ value: 'display-fridge', label: 'Display fridge' },
		{ value: 'upright-fridge-freezer', label: 'Upright fridge or freezer' },
		{ value: 'under-bench-fridge', label: 'Under-bench fridge' },
		{ value: 'ice-machine', label: 'Ice machine' },
		{ value: 'split-system-ac', label: 'Split system air conditioner' },
		{ value: 'ducted-ac', label: 'Ducted air conditioning' },
		{ value: 'other-equipment', label: 'Other' }
	];

	const accessOptions = [
		{ value: 'easy-access', label: 'Easy access' },
		{ value: 'restricted-access', label: 'Restricted access' },
		{ value: 'after-hours', label: 'After-hours access required' },
		{ value: 'shopping-centre-strata', label: 'Shopping centre / strata / building management access' },
		{ value: 'height-access', label: 'Height access required' },
		{ value: 'other-access', label: 'Other' }
	];

	const contactOptions = [
		{ value: 'phone', label: 'Phone' },
		{ value: 'email', label: 'Email' },
		{ value: 'sms', label: 'SMS' }
	];

	const issuePrompts = [
		'Is the unit not cooling?',
		'Is it leaking water?',
		'Is there ice build-up?',
		'Is it making noise?',
		'Are you after a new installation?',
		'Do you need scheduled maintenance?'
	];

	let submitting = $state(false);
	let recaptchaError = $state('');
	let recaptchaStatus = $state<'unconfigured' | 'loading' | 'ready' | 'error'>(
		recaptchaSiteKey ? 'loading' : 'unconfigured'
	);
	let selectedPhotos = $state<SelectedPhoto[]>([]);
	let photosInput = $state<HTMLInputElement | null>(null);
	let photoLimitMessage = $state('');
	let selectedServices = $state<string[]>([]);
	let selectedEquipment = $state<string[]>([]);
	let selectedSiteAccess = $state<string[]>([]);
	let preferredDateTimeValue = $state('');

	const OTHER_SERVICE = 'other-service';
	const OTHER_EQUIPMENT = 'other-equipment';
	const OTHER_ACCESS = 'other-access';
	const showOtherService = $derived(selectedServices.includes(OTHER_SERVICE));
	const showOtherEquipment = $derived(selectedEquipment.includes(OTHER_EQUIPMENT));
	const showOtherAccess = $derived(selectedSiteAccess.includes(OTHER_ACCESS));

	const values = $derived.by(() => {
		if (form?.values) return form.values as QuoteFormValues;
		return (draftValues ?? {}) as QuoteFormValues;
	});
	const errors = $derived.by(() => (form?.errors ?? {}) as Record<string, string>);
	const submitted = $derived(form?.success === true);
	const recaptchaReady = $derived(recaptchaStatus === 'ready');
	const showRecaptchaStatus = $derived(Boolean(recaptchaSiteKey) || import.meta.env.DEV);

	$effect(() => {
		selectedServices = [...(values.services ?? [])];
	});

	$effect(() => {
		selectedEquipment = [...(values.equipment ?? [])];
	});

	$effect(() => {
		selectedSiteAccess = [...(values.siteAccess ?? [])];
	});

	$effect(() => {
		preferredDateTimeValue = values.preferredDateTime ?? '';
	});

	const preferredDateTimeDisplay = $derived(formatPreferredDateTime(preferredDateTimeValue));

	function formatPreferredDateTime(value: string): string {
		if (!value) return '';

		const [datePart, timePart] = value.split('T');
		if (!datePart || !timePart) return '';

		const [year, month, day] = datePart.split('-').map(Number);
		const [hour, minute] = timePart.split(':').map(Number);
		const date = new Date(year, month - 1, day, hour, minute);

		if (Number.isNaN(date.getTime())) return '';

		const monthName = date.toLocaleString('en-US', { month: 'long' });
		const time = date.toLocaleString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});

		return `${monthName} ${date.getDate()}, ${date.getFullYear()} ${time}`;
	}

	function onSelectionChange(
		current: string[],
		value: string,
		checked: boolean,
		setter: (next: string[]) => void
	) {
		if (checked) {
			setter([...current, value]);
			return;
		}

		setter(current.filter((item) => item !== value));
	}

	function onServiceChange(value: string, checked: boolean) {
		onSelectionChange(selectedServices, value, checked, (next) => {
			selectedServices = next;
		});
	}

	function onEquipmentChange(value: string, checked: boolean) {
		onSelectionChange(selectedEquipment, value, checked, (next) => {
			selectedEquipment = next;
		});
	}

	function onSiteAccessChange(value: string, checked: boolean) {
		onSelectionChange(selectedSiteAccess, value, checked, (next) => {
			selectedSiteAccess = next;
		});
	}

	onMount(() => {
		return () => {
			for (const photo of selectedPhotos) {
				URL.revokeObjectURL(photo.previewUrl);
			}
		};
	});

	onMount(async () => {
		if (data.populate) {
			draftValues = await getPopulatedQuoteValues();
			console.log('[get-a-quote] populated form:', JSON.stringify(draftValues, null, 2));
		}

		if (!recaptchaSiteKey) {
			recaptchaStatus = 'unconfigured';
			return;
		}

		recaptchaStatus = 'loading';

		try {
			await loadRecaptcha(recaptchaSiteKey);
			await executeRecaptcha(recaptchaSiteKey, RECAPTCHA_ACTION);
			recaptchaStatus = 'ready';
		} catch {
			recaptchaStatus = 'error';
		}
	});

	function describePhotoFile(file: File, index?: number) {
		return {
			index,
			name: file.name,
			size: file.size,
			type: file.type || 'application/octet-stream',
			lastModified: file.lastModified
		};
	}

	function logSelectedPhotos(context: string) {
		console.info(`[get-a-quote][photos] ${context}`, {
			selectedCount: selectedPhotos.length,
			inputFileCount: photosInput?.files?.length ?? 0,
			selectedPhotos: selectedPhotos.map((photo, index) => describePhotoFile(photo.file, index)),
			inputFiles: photosInput?.files
				? Array.from(photosInput.files).map((file, index) => describePhotoFile(file, index))
				: []
		});
	}

	function syncPhotosInput() {
		if (!photosInput) {
			console.warn('[get-a-quote][photos] syncPhotosInput skipped: photos input not bound yet');
			return;
		}

		const transfer = new DataTransfer();
		for (const photo of selectedPhotos) {
			transfer.items.add(photo.file);
		}
		photosInput.files = transfer.files;
		logSelectedPhotos('synced photos to file input');
	}

	function isDuplicatePhoto(file: File, photos: SelectedPhoto[]) {
		return photos.some(
			(photo) =>
				photo.file.name === file.name &&
				photo.file.size === file.size &&
				photo.file.lastModified === file.lastModified
		);
	}

	function onPhotosChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const picked = input.files ? Array.from(input.files) : [];
		if (picked.length === 0) return;

		photoLimitMessage = '';
		const remaining = MAX_PHOTOS - selectedPhotos.length;
		const nextPhotos = [...selectedPhotos];

		for (const file of picked) {
			if (nextPhotos.length >= MAX_PHOTOS) {
				photoLimitMessage = `You can upload up to ${MAX_PHOTOS} photos.`;
				break;
			}

			if (isDuplicatePhoto(file, nextPhotos)) continue;

			nextPhotos.push({
				id: crypto.randomUUID(),
				file,
				previewUrl: URL.createObjectURL(file)
			});
		}

		selectedPhotos = nextPhotos;
		syncPhotosInput();
		input.value = '';
		logSelectedPhotos('photos added from file picker');
	}

	function removePhoto(id: string) {
		const photo = selectedPhotos.find((entry) => entry.id === id);
		if (photo) URL.revokeObjectURL(photo.previewUrl);

		selectedPhotos = selectedPhotos.filter((entry) => entry.id !== id);
		photoLimitMessage = '';
		syncPhotosInput();
		logSelectedPhotos(`removed photo ${photo?.file.name ?? id}`);
	}
</script>

<svelte:head>
	<title>Get a Quote | AllCare Refrigeration</title>
	<meta
		name="description"
		content="Request a refrigeration or air conditioning quote from AllCare Refrigeration. Tell us about your equipment, issue, and site details for a fast, accurate response."
	/>
</svelte:head>

<!-- HERO ------------------------------------------------------------- -->
<section class="hero" aria-labelledby="quote-heading">
	<div class="hero-bg" aria-hidden="true">
		<span class="hero-bg__layer hero-bg__layer--1" data-parallax="0.18"></span>
		<span class="hero-bg__layer hero-bg__layer--2" data-parallax="0.32"></span>
		<span class="hero-bg__grid"></span>
	</div>

	<div class="section-inner section-inner--wide hero-grid">
		<div class="hero-copy">
			<p class="eyebrow eyebrow--on-dark reveal reveal--up">Get a Quote</p>
			<h1 id="quote-heading" class="reveal reveal--up">
				Tell us about your job and
				<span class="hero-highlight">we'll get back to you quickly.</span>
			</h1>
			<p class="hero-lead reveal reveal--up">
				Complete the form below with as much detail as you can. The more we know about your
				equipment and site, the faster we can provide an accurate quote.
			</p>
		</div>

		<div class="hero-visual reveal reveal--scale" data-parallax="-0.05">
			<div class="hero-cutout">
				<SiteImageSlot
					placeholderKey="quote:hero"
					ariaLabel="Hero image: refrigeration or air conditioning equipment for quote requests"
					edit={data.edit}
					imageUrl={data.imageMap['quote:hero']}
					wrapperClass="image-placeholder hero-cutout-slot"
				>
					{#snippet children()}
						<span>Hero image placeholder</span>
						<small>Upload a PNG with a transparent background for best results</small>
					{/snippet}
				</SiteImageSlot>
			</div>
		</div>
	</div>
</section>

{#if !submitted}
	<a
		class="emergency-bubble reveal reveal--scale"
		href="tel:0411532233"
		aria-label="Emergency? Call us now at 0411 532 233"
	>
		<span class="emergency-bubble__dot pulse-ring" aria-hidden="true"></span>
		Emergency? Call us now!
	</a>
{/if}

<!-- FORM ------------------------------------------------------------- -->
<section class="quote-section section-shell" aria-labelledby="quote-form-heading">
	<div class="section-inner section-inner--narrow">
		{#if submitted}
			<div class="success-panel reveal reveal--up" role="status">
				<div class="success-panel__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
						<path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<h2 id="quote-form-heading">Thanks — your quote request has been received.</h2>
				<p>
					Our team will review your details and contact you using your preferred method.
				</p>
				<a class="btn-secondary" href={resolve('/')}>Back to home</a>
			</div>
		{:else}
			<div class="form-intro reveal reveal--up">
				<h2 id="quote-form-heading">Quote request form</h2>
				<p>Fields marked with <span class="required-mark">*</span> are required.</p>
			</div>

			<form
				class="quote-form reveal reveal--up"
				method="POST"
				enctype="multipart/form-data"
				use:enhance={async ({ formData, cancel }) => {
					submitting = true;
					recaptchaError = '';

					syncPhotosInput();

					formData.delete('photos');
					for (const photo of selectedPhotos) {
						formData.append('photos', photo.file);
					}

					const formPhotoEntries = formData.getAll('photos');
					console.info('[get-a-quote][photos] form submit payload', {
						selectedCount: selectedPhotos.length,
						formPhotoEntryCount: formPhotoEntries.length,
						formPhotoEntries: formPhotoEntries.map((entry, index) => ({
							index,
							type: Object.prototype.toString.call(entry),
							isFile: entry instanceof File,
							size: entry instanceof File ? entry.size : null,
							name: entry instanceof File ? entry.name : String(entry)
						}))
					});
					logSelectedPhotos('submitting form');

					try {
						if (recaptchaSiteKey) {
							const token = await executeRecaptcha(recaptchaSiteKey, RECAPTCHA_ACTION);
							formData.set('recaptchaToken', token);
						}
					} catch {
						recaptchaStatus = 'error';
						recaptchaError =
							'Security verification failed. Please refresh the page and try again.';
						cancel();
						submitting = false;
						return;
					}

					return async ({ result }) => {
						console.log('[get-a-quote] submission JSON:', JSON.stringify(result, null, 2));
						await applyAction(result);
						submitting = false;
					};
				}}
			>
				<!-- 1. Customer Details -->
				<fieldset class="form-section">
					<legend>1. Customer Details</legend>

					<div class="field-grid">
						<div class="field">
							<label for="fullName">Full Name <span class="required-mark">*</span></label>
							<input
								id="fullName"
								name="fullName"
								type="text"
								autocomplete="name"
								required
								value={values.fullName ?? ''}
								aria-invalid={errors.fullName ? 'true' : undefined}
								aria-describedby={errors.fullName ? 'fullName-error' : undefined}
							/>
							{#if errors.fullName}
								<p class="field-error" id="fullName-error">{errors.fullName}</p>
							{/if}
						</div>

						<div class="field">
							<label for="businessName">Business / Company Name</label>
							<input
								id="businessName"
								name="businessName"
								type="text"
								autocomplete="organization"
								value={values.businessName ?? ''}
							/>
						</div>

						<div class="field">
							<label for="phone">Phone Number <span class="required-mark">*</span></label>
							<input
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								required
								value={values.phone ?? ''}
								aria-invalid={errors.phone ? 'true' : undefined}
								aria-describedby={errors.phone ? 'phone-error' : undefined}
							/>
							{#if errors.phone}
								<p class="field-error" id="phone-error">{errors.phone}</p>
							{/if}
						</div>

						<div class="field">
							<label for="email">Email Address <span class="required-mark">*</span></label>
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								value={values.email ?? ''}
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={errors.email ? 'email-error' : undefined}
							/>
							{#if errors.email}
								<p class="field-error" id="email-error">{errors.email}</p>
							{/if}
						</div>

						<div class="field field--full">
							<label for="siteAddress">Site Address / Job Location <span class="required-mark">*</span></label>
							<input
								id="siteAddress"
								name="siteAddress"
								type="text"
								autocomplete="street-address"
								required
								value={values.siteAddress ?? ''}
								aria-invalid={errors.siteAddress ? 'true' : undefined}
								aria-describedby={errors.siteAddress ? 'siteAddress-error' : undefined}
							/>
							{#if errors.siteAddress}
								<p class="field-error" id="siteAddress-error">{errors.siteAddress}</p>
							{/if}
						</div>
					</div>
				</fieldset>

				<!-- 2. Services -->
				<fieldset class="form-section">
					<legend>2. What service do you need?</legend>
					<p class="fieldset-help">Please select one or more:</p>

					<div class="check-grid" role="group" aria-describedby={errors.services ? 'services-error' : undefined}>
						{#each serviceOptions as option (option.value)}
							<label class="check-card">
								<input
									type="checkbox"
									name="services"
									value={option.value}
									checked={selectedServices.includes(option.value)}
									onchange={(event) =>
										onServiceChange(option.value, event.currentTarget.checked)}
								/>
								<span>{option.label}</span>
							</label>
						{/each}
					</div>
					{#if showOtherService}
						<div class="field field--spaced">
							<label for="otherService">
								Please specify the service <span class="required-mark">*</span>
							</label>
							<input
								id="otherService"
								name="otherService"
								type="text"
								required
								value={values.otherService ?? ''}
								aria-invalid={errors.otherService ? 'true' : undefined}
								aria-describedby={errors.otherService ? 'otherService-error' : undefined}
							/>
							{#if errors.otherService}
								<p class="field-error" id="otherService-error">{errors.otherService}</p>
							{/if}
						</div>
					{/if}
					{#if errors.services}
						<p class="field-error" id="services-error">{errors.services}</p>
					{/if}
				</fieldset>

				<!-- 3. Equipment type -->
				<fieldset class="form-section">
					<legend>3. What type of equipment is involved?</legend>

					<div class="check-grid">
						{#each equipmentOptions as option (option.value)}
							<label class="check-card">
								<input
									type="checkbox"
									name="equipment"
									value={option.value}
									checked={selectedEquipment.includes(option.value)}
									onchange={(event) =>
										onEquipmentChange(option.value, event.currentTarget.checked)}
								/>
								<span>{option.label}</span>
							</label>
						{/each}
					</div>
					{#if showOtherEquipment}
						<div class="field field--spaced">
							<label for="otherEquipment">
								Please specify the equipment <span class="required-mark">*</span>
							</label>
							<input
								id="otherEquipment"
								name="otherEquipment"
								type="text"
								required
								value={values.otherEquipment ?? ''}
								aria-invalid={errors.otherEquipment ? 'true' : undefined}
								aria-describedby={errors.otherEquipment ? 'otherEquipment-error' : undefined}
							/>
							{#if errors.otherEquipment}
								<p class="field-error" id="otherEquipment-error">{errors.otherEquipment}</p>
							{/if}
						</div>
					{/if}
				</fieldset>

				<!-- 4. Issue description -->
				<fieldset class="form-section">
					<legend>4. Tell us about the issue or request</legend>
					<p class="fieldset-help">Briefly describe what you need help with:</p>

					<div class="field">
						<label class="sr-only" for="issueDescription">Issue or request details</label>
						<textarea
							id="issueDescription"
							name="issueDescription"
							rows="6"
							required
							placeholder="Describe the fault, installation requirements, or maintenance needs…"
							aria-invalid={errors.issueDescription ? 'true' : undefined}
							aria-describedby={errors.issueDescription ? 'issueDescription-error' : 'issue-prompts'}
						>{values.issueDescription ?? ''}</textarea>
						{#if errors.issueDescription}
							<p class="field-error" id="issueDescription-error">{errors.issueDescription}</p>
						{/if}
					</div>

					<ul class="prompt-list" id="issue-prompts" aria-label="Example prompts">
						{#each issuePrompts as prompt (prompt)}
							<li>{prompt}</li>
						{/each}
					</ul>
				</fieldset>

				<!-- 5. Preferred attendance -->
				<fieldset class="form-section">
					<legend>5. Preferred attendance date/time</legend>

					<div class="field">
						<label class="sr-only" for="preferredDateTime">Preferred attendance date/time</label>
						<div
							class="datetime-field"
							class:datetime-field--empty={!preferredDateTimeValue}
						>
							<span class="datetime-field__display" aria-hidden="true">
								{preferredDateTimeDisplay || 'Select date and time'}
							</span>
							<input
								id="preferredDateTime"
								name="preferredDateTime"
								type="datetime-local"
								class="datetime-field__input"
								bind:value={preferredDateTimeValue}
								aria-label="Preferred attendance date and time"
							/>
						</div>
					</div>
				</fieldset>

				<!-- 6. Equipment details -->
				<fieldset class="form-section">
					<legend>6. Equipment details</legend>

					<div class="field-grid">
						<div class="field">
							<label for="brandModel">Brand / Model, if known</label>
							<input id="brandModel" name="brandModel" type="text" value={values.brandModel ?? ''} />
						</div>

						<div class="field">
							<label for="equipmentAge">Approximate age of equipment</label>
							<input id="equipmentAge" name="equipmentAge" type="text" value={values.equipmentAge ?? ''} />
						</div>

						<div class="field field--full">
							<label for="serialNumber">Serial number, if available</label>
							<input id="serialNumber" name="serialNumber" type="text" value={values.serialNumber ?? ''} />
						</div>
					</div>
				</fieldset>

				<!-- 7. Photos -->
				<fieldset class="form-section">
					<legend>7. Upload photos</legend>
					<p class="fieldset-help">
						Upload photos of the equipment, compliance plate, fault, or site area
					</p>

					<div class="upload-shell">
						<label class="upload-btn" for="photos">
							<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-linecap="round" stroke-linejoin="round" />
								<polyline points="17 8 12 3 7 8" stroke-linecap="round" stroke-linejoin="round" />
								<line x1="12" x2="12" y1="3" y2="15" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							<span>{selectedPhotos.length > 0 ? 'Add more photos' : 'Choose photos'}</span>
						</label>
						<input
							bind:this={photosInput}
							id="photos"
							name="photos"
							type="file"
							accept="image/jpeg,image/png,image/webp"
							multiple
							class="sr-only"
							onchange={onPhotosChange}
						/>

						{#if selectedPhotos.length > 0}
							<p class="upload-count" aria-live="polite">
								{selectedPhotos.length} of {MAX_PHOTOS} photos selected
							</p>
							<ul class="photo-grid" aria-label="Selected photos">
								{#each selectedPhotos as photo (photo.id)}
									<li class="photo-card">
										<img
											class="photo-card__img"
											src={photo.previewUrl}
											alt={photo.file.name}
											loading="lazy"
											decoding="async"
										/>
										<div class="photo-card__meta">
											<span class="photo-card__name" title={photo.file.name}>{photo.file.name}</span>
											<button
												type="button"
												class="photo-card__remove"
												aria-label={`Remove ${photo.file.name}`}
												onclick={() => removePhoto(photo.id)}
											>
												<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<line x1="18" x2="6" y1="6" y2="18" stroke-linecap="round" />
													<line x1="6" x2="18" y1="6" y2="18" stroke-linecap="round" />
												</svg>
												Remove
											</button>
										</div>
									</li>
								{/each}
							</ul>
						{/if}

						{#if photoLimitMessage}
							<p class="field-error">{photoLimitMessage}</p>
						{/if}
					</div>

					<p class="upload-note">
						Photos help us assess the equipment faster and may allow us to provide a more accurate
						quote.
					</p>
					{#if errors.photos}
						<p class="field-error">{errors.photos}</p>
					{/if}
				</fieldset>

				<!-- 8. Site access -->
				<fieldset class="form-section">
					<legend>8. Site access details</legend>
					<p class="fieldset-help">Are there any site access requirements?</p>

					<div class="check-grid">
						{#each accessOptions as option (option.value)}
							<label class="check-card">
								<input
									type="checkbox"
									name="siteAccess"
									value={option.value}
									checked={selectedSiteAccess.includes(option.value)}
									onchange={(event) =>
										onSiteAccessChange(option.value, event.currentTarget.checked)}
								/>
								<span>{option.label}</span>
							</label>
						{/each}
					</div>
					{#if showOtherAccess}
						<div class="field field--spaced">
							<label for="otherAccess">
								Please specify the access requirement <span class="required-mark">*</span>
							</label>
							<input
								id="otherAccess"
								name="otherAccess"
								type="text"
								required
								value={values.otherAccess ?? ''}
								aria-invalid={errors.otherAccess ? 'true' : undefined}
								aria-describedby={errors.otherAccess ? 'otherAccess-error' : undefined}
							/>
							{#if errors.otherAccess}
								<p class="field-error" id="otherAccess-error">{errors.otherAccess}</p>
							{/if}
						</div>
					{/if}

					<div class="field field--spaced">
						<label for="accessNotes">Additional access notes</label>
						<textarea id="accessNotes" name="accessNotes" rows="4" placeholder="Gate codes, parking, induction requirements, etc.">{values.accessNotes ?? ''}</textarea>
					</div>
				</fieldset>

				<!-- 9. Contact method -->
				<fieldset class="form-section">
					<legend>9. Preferred contact method</legend>

					<div
						class="check-grid check-grid--compact"
						role="group"
						aria-describedby={errors.contactMethods ? 'contactMethods-error' : undefined}
					>
						{#each contactOptions as option (option.value)}
							<label class="check-card">
								<input
									type="checkbox"
									name="contactMethods"
									value={option.value}
									checked={values.contactMethods?.includes(option.value)}
								/>
								<span>{option.label}</span>
							</label>
						{/each}
					</div>
					{#if errors.contactMethods}
						<p class="field-error" id="contactMethods-error">{errors.contactMethods}</p>
					{/if}
				</fieldset>

				<div class="form-actions">
					{#if showRecaptchaStatus}
						<div
							class="recaptcha-status recaptcha-status--{recaptchaStatus}"
							role="status"
							aria-live="polite"
						>
							<span class="recaptcha-status__dot" aria-hidden="true"></span>
							<span class="recaptcha-status__label">
								{#if recaptchaStatus === 'loading'}
									Checking spam protection…
								{:else if recaptchaStatus === 'ready'}
									Spam protection active
								{:else if recaptchaStatus === 'error'}
									Spam protection unavailable
								{:else}
									Spam protection not configured
								{/if}
							</span>
						</div>
					{/if}
					{#if errors.form}
						<p class="field-error form-error" role="alert">{errors.form}</p>
					{/if}
					{#if recaptchaError}
						<p class="field-error form-error" role="alert">{recaptchaError}</p>
					{/if}
					<button
						type="submit"
						class="btn-primary"
						disabled={submitting || (Boolean(recaptchaSiteKey) && !recaptchaReady)}
					>
						{submitting ? 'Submitting…' : 'Submit quote request'}
					</button>
					<p class="form-note">
						By submitting this form you agree to be contacted about your quote request.
					</p>
					{#if recaptchaSiteKey}
						<p class="recaptcha-note">
							This site is protected by reCAPTCHA and the Google
							<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank"
								>Privacy Policy</a
							>
							and
							<a href="https://policies.google.com/terms" rel="noopener noreferrer" target="_blank"
								>Terms of Service</a
							>
							apply.
						</p>
					{/if}
				</div>
			</form>
		{/if}
	</div>
</section>

<style>
	h1,
	h2 {
		margin: 0;
		color: var(--color-ink);
	}

	h1 {
		font-size: clamp(2.2rem, 5vw, 3.6rem);
		line-height: 1;
		letter-spacing: -0.045em;
	}

	h2 {
		font-size: clamp(1.35rem, 2.5vw, 1.85rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
	}

	p {
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0 0 1rem;
	}

	.required-mark {
		color: var(--color-brand);
		font-weight: 800;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* HERO */
	.hero {
		position: relative;
		isolation: isolate;
		padding-block: clamp(3rem, 7vw, 5rem) 0;
		overflow: clip;
		color: #ffffff;
		background:
			radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.25), transparent 32%),
			linear-gradient(
				135deg,
				var(--color-brand-deeper) 0%,
				var(--color-brand) 52%,
				var(--color-brand-light) 100%
			);
	}

	.hero-bg {
		position: absolute;
		inset: -10%;
		z-index: -1;
		overflow: hidden;
	}

	.hero-bg__layer {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.45;
	}

	.hero-bg__layer--1 {
		top: -10%;
		right: 5%;
		width: 28rem;
		height: 28rem;
		background: rgba(255, 255, 255, 0.35);
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.hero-bg__layer--2 {
		bottom: -20%;
		left: -5%;
		width: 34rem;
		height: 34rem;
		background: rgba(4, 45, 122, 0.55);
		transform: translate3d(0, var(--py, 0px), 0);
	}

	.hero-bg__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
		background-size: 48px 48px;
		mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.95fr);
		gap: clamp(2rem, 4vw, 4rem);
		align-items: end;
		position: relative;
	}

	.hero-copy {
		padding-bottom: clamp(2rem, 4vw, 3rem);
	}

	.hero-visual {
		position: relative;
		align-self: stretch;
		min-height: clamp(22rem, 42vw, 36rem);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin-bottom: 0;
	}

	.hero-cutout {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		min-height: 0;
		margin-bottom: 0;
	}

	:global(.site-image-slot.hero-cutout-slot) {
		position: relative;
		width: 100%;
		max-width: 36rem;
		height: 100%;
		min-height: clamp(14rem, 34vw, 26rem);
		margin-inline: 0 auto;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 0;
		overflow: visible;
		border: none;
		border-radius: 0;
		background: transparent !important;
		box-shadow: none;
	}

	:global(.site-image-slot.hero-cutout-slot:not(.site-image-slot--has-image)) {
		border: 2px dashed rgba(255, 255, 255, 0.38);
		border-radius: 14px;
		min-height: clamp(12rem, 32vw, 20rem);
		color: #ffffff;
		align-items: center;
	}

	:global(.site-image-slot.hero-cutout-slot.site-image-slot--has-image) {
		border: 0 solid transparent !important;
		box-shadow: none !important;
		background: transparent !important;
		min-height: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	:global(button.site-image-slot.hero-cutout-slot.site-image-slot--has-image) {
		border-style: none !important;
	}

	:global(.site-image-slot.hero-cutout-slot .site-image-slot__placeholder-inner) {
		padding: 1.5rem 1rem;
	}

	:global(.site-image-slot.hero-cutout-slot:not(.site-image-slot--has-image) small) {
		color: rgba(255, 255, 255, 0.85);
	}

	:global(.site-image-slot.hero-cutout-slot .site-image-slot__img) {
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: 100%;
		min-height: 0;
		object-fit: contain;
		object-position: bottom center;
		display: block;
		border: 0;
		box-shadow: none;
		outline: none;
	}

	.hero-copy .eyebrow {
		color: #ffffff;
	}

	.hero-copy h1 {
		color: #ffffff;
		max-width: 18ch;
		margin-bottom: 1rem;
	}

	.hero-highlight {
		display: block;
		color: #d4e4ff;
	}

	.hero-lead {
		max-width: 42rem;
		color: rgba(255, 255, 255, 0.92);
		font-size: clamp(1.05rem, 2vw, 1.2rem);
	}

	.hero-copy p:last-child {
		color: rgba(255, 255, 255, 0.88);
		margin-bottom: 0;
	}

	.emergency-bubble {
		position: fixed;
		right: clamp(1rem, 3vw, 1.75rem);
		bottom: calc(clamp(1rem, 3vw, 1.75rem) + 50px);
		z-index: 40;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.75rem 1.1rem;
		border-radius: 999px;
		background: linear-gradient(
			135deg,
			var(--color-brand-deeper),
			var(--color-brand) 55%,
			var(--color-brand-light)
		);
		color: #ffffff;
		font-size: 0.92rem;
		font-weight: 800;
		text-decoration: none;
		box-shadow: var(--shadow-glow);
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring),
			filter 220ms var(--ease-spring);
	}

	.emergency-bubble::after {
		content: '';
		position: absolute;
		right: 1.35rem;
		bottom: -0.45rem;
		width: 0.85rem;
		height: 0.85rem;
		background: var(--color-brand);
		transform: rotate(45deg);
		border-radius: 0 0 0.2rem 0;
		box-shadow: 2px 2px 4px rgba(4, 45, 122, 0.15);
	}

	.emergency-bubble:hover,
	.emergency-bubble:focus-visible {
		transform: translateY(-2px);
		filter: brightness(1.05);
	}

	.emergency-bubble__dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #80efd1;
		box-shadow: 0 0 0 0 rgba(128, 239, 209, 0.85);
		flex: 0 0 auto;
	}

	/* FORM */
	.quote-section {
		padding-block: clamp(2rem, 5vw, 3.5rem) clamp(3rem, 6vw, 5rem);
	}

	.form-intro {
		margin-bottom: 1.5rem;
	}

	.form-intro p {
		margin-bottom: 0;
	}

	.quote-form,
	.success-panel {
		display: grid;
		gap: 1.25rem;
	}

	.form-section {
		margin: 0;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border: 1px solid var(--color-line);
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.92);
		box-shadow: var(--shadow-soft);
	}

	.form-section legend {
		padding: 0;
		font-size: clamp(1.05rem, 2vw, 1.2rem);
		font-weight: 800;
		color: var(--color-brand-deeper);
		margin-bottom: 0.85rem;
	}

	.fieldset-help {
		margin: -0.35rem 0 1rem;
		font-size: 0.95rem;
	}

	.field-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.field {
		display: grid;
		gap: 0.45rem;
	}

	.field--full {
		grid-column: 1 / -1;
	}

	.field--spaced {
		margin-top: 1rem;
	}

	label {
		color: var(--color-ink);
		font-size: 0.95rem;
		font-weight: 600;
	}

	input[type='text'],
	input[type='tel'],
	input[type='email'],
	textarea {
		width: 100%;
		padding: 0.85rem 0.95rem;
		border: 1px solid var(--color-line-strong);
		border-radius: var(--radius-sm);
		background: #fbfdff;
		color: var(--color-ink);
		font: inherit;
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease,
			background 200ms ease;
	}

	textarea {
		resize: vertical;
		min-height: 8rem;
	}

	.datetime-field {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 3.1rem;
		border: 1px solid var(--color-line-strong);
		border-radius: var(--radius-sm);
		background: #fbfdff;
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease,
			background 200ms ease;
	}

	.datetime-field:focus-within {
		border-color: var(--color-brand);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand) 18%, transparent);
		background: #fff;
	}

	.datetime-field__display {
		width: 100%;
		padding: 0.85rem 0.95rem;
		color: var(--color-ink);
		font: inherit;
		pointer-events: none;
	}

	.datetime-field--empty .datetime-field__display {
		color: color-mix(in srgb, var(--color-ink) 55%, transparent);
	}

	.datetime-field__input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: 0;
		opacity: 0;
		cursor: pointer;
		background: transparent;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-brand);
		background: #ffffff;
		box-shadow: 0 0 0 0.25rem rgba(15, 87, 251, 0.14);
	}

	input[aria-invalid='true'],
	textarea[aria-invalid='true'] {
		border-color: #dc2626;
	}

	.field-error {
		margin: 0;
		color: #b91c1c;
		font-size: 0.88rem;
		font-weight: 600;
	}

	.check-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 0.65rem;
	}

	.check-grid--compact {
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		max-width: 28rem;
	}

	.check-card {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		padding: 0.8rem 0.9rem;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-sm);
		background: var(--color-surface-soft);
		cursor: pointer;
		transition:
			border-color 200ms ease,
			background 200ms ease,
			box-shadow 200ms ease;
	}

	.check-card:hover {
		border-color: rgba(15, 87, 251, 0.35);
		background: #ffffff;
	}

	.check-card input {
		margin-top: 0.15rem;
		accent-color: var(--color-brand);
		flex-shrink: 0;
	}

	.check-card span {
		color: var(--color-ink);
		font-size: 0.94rem;
		line-height: 1.45;
	}

	.check-card:has(input:checked) {
		border-color: rgba(15, 87, 251, 0.45);
		background: var(--color-brand-soft);
		box-shadow: inset 0 0 0 1px rgba(15, 87, 251, 0.12);
	}

	.prompt-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0.75rem 0 0;
		padding: 0;
		list-style: none;
	}

	.prompt-list li {
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		background: var(--color-frost);
		color: var(--color-ink-soft);
		font-size: 0.82rem;
		font-weight: 600;
	}

	.upload-shell {
		display: grid;
		gap: 0.75rem;
	}

	.upload-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		width: fit-content;
		padding: 0.75rem 1.1rem;
		border-radius: 999px;
		border: 1px dashed rgba(15, 87, 251, 0.45);
		background: var(--color-brand-soft);
		color: var(--color-brand-deeper);
		font-weight: 700;
		cursor: pointer;
		transition:
			background 200ms ease,
			border-color 200ms ease;
	}

	.upload-btn svg {
		width: 1.1rem;
		height: 1.1rem;
	}

	.upload-btn:hover {
		background: #dce8ff;
		border-color: var(--color-brand);
	}

	.upload-count {
		margin: 0;
		color: var(--color-ink-soft);
		font-size: 0.88rem;
		font-weight: 600;
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.photo-card {
		display: grid;
		gap: 0.45rem;
		padding: 0.45rem;
		border-radius: 0.85rem;
		border: 1px solid rgba(15, 87, 251, 0.14);
		background: #fff;
		box-shadow: 0 8px 20px rgba(15, 87, 251, 0.06);
	}

	.photo-card__img {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 0.65rem;
		background: var(--color-frost);
	}

	.photo-card__meta {
		display: grid;
		gap: 0.35rem;
	}

	.photo-card__name {
		overflow: hidden;
		color: var(--color-ink-soft);
		font-size: 0.78rem;
		font-weight: 600;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.photo-card__remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		width: 100%;
		padding: 0.35rem 0.5rem;
		border: 1px solid rgba(220, 38, 38, 0.18);
		border-radius: 999px;
		background: #fff5f5;
		color: #b91c1c;
		font: inherit;
		font-size: 0.76rem;
		font-weight: 700;
		cursor: pointer;
		transition:
			background 200ms ease,
			border-color 200ms ease;
	}

	.photo-card__remove svg {
		width: 0.85rem;
		height: 0.85rem;
	}

	.photo-card__remove:hover {
		background: #fee2e2;
		border-color: rgba(220, 38, 38, 0.35);
	}

	.upload-note {
		margin: 0.75rem 0 0;
		font-size: 0.92rem;
		color: var(--color-ink-subtle);
	}

	.form-actions {
		display: grid;
		gap: 0.75rem;
		padding-top: 0.5rem;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		padding: 0.9rem 1.35rem;
		border-radius: 999px;
		font: inherit;
		font-weight: 800;
		text-decoration: none;
		cursor: pointer;
		transition:
			transform 220ms var(--ease-spring),
			box-shadow 220ms var(--ease-spring),
			filter 220ms var(--ease-spring);
	}

	.btn-primary {
		border: 0;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		color: #ffffff;
		box-shadow: var(--shadow-glow);
	}

	.btn-primary:hover:not(:disabled),
	.btn-primary:focus-visible:not(:disabled) {
		transform: translateY(-1px);
		filter: brightness(1.04);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: wait;
	}

	.btn-secondary {
		border: 1px solid var(--color-line-strong);
		background: #ffffff;
		color: var(--color-brand-deeper);
	}

	.btn-secondary:hover {
		background: var(--color-brand-soft);
	}

	.form-note {
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-ink-subtle);
	}

	.form-error {
		margin: 0;
	}

	.recaptcha-status {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		width: fit-content;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		border: 1px solid var(--color-line);
		background: #ffffff;
		font-size: 0.82rem;
		color: var(--color-ink-soft);
	}

	.recaptcha-status__dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		background: currentColor;
		flex-shrink: 0;
	}

	.recaptcha-status--loading {
		color: var(--color-ink-subtle);
	}

	.recaptcha-status--loading .recaptcha-status__dot {
		animation: recaptcha-pulse 1.2s ease-in-out infinite;
	}

	.recaptcha-status--ready {
		color: #166534;
		border-color: rgba(22, 101, 52, 0.22);
		background: rgba(22, 101, 52, 0.06);
	}

	.recaptcha-status--ready .recaptcha-status__dot {
		background: #16a34a;
	}

	.recaptcha-status--error {
		color: #991b1b;
		border-color: rgba(153, 27, 27, 0.22);
		background: rgba(153, 27, 27, 0.06);
	}

	.recaptcha-status--error .recaptcha-status__dot {
		background: #dc2626;
	}

	.recaptcha-status--unconfigured {
		color: var(--color-ink-subtle);
		border-style: dashed;
	}

	.recaptcha-status--unconfigured .recaptcha-status__dot {
		background: #94a3b8;
	}

	@keyframes recaptcha-pulse {
		0%,
		100% {
			opacity: 0.35;
			transform: scale(0.92);
		}

		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.recaptcha-note {
		margin: 0;
		font-size: 0.78rem;
		line-height: 1.5;
		color: var(--color-ink-subtle);
	}

	.recaptcha-note a {
		color: inherit;
	}

	.success-panel {
		padding: clamp(1.5rem, 4vw, 2.25rem);
		border: 1px solid rgba(15, 87, 251, 0.18);
		border-radius: var(--radius-lg);
		background: linear-gradient(180deg, #ffffff, var(--color-brand-soft));
		box-shadow: var(--shadow-card);
		text-align: center;
	}

	.success-panel__icon {
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.5rem;
		margin: 0 auto 1rem;
		border-radius: 999px;
		background: linear-gradient(135deg, var(--color-brand-light), var(--color-brand));
		color: #ffffff;
	}

	.success-panel__icon svg {
		width: 1.6rem;
		height: 1.6rem;
	}

	.success-panel h2 {
		margin-bottom: 0.75rem;
	}

	.success-panel p {
		max-width: 36rem;
		margin-inline: auto;
	}

	.success-panel a {
		color: var(--color-brand-deeper);
		font-weight: 700;
	}

	@media (max-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}

		.hero-visual {
			align-self: auto;
			min-height: clamp(18rem, 50vw, 28rem);
			max-width: 32rem;
			margin-inline: auto;
			width: 100%;
		}
	}

	@media (max-width: 720px) {
		.field-grid {
			grid-template-columns: 1fr;
		}

		.check-grid {
			grid-template-columns: 1fr;
		}

		:global(.site-image-slot.hero-cutout-slot) {
			min-height: clamp(12rem, 48vw, 20rem);
			max-width: 100%;
		}
	}
</style>
