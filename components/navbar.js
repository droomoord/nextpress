import { useRouter } from "next/router";
import { CgMenu } from "react-icons/cg";
import { useState } from "react";

const Navbar = ({ navItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const path = router.asPath;
  function clickedNavItem(path, event) {
    setMenuOpen(false);
    event.stopPropagation();
    router.push(path);
  }
  console.log("path", path);
  return (
    <nav>
      <button className="np-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <CgMenu size={"2em"} />
      </button>
      <div className={`np-nav-items ${menuOpen ? "menu-open" : ""}`}>
        {navItems
          .concat({
            text: "Events",
            path: "/events",
            id: "events",
          })
          .map((item) => {
            const active = path == item.path || path + "/" == item.path;
            console.log("item.path", item.path);

            return (
              <a
                key={item.id}
                onClick={(event) => clickedNavItem(item.path, event)}
                className={active ? "active" : null}
                href={item.path}
              >
                {item.text}
              </a>
            );
          })}
      </div>
    </nav>
  );
};

export default Navbar;
