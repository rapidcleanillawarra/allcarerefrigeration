export const MAX_QUOTE_PHOTOS = 8;
export const MAX_QUOTE_PHOTO_TOTAL_BYTES = 4 * 1024 * 1024;
export const MAX_QUOTE_PHOTO_TOTAL_MB = 4;

export function formatPhotoSize(bytes: number): string {
	if (bytes < 1024 * 1024) {
		return `${Math.max(1, Math.round(bytes / 1024))} KB`;
	}

	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function totalPhotoBytes(files: Pick<File, 'size'>[]): number {
	return files.reduce((sum, file) => sum + file.size, 0);
}
