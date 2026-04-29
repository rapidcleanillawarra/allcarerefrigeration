// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface ImportMetaEnv {
	/** Canonical site URL override (scheme + host). Example: https://your-project.vercel.app or custom domain. */
	readonly PUBLIC_SITE_URL?: string;
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isAuthenticated: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
