import Head from "next/head";
import getNavItems from "../functions/getNavItems";
import getPosts from "../functions/getPosts";
import PageLayout from "../components/pageLayout";
import GetMainContent from "../functions/getMainContent";
import settings from "../settings.js";
import Navbar from "../components/navbar";
import getEvents from "../functions/getEvents";

export default function Home({ navItems, page, posts, events }) {
  return (
    <>
      <Head>
        <title>{settings.title}</title>
      </Head>
      <Navbar navItems={navItems} initiallyHidden />
      <PageLayout page={page} posts={posts} events={events} />
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
    if (!page || !navItems) {
      return {
        notFound: true,
      };
    }
    const { posts, count } = await getPosts(
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
      1
    );
    const events = await getEvents(3);
    return {
      props: { navItems, page, posts, count, events },
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
