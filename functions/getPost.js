import axios from "axios";

import settings from "../settings.js";
import auth from "./auth";

const GetPost = async (slug, fields) => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "GET",
    url: `${targetURL}/wp-json/wp/v2/posts/?slug=${slug}&_fields=${fields.join(
      ","
    )}&_embed`,
    auth: {
      username,
      password,
    },
  });
  return res.data[0];
};

export default GetPost;
