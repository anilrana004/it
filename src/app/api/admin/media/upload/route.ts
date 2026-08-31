import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { cldBlogImage } from '@/lib/cloudinary';
import { isCloudinaryUploadConfigured, uploadToCloudinary } from '@/lib/cloudinary-server';

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  if (!isCloudinaryUploadConfigured()) {
    return NextResponse.json(
      {
        error:
          'Cloudinary upload is not configured. Add CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, or CLOUDINARY_UPLOAD_PRESET to your environment.',
      },
      { status: 503 },
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') || 'indiantreks/blog');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'A valid image file is required.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image uploads are supported.' }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be 8 MB or smaller.' }, { status: 400 });
    }

    const uploaded = await uploadToCloudinary(file, folder);

    return NextResponse.json({
      url: uploaded.secureUrl,
      publicId: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
      featuredUrl: cldBlogImage(uploaded.secureUrl, 'featured'),
      inlineUrl: cldBlogImage(uploaded.secureUrl, 'inline'),
      markdown: `![${file.name.replace(/\.[^.]+$/, '').replace(/-/g, ' ')}](${uploaded.secureUrl} "${file.name.replace(/\.[^.]+$/, '').replace(/-/g, ' ')}")`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
