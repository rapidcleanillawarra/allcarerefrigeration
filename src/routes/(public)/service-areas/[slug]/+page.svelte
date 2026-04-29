<script lang="ts">
	import HomeLandingPage from '$lib/components/home-landing-page.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<HomeLandingPage {data} landing={data.landing} />
