import axios from "axios";

import auth from "./auth";

const GetEvents = async (id) => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "get",
    url: `${targetURL}/wp-json/tribe/events/v1/events/${id}`,
    auth: {
      username,
      password,
    },
  });
  return res.data;
};

export default GetEvents;
