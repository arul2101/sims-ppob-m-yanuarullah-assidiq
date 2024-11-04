/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'minio.nutech-integrasi.com'
      }
    ]
  }
}

export default nextConfig;
