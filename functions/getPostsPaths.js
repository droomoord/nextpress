import axios from "axios";

import auth from "./auth";

const GetPosts = async () => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "get",
    url: `${targetURL}/wp-json/wp/v2/posts?_fields=slug&per_page=100`,
    auth: {
      username,
      password,
    },
  });

  return res.data.filter((_, index) => index < 5)
};

export default GetPosts
