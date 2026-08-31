/** Shared JSON API response helpers (storefront + admin deploys). */

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

export function dbUnavailableResponse() {
  return Response.json({ error: 'Database not configured' }, { status: 503 });
}

export function notFoundResponse(message = 'Not found') {
  return Response.json({ error: message }, { status: 404 });
}
