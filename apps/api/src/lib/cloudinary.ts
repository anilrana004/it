
function cloudName(): string {
  return (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    'pg8uhzw0'
  );
}

export type CloudinaryUploadResult = {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
};

export function isCloudinaryUploadConfigured(): boolean {
  const preset =
    process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const hasSigned =
    Boolean(process.env.CLOUDINARY_API_KEY) && Boolean(process.env.CLOUDINARY_API_SECRET);
  return Boolean(preset || hasSigned);
}

export async function uploadToCloudinary(
  file: File | Blob,
  folder = 'indiantreks/blog',
): Promise<CloudinaryUploadResult> {
  const crypto = await import('node:crypto');
  const name = cloudName();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset =
    process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  if (apiKey && apiSecret) {
    const timestamp = Math.round(Date.now() / 1000);
    const params = { folder, timestamp };
    const toSign =
      Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('&') + apiSecret;
    const signature = crypto.createHash('sha1').update(toSign).digest('hex');
    formData.append('api_key', apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);
  } else if (uploadPreset) {
    formData.append('upload_preset', uploadPreset);
  } else {
    throw new Error('Cloudinary upload is not configured.');
  }

  const res = await fetch(`https://api.cloudinary.com/v1_1/${name}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Cloudinary upload failed');
  }

  const data = (await res.json()) as {
    url: string;
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  };

  return {
    url: data.url,
    secureUrl: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  };
}

/** Build featured/inline URLs without Next.js cloudinary helper. */
export function cldBlogTransform(url: string, width: number): string {
  if (!url.includes('res.cloudinary.com')) return url;
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  return `${parts[0]}/upload/c_fill,w_${width},q_auto,f_auto/${parts[1]}`;
}

export async function notifyStorefrontRevalidate(payload: {
  slug: string;
  section: string;
  primaryEntityType?: string | null;
  primaryEntityId?: string | null;
  entityLinks?: Array<{ entityType: string; entityId: string }>;
}): Promise<void> {
  const url = process.env.STOREFRONT_REVALIDATE_URL?.trim();
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!url || !secret) return;

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn('[api] storefront revalidation failed', error);
  }
}
