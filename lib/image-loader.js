export default function imageLoader({ src }) {
  if (!src.startsWith("/")) return src;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${src}`;
}
