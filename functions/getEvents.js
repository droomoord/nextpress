import axios from "axios";

import auth from "./auth";

const GetEvents = async (perPage, category, searchQuery, startingNow) => {
  const { username, password, targetURL } = auth();
  const today = new Date();
  // const month = today.getUTCMonth() + 1;
  // const day = today.getUTCDate();
  // const year = today.getUTCFullYear();
  // let startDate = new Date(`${month - 2}-${day}-${year}`);
  // startDate = startDate.toISOString().substring(0, 10);
  const startDate = new Date().toISOString().substring(0, 10);
  console.log(
    "URLURLURLURL",
    `${targetURL}/wp-json/tribe/events/v1/events?per_page=${
      perPage ? perPage : "100"
    }${searchQuery ? "&search=" + searchQuery : ""}${
      !startingNow ? `&start_date=${startDate}&status=publish` : ""
    }`
  );

  const res = await axios({
    method: "get",
    // url: `${targetURL}/wp-json/tribe/events/v1/events?per_page=${
    //   perPage ? perPage : "100"
    // }${searchQuery ? "&search=" + searchQuery : ""}`,
    url: `${targetURL}/wp-json/tribe/events/v1/events?per_page=${
      perPage ? perPage : "300"}${searchQuery ? "&search=" + searchQuery : ""}${!startingNow ? `&start_date=${startDate}&status=publish` : ""}`,
    auth: {
      username,
      password,
    },
  });
  if (category) {
    return filterOutOldEvents(
      res.data.events.filter((event) => {
        return event.categories[0]?.name == category;
      })
    );
  }
  function filterOutOldEvents(events) {
    return events.filter((event) => {
      if (event.end_date && new Date(event.end_date) > today) return true;
      // else if (event.start_date && new Date(event.start_date >= today))
      //   return true;
      else return false;
    });
  }
  return filterOutOldEvents(res.data.events);

  // return res.data.events;
};

export default GetEvents;
