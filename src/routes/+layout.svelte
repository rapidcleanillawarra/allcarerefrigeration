<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/ar_only.png" />
	<link rel="apple-touch-icon" href="/ar_only.png" />
	<title>Allcare Refrigeration</title>
</svelte:head>

{@render children()}
