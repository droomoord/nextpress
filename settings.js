const settings = {
  title: "My Page",
  // The URL of the WordPress site: (required)
  targetURL: "http://localhost:8888",
  // The page to use as the home page: (required, case-insensitive)
  homePage: "home",
  // The page to use as the posts page: (optional case-insensitive)
  postsPage: "posts",
  // The revalidation time (in seconds) used by the incremental SSR. If omitted (or set to 0), ISSR will not be used:
  revalidationTime: 5 * 60,
};

export default settings;
