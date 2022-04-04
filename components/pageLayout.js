import Image from "next/image";

const PageLayout = ({ page }) => {
  const image = page.featured_media
    ? page._embedded["wp:featuredmedia"][0]
    : null;
  const imageSize = "medium_large";
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
      <h1
        className="np-page-title"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      ></h1>
      <div
        className="np-main-content"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      ></div>
    </main>
  );
};

export default PageLayout;
