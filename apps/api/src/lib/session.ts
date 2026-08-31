const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is required');
  return secret;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function signPayload(payload: string): Promise<string> {
  const key = await importHmacKey(sessionSecret());
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return bufferToBase64Url(new Uint8Array(signature));
}

function bufferToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

export async function createAdminSessionToken(email: string): Promise<string> {
  const exp = String(Date.now() + SESSION_TTL_MS);
  const payload = `${email}|${exp}`;
  const signature = await signPayload(payload);
  return bufferToBase64Url(encoder.encode(`${payload}|${signature}`));
}

export async function verifyAdminSessionToken(
  token: string | undefined | null,
): Promise<{ email: string } | null> {
  if (!token) return null;

  try {
    const decoded = new TextDecoder().decode(base64UrlToBytes(token));
    const parts = decoded.split('|');
    if (parts.length !== 3) return null;

    const [email, expStr, signature] = parts;
    if (!email || !expStr || !signature) return null;

    const payload = `${email}|${expStr}`;
    const expected = await signPayload(payload);
    const sigBuf = base64UrlToBytes(signature);
    const expBuf = base64UrlToBytes(expected);
    if (!timingSafeEqual(sigBuf, expBuf)) return null;

    const exp = Number(expStr);
    if (!Number.isFinite(exp) || Date.now() > exp) return null;

    return { email };
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE = 'admin_token';
export const SESSION_MAX_AGE_SEC = SESSION_TTL_MS / 1000;

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: 'Lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
  };
}
