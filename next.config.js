/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    // Formats d'images optimisés
    formats: ['image/avif', 'image/webp'],
    // Domaines autorisés pour les images externes (si nécessaire)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
    // Tailles d'images pour responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Durée de conservation des images optimisées (serveur et navigateur) : 7 jours.
    // Les fichiers téléversés dans WordPress ont chacun un nom unique.
    minimumCacheTTL: 604800,
  },
  // Photos publiées dans WordPress : servies sous la même adresse que le site
  async rewrites() {
    const wp = process.env.WORDPRESS_URL?.replace(/\/$/, '');
    return wp ? [{ source: '/wp-content/uploads/:path*', destination: `${wp}/wp-content/uploads/:path*` }] : [];
  },
  // Compression des assets
  compress: true,
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
