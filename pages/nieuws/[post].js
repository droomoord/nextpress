import settings from "../../settings.js";
import Navbar from "../../components/navbar";
import getPost from "../../functions/getPost";
import getNavItems from "../../functions/getNavItems";
import getPostsPaths from "../../functions/getPostsPaths";
import PostLayout from "../../components/postLayout";
import Head from "next/head";

const Post = ({ navItems, post }) => {
  return (
    <>
      <Head>
        <title>
          {settings.title} - {post.title && post.title.rendered}
        </title>
      </Head>
      <Navbar navItems={navItems} />
      <PostLayout post={post} />
    </>
  );
};

export default Post;

export async function getStaticProps(context) {
  try {
    const navItems = await getNavItems();
    const fields = [
      "title",
      "content",
      "date",
      "id",
      "slug",
      "featured_media",
      "_links.wp:featuredmedia",
      "_embedded.wp:featuredmedia",
    ];
    const post = await getPost(context.params.post, fields);
    return {
      props: { navItems, post },
      ...(settings.revalidationTime && {
        revalidate: settings.revalidationTime,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const posts = await getPostsPaths();
    return {
      paths: posts.map((post) => {
        return { params: { post: post.slug } };
      }),
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
  }
}
