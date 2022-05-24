import { useRouter } from "next/router";
import { CgMenu } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useState } from "react";

import MobileMenu from "./mobileMenu";

import classes from "../styles/navbar.module.scss";

const Navbar = ({ navItems, initiallyHidden }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    if (initiallyHidden === true) {
      window.addEventListener("scroll", () => {
        setShowNavbar(true);
      });
    }
    return setShowNavbar(false);
  }, [initiallyHidden]);

  const router = useRouter();
  const path = router.asPath;
  function clickedNavItem(path, event) {
    setMenuOpen(false);
    event.stopPropagation();
    console.log(event.target);
    event.target.classList.add(classes.active);
    router.push(path);
  }
  const navItemsRendered = navItems
    ? navItems.map((item) => {
        const active = path == item.path || path + "/" == item.path;
        if (item.path != "/")
          // dont wanna show the homepage in the navbar in this case
          return (
            <Link href={item.path} key={item.id}>
              <a
                onClick={(event) => clickedNavItem(item.path, event)}
                className={`${classes.link} ${active ? classes.active : ""}`}
              >
                {item.text}
              </a>
            </Link>
          );
      })
    : [];

  return (
    <nav
      className={`${classes.navbar} ${initiallyHidden ? classes.hidden : null}`}
      style={{ top: initiallyHidden && showNavbar ? "0" : null }}
    >
      {/* <h1 className={classes.title}>de nijverheid</h1> */}
      <Link href="/">
        <a className={classes.logo}>
          <span>=</span>
          <span>d</span>
          <span>n</span>
          <span>h</span>
        </a>
      </Link>
      <button
        className={classes["np-menu-button"]}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <CgMenu size={"2em"} aria-label="open menu" />
      </button>
      <div className={`${classes["np-nav-items"]}`}>{navItemsRendered}</div>
      {menuOpen && (
        <MobileMenu
          navItems={navItems}
          path={path}
          clickedNavItem={clickedNavItem}
          closeMenu={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
