/**
 * Static export, tuned for GitHub Pages.
 *
 * On Pages the site is served from https://<user>.github.io/<repo>/, so every
 * asset needs the repo name in front of it. NEXT_PUBLIC_BASE_PATH is set by the
 * deploy workflow; locally it's empty so `npm run dev` still works at "/".
 *
 * @type {import('next').NextConfig}
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
