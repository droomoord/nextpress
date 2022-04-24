import Image from "next/image";
import classes from "../styles/event.module.scss";

const EventLayout = ({ event }) => {
  return (
    <div className={classes["event-wrapper"]}>
      {event.image && (
        <Image
          src={event.image.url}
          alt={event.title}
          height={event.image.height}
          width={event.image.width}
          layout="responsive"
        />
      )}
      <h1>
        <span dangerouslySetInnerHTML={{ __html: event.title }}></span>
      </h1>
      <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
    </div>
  );
};

export default EventLayout;
