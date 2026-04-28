<script lang="ts">
	let { children } = $props();
</script>

<section class="admin-layout">
	<aside class="sidebar">
		<h1>Allcare Admin</h1>
		<nav aria-label="Admin navigation">
			<a href="/admin">Dashboard</a>
			<a href="/admin/bookings">Bookings</a>
			<a href="/admin/settings">Settings</a>
			<a href="/">Back to website</a>
		</nav>
	</aside>

	<div class="content">
		{@render children()}
	</div>
</section>

<style>
	.admin-layout {
		display: grid;
		grid-template-columns: 14rem 1fr;
		gap: 1.2rem;
	}

	.sidebar {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.6rem;
		background: #f8fafc;
		height: fit-content;
	}

	.sidebar h1 {
		margin-top: 0;
		font-size: 1.1rem;
	}

	nav {
		display: grid;
		gap: 0.7rem;
	}

	nav a {
		text-decoration: none;
		color: #103a5f;
		font-weight: 600;
	}

	.content {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
	}

	@media (max-width: 820px) {
		.admin-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
