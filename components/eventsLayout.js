import classes from "../styles/events.module.scss";
import Image from "next/image";
const { convert } = require("html-to-text");

const EventsLayout = ({ events }) => {
  const createDate = (details) => {
    return details ? ` ${details.year}-${details.month}-${details.day}` : null;
  };
  const createSummery = (HTMLstring) => {
    const shortenString = (string, length) => {
      return string.length > length
        ? `${string.substring(0, length)}...`
        : string;
    };
    return shortenString(convert(HTMLstring).replace(/\[.+\]/, ""), 300);
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
        const summery = createSummery(event.description);
        const eventObject = {
          year,
          month: monthsOfTheYear[Number(month) - 1],
          day,
          dayName: getDay(new Date(date)),
          date,
          summery,
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
  return (
    <main>
      <h1 className="np-page-title">Events</h1>
      <div className={`${classes["events-wrapper"]}`}>
        {createEventsByMonth(events).map((month) => {
          return (
            <div key={month.month} className={classes.events}>
              <span className={classes.month}>{month.month}</span>
              {month.events.map((event) => {
                return (
                  <div className={classes.event} key={event.event.id}>
                    <span className={classes.day}>
                      {event.dayName} {event.day}
                    </span>
                    {event.event.image && (
                      <Image
                        src={event.event.image.sizes.thumbnail.url}
                        alt={event.event.title}
                        height={event.event.image.height}
                        width={event.event.image.width}
                        layout="intrinsic"
                      ></Image>
                    )}
                    <div className={classes.info}>
                      <h2>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: event.event.title,
                          }}
                        ></span>
                      </h2>
                      <div>{createSummery(event.event.description)}</div>
                    </div>
                  </div>
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
