import Image from "next/image";
import Head from "next/head";
import HomeLayout from "./homeLayout";

const PageLayout = ({ page }) => {
  const image = page.featured_media
    ? page._embedded["wp:featuredmedia"][0]
    : null;
  const imageSize = "medium_large";
  let render;
  if (page.title?.rendered == "Home") render = <HomeLayout page={page} />;
  else
    render = (
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
    );
  return (
    <>
      <Head>
        <title>Nijverheid - {page.title.rendered}</title>
      </Head>
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
