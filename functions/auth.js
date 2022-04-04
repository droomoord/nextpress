import settings from "../settings.js";

export default function auth() {
  return {
    username: process.env.WP_APP_USERNAME,
    password: process.env.WP_APP_PASSWORD,
    targetURL: process.env.TARGET_URL || settings.targetURL,
  };
}
