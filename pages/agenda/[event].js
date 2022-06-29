import getEvent from "../../functions/getEvent";
import EventLayout from "../../components/eventLayout";
import Navbar from "../../components/navbar";
import getNavItems from "../../functions/getNavItems";

const Event = ({ event, navItems }) => {
  return (
    <>
      <Navbar navItems={navItems} initiallyHidden={true} />
      <EventLayout event={event} />
    </>
  );
};

export default Event;

export async function getServerSideProps(context) {
  try {
    const navItems = await getNavItems();
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
        navItems,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
