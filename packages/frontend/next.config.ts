
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'sanaa-curios.s3.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig