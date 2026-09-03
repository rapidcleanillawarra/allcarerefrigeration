<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { slugify } from '$lib/server/site-pages';

	let { form }: { form: ActionData } = $props();

	let title = $state(form?.values?.title ?? '');
	let slug = $state(form?.values?.slug ?? '');
	let slugManuallyEdited = $state(false);
	let summary = $state(form?.values?.summary ?? '');
	let content = $state(
		form?.values?.content ??
			'## Overview\n\nWrite your section content here with clear details.\n\n## Key Benefits\n\n- Professional refrigeration diagnostics\n- Rapid emergency callout availability\n- Guaranteed workmanship and genuine parts\n\n## Contact Our Specialists\n\nCall our 24/7 team on 0411 532 233 or request a quote online.'
	);
	let metaTitle = $state(form?.values?.meta_title ?? '');
	let metaDescription = $state(form?.values?.meta_description ?? '');
	let isPublished = $state(form?.values?.is_published ?? true);
	let sitemapPriority = $state(form?.values?.sitemap_priority ?? 0.7);
	let sitemapChangefreq = $state(form?.values?.sitemap_changefreq ?? 'weekly');

	let activeTab = $state<'edit' | 'preview'>('edit');

	function onTitleInput() {
		if (!slugManuallyEdited) {
			slug = slugify(title);
		}
	}

	function onSlugInput() {
		slugManuallyEdited = true;
		slug = slugify(slug);
	}

	function insertSnippet(prefix: string, suffix = '') {
		const textarea = document.getElementById('content-editor') as HTMLTextAreaElement | null;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selected = textarea.value.substring(start, end) || 'text';
		const replacement = `${prefix}${selected}${suffix}`;

		content =
			textarea.value.substring(0, start) +
			replacement +
			textarea.value.substring(end);

		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
		}, 10);
	}

	// Computed preview values
	const previewTitle = $derived(
		(metaTitle.trim() || title.trim() || 'New Page Title') + ' | AllCare Refrigeration'
	);
	const previewDesc = $derived(
		metaDescription.trim() ||
			summary.trim() ||
			'Professional refrigeration and HVAC services in Wollongong and the Illawarra. Contact AllCare Refrigeration today.'
	);
	const previewSlug = $derived(slug.trim() || 'page-slug');
</script>

