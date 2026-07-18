const RECAPTCHA_SCRIPT_ID = 'recaptcha-enterprise-script';

declare global {
	interface Window {
		grecaptcha?: {
			enterprise: {
				ready: (callback: () => void) => void;
				execute: (siteKey: string, options: { action: string }) => Promise<string>;
			};
		};
	}
}

let loadPromise: Promise<void> | null = null;

export function loadRecaptcha(siteKey: string): Promise<void> {
	if (!siteKey) {
		return Promise.reject(new Error('reCAPTCHA site key is not configured'));
	}

	if (loadPromise) {
		return loadPromise;
	}

	loadPromise = new Promise((resolve, reject) => {
		if (window.grecaptcha?.enterprise) {
			window.grecaptcha.enterprise.ready(() => resolve());
			return;
		}

		const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);
		if (existingScript) {
			existingScript.addEventListener('load', () => {
				window.grecaptcha?.enterprise.ready(() => resolve());
			});
			existingScript.addEventListener('error', () => {
				reject(new Error('Failed to load reCAPTCHA'));
			});
			return;
		}

		const script = document.createElement('script');
		script.id = RECAPTCHA_SCRIPT_ID;
		script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			window.grecaptcha?.enterprise.ready(() => resolve());
		};
		script.onerror = () => {
			loadPromise = null;
			reject(new Error('Failed to load reCAPTCHA'));
		};
		document.head.appendChild(script);
	});

	return loadPromise;
}

export async function executeRecaptcha(siteKey: string, action: string): Promise<string> {
	await loadRecaptcha(siteKey);
	if (!window.grecaptcha?.enterprise) {
		throw new Error('reCAPTCHA is unavailable');
	}

	return window.grecaptcha.enterprise.execute(siteKey, { action });
}
