/* eslint-disable @next/next/no-img-element */
import classes from "../styles/event.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Social } from "./social";

const EventLayout = ({ event }) => {
  const [imgPos, setImgPos] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    setScrollHeight(document.body.scrollHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(scrollHeight);
      if (window && window.scrollY && scrollHeight > 0) {
        setImgPos(Math.round((window.scrollY / scrollHeight) * 250));
      }
    });
  }, [scrollHeight]);

  const router = useRouter();
  const clickedButton = (website, e) => {
    e.preventDefault();
    window.open(website);
  };
  const monthsOfTheYear = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];
  const getDay = (date) => {
    const days = [
      "Zondag",
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag",
    ];
    return days[date.getDay()];
  };
  const IsOneDayEvent = (event) => {
    const { start_date_details, end_date_details } = event;
    return (
      start_date_details.day == end_date_details.day &&
      start_date_details.month == end_date_details.month
    );
  };
  const startTime = `${event.start_date_details?.hour}:${event.start_date_details?.minutes}`;
  const endTime = `${event.end_date_details?.hour}:${event.end_date_details?.minutes}`;
  return (
    <div className="np-main-content">
      <div className={classes["event-wrapper"]}>
        {event.image && (
          <div className={classes["img-wrapper"]}>
            <Social />
            <img
              src={event.image.url}
              alt={event.title}
              style={{ objectPosition: `0 ${imgPos}%` }}
            />
          </div>
        )}
        <h2 className={classes.title}>
          <span dangerouslySetInnerHTML={{ __html: event.title }}></span>
        </h2>
        <div className={classes.flex}>
          {event.cost && (
            <span className={classes.entree}>
              Entree: {event.cost == "Free" ? "gratis!" : event.cost}
            </span>
          )}
          {event.website && (
            <button
              onClick={(e) => clickedButton(event.website, e)}
              className="button"
            >
              koop kaartjes
            </button>
          )}
        </div>
        <span className={classes.date}>
          {getDay(new Date(event.start_date) || "")}{" "}
          {event.start_date_details.day}{" "}
          {monthsOfTheYear[Number(event.start_date_details?.month) - 1]}{" "}
          {/* {event.all_day ? "/ (de hele dag)" : `/ ${startTime}`}{" "} */}
          {event.all_day ? "" : `/ ${startTime}`}{" "}
          {new Date(event.end_date).toDateString() !==
            new Date(event.start_date).toDateString() &&
            event.all_day &&
            `- ${event.end_date_details.day} ${
              monthsOfTheYear[Number(event.end_date_details.month) - 1]
            }`}
          {event.end_date_details &&
            !event.all_day &&
            startTime != endTime &&
            IsOneDayEvent(event) && <span>- {endTime}</span>}
          {event.end_date_details &&
            !event.all_day &&
            startTime != endTime &&
            !IsOneDayEvent(event) && (
              <span>
                tot{" "}
                {`${event.end_date_details.day} ${
                  monthsOfTheYear[Number(event.end_date_details.month) - 1]
                } / ${endTime}`}
              </span>
            )}
        </span>

        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: event.description }}
        ></div>
        <button className={`button`} onClick={() => router.back()}>
          <IoIosArrowBack />
          terug
        </button>
      </div>
    </div>
  );
};

export default EventLayout;
