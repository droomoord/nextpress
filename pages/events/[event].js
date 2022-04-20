import getEvent from "../../functions/getEvent";
import classes from "../../styles/event.module.scss";
import Image from "next/image";

const Event = ({ event }) => {
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

export default Event;

export async function getServerSideProps(context) {
  try {
    const slug = context.params.event;
    const regexp = /^\d+/;
    const match = slug.match(regexp);
    if (!match)
      return {
        notFound: true,
      };
    const eventId = match[0];
    const event = await getEvent(eventId);
    if (!event)
      return {
        notFound: true,
      };
    return {
      props: {
        event,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
