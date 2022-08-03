import { useState, useEffect } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaCopy } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import classes from "../styles/social.module.scss";

export const Social = () => {
  const [url, setUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  useEffect(() => {
    setUrl(window?.location?.href);
  }, []);
  const [showIcons, setShowIcons] = useState(false);
  const copyToClipboard = () => {
    navigator?.clipboard?.writeText(url);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1000);
  };
  const icons = (
    <>
      <FaFacebook
        onClick={() =>
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        }
      />
      <FaLinkedin
        onClick={() =>
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
          )
        }
      />
      {copySuccess ? (
        <AiOutlineCheck color="green" />
      ) : (
        <FaCopy onClick={copyToClipboard} />
      )}
    </>
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes["icons-wrapper"]}>
        {showIcons && icons}
        <BsFillShareFill onClick={() => setShowIcons(!showIcons)} />
      </div>
    </div>
  );
};
