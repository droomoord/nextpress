import settings from "../settings";

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function makePath(title) {
  if (title.toLowerCase() == settings.homePage.toLowerCase()) {
    return "/";
  }
  return `/${title}`;
}
