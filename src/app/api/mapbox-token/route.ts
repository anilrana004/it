import { NextResponse } from 'next/server';

/**
 * Public Mapbox token for the trek map. `pk.` tokens are designed for browsers.
 * URL restrictions should still be set on the Mapbox dashboard.
 */
export async function GET() {
  const token = (process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '').trim();
  if (!token.startsWith('pk.') || token.length < 20) {
    return NextResponse.json({ token: null }, { status: 200 });
  }
  return NextResponse.json({ token });
}
