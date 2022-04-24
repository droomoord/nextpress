/* eslint-disable @next/next/no-img-element */
import getNijveraars from "../../functions/getNijveraars";
import getNavItems from "../../functions/getNavItems";
import Navbar from "../../components/navbar";
import settings from "../../settings";
import Head from "next/head";

const Nijveraar = ({ nijveraar, navItems }) => {
  console.log(nijveraar);
  const title = nijveraar.title?.rendered;
  const beroep = nijveraar.acf?.beroep;
  const imgUrl =
    nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.large
      ?.source_url ||
    nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.medium
      ?.source_url ||
    nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.full
      ?.source_url;
  const content = nijveraar.content?.rendered;

  return (
    <>
      <Head>
        <title>
          {settings.title} - {title}
        </title>
      </Head>
      <Navbar navItems={navItems} />
      <div>
        <img src={imgUrl} alt={title} />
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <h2>{beroep}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </>
  );
};

export default Nijveraar;

export async function getServerSideProps(context) {
  try {
    const navItems = await getNavItems();
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    const { nijveraar } = context.params;
    const fields = [
      "title",
      "content",
      "slug",
      "id",
      "acf",
      "_links.wp:featuredmedia",
    ];
    const nijveraars = await getNijveraars(fields, nijveraar);
    if (!nijveraars) {
      return {
        notFound: true,
      };
    }
    console.log(nijveraars);

    return {
      props: {
        nijveraar: nijveraars[0],
        navItems,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
