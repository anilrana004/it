/** Cloudinary account — single source for uploads and storefront delivery. */
export function getCloudinaryCloudName(): string {
  return (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
    'jum1mpl0'
  );
}

export function getCloudinaryApiKey(): string {
  return process.env.CLOUDINARY_API_KEY?.trim() ?? '';
}

export function getCloudinaryApiSecret(): string {
  return process.env.CLOUDINARY_API_SECRET?.trim() ?? '';
}

export function getCloudinaryUploadPreset(): string {
  return (
    process.env.CLOUDINARY_UPLOAD_PRESET?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim() ||
    ''
  );
}

export function isCloudinaryUploadConfigured(): boolean {
  const preset = getCloudinaryUploadPreset();
  return Boolean(preset || (getCloudinaryApiKey() && getCloudinaryApiSecret()));
}
