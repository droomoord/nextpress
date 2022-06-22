/* eslint-disable @next/next/no-img-element */
import classes from "../styles/events.module.scss";
import { createSummery } from "../functions/helpers";
import Link from "next/link";
import LazyLoad from "./lazyload";
import { useRouter } from "next/router";

const EventsLayout = ({ events, currentCategory }) => {
  const router = useRouter();
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
  const changedCategory = (category) => {
    if (!category) router.push(`/agenda`);
    else router.push(`/agenda?category=${category}`);
  };

  if (events.length == 0)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <div>geen events om weer te geven!</div>
        <button className={"button"} onClick={() => router.back()}>
          terug
        </button>
      </div>
    );
  const categories = [
    {
      name: "Alles",
      link: "",
    },
    {
      name: "Exposities",
      link: "expositie",
    },
    {
      name: "Muziek",
      link: "muziek",
    },
    {
      name: "Eten",
      link: "eten",
    },
    {
      name: "Lezingen",
      link: "lezingen",
    },
    {
      name: "Podiumkunsten",
      link: "podiumkunsten",
    },
    {
      name: "Films",
      link: "film",
    },
  ];
  return (
    <main className="np-main-content">
      <h1 className={classes.hidden}>Events</h1>
      {/* <div className={classes.links}>
        <Link href="/agenda">Alles</Link>
        <Link href="/agenda?category=expositie">Exposities</Link>
        <Link href="/agenda?category=muziek">Muziek</Link>
        <Link href="/agenda?category=blablabla">Blablabla</Link>
      </div> */}

      <div className={`${classes["events-wrapper"]}`}>
        <div className={classes["select-wrapper"]}>
          <select
            name="select category"
            id=""
            onChange={(e) => changedCategory(e.target.value)}
            defaultValue={currentCategory}
          >
            {/* <option value="" defaultChecked={category == ""}>Alles</option>
          <option value="expositie">Exposities</option>
          <option value="muziek">Muziek</option> */}
            {categories.map((category) => {
              console.log(category.link == currentCategory);
              return (
                <option
                  value={category.link}
                  key={category.link}
                  // defaultChecked={category.link == currentCategory}
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        {createEventsByMonth(events).map((month) => {
          return (
            <div key={month.month} className={classes.events}>
              <span className={classes.month}>{month.month}</span>
              {month.events.map((e) => {
                const { event } = e;
                const startTime = `${event.start_date_details?.hour}:${event.start_date_details?.minutes}`;
                const endTime = `${event.end_date_details?.hour}:${event.end_date_details?.minutes}`;
                console.log(event.image);

                return (
                  <Link
                    key={event.id}
                    href={`/agenda/${event.id}-${event.slug}`}
                  >
                    <a className={classes.event}>
                      <LazyLoad
                        childClassName={classes.image}
                        onLoadFunc={(el) =>
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
                          {event.end_date_details &&
                            !event.all_day &&
                            startTime != endTime &&
                            !IsOneDayEvent(event) && (
                              <span>
                                tot{" "}
                                {`${event.end_date_details.day} ${
                                  monthsOfTheYear[
                                    Number(event.end_date_details.month) - 1
                                  ]
                                } / ${endTime}`}
                              </span>
                            )}
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
