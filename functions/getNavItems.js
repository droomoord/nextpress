// import axios from "axios";

// import auth from "./auth";
// import { capitalize, makePath } from "./helpers";

const getNavItems = async (forStaticPaths) => {
  // const { username, password, targetURL } = auth();
  // const res = await axios({
  //   method: "GET",
  //   url: `${targetURL}/wp-json/wp/v2/menu-items?_fields=title,id`,
  //   auth: {
  //     username,
  //     password,
  //   },
  // });
  // const navItems = res.data;
  // return navItems
  //   .map((item) => {
  //     return {
  //       text: capitalize(item.title.rendered),
  //       path: makePath(item.title.rendered),
  //       id: item.id,
  //     };
  //   })
  //   .concat(
  //     forStaticPaths
  //       ? null
  //       : [
  //           {
  //             text: "Agenda",
  //             path: "/agenda",
  //             id: "agenda",
  //           },
  //           {
  //             text: "Nijveraars",
  //             path: "/nijveraars",
  //             id: "nijveraars",
  //           },
  //         ]
  //   );
  return [
    { text: "Culturele Vrijhaven", path: "/culturele-vrijhaven", id: 10 },
    { text: "Kunstcafe", path: "/kunstcafe", id: 82 },
    { text: "Expo", path: "/expo", id: 85 },
    { text: "Verhuur", path: "/verhuur", id: 88 },
    { text: "Praktisch", path: "/praktisch", id: 94 },
    { text: "Home", path: "/", id: 9 },
  ].concat(
    forStaticPaths
      ? []
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
