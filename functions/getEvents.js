import axios from "axios";

import auth from "./auth";

const GetEvents = async () => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "get",
    url: `${targetURL}/wp-json/tribe/events/v1/events`,
    auth: {
      username,
      password,
    },
  });
  return res.data.events;
};

export default GetEvents;
