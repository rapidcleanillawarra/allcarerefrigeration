<script lang="ts">
	let { children } = $props();
</script>

<section>
	<h1>Admin Panel</h1>
	<nav aria-label="Admin navigation">
		<a href="/admin">Dashboard</a>
		<a href="/admin/bookings">Bookings</a>
		<a href="/admin/settings">Settings</a>
		<a href="/">Back to website</a>
	</nav>

	<div class="content">
		{@render children()}
	</div>
</section>

<style>
	section {
		display: grid;
		gap: 1rem;
	}

	nav {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.content {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
	}
</style>
