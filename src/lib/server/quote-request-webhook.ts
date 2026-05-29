import { env as privateEnv } from '$env/dynamic/private';
import type { SavedQuoteRequestPayload } from '$lib/server/quote-requests';

export type QuoteWebhookResult = { ok: true } | { ok: false; error: string };

export async function sendQuoteRequestWebhook(
	payload: SavedQuoteRequestPayload
): Promise<QuoteWebhookResult> {
	const url = privateEnv.QUOTE_REQUEST_POWER_AUTOMATE_URL?.trim();

	if (!url) {
		if (import.meta.env.DEV) {
			console.warn(
				'[quote-webhook] QUOTE_REQUEST_POWER_AUTOMATE_URL is not set; skipping Power Automate delivery in development.'
			);
			return { ok: true };
		}

		console.error('[quote-webhook] QUOTE_REQUEST_POWER_AUTOMATE_URL is not set');
		return { ok: false, error: 'Quote webhook URL is not configured' };
	}

	let response: Response;

	try {
		response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
	} catch (error) {
		console.error('[quote-webhook] Power Automate request failed', {
			quoteRequestId: payload.quoteRequestId,
			error
		});
		return { ok: false, error: 'Could not reach quote webhook' };
	}

	if (!response.ok) {
		const body = await response.text().catch(() => '');
		console.error('[quote-webhook] Power Automate returned an error', {
			quoteRequestId: payload.quoteRequestId,
			status: response.status,
			statusText: response.statusText,
			body
		});
		return { ok: false, error: `Quote webhook returned ${response.status}` };
	}

	console.info('[quote-webhook] Power Automate delivery succeeded', {
		quoteRequestId: payload.quoteRequestId,
		status: response.status
	});

	return { ok: true };
}
