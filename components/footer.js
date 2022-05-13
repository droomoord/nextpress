import classes from "../styles/footer.module.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.social}>
        <button
          onClick={() => window.open("https://www.facebook.com/DENIJVERHEID/")}
        >
          <AiFillFacebook size={"2em"} />
        </button>
        <button
          onClick={() => window.open("https://www.instagram.com/denijverheid/")}
        >
          <AiFillInstagram size={"2em"} />
        </button>
        <button
          onClick={() =>
            window.open("https://www.linkedin.com/company/denijverheid/about/")
          }
        >
          <AiFillLinkedin size={"2em"} />
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
