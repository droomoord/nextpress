import axios from "axios";

import auth from "./auth";

const GetEvents = async (perPage, category, searchQuery) => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "get",
    // url: `${targetURL}/wp-json/tribe/events/v1/events?per_page=${
    //   perPage ? perPage : "100"
    // }${searchQuery ? "&search=" + searchQuery : ""}`,
    url: `${targetURL}/wp-json/tribe/events/v1/events?per_page=${
      perPage ? perPage : "100"
    }${searchQuery ? "&search=" + searchQuery : ""}
    &end_date=2022-08-11&start_date=2022-06-11&status=publish`,
    auth: {
      username,
      password,
    },
  });
  if (category) {
    return res.data.events.filter((event) => {
      return event.categories[0]?.name == category;
    });
  }
  console.log(
    res.data.events.map((event) => `${event.title} - ${event.start_date}`)
  );

  return res.data.events;
};

export default GetEvents;
