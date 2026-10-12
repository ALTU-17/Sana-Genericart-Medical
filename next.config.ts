import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is another lockfile higher up the tree; pin the root so Turbopack
  // does not guess and warn on every build.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // The default allowlist is [75]; the hero and gallery art is served at 88.
    qualities: [75, 88],
    formats: ["image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
