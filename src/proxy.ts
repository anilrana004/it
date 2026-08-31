import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_PREFIX } from '@/lib/admin/constants';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin/auth';
import { getAppRole, isBlockedForRole, isAdminUiPath } from '@/lib/deploy/role';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = getAppRole();

  if (isBlockedForRole(pathname, role)) {
    if (role === 'admin' && pathname === '/') {
      return NextResponse.redirect(new URL(`${ADMIN_PREFIX}/login`, request.url));
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!isAdminUiPath(pathname) && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    if (!(await isAdminAuthenticatedFromRequest(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(`${ADMIN_PREFIX}/login`)) {
    return NextResponse.next();
  }

  if (!(await isAdminAuthenticatedFromRequest(request))) {
    const loginUrl = new URL(`${ADMIN_PREFIX}/login`, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
