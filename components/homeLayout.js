/* eslint-disable @next/next/no-img-element */
import classes from "../styles/HomeLayout.module.scss";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { createSummery } from "../functions/helpers";
import Map from "./map";
import LazyLoad from "./lazyload";

const HomeLayout = ({ page, posts, events }) => {
  const router = useRouter();
  const [panoramaLoaded, setPanoramaLoaded] = useState(false);
  const NewsItemsRef = useRef(null);
  const amountPerClick = 300;
  const moveLeft = (element) => {
    element.current.scrollLeft = element.current.scrollLeft - amountPerClick;
  };
  const moveRight = (element) => {
    element.current.scrollLeft = element.current.scrollLeft + amountPerClick;
  };

  return (
    <>
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
        {/* <h2 className={classes.subtitle}>
          Ateliers - Kunstcafe - Exposities - Podiumkunsten
        </h2> */}
        <figure className={classes.panorama} style={{ minHeight: "50vh" }}>
          <Image
            src="/assets/img/panorama.jpg"
            alt="de Nijverheid panorama"
            width={2841}
            height={750}
            onLoad={() => setPanoramaLoaded(true)}
            className={panoramaLoaded ? classes.unblur : ""}
          ></Image>
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
                  post._embedded?.["wp:featuredmedia"][0]?.media_details?.sizes
                    ?.thumbnail?.source_url || "/assets/img/icon.jpg";
                return (
                  <Link key={post.id} href={`/nieuws/${post?.slug}`}>
                    <a className={classes.item}>
                      <LazyLoad>
                        <div className={classes.image}>
                          {image ? (
                            <img src={image} alt={post?.title?.rendered} />
                          ) : null}
                        </div>
                      </LazyLoad>
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
                const image =
                  event.image?.sizes?.thumbnail?.url || "/assets/img/icon.jpg";
                const { year, month, day, hour, minutes } =
                  event.start_date_details;
                const date = `${day}-${month}-${year}`;
                const time = `${hour}:${minutes}`;
                return (
                  <Link
                    key={event.id}
                    href={`/agenda/${event.id}-${event.slug}`}
                  >
                    <a className={classes.event}>
                      <div className={classes.imagewrapper}>
                        <LazyLoad>
                          <img src={image} alt="" />
                        </LazyLoad>
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
                    </a>
                  </Link>
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
          <h3 className="np-title">Praktisch</h3>
          <div className={classes.wrapper}>
            <div
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            ></div>
          </div>

          <LazyLoad>
            <Map />
          </LazyLoad>
        </section>
      </div>
    </>
  );
};

export default HomeLayout;
