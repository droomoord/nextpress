import axios from "axios";
import chalk from "chalk";

import auth from "./auth";

const GetPost = async (slug, fields) => {
  const { username, password, targetURL } = auth();
  const urlString = `${targetURL}/wp-json/wp/v2/posts/?slug=${slug}&_fields=${fields.join(
    ","
  )}&_embed`;

  console.log(
    "\n",
    `POST ${chalk.green(slug.toUpperCase())}: ${chalk.dim(urlString)}`,
    "\n"
  );

  const res = await axios({
    method: "GET",
    url: urlString,
    auth: {
      username,
      password,
    },
  });
  return res.data[0];
};

export default GetPost;
