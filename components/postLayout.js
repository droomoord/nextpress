/* eslint-disable @next/next/no-img-element */
import classes from "../styles/postLayout.module.scss";
import Link from "next/link";

const PostLayout = ({ post }) => {
  console.log(post);

  const date = new Date(post.date);
  const dateString = date?.toLocaleDateString();
  const image = post.featured_media
    ? post._embedded["wp:featuredmedia"][0]?.source_url
    : "/assets/img/icon.jpg";
  console.log(image);

  return (
    <div className="np-main-content">
      <div className={classes.wrapper}>
        <img src={image} alt={post.title?.rendered} />
        <div>
          <div className={classes.header}>
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
        <Link href={"/"}>Terug</Link>
      </div>
    </div>
  );
};

export default PostLayout;
