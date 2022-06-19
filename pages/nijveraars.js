/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import settings from "../settings";
import Navbar from "../components/navbar";
import classes from "../styles/nijveraars.module.scss";
import getNavItems from "../functions/getNavItems";
import getNijveraars from "../functions/getNijveraars";
import Link from "next/link";
import LazyLoad from "../components/lazyload";

const Nijveraars = ({ nijveraars, navItems }) => {
  return (
    <>
      <Head>
        <title>{settings.title} - Nijveraars</title>
        <meta
          name="description"
          content="Een lijst van alle kunstenaars die bij de Nijverheid aangesloten zijn. Elke kunstenaar heeft een eigen profiel."
        />
      </Head>
      <Navbar navItems={navItems} />
      <main className="np-main-content">
        <div className={classes.container}>
          <div className={classes.wrapper}>
            {nijveraars.map((nijveraar) => {
              const imgUrl =
                nijveraar._embedded["wp:featuredmedia"][0]?.media_details?.sizes
                  ?.thumbnail?.source_url;
              const title = nijveraar.title.rendered;
              const beroep = nijveraar.acf.beroep;
              const slug = nijveraar.slug;
              return (
                <Link key={nijveraar.id} href={`/nijveraars/${slug}`}>
                  <a className={classes.nijveraar}>
                    {imgUrl && (
                      <LazyLoad>
                        <img
                          src={
                            nijveraar._embedded["wp:featuredmedia"][0]
                              .media_details.sizes.thumbnail.source_url
                          }
                          alt={nijveraar.title.rendered}
                        />
                      </LazyLoad>
                    )}
                    <div>
                      {title && (
                        <div
                          dangerouslySetInnerHTML={{ __html: title }}
                          className={classes.title}
                        ></div>
                      )}
                      {beroep && (
                        <small
                          dangerouslySetInnerHTML={{ __html: beroep }}
                          className={classes.beroep}
                        ></small>
                      )}
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Nijveraars;

export async function getStaticProps() {
  try {
    const navItems = await getNavItems();
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    const fields = ["title", "slug", "id", "acf", "_links.wp:featuredmedia"];
    const nijveraars = await getNijveraars(fields);
    if (!nijveraars) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        nijveraars,
        navItems,
      },
      revalidate: settings.revalidationTime,
    };
  } catch (error) {
    console.log(error);
  }
}
