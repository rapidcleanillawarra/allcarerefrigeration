import { fail } from '@sveltejs/kit';
import { deletePage, getAllPages, updatePage } from '$lib/server/site-pages';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pages = await getAllPages();
	return { pages };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') || '');

		if (!id) {
			return fail(400, { error: 'Page ID is required for deletion.' });
		}

		const result = await deletePage(id);
		if (!result.success) {
			return fail(500, { error: result.error || 'Failed to delete page.' });
		}

		return { success: true, action: 'delete' };
	},

	togglePublish: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') || '');
		const currentStatus = form.get('currentStatus') === 'true';

		if (!id) {
			return fail(400, { error: 'Page ID is required.' });
		}

		const result = await updatePage(id, { is_published: !currentStatus });
		if (result.error) {
			return fail(500, { error: result.error });
		}

		return { success: true, action: 'togglePublish' };
	}
};
