/* eslint-disable @next/next/no-img-element */
import getNijveraars from "../../functions/getNijveraars";
import getNavItems from "../../functions/getNavItems";
import Navbar from "../../components/navbar";
import settings from "../../settings";
import Head from "next/head";
import classes from "../../styles/nijveraar.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";

const Nijveraar = ({ nijveraar, navItems }) => {
  useEffect(() => {
    const images = document.querySelectorAll(".wp-block-gallery img");
    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        window.open(e.target.src);
      });
    });
  }, []);

  const router = useRouter();
  const title = nijveraar.title?.rendered;
  const beroep = nijveraar.acf?.beroep;
  // const imgUrl =
  //   nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.large
  //     ?.source_url ||
  //   nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.medium
  //     ?.source_url ||
  //   nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.full
  //     ?.source_url;
  const content = nijveraar.content?.rendered;

  return (
    <>
      <Head>
        <title>
          {settings.title} - {title}
        </title>
      </Head>
      <Navbar navItems={navItems} initiallyHidden={true} />
      <main className="np-main-content">
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
            <h2>{beroep}</h2>
          </div>
          {/* <img src={imgUrl} alt={title} /> */}
          {/* <h2 className={classes.beroep}>{}</h2> */}
          <div
            className={classes.description}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <button
            className={`button ${classes.button}`}
            onClick={() => router.back()}
          >
            <IoIosArrowBack />
            <span>Nijveraars</span>
          </button>
        </div>
      </main>
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
