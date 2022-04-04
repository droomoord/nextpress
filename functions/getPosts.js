import axios from "axios";

import auth from "./auth";

const GetPosts = async (fields, page) => {
  const { username, password, targetURL } = auth();
  const joinedFields = fields.join(",");
  const res = await axios({
    method: "get",
    url: `${targetURL}/wp-json/wp/v2/posts?_fields=${joinedFields}&page=${page}&per_page=5&_embed`,
    auth: {
      username,
      password,
    },
  });
  return { posts: res.data, count: res.headers["x-wp-total"] };
};

export default GetPosts;