<div class="editor-container">
	<div class="breadcrumb">
		<a href="/admin/pages">← Back to Pages</a>
	</div>

	<header class="editor-header">
		<div>
			<h2 class="title">Create New Page</h2>
			<p class="subtitle">
				Create a new content or landing page. Configure on-page content, SEO metadata, and sitemap settings.
			</p>
		</div>
	</header>

	{#if form?.error}
		<div class="error-banner">
			<strong>Error:</strong> {form.error}
		</div>
	{/if}

	<form method="POST" use:enhance class="page-form">
		<div class="editor-grid">
			<!-- Main Content Column -->
			<div class="main-column">
				<!-- Title & Slug Card -->
				<div class="card">
					<div class="form-group">
						<label for="title">Page Title <span class="required">*</span></label>
						<input
							type="text"
							id="title"
							name="title"
							bind:value={title}
							oninput={onTitleInput}
							placeholder="e.g. Commercial Freezer Maintenance Guide"
							required
							class="input-text"
						/>
					</div>

					<div class="form-group">
						<label for="slug">
							URL Slug <span class="required">*</span>
							<span class="label-hint">(URL: allcarerefrigeration.com/<strong>{previewSlug}</strong>)</span>
						</label>
						<div class="slug-input-wrapper">
							<span class="slug-prefix">/</span>
							<input
								type="text"
								id="slug"
								name="slug"
								bind:value={slug}
								oninput={onSlugInput}
								placeholder="commercial-freezer-maintenance-guide"
								required
								class="input-text input-slug"
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="summary">Page Summary / Excerpt</label>
						<textarea
							id="summary"
							name="summary"
							bind:value={summary}
							rows="2"
							placeholder="Brief 1-2 sentence lead paragraph shown at the top of the page..."
							class="input-textarea"
						></textarea>
					</div>
				</div>

				<!-- Content Body Card -->
				<div class="card">
					<div class="card-header-flex">
						<label for="content-editor">Page Body Content <span class="required">*</span></label>
						<div class="tab-toggle">
							<button
								type="button"
								class="tab-btn {activeTab === 'edit' ? 'tab-active' : ''}"
								onclick={() => (activeTab = 'edit')}
							>
								Edit
							</button>
							<button
								type="button"
								class="tab-btn {activeTab === 'preview' ? 'tab-active' : ''}"
								onclick={() => (activeTab = 'preview')}
							>
								Preview
							</button>
						</div>
					</div>

					{#if activeTab === 'edit'}
						<div class="toolbar">
							<button type="button" class="tool-btn" onclick={() => insertSnippet('## ', '\n')}>
								H2
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('### ', '\n')}>
								H3
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('**', '**')}>
								<strong>B</strong>
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('*', '*')}>
								<em>I</em>
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('- ', '\n- Item 2')}>
								• List
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('1. ', '\n2. Item 2')}>
								1. Num
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('> ', '\n')}>
								❝ Quote
							</button>
							<button type="button" class="tool-btn" onclick={() => insertSnippet('[', '](https://example.com)')}>
								🔗 Link
							</button>
						</div>

						<textarea
							id="content-editor"
							name="content"
							bind:value={content}
							rows="16"
							required
							placeholder="Write content here. Markdown (## Headings, - Bullet lists, **bold**) and clean HTML tags are supported."
							class="input-textarea code-font"
						></textarea>
						<span class="field-hint">Supports Markdown headings, lists, bold text, links, and standard HTML.</span>
					{:else}
						<div class="content-preview-box">
							{#if title}
								<h1>{title}</h1>
							{/if}
							{#if summary}
								<p class="preview-lead">{summary}</p>
							{/if}
							<div class="preview-rendered">
								{#each content.split('\n\n') as block}
									{#if block.startsWith('### ')}
										<h3>{block.replace('### ', '')}</h3>
									{:else if block.startsWith('## ')}
										<h2>{block.replace('## ', '')}</h2>
									{:else if block.startsWith('> ')}
										<blockquote>{block.replace(/^>\s*/gm, '')}</blockquote>
									{:else if block.startsWith('- ')}
										<ul>
											{#each block.split('\n') as li}
												<li>{li.replace(/^- \s*/, '')}</li>
											{/each}
										</ul>
									{:else if block.startsWith('1. ')}
										<ol>
											{#each block.split('\n') as li}
												<li>{li.replace(/^\d+\.\s*/, '')}</li>
											{/each}
										</ol>
									{:else}
										<p>{@html block.replace(/\n/g, '<br/>')}</p>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Sidebar / SEO Column -->
			<div class="sidebar-column">
				<!-- Publish Action Card -->
				<div class="card">
					<h3 class="card-title">Publishing</h3>

					<div class="form-group">
						<label class="toggle-label">
							<input type="checkbox" name="is_published" value="true" bind:checked={isPublished} />
							<span>Publish page publicly</span>
						</label>
						<p class="field-hint">
							{isPublished
								? 'Page will be accessible publicly and submitted to search crawlers.'
								: 'Page will be saved as Draft (only accessible in admin preview).'}
						</p>
					</div>

					<div class="form-actions">
						<button type="submit" class="btn-primary btn-block">
							Create & Save Page
						</button>
						<a href="/admin/pages" class="btn-secondary btn-block">Cancel</a>
					</div>
				</div>

				<!-- SEO Metadata & Google SERP Preview Card -->
				<div class="card">
					<div class="card-title-flex">
						<h3 class="card-title">SEO & Meta Tags</h3>
						<span class="seo-badge">Search Ready</span>
					</div>

					<div class="form-group">
						<div class="label-with-counter">
							<label for="meta_title">Meta Title Tag</label>
							<span class="char-count {metaTitle.length > 60 ? 'count-warning' : 'count-good'}">
								{metaTitle.length}/60
							</span>
						</div>
						<input
							type="text"
							id="meta_title"
							name="meta_title"
							bind:value={metaTitle}
							placeholder="e.g. Commercial Freezer Maintenance & Repairs"
							class="input-text"
						/>
						<span class="field-hint">Recommended length: 50–60 characters.</span>
					</div>

					<div class="form-group">
						<div class="label-with-counter">
							<label for="meta_description">Meta Description Tag</label>
							<span class="char-count {metaDescription.length > 160 ? 'count-warning' : 'count-good'}">
								{metaDescription.length}/160
							</span>
						</div>
						<textarea
							id="meta_description"
							name="meta_description"
							bind:value={metaDescription}
							rows="3"
							placeholder="Concise summary shown under the link in search results..."
							class="input-textarea"
						></textarea>
						<span class="field-hint">Recommended length: 140–160 characters.</span>
					</div>

					<!-- Google SERP Live Snippet Preview -->
					<div class="serp-preview">
						<div class="serp-label">Google Search Result Preview</div>
						<div class="serp-card">
							<div class="serp-top">
								<div class="serp-favicon">❄️</div>
								<div class="serp-site-info">
									<div class="serp-sitename">AllCare Refrigeration</div>
									<div class="serp-url">https://www.allcarerefrigeration.com/{previewSlug}</div>
								</div>
							</div>
							<div class="serp-title">{previewTitle}</div>
							<div class="serp-description">{previewDesc}</div>
						</div>
					</div>
				</div>

				<!-- Sitemap Indexing Card -->
				<div class="card">
					<h3 class="card-title">Sitemap Configuration</h3>

					<div class="form-group">
						<label for="sitemap_priority">Sitemap Priority ({sitemapPriority})</label>
						<input
							type="range"
							id="sitemap_priority"
							name="sitemap_priority"
							min="0.1"
							max="1.0"
							step="0.1"
							bind:value={sitemapPriority}
							class="input-range"
						/>
						<div class="range-labels">
							<span>0.1 (Low)</span>
							<span>0.7 (Default)</span>
							<span>1.0 (Highest)</span>
						</div>
					</div>

					<div class="form-group">
						<label for="sitemap_changefreq">Change Frequency</label>
						<select id="sitemap_changefreq" name="sitemap_changefreq" bind:value={sitemapChangefreq} class="input-select">
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
							<option value="yearly">Yearly</option>
						</select>
						<span class="field-hint">Informs search engines how often this page content is updated.</span>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

<style>
	.editor-container {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.breadcrumb a {
		color: #0f57fb;
		font-weight: 600;
		text-decoration: none;
		font-size: 0.88rem;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.editor-header .title {
		font-size: 1.35rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.25rem 0;
	}

	.editor-header .subtitle {
		font-size: 0.9rem;
		color: #475569;
		margin: 0;
	}

	.error-banner {
		padding: 0.75rem 1rem;
		background: #fee2e2;
		border: 1px solid #fca5a5;
		color: #991b1b;
		border-radius: 0.5rem;
		font-size: 0.88rem;
	}

	.editor-grid {
		display: grid;
		grid-template-columns: 1fr 22rem;
		gap: 1.25rem;
		align-items: start;
	}

	.main-column,
	.sidebar-column {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 0.6rem;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.card-title {
		font-size: 1.05rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
	}

	.card-title-flex,
	.card-header-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.seo-badge {
		background: #dbeafe;
		color: #1d4ed8;
		font-size: 0.72rem;
		font-weight: 700;
		padding: 0.2rem 0.5rem;
		border-radius: 0.35rem;
		text-transform: uppercase;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label {
		font-size: 0.88rem;
		font-weight: 600;
		color: #1e293b;
	}

	.required {
		color: #dc2626;
	}

	.label-hint {
		font-weight: 400;
		color: #64748b;
		font-size: 0.8rem;
	}

	.input-text,
	.input-textarea,
	.input-select {
		width: 100%;
		padding: 0.6rem 0.8rem;
		border: 1px solid #cbd5e1;
		border-radius: 0.45rem;
		font-size: 0.9rem;
		color: #0f172a;
		background: #ffffff;
		box-sizing: border-box;
		font-family: inherit;
		transition: border-color 0.15s ease;
	}

	.input-text:focus,
	.input-textarea:focus,
	.input-select:focus {
		outline: none;
		border-color: #0f57fb;
		box-shadow: 0 0 0 3px rgba(15, 87, 251, 0.15);
	}

	.code-font {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.85rem;
		line-height: 1.5;
	}

	.slug-input-wrapper {
		display: flex;
		align-items: center;
		border: 1px solid #cbd5e1;
		border-radius: 0.45rem;
		background: #f8fafc;
	}

	.slug-prefix {
		padding: 0.6rem 0.6rem 0.6rem 0.8rem;
		color: #64748b;
		font-family: monospace;
		font-weight: 600;
	}

	.input-slug {
		border: none;
		background: transparent;
		padding-left: 0;
	}

	.input-slug:focus {
		box-shadow: none;
	}

	.field-hint {
		font-size: 0.78rem;
		color: #64748b;
	}

	.label-with-counter {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.char-count {
		font-size: 0.76rem;
		font-weight: 600;
	}

	.count-good {
		color: #16a34a;
	}

	.count-warning {
		color: #ea580c;
	}

	.tab-toggle {
		display: inline-flex;
		background: #f1f5f9;
		padding: 0.2rem;
		border-radius: 0.4rem;
	}

	.tab-btn {
		border: none;
		background: transparent;
		padding: 0.25rem 0.7rem;
		font-size: 0.82rem;
		font-weight: 600;
		color: #64748b;
		cursor: pointer;
		border-radius: 0.3rem;
	}

	.tab-active {
		background: #ffffff;
		color: #0f172a;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.toolbar {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
		padding: 0.35rem;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.45rem;
	}

	.tool-btn {
		background: #ffffff;
		border: 1px solid #cbd5e1;
		border-radius: 0.35rem;
		padding: 0.25rem 0.55rem;
		font-size: 0.8rem;
		cursor: pointer;
		color: #334155;
	}

	.tool-btn:hover {
		background: #f1f5f9;
		border-color: #94a3b8;
	}

	.content-preview-box {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.45rem;
		min-height: 20rem;
		background: #ffffff;
	}

	.content-preview-box h1 {
		font-size: 1.5rem;
		margin-top: 0;
		color: #0f172a;
	}

	.content-preview-box h2 {
		font-size: 1.2rem;
		color: #0f172a;
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 0.3rem;
		margin-top: 1.25rem;
	}

	.content-preview-box h3 {
		font-size: 1.05rem;
		color: #1e293b;
		margin-top: 1rem;
	}

	.preview-lead {
		font-size: 1rem;
		color: #475569;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.content-preview-box blockquote {
		border-left: 3px solid #0f57fb;
		margin: 1rem 0;
		padding-left: 0.85rem;
		color: #334155;
		font-style: italic;
		background: #eff6ff;
		padding: 0.5rem 0.85rem;
		border-radius: 0 0.35rem 0.35rem 0;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.toggle-label input[type='checkbox'] {
		width: 1.1rem;
		height: 1.1rem;
		accent-color: #0f57fb;
	}

	.form-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.btn-primary {
		background: #0f57fb;
		color: #ffffff;
		border: none;
		padding: 0.65rem 1rem;
		font-weight: 600;
		font-size: 0.92rem;
		border-radius: 0.45rem;
		cursor: pointer;
		text-align: center;
		transition: background 0.15s ease;
		text-decoration: none;
	}

	.btn-primary:hover {
		background: #0b4dd4;
	}

	.btn-secondary {
		background: #f1f5f9;
		color: #475569;
		border: 1px solid #cbd5e1;
		padding: 0.55rem 1rem;
		font-weight: 600;
		font-size: 0.9rem;
		border-radius: 0.45rem;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
	}

	.btn-secondary:hover {
		background: #e2e8f0;
	}

	.btn-block {
		width: 100%;
		display: block;
		box-sizing: border-box;
	}

	/* Google SERP Preview Card */
	.serp-preview {
		margin-top: 0.5rem;
		border-top: 1px solid #f1f5f9;
		padding-top: 0.75rem;
	}

	.serp-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #64748b;
		margin-bottom: 0.45rem;
	}

	.serp-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		padding: 0.85rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.serp-top {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		margin-bottom: 0.35rem;
	}

	.serp-favicon {
		font-size: 0.85rem;
	}

	.serp-sitename {
		font-size: 0.78rem;
		color: #202124;
		font-weight: 500;
		line-height: 1.2;
	}

	.serp-url {
		font-size: 0.72rem;
		color: #4d5156;
		word-break: break-all;
	}

	.serp-title {
		font-size: 1rem;
		color: #1a0dab;
		font-weight: 500;
		line-height: 1.3;
		margin-bottom: 0.3rem;
	}

	.serp-description {
		font-size: 0.82rem;
		color: #4d5156;
		line-height: 1.4;
	}

	.input-range {
		width: 100%;
		accent-color: #0f57fb;
	}

	.range-labels {
		display: flex;
		justify-content: space-between;
		font-size: 0.72rem;
		color: #64748b;
	}

	@media (max-width: 960px) {
		.editor-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
