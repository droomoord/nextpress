/* eslint-disable @next/next/no-img-element */
import classes from "../styles/postLayout.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";

const PostLayout = ({ post }) => {
  const router = useRouter();

  const date = new Date(post.date);
  const dateString = date?.toLocaleDateString();
  const image = post.featured_media
    ? post._embedded["wp:featuredmedia"][0]?.source_url
    : "/assets/img/icon.jpg";

  return (
    <div className="np-main-content">
      <div className={classes.wrapper}>
        <div className={classes["img-wrapper"]}>
          <img src={image} alt={post.title?.rendered} />
        </div>
        <div className={classes.info}>
          <div className={classes.headerWrapper}>
            <h2
              className={classes.title}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></h2>
            <small className={classes.date}>{dateString}</small>
          </div>
        </div>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
        {/* <button className={`button`} onClick={() => router.back()}>
          <IoIosArrowBack />
          terug
        </button> */}
      </div>
    </div>
  );
};

export default PostLayout;
