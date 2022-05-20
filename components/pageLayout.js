// import Image from "next/image";
import HomeLayout from "./homeLayout";
import { useRouter } from "next/router";
import Map from "./map";
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";

const PageLayout = ({ page, posts, events }) => {
  const router = useRouter();
  // const image = page.featured_media
  //   ? page._embedded["wp:featuredmedia"][0]
  //   : null;
  // const imageSize = "medium_large";
  let render;
  const path = router.asPath;
  console.log(path);
  const pageId = path.replace("/", "");
  if (path == "/")
    render = <HomeLayout page={page} posts={posts} events={events} />;
  else
    render = (
      <>
        <div
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          className="dynamic-page"
          id={pageId}
        ></div>
        {path == "/praktisch" ? <Map /> : null}
      </>
    );
  return (
    <>
      <main>
        {/* <div className="np-featured-image">
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
        </div> */}
        {/* <h1
          className="np-page-title"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        ></h1> */}
        <div className="np-main-content">{render}</div>
      </main>
    </>
  );
};

export default PageLayout;
