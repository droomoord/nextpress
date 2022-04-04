import Link from "next/link";
import Image from "next/image";
import getPosts from "../functions/getPosts";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

let imageSize = "full";

const PostsLayout = ({ posts, count, page }) => {
  const image = page.featured_media
    ? page._embedded["wp:featuredmedia"][0]
    : null;
  const [postsState, setPostsState] = useState(posts);
  const [pageNumber, setPageNumber] = useState(2);
  async function fetchData() {
    try {
      const { posts } = await getPosts(
        [
          "title",
          "excerpt",
          "date",
          "id",
          "slug",
          "featured_media",
          "_links.wp:featuredmedia",
          "_embedded.wp:featuredmedia",
        ],
        pageNumber
      );

      const postsCopy = [...postsState];
      setPostsState(postsCopy.concat(posts));
      setPageNumber(pageNumber + 1);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <div className="np-featured-image">
        {page.featured_media ? (
          <Image
            src={image.media_details.sizes[imageSize].source_url}
            width={image.media_details.sizes[imageSize].width}
            height={image.media_details.sizes[imageSize].height}
            alt={image.alt_text}
            layout="responsive"
            priority={true}
          />
        ) : null}
      </div>
      <h1 className="np-page-title">{page.title.rendered}</h1>
      <div className="np-main-content">
        <strong>total: {count} posts</strong>
        <InfiniteScroll
          dataLength={postsState.length}
          next={fetchData}
          hasMore={postsState.length < Number(count)}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>All {count} posts were loaded!</b>
            </p>
          }
        >
          {postsState.map((post, index) => {
            const image = post._embedded
              ? post._embedded["wp:featuredmedia"][0]
              : "";
            const date = new Date(post.date);
            const dateString = date.toLocaleDateString();
            return (
              <div className="np-post" key={post.id}>
                {post.featured_media && (
                  <Image
                    src={image.media_details.sizes[imageSize].source_url}
                    alt={image.alt_text}
                    width={image.media_details.sizes[imageSize].width}
                    height={image.media_details.sizes[imageSize].height}
                    priority={index == 0}
                    placeholder={"blur"}
                    blurDataURL={image.media_details.sizes.thumbnail.source_url}
                    layout="responsive"
                  />
                )}
                <h2
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h2>
                <small>{dateString}</small>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                ></div>
                <Link href={`/posts/${post.slug}`}>Read more...</Link>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </main>
  );
};
export default PostsLayout;
