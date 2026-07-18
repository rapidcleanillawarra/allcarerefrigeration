import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const DEFAULT_MIN_SCORE = 0.5;

type RecaptchaAssessmentResponse = {
	tokenProperties?: {
		valid?: boolean;
		action?: string;
		invalidReason?: string;
	};
	riskAnalysis?: {
		score?: number;
		reasons?: string[];
	};
	error?: {
		message?: string;
		status?: string;
	};
};

export type RecaptchaVerificationResult =
	| { ok: true; score?: number }
	| { ok: false; message: string };

export async function verifyRecaptchaToken(
	token: string,
	expectedAction: string,
	minScore = DEFAULT_MIN_SCORE
): Promise<RecaptchaVerificationResult> {
	const projectId = privateEnv.RECAPTCHA_PROJECT_ID;
	const apiKey = privateEnv.RECAPTCHA_API_KEY;
	const siteKey = publicEnv.PUBLIC_RECAPTCHA_SITE_KEY;

	if (!projectId || !apiKey || !siteKey) {
		if (import.meta.env.DEV) {
			console.warn(
				'[recaptcha] RECAPTCHA_PROJECT_ID, RECAPTCHA_API_KEY, or PUBLIC_RECAPTCHA_SITE_KEY is not set; skipping verification in development.'
			);
			return { ok: true };
		}

		return { ok: false, message: 'Form verification is temporarily unavailable. Please try again later.' };
	}

	if (!token) {
		return { ok: false, message: 'Security verification failed. Please refresh the page and try again.' };
	}

	const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments?key=${encodeURIComponent(apiKey)}`;

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			event: {
				token,
				siteKey,
				expectedAction
			}
		})
	});

	if (!response.ok) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	const data = (await response.json()) as RecaptchaAssessmentResponse;

	if (data.error?.message) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	if (!data.tokenProperties?.valid) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	if (data.tokenProperties.action !== expectedAction) {
		return { ok: false, message: 'Security verification failed. Please try again.' };
	}

	const score = data.riskAnalysis?.score;
	if (typeof score === 'number' && score < minScore) {
		return { ok: false, message: 'Your submission could not be verified. Please try again.' };
	}

	return { ok: true, score };
}
