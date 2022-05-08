import classes from "../styles/mobileMenu.module.scss";
import { AiOutlineClose } from "react-icons/ai";

import Link from "next/link";

const MobileMenu = ({ navItems, path, clickedNavItem, closeMenu }) => {
  const navItemsRendered = navItems
    ? navItems.map((item, index) => {
        const active = path == item.path || path + "/" == item.path;
        if (item.path != "/")
          // dont wanna show the homepage in the navbar in this case
          return (
            <Link href={item.path} key={item.id}>
              <a
                onClick={(event) => clickedNavItem(item.path, event)}
                className={active ? classes.active : null}
                style={{ animationDelay: `${index ? index / 100 : 0}s` }}
              >
                {item.text}
              </a>
            </Link>
          );
      })
    : [];
  return (
    <div className={classes.container}>
      <button className={classes.x} onClick={closeMenu}>
        <AiOutlineClose />
      </button>
      <div className={classes.wrapper}>{navItemsRendered}</div>
    </div>
  );
};

export default MobileMenu;
