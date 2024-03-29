import Head from "next/head";
import getNavItems from "../functions/getNavItems";
import PageLayout from "../components/pageLayout";
import GetMainContent from "../functions/getMainContent";
import settings from "../settings.js";
import Navbar from "../components/navbar";

export default function Home({ navItems, page }) {
  return (
    <>
      <Head>
        <title>{settings.title}</title>
      </Head>
      <Navbar navItems={navItems} />
      <PageLayout page={page} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const navItems = await getNavItems();
    const homePage = process.env.NEXT_PUBLIC_HOME || settings.homePage;
    const fields = [
      "content",
      "title",
      "featured_media",
      "_links.wp:featuredmedia",
      "_embedded.wp:featuredmedia",
    ];
    const page = await GetMainContent(homePage, fields);
    // if (!page || !navItems) {
    //   return {
    //     notFound: true,
    //   };
    // }
    return {
      props: { navItems, page },
      ...(settings.revalidationTime && {
        revalidate: settings.revalidationTime,
      }),
    };
  } catch (error) {
    if (error.response?.data?.message) console.log(error.response.data.message);
    else console.log(error);
    return {
      notFound: true,
    };
  }
}
