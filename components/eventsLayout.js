/* eslint-disable @next/next/no-img-element */
import classes from "../styles/events.module.scss";
import { createSummery } from "../functions/helpers";

const EventsLayout = ({ events }) => {
  const createDate = (details) => {
    return details ? ` ${details.year}-${details.month}-${details.day}` : null;
  };
  const isValidEvent = (event) => {
    return event.title && event.description && event.start_date_details;
  };
  const getDay = (date) => {
    const days = ["zo", "ma", "di", "wo", "do", "vr", "za"];
    return days[date.getDay()];
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
    "oct",
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
                  <a
                    className={classes.event}
                    key={event.id}
                    href={`/agenda/${event.id}-${event.slug}`}
                  >
                    {event.image && (
                      <div
                        className={classes.image}
                        style={{ backgroundImage: `url("${event.image.url}")` }}
                      >
                        {/* <img src={event.image.url} alt={event.title}></img> */}
                      </div>
                    )}
                    <span className={classes.day}>
                      {e.dayName} {e.day}{" "}
                      {event.all_day ? "/ (de hele dag)" : `/ ${startTime}`}{" "}
                      {event.end_date_details &&
                        !event.all_day &&
                        startTime != endTime &&
                        IsOneDayEvent(event) && <span>- {endTime}</span>}
                    </span>

                    <div className={classes.info}>
                      <h2 className={classes["event-title"]}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: event.title,
                          }}
                        ></span>
                      </h2>
                      <div>{createSummery(event.description, 150)}</div>
                    </div>
                  </a>
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
