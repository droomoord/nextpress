import axios from "axios";

import auth from "./auth";
import { capitalize, makePath } from "./helpers";

const getNavItems = async (forStaticPaths) => {
  const { username, password, targetURL } = auth();
  const res = await axios({
    method: "GET",
    url: `${targetURL}/wp-json/wp/v2/menu-items?_fields=title,id`,
    auth: {
      username,
      password,
    },
  });
  const navItems = res.data;
  return navItems
    .map((item) => {
      return {
        text: capitalize(item.title.rendered),
        path: makePath(item.title.rendered),
        id: item.id,
      };
    })
    .concat(
      forStaticPaths
        ? null
        : [
            {
              text: "Agenda",
              path: "/agenda",
              id: "agenda",
            },
            {
              text: "Nijveraars",
              path: "/nijveraars",
              id: "nijveraars",
            },
          ]
    );
};

export default getNavItems;
