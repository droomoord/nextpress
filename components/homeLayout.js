/* eslint-disable @next/next/no-img-element */
import classes from "../styles/HomeLayout.module.scss";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Link from "next/link";

const HomeLayout = ({ page, posts }) => {
  return (
    <>
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
      <section className={classes.nieuws}>
        <h3 className="np-title">Nieuws</h3>
        <button className={classes.left}>
          <BsFillArrowLeftCircleFill size={100} />
        </button>
        <button className={classes.right}>
          <BsFillArrowRightCircleFill size={100} />
        </button>
        <div className={classes.nieuwsitems}>
          {posts.map((post) => {
            console.log(post);
            return (
              <Link key={post.id} href={`/nieuws/${post?.slug}`}>
                <a className={classes.item}>
                  <div className={classes.image}>
                    <img
                      src={
                        post?._embedded?.["wp:featuredmedia"][0]?.media_details
                          ?.sizes?.thumbnail?.source_url
                      }
                      alt={post?.title?.rendered}
                    />
                  </div>
                  <h4
                    dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
                  ></h4>
                </a>
              </Link>
            );
          })}
        </div>
      </section>

      {/* <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div> */}
    </>
  );
};

export default HomeLayout;
