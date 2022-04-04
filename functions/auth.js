import settings from "../settings.js";

export default function auth() {
  return {
    username: process.env.WP_APP_USERNAME,
    password: process.env.WP_APP_PASSWORD,
    targetURL: process.env.NEXT_PUBLIC_TARGET_URL,
  };
}
