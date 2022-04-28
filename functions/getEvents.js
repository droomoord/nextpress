import axios from "axios";

import auth from "./auth";

const GetEvents = async (perPage) => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "get",
    url: `${targetURL}/wp-json/tribe/events/v1/events?per_page=${
      perPage ? perPage : "100"
    }`,
    auth: {
      username,
      password,
    },
  });
  return res.data.events;
};

export default GetEvents;
