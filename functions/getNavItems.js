import axios from "axios";

import auth from "./auth";
import { capitalize, makePath } from "./helpers";

const getNavItems = async () => {
  const { username, password, targetURL } = auth();
  // const res = await axios({
  //   method: "GET",
  //   url: `${targetURL}/wp-json/wp/v2/menu-items?_fields=title,id`,
  //   auth: {
  //     username,
  //     password,
  //   },
  // });
  // const navItems = res.data;
  // return navItems.map((item) => {
  //   return {
  //     text: capitalize(item.title.rendered),
  //     path: makePath(item.title.rendered),
  //     id: item.id,
  //   };
  // });
  return [
    {
      path: "/",
      text: "home",
    },
    {
      path: "/wat-we-doen",
      text: "wat we doen",
    },
    {
      path: "/cases",
      text: "cases"
    },
    {
      path: "/blogpage",
      text: "foodForThought"
    },
    {
      path: "/#vacatures",
      text: "vacatures"
    },
    {
      path: "/contact",
      text: "contact"
    },
  ];
};

export default getNavItems;
