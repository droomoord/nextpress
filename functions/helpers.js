import settings from "../settings";
const { convert } = require("html-to-text");

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// export function makePath(title) {
//   if (title.toLowerCase() == settings.homePage.toLowerCase()) {
//     return "/";
//   }
//   return `/${title}`;
// }

//create a function that converts a name into a valid slug
export function makePath(title) {
  if (title.toLowerCase() == settings.homePage.toLowerCase()) {
    return "/";
  }
  const slug = title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

  return `/${slug}`;
}

export const createSummery = (HTMLstring, length) => {
  const shortenString = (string, length) => {
    return string.length > length
      ? `${string.substring(0, length)}...`
      : string;
  };
  return shortenString(convert(HTMLstring).replace(/\[.+\]/, ""), length);
};
