/* eslint-disable @next/next/no-img-element */
import classes from "../styles/event.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";

const EventLayout = ({ event }) => {
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
        {event.image && <img src={event.image.url} alt={event.title} />}
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
          {event.all_day ? "/ (de hele dag)" : `/ ${startTime}`}{" "}
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
