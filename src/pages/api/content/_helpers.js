import fs from 'fs/promises';
import path from 'path';

const CONTENT_ROOT = path.resolve(process.cwd(), 'public/Content/Markdown');

async function ensureRoot() {
  try {
    await fs.mkdir(CONTENT_ROOT, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function resolveSafe(relPath = '') {
  const clean = relPath.replace(/\\/g, '/');
  const resolved = path.resolve(CONTENT_ROOT, clean);
  if (!resolved.startsWith(CONTENT_ROOT)) {
    throw new Error('Invalid path');
  }
  return resolved;
}

export async function requireAuth(request) {
  // Call existing auth endpoint's checkAdmin action and forward cookies
  const authUrl = new URL('/api/auth', request.url);
  const res = await fetch(authUrl.toString(), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: request.headers.get('cookie') || ''
    },
    body: JSON.stringify({ action: 'checkAdmin' })
  });
  if (!res.ok) throw new Error('Unauthorized');
  const j = await res.json();
  if (!j || !j.isAdmin) throw new Error('Unauthorized');
}

export async function listDir(relPath = '') {
  await ensureRoot();
  const dir = resolveSafe(relPath);
  const items = await fs.readdir(dir, { withFileTypes: true });
  return items.map(i => ({
    name: i.name,
    type: i.isDirectory() ? 'directory' : 'file',
    path: path.join(relPath, i.name).replace(/\\/g, '/')
  }));
}

export async function readFileSafe(relPath) {
  const file = resolveSafe(relPath);
  const stat = await fs.stat(file);
  if (stat.isDirectory()) throw new Error('Path is a directory');
  return await fs.readFile(file, 'utf8');
}

export async function writeFileSafe(relPath, content) {
  await ensureRoot();
  const file = resolveSafe(relPath);
  // make directories
  await fs.mkdir(path.dirname(file), { recursive: true });

  // backup existing
  try {
    await fs.access(file);
    const backupDir = path.join(CONTENT_ROOT, '.backups');
    await fs.mkdir(backupDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const name = path.basename(file);
    await fs.copyFile(file, path.join(backupDir, `${name}.${stamp}.bak`));
  } catch (e) {
    // file doesn't exist, ignore
  }

  await fs.writeFile(file, content, 'utf8');
  await appendAudit({ action: 'write', path: relPath, time: new Date().toISOString() });
}

export async function appendAudit(entry) {
  try {
    const auditFile = path.join(CONTENT_ROOT, '.audit.log');
    const line = JSON.stringify(entry) + '\n';
    await fs.appendFile(auditFile, line, 'utf8');
  } catch (e) {
    // ignore
  }
}

export async function deleteSafe(relPath) {
  const file = resolveSafe(relPath);
  await fs.rm(file, { recursive: true, force: true });
  await appendAudit({ action: 'delete', path: relPath, time: new Date().toISOString() });
}

export default {
  requireAuth,
  listDir,
  readFileSafe,
  writeFileSafe,
  deleteSafe,
  appendAudit
};
