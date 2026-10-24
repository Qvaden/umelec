/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
      }
    : {}),
  images: staticExport
    ? { loader: "custom", loaderFile: "./lib/image-loader.js" }
    : { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
