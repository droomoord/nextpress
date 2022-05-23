function extractDomain(url) {
  return url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)[0];
}

module.exports = {
  reactStrictMode: false,
  images: {
    domains: [extractDomain(process.env.NEXT_PUBLIC_TARGET_URL), "localhost"],
  },
};
