import { requireAuth, listDir } from './_helpers.js';

export const prerender = false;

export async function GET({ request }) {
  try {
    await requireAuth(request);
    const url = new URL(request.url);
    const rel = url.searchParams.get('path') || '';
    const entries = await listDir(rel);
    return new Response(JSON.stringify({ ok: true, entries }), {
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
