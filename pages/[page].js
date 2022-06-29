import getNavItems from "../functions/getNavItems";
import getMainContent from "../functions/getMainContent";
import getPosts from "../functions/getPosts";
import PageLayout from "../components/pageLayout";
import PostsLayout from "../components/postsLayout";
import settings from "../settings.js";
import Navbar from "../components/navbar";
import Head from "next/head";

const Page = ({ navItems, page, posts, count }) => {
  console.log(page);

  return (
    <>
      <Head>
        <title>
          {settings.title} - {page.title && page.title.rendered}
        </title>
        {page.acf?.meta_description && (
          <meta name="description" content={page.acf.meta_description} />
        )}
      </Head>
      <Navbar navItems={navItems} initiallyHidden={true} />
      <PageLayout page={page} />
    </>
  );
};

export default Page;

export async function getStaticProps(context) {
  try {
    const navItems = await getNavItems();
    const currentPage = context.params.page;
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    if (settings.postsPage?.toLowerCase() == currentPage.toLowerCase()) {
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
      const page = await getMainContent(currentPage, [
        "title",
        "featured_media",
        "_links.wp:featuredmedia",
        "_embedded.wp:featuredmedia",
      ]);

      if (!page) {
        return {
          notFound: true,
        };
      }
      return {
        props: { navItems, posts, count, page },
        ...(settings.revalidationTime && {
          revalidate: settings.revalidationTime,
        }),
      };
    } else {
      const page = await getMainContent(currentPage, [
        "content",
        "title",
        "featured_media",
        "_links.wp:featuredmedia",
        "_embedded.wp:featuredmedia",
        "acf",
      ]);
      if (!page) {
        return {
          notFound: true,
        };
      }
      return {
        props: { navItems, page },
        ...(settings.revalidationTime && {
          revalidate: settings.revalidationTime,
        }),
      };
    }
  } catch (error) {
    if (error.response?.data?.message) console.log(error.response.data.message);
    else console.log(error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const navItems = await getNavItems(true);
    const homeIndex = navItems.findIndex((item) => item.path == "/");
    if (homeIndex > -1) navItems.splice(homeIndex, 1);
    return {
      paths: navItems.map((item) => {
        return { params: { page: item.path.replace("/", "") } };
      }),
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}
