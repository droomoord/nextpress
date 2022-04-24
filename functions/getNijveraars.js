import axios from "axios";

import auth from "./auth";

const getNijveraars = async (fields, nijveraar) => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "get",
    url: `${targetURL}/wp-json/wp/v2/nijveraars/?_fields=${fields.join(
      ","
    )}&_embed&slug=${nijveraar ? nijveraar : ""}`,
    auth: {
      username,
      password,
    },
  });
  return res.data;
};

export default getNijveraars;
