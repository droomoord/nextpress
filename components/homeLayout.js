/* eslint-disable @next/next/no-img-element */
import classes from "../styles/HomeLayout.module.scss";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import { createSummery } from "../functions/helpers";

const HomeLayout = ({ page, posts, events }) => {
  const router = useRouter();
  console.log(events);

  const NewsItemsRef = useRef(null);
  const amountPerClick = 200;
  const moveLeft = (element) => {
    element.current.scrollLeft = element.current.scrollLeft - amountPerClick;
  };
  const moveRight = (element) => {
    element.current.scrollLeft = element.current.scrollLeft + amountPerClick;
  };

  return (
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
      <div className={classes.panorama}>
        <img src="/assets/img/panorama.jpg" alt="de Nijverheid panorama"></img>
      </div>
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
      <section className={classes.contact}>
        <h3 className="np-title">contact</h3>
      </section>
      {/* <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div> */}
    </div>
  );
};

export default HomeLayout;
