import { requireAuth, readFileSafe } from './_helpers.js';

export const prerender = false;

export async function GET({ request }) {
  try {
    await requireAuth(request);
    const url = new URL(request.url);
    const rel = url.searchParams.get('path') || '';
    const content = await readFileSafe(rel);
    return new Response(JSON.stringify({ ok: true, content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
