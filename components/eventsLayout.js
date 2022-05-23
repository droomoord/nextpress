/* eslint-disable @next/next/no-img-element */
import classes from "../styles/events.module.scss";
import { createSummery } from "../functions/helpers";
import Link from "next/link";
import LazyLoad from "./lazyload";

const EventsLayout = ({ events }) => {
  const createDate = (details) => {
    return details ? ` ${details.year}-${details.month}-${details.day}` : null;
  };
  const isValidEvent = (event) => {
    return (
      event.title &&
      event.description &&
      event.start_date_details &&
      event.status == "publish"
    );
  };
  const getDay = (date) => {
    const days = ["zo", "ma", "di", "wo", "do", "vr", "za"];
    return days[date.getDay()];
  };
  const clickedButton = (website, e) => {
    e.preventDefault();
    window.open(website);
  };

  const createEventsByMonth = (events) => {
    console.log(events);

    const eventsByMonth = [];
    events.forEach((event) => {
      if (isValidEvent(event)) {
        const { start_date_details } = event;
        const { year, month, day } = start_date_details;
        const date = createDate(start_date_details);
        // const summery = createSummery(event.description, 150);
        const eventObject = {
          year,
          month: monthsOfTheYear[Number(month) - 1],
          day,
          dayName: getDay(new Date(date)),
          date,
          // summery,
          event,
        };
        const monthIndex = eventsByMonth.findIndex(
          (month) => month.month === eventObject.month
        );
        if (monthIndex === -1) {
          eventsByMonth.push({
            month: eventObject.month,
            events: [eventObject],
          });
        } else {
          eventsByMonth[monthIndex].events.push(eventObject);
        }
      }
    });
    return eventsByMonth;
  };

  const monthsOfTheYear = [
    "jan",
    "feb",
    "mrt",
    "apr",
    "mei",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ];
  const IsOneDayEvent = (event) => {
    const { start_date_details, end_date_details } = event;
    return (
      start_date_details.day == end_date_details.day &&
      start_date_details.month == end_date_details.month
    );
  };
  return (
    <main className="np-main-content">
      <h1 className={classes.hidden}>Events</h1>
      <div className={`${classes["events-wrapper"]}`}>
        {createEventsByMonth(events).map((month) => {
          return (
            <div key={month.month} className={classes.events}>
              <span className={classes.month}>{month.month}</span>
              {month.events.map((e) => {
                const { event } = e;
                const startTime = `${event.start_date_details?.hour}:${event.start_date_details?.minutes}`;
                const endTime = `${event.end_date_details?.hour}:${event.end_date_details?.minutes}`;
                return (
                  <Link
                    key={event.id}
                    href={`/agenda/${event.id}-${event.slug}`}
                  >
                    <a className={classes.event} href="">
                      <LazyLoad
                        // childStyle={{
                        //   backgroundImage: event.image?.url
                        //     ? `url("${event.image.url}")`
                        //     : "url(/assets/img/icon.jpg)",
                        // }}
                        childClassName={classes.image}
                        onLoad={(el) =>
                          (el.style.backgroundImage = event.image?.url
                            ? `url("${event.image.url}")`
                            : "url(/assets/img/icon.jpg)")
                        }
                      ></LazyLoad>

                      <div className={classes.header}>
                        <span className={classes.day}>
                          {e.dayName} {e.day} {e.month}{" "}
                          {event.all_day ? "/ (de hele dag)" : `/ ${startTime}`}{" "}
                          {event.end_date_details &&
                            !event.all_day &&
                            startTime != endTime &&
                            IsOneDayEvent(event) && <span>- {endTime}</span>}
                        </span>
                        {event.cost && (
                          <span className={classes.entree}>
                            Entree:{" "}
                            {event.cost == "Free" ? "gratis!" : event.cost}
                          </span>
                        )}
                      </div>
                      <div className={classes.info}>
                        <h2 className={classes["event-title"]}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: event.title,
                            }}
                          ></span>{" "}
                        </h2>
                        <div className={classes.description}>
                          {createSummery(event.description, 150)}{" "}
                          <span className={classes.meer}>meer</span>
                        </div>
                      </div>
                      {event.website && (
                        <button
                          onClick={(e) => clickedButton(event.website, e)}
                          className="button"
                        >
                          koop kaartjes
                        </button>
                      )}
                    </a>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default EventsLayout;
