import Image from "next/image";
import Link from "next/link";
import settings from "../settings.js";

const PostLayout = ({ post }) => {
  const date = new Date(post.date);
  const dateString = date.toLocaleDateString();
  const image = post.featured_media
    ? post._embedded["wp:featuredmedia"][0]
    : null;
  const imageSize = "full";

  return (
    <div className="np-main-content">
      <Link href={"/" + settings.postsPage}>Back to posts</Link>
      <div className="np-post">
        <div>
          {post.featured_media && (
            <Image
              src={image.media_details.sizes[imageSize].source_url}
              width={image.media_details.sizes[imageSize].width}
              height={image.media_details.sizes[imageSize].height}
              alt={image.alt_text}
              layout="responsive"
            />
          )}
        </div>
        <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
        <small>{dateString}</small>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
      </div>
    </div>
  );
};

export default PostLayout;
