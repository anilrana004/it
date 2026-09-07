import { NextResponse } from 'next/server';
import { getCurrentUser, unauthorizedUserResponse } from '@/lib/user-auth/auth';
import { updateUserProfile } from '@/lib/user-auth/service';
import { validateName } from '@/lib/user-auth/validation';

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedUserResponse();

  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name : undefined;
    const phone = typeof body.phone === 'string' ? body.phone : undefined;

    if (name !== undefined) {
      const nameErr = validateName(name);
      if (nameErr) {
        return NextResponse.json({ error: nameErr, fieldErrors: { name: nameErr } }, { status: 400 });
      }
    }

    const updated = await updateUserProfile(user.id, { name, phone });
    if (!updated) return NextResponse.json({ error: 'Unable to update profile.' }, { status: 400 });
    return NextResponse.json({ success: true, user: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
