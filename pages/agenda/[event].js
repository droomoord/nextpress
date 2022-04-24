import getEvent from "../../functions/getEvent";
import EventLayout from "../../components/eventLayout";

const Event = ({ event }) => {
  return <EventLayout event={event} />;
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
