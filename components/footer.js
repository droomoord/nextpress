/* eslint-disable @next/next/no-img-element */
import classes from "../styles/footer.module.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className={classes.wrapper}>
      <button
        className={classes["icon-www"]}
        onClick={() => window.open("https://www.krisheijnen.dev")}
      >
        <img src="/assets/img/logo-www.png" alt="" className={classes.logo} />
        <div>
          <small>made by</small>
          <img
            src="/assets/img/logo-www-text.png"
            alt=""
            className={classes.text}
          />
        </div>
      </button>
      <div className={classes.social}>
        <button
          onClick={() => window.open("https://www.facebook.com/DENIJVERHEID/")}
          className={classes.fb}
        >
          <AiFillFacebook size={"2.5em"} />
        </button>
        <button
          onClick={() => window.open("https://www.instagram.com/denijverheid/")}
          className={classes.insta}
        >
          <AiFillInstagram size={"2.5em"} />
        </button>
        <button
          onClick={() =>
            window.open("https://www.linkedin.com/company/denijverheid/about/")
          }
          className={classes.li}
        >
          <AiFillLinkedin size={"2.5em"} />
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.youtube.com/channel/UCqvX10ppAQA8h2yGSnQX9Pg"
            )
          }
          className={classes.yt}
        >
          <AiFillYoutube size={"2.5em"} />
        </button>
      </div>
      <a
        className={classes.login}
        href={`${process.env.NEXT_PUBLIC_TARGET_URL}/wp-admin`}
        target="_blank"
        rel="noreferrer"
      >
        Login
      </a>
    </div>
  );
};

export default Footer;
