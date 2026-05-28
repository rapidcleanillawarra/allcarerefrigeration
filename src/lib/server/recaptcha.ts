import { env as privateEnv } from '$env/dynamic/private';

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const DEFAULT_MIN_SCORE = 0.5;

type RecaptchaVerifyResponse = {
	success?: boolean;
	score?: number;
	action?: string;
	'error-codes'?: string[];
};

export type RecaptchaVerificationResult =
	| { ok: true; score?: number }
	| { ok: false; message: string };

export async function verifyRecaptchaToken(
	token: string,
	expectedAction: string,
	minScore = DEFAULT_MIN_SCORE
): Promise<RecaptchaVerificationResult> {
	const secret = privateEnv.RECAPTCHA_SECRET_KEY;

	if (!secret) {
		if (import.meta.env.DEV) {
			console.warn('[recaptcha] RECAPTCHA_SECRET_KEY is not set; skipping verification in development.');
			return { ok: true };
		}

		return { ok: false, message: 'Form verification is temporarily unavailable. Please try again later.' };
	}

	if (!token) {
		return { ok: false, message: 'Security verification failed. Please refresh the page and try again.' };
	}

	const response = await fetch(VERIFY_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			secret,
			response: token
		})
	});

	if (!response.ok) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	const data = (await response.json()) as RecaptchaVerifyResponse;

	if (!data.success) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	if (data.action !== expectedAction) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	if (typeof data.score === 'number' && data.score < minScore) {
		return { ok: false, message: 'Your submission could not be verified. Please try again.' };
	}

	return { ok: true, score: data.score };
}
