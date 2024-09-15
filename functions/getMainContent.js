import axios from "axios";
import chalk from "chalk";

import auth from "./auth";

const GetMainContent = async (slug, fields) => {
  const { username, password, targetURL } = auth();
  const urlString = `${targetURL}/wp-json/wp/v2/pages/?slug=${slug}&_fields=${fields.join(
    ","
  )}&_embed`;

  console.log(
    "\n",
    `PAGE ${chalk.green(slug.toUpperCase())}: ${chalk.dim(urlString)}`,
    "\n"
  );

  let attempt = 5;
  let data;

  while (attempt > 0 && !data) {
    const response = await axios({
      method: "GET",
      url: urlString,
      auth: {
        username,
        password,
      },
    });
    if (response.status > 199 && response.status < 300) {
      data = response.data[0];
    } else {
      console.log(`attempt ${attempt}`);
      attempt--;
    }
  }
  return data;
};

export default GetMainContent;
