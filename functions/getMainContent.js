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
    `${chalk.green(slug.toUpperCase())}: ${chalk.dim(urlString)}`,
    "\n"
  );

  const response = await axios({
    method: "GET",
    url: urlString,
    auth: {
      username,
      password,
    },
  });
  return response.data[0];
};

export default GetMainContent;
