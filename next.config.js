const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const allowedImageDomains =
  process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(",");
const imageConversionFormats = process.env.NEXT_PUBLIC_IMAGE_CONVERSION_FORMATS
  ? process.env.NEXT_PUBLIC_IMAGE_CONVERSION_FORMATS.split(",")
  : [];

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: allowedImageDomains,
    formats: imageConversionFormats,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
          { key: "x-xss-protection", value: "1" },
          { key: "x-frame-options", value: "DENY" },
          {
            key: "strict-transport-security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
  experimental: {
    reactRoot: true,
  },
});
