<script lang="ts">
	let { data, form } = $props();
</script>

<section class="login-wrap">
	<h1>Admin Login</h1>
	<p>Sign in to access the Allcare Refrigeration admin dashboard.</p>

	<form method="POST" class="login-form">
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		<input type="hidden" name="redirectTo" value={form?.redirectTo ?? data.redirectTo} />

		<label for="email">Email</label>
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			required
			value={form?.email ?? ''}
			placeholder="admin@allcare.local"
		/>

		<label for="password">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			autocomplete="current-password"
			required
			placeholder="Enter password"
		/>

		<button type="submit">Login</button>
	</form>

	<p class="note">User registration is currently disabled.</p>
</section>

<style>
	.login-wrap {
		max-width: 28rem;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: grid;
		gap: 0.75rem;
	}

	.login-form {
		display: grid;
		gap: 0.6rem;
		padding: 1rem;
		border: 1px solid #d6d6d6;
		border-radius: 0.5rem;
		background: #fff;
	}

	label {
		font-weight: 600;
	}

	input {
		padding: 0.6rem 0.7rem;
		border: 1px solid #b8b8b8;
		border-radius: 0.4rem;
	}

	button {
		margin-top: 0.4rem;
		padding: 0.7rem 0.8rem;
		border: 0;
		border-radius: 0.4rem;
		background: #103a5f;
		color: #fff;
		font-weight: 600;
		cursor: pointer;
	}

	.error {
		margin: 0;
		padding: 0.6rem;
		border-radius: 0.4rem;
		background: #fee2e2;
		color: #991b1b;
	}

	.note {
		margin-top: 0.25rem;
		color: #4b5563;
	}
</style>
