<script lang="ts">
	let { children } = $props();
</script>

<header>
	<nav aria-label="Public navigation">
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/services">Services</a>
		<a href="/login">Admin Login</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		padding: 1rem 0;
		border-bottom: 1px solid #e2e8f0;
	}

	nav {
		display: flex;
		gap: 1rem;
	}

	main {
		padding: 1.5rem 0;
	}
</style>
