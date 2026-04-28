import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const ADMIN_EMAIL = 'admin@allcare.local';
const ADMIN_PASSWORD = 'allcare123';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.isAuthenticated) {
		const redirectTo = url.searchParams.get('redirectTo') || '/admin';
		redirect(302, redirectTo);
	}

	return {
		redirectTo: url.searchParams.get('redirectTo') || '/admin'
	};
};

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') || '').trim().toLowerCase();
		const password = String(form.get('password') || '');
		const redirectTo = String(form.get('redirectTo') || '/admin');

		if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
			return fail(400, {
				error: 'Invalid login credentials.',
				email,
				redirectTo
			});
		}

		cookies.set('allcare_session', 'authenticated', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			maxAge: 60 * 60 * 8
		});

		redirect(302, redirectTo);
	}
};
