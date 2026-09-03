<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(iso: string): string {
		try {
			return new Date(iso).toLocaleDateString('en-AU', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return iso;
		}
	}
</script>

<div class="pages-admin-container">
	<header class="header">
		<div>
			<h2 class="title">Custom Pages & SEO Management</h2>
			<p class="subtitle">
				Create and manage custom landing pages, articles, and service hubs. Pages automatically register into your XML sitemap and search engine directives.
			</p>
		</div>
		<a href="/admin/pages/new" class="btn-primary">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			Create New Page
		</a>
	</header>

	{#if !data.pages || data.pages.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📄</div>
			<h3>No custom pages yet</h3>
			<p>
				Create your first custom page to publish dedicated content, local SEO landing pages, or seasonal refrigeration guides.
			</p>
			<a href="/admin/pages/new" class="btn-primary">Create Your First Page</a>

			<div class="db-notice">
				<strong>Note for initial setup:</strong> Ensure the <code>site_pages</code> table has been created in your Supabase database using the migration file at <code>supabase/migrations/20260903_create_site_pages.sql</code>.
			</div>
		</div>
	{:else}
		<div class="table-wrapper">
			<table class="pages-table">
				<thead>
					<tr>
						<th>Page Title & URL</th>
						<th>SEO Meta</th>
						<th>Sitemap</th>
						<th>Status</th>
						<th>Updated</th>
						<th class="actions-col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.pages as page (page.id)}
						<tr>
							<td>
								<div class="page-title">{page.title}</div>
								<div class="page-slug">
									<a href="/{page.slug}" target="_blank" rel="noopener noreferrer">
										/{page.slug}
										<span class="external-icon">↗</span>
									</a>
								</div>
							</td>
							<td>
								{#if page.meta_title || page.meta_description}
									<span class="badge badge-success" title="{page.meta_title || 'Title default'} | {page.meta_description || 'No description'}">
										Configured
									</span>
								{:else}
									<span class="badge badge-subtle">Default</span>
								{/if}
							</td>
							<td>
								<div class="sitemap-tag">
									Priority: <strong>{page.sitemap_priority}</strong>
									<span class="freq">({page.sitemap_changefreq})</span>
								</div>
							</td>
							<td>
								<form method="POST" action="?/togglePublish" use:enhance>
									<input type="hidden" name="id" value={page.id} />
									<input type="hidden" name="currentStatus" value={String(page.is_published)} />
									<button
										type="submit"
										class="badge-btn {page.is_published ? 'badge-published' : 'badge-draft'}"
										title="Click to toggle status"
									>
										{page.is_published ? 'Published' : 'Draft'}
									</button>
								</form>
							</td>
							<td class="date-cell">
								{formatDate(page.updated_at)}
							</td>
							<td class="actions-cell">
								<div class="action-buttons">
									<a href="/{page.slug}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="View page">
										👁️
									</a>
									<a href="/admin/pages/{page.id}" class="btn-icon" title="Edit page">
										✏️
									</a>
									<form
										method="POST"
										action="?/delete"
										use:enhance={({ cancel }) => {
											if (!confirm(`Are you sure you want to delete "${page.title}"?`)) {
												cancel();
											}
										}}
									>
										<input type="hidden" name="id" value={page.id} />
										<button type="submit" class="btn-icon btn-danger" title="Delete page">
											🗑️
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.pages-admin-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.title {
		font-size: 1.4rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.35rem 0;
	}

	.subtitle {
		font-size: 0.92rem;
		color: #475569;
		margin: 0;
		max-width: 48rem;
		line-height: 1.45;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: #0f57fb;
		color: #ffffff;
		font-weight: 600;
		font-size: 0.92rem;
		padding: 0.6rem 1.1rem;
		border-radius: 0.5rem;
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition: background 0.15s ease;
		white-space: nowrap;
	}

	.btn-primary:hover {
		background: #0b4dd4;
	}

	.empty-state {
		text-align: center;
		padding: 3.5rem 1.5rem;
		background: #f8fafc;
		border: 1px dashed #cbd5e1;
		border-radius: 0.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.empty-icon {
		font-size: 2.5rem;
	}

	.empty-state h3 {
		margin: 0;
		color: #0f172a;
		font-size: 1.2rem;
	}

	.empty-state p {
		margin: 0 0 0.5rem 0;
		color: #64748b;
		max-width: 26rem;
		font-size: 0.95rem;
	}

	.db-notice {
		margin-top: 1.5rem;
		padding: 0.75rem 1rem;
		background: #eff6ff;
		border: 1px solid #bfdbfe;
		border-radius: 0.5rem;
		font-size: 0.82rem;
		color: #1e40af;
		max-width: 36rem;
		line-height: 1.4;
	}

	.db-notice code {
		background: #dbeafe;
		padding: 0.15rem 0.35rem;
		border-radius: 0.25rem;
		font-family: monospace;
	}

	.table-wrapper {
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		overflow-x: auto;
		background: #ffffff;
	}

	.pages-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		font-size: 0.9rem;
	}

	.pages-table th {
		background: #f8fafc;
		padding: 0.75rem 1rem;
		font-weight: 600;
		color: #475569;
		border-bottom: 1px solid #e2e8f0;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.pages-table td {
		padding: 0.85rem 1rem;
		border-bottom: 1px solid #f1f5f9;
		vertical-align: middle;
	}

	.pages-table tbody tr:hover {
		background: #f8fafc;
	}

	.page-title {
		font-weight: 600;
		color: #0f172a;
		font-size: 0.95rem;
	}

	.page-slug a {
		color: #0f57fb;
		text-decoration: none;
		font-size: 0.82rem;
		font-family: monospace;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	.page-slug a:hover {
		text-decoration: underline;
	}

	.external-icon {
		font-size: 0.75rem;
	}

	.badge {
		display: inline-block;
		padding: 0.2rem 0.55rem;
		border-radius: 0.35rem;
		font-size: 0.78rem;
		font-weight: 600;
	}

	.badge-success {
		background: #dcfce7;
		color: #15803d;
	}

	.badge-subtle {
		background: #f1f5f9;
		color: #64748b;
	}

	.badge-btn {
		border: none;
		cursor: pointer;
		padding: 0.25rem 0.65rem;
		border-radius: 0.35rem;
		font-size: 0.78rem;
		font-weight: 600;
		transition: opacity 0.15s ease;
	}

	.badge-btn:hover {
		opacity: 0.85;
	}

	.badge-published {
		background: #dcfce7;
		color: #166534;
	}

	.badge-draft {
		background: #fef3c7;
		color: #92400e;
	}

	.sitemap-tag {
		font-size: 0.82rem;
		color: #334155;
	}

	.sitemap-tag .freq {
		color: #64748b;
		margin-left: 0.25rem;
	}

	.date-cell {
		font-size: 0.82rem;
		color: #64748b;
		white-space: nowrap;
	}

	.actions-cell {
		text-align: right;
		white-space: nowrap;
	}

	.action-buttons {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.btn-icon {
		background: none;
		border: 1px solid #e2e8f0;
		border-radius: 0.35rem;
		padding: 0.3rem 0.45rem;
		font-size: 0.85rem;
		cursor: pointer;
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s ease;
	}

	.btn-icon:hover {
		background: #f1f5f9;
	}

	.btn-danger:hover {
		background: #fee2e2;
		border-color: #fca5a5;
	}
</style>
