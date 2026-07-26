/**
 * Prefixes a /public path with the deploy base path.
 *
 * Next rewrites its own bundles when `basePath` is set, but raw <img> and
 * <video> src attributes are left alone — so anything pointing at /public has
 * to go through here or it 404s on GitHub Pages.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
