/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import classes from "../styles/HomeLayout.module.scss";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { createSummery } from "../functions/helpers";

const HomeLayout = ({ page, posts, events }) => {
  const router = useRouter();
  const NewsItemsRef = useRef(null);
  const amountPerClick = 200;
  const moveLeft = (element) => {
    element.current.scrollLeft = element.current.scrollLeft - amountPerClick;
  };
  const moveRight = (element) => {
    element.current.scrollLeft = element.current.scrollLeft + amountPerClick;
  };
  // useEffect(() => {
  //   const map = L.map("map").setView([52.1003491, 5.0835228], 18);
  //   L.tileLayer(
  //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  //     {
  //       maxZoom: 19,
  //       id: "mapbox/streets-v11",
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       accessToken:
  //         "pk.eyJ1IjoiZHJvb21vb3JkIiwiYSI6ImNsMmtuYXowbjE4NTczY3A5MnljanJ0c2oifQ.l5pewtl1ExKV4ENU2E_gew",
  //     }
  //   ).addTo(map);
  //   function tekenBovenlaag() {
  //     var linksOnder = [52.09955, 5.082];
  //     var rechtsBoven = [52.1008, 5.0855];
  //     var imageUrl = "/assets/img/maplayer_master_transparant.gif";
  //     var imageBounds = [linksOnder, rechtsBoven];

  //     var bovenlaag = L.imageOverlay(imageUrl, imageBounds, {
  //       interactive: true,
  //     })
  //       .addTo(map)
  //       .setOpacity(1);

  //     var exboot_linksonder = L.latLng(52.100171, 5.082637);
  //     var exboot_rechtsboven = L.latLng(52.100248, 5.083034);
  //     var exbootLocation = L.latLngBounds(
  //       exboot_linksonder,
  //       exboot_rechtsboven
  //     );

  //     bovenlaag.on("click", function (clickOnTheMap) {
  //       if (exbootLocation.contains(clickOnTheMap.latlng)) {
  //         window.open("https://www.exboot.nl");
  //       }
  //     });
  //   }
  //   tekenBovenlaag();
  // }, []);

  return (
    <>
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          crossOrigin=""
        /> */}
      </Head>
      <div className={classes.container}>
        <div className={`${classes.logo} `}>
          <div className={classes.takraf}>
            <div>
              <span>=</span>
              <span className={classes.roll}>=</span>
              <span>======de</span>
            </div>
            <h1>nijverheid</h1>
            <div>
              <span>==========</span>
            </div>
          </div>
        </div>
        <h2 className={classes.subtitle}>
          Ateliers - Kunstcafe - Exposities - Podiumkunsten
        </h2>
        <figure className={classes.panorama}>
          <img
            src="/assets/img/panorama.jpg"
            alt="de Nijverheid panorama"
          ></img>
        </figure>
        {posts && posts.length > 0 && (
          <section className={classes.nieuws}>
            <h3 className="np-title">Nieuws</h3>
            <button
              className={classes.left}
              onClick={() => moveLeft(NewsItemsRef)}
            >
              <BsFillArrowLeftCircleFill size={100} />
            </button>
            <button
              className={classes.right}
              onClick={() => moveRight(NewsItemsRef)}
            >
              <BsFillArrowRightCircleFill size={100} />
            </button>
            <div className={classes.nieuwsitems} ref={NewsItemsRef}>
              {posts.map((post) => {
                const image =
                  post?._embedded?.["wp:featuredmedia"][0]?.media_details?.sizes
                    ?.thumbnail?.source_url;
                return (
                  <Link key={post.id} href={`/nieuws/${post?.slug}`}>
                    <a className={classes.item}>
                      <div className={classes.image}>
                        {image ? (
                          <img src={image} alt={post?.title?.rendered} />
                        ) : null}
                      </div>
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: post?.title?.rendered,
                        }}
                      ></h4>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        {events && events.length > 0 && (
          <section className={classes.agenda}>
            <h3 className="np-title">Agenda</h3>
            <div className={classes.agendaitems}>
              {events.map((event) => {
                const { year, month, day, hour, minutes } =
                  event.start_date_details;
                const date = `${day}-${month}-${year}`;
                const time = `${hour}:${minutes}`;
                return (
                  <div className={classes.event} key={event.id}>
                    <div className={classes.imagewrapper}>
                      {event.image && (
                        <img src={event.image?.sizes?.thumbnail?.url} alt="" />
                      )}
                    </div>
                    <div className={classes.info}>
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: createSummery(event.title, 50),
                        }}
                      ></h4>
                      <span>
                        {date} / {time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className={`button ${classes.button}`}
              onClick={() => router.push("/agenda")}
            >
              Bekijk alles
            </button>
          </section>
        )}
        <section className={classes.info}>
          <h3 className="np-title">info</h3>
          <div className={classes.wrapper}>
            <div
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            ></div>
          </div>

          {/* <div id="map" className={classes.map}></div> */}
        </section>
        {/* <script
          src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
          integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
          crossOrigin=""
        ></script> */}
      </div>
    </>
  );
};

export default HomeLayout;
