module.exports = {
  
  async headers() {
    return [
      {
        source: "/_next/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'akamai',
    path: '',
  },
}
