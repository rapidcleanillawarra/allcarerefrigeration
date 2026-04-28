<script lang="ts">
	let { data, form } = $props();
</script>

<section class="login-wrap">
	<div class="login-shell">
		<div class="brand-panel" aria-hidden="true">
			<div class="brand-mark">AC</div>
			<p class="eyebrow">AllCare Refrigeration</p>
			<p class="brand-copy">Reliable service, clear scheduling, and secure admin access.</p>
		</div>

		<div class="form-panel">
			<div class="intro">
				<p class="eyebrow">Admin Portal</p>
				<h1>Admin Login</h1>
				<p>Sign in to access the Allcare Refrigeration admin dashboard.</p>
			</div>

			<form method="POST" class="login-form">
				{#if form?.error}
					<p class="error">{form.error}</p>
				{/if}

				<input type="hidden" name="redirectTo" value={form?.redirectTo ?? data.redirectTo} />

				<div class="field">
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
				</div>

				<div class="field">
					<label for="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						placeholder="Enter password"
					/>
				</div>

				<button type="submit">Login</button>
			</form>

			<p class="note">User registration is currently disabled.</p>
		</div>
	</div>
</section>

<style>
	.login-wrap {
		min-height: min(48rem, 100vh);
		display: grid;
		place-items: center;
		padding: clamp(2rem, 6vw, 5rem) 1rem;
		background:
			radial-gradient(circle at top left, rgba(47, 132, 166, 0.2), transparent 32rem),
			linear-gradient(135deg, #eef7fb 0%, #f8fbfd 48%, #eef5f2 100%);
		color: #122533;
	}

	.login-shell {
		width: min(100%, 58rem);
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 1.05fr);
		overflow: hidden;
		border: 1px solid rgba(16, 58, 95, 0.12);
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.82);
		box-shadow: 0 1.5rem 4rem rgba(16, 58, 95, 0.16);
		backdrop-filter: blur(1rem);
	}

	.brand-panel {
		position: relative;
		min-height: 100%;
		display: grid;
		align-content: end;
		gap: 1rem;
		padding: clamp(2rem, 5vw, 3.5rem);
		background:
			linear-gradient(145deg, rgba(16, 58, 95, 0.92), rgba(22, 109, 133, 0.86)),
			linear-gradient(45deg, transparent 0 42%, rgba(255, 255, 255, 0.12) 42% 58%, transparent 58%);
		color: #ffffff;
	}

	.brand-panel::before,
	.brand-panel::after {
		content: '';
		position: absolute;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.14);
	}

	.brand-panel::before {
		top: 10%;
		right: 14%;
		width: 9rem;
		height: 9rem;
	}

	.brand-panel::after {
		top: 30%;
		left: 12%;
		width: 4rem;
		height: 4rem;
	}

	.brand-mark {
		position: relative;
		z-index: 1;
		width: 4.25rem;
		height: 4.25rem;
		display: grid;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.38);
		border-radius: 1.25rem;
		background: rgba(255, 255, 255, 0.16);
		font-size: 1.35rem;
		font-weight: 800;
		letter-spacing: 0.08em;
	}

	.form-panel {
		padding: clamp(2rem, 5vw, 3.75rem);
		background: rgba(255, 255, 255, 0.94);
	}

	.intro {
		margin-bottom: 1.75rem;
	}

	h1,
	p {
		margin: 0;
	}

	h1 {
		margin-top: 0.35rem;
		font-size: clamp(2rem, 4vw, 2.65rem);
		line-height: 1.05;
		color: #103a5f;
	}

	.intro p:last-child {
		margin-top: 0.8rem;
		max-width: 29rem;
		color: #526576;
		line-height: 1.6;
	}

	.eyebrow {
		position: relative;
		z-index: 1;
		color: #2b7c95;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.brand-panel .eyebrow {
		color: #c8f4ff;
	}

	.brand-copy {
		position: relative;
		z-index: 1;
		max-width: 18rem;
		font-size: clamp(1.35rem, 3vw, 2rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.login-form {
		display: grid;
		gap: 1rem;
	}

	.field {
		display: grid;
		gap: 0.45rem;
	}

	label {
		color: #263f52;
		font-size: 0.95rem;
		font-weight: 600;
	}

	input {
		width: 100%;
		padding: 0.85rem 0.95rem;
		border: 1px solid #bfd0d9;
		border-radius: 0.85rem;
		background: #fbfdfe;
		color: #122533;
		font: inherit;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			background 0.2s ease;
	}

	input::placeholder {
		color: #8aa0ad;
	}

	input:focus {
		outline: none;
		border-color: #2b7c95;
		background: #ffffff;
		box-shadow: 0 0 0 0.25rem rgba(43, 124, 149, 0.16);
	}

	button {
		margin-top: 0.25rem;
		padding: 0.9rem 1rem;
		border: 0;
		border-radius: 999px;
		background: linear-gradient(135deg, #103a5f, #1e7892);
		color: #fff;
		font: inherit;
		font-weight: 800;
		cursor: pointer;
		box-shadow: 0 0.85rem 1.5rem rgba(16, 58, 95, 0.22);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			filter 0.2s ease;
	}

	button:hover {
		filter: brightness(1.04);
		transform: translateY(-1px);
		box-shadow: 0 1rem 1.8rem rgba(16, 58, 95, 0.26);
	}

	button:focus-visible {
		outline: 0.2rem solid rgba(43, 124, 149, 0.5);
		outline-offset: 0.2rem;
	}

	.error {
		margin: 0;
		padding: 0.85rem 0.95rem;
		border: 1px solid #fecaca;
		border-radius: 0.85rem;
		background: #fff1f2;
		color: #991b1b;
		font-weight: 600;
		line-height: 1.45;
	}

	.note {
		margin-top: 1.25rem;
		color: #627483;
		font-size: 0.92rem;
		text-align: center;
	}

	@media (max-width: 760px) {
		.login-shell {
			grid-template-columns: 1fr;
		}

		.brand-panel {
			min-height: 16rem;
		}
	}

	@media (max-width: 480px) {
		.login-wrap {
			padding: 1rem;
		}

		.login-shell {
			border-radius: 1rem;
		}

		.brand-panel,
		.form-panel {
			padding: 1.5rem;
		}
	}
</style>
