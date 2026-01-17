import { requireAuth, writeFileSafe } from './_helpers.js';

export const prerender = false;

export async function POST({ request }) {
  try {
    await requireAuth(request);
    const body = await request.json();
    const rel = body.path || body.filePath || body.file || '';
    const content = body.content;
    if (!rel || typeof content !== 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'Bad request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await writeFileSafe(rel, content);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
