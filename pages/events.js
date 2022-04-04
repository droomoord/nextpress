import getEvents from "../functions/getEvents";
import EventsLayout from "../components/eventsLayout";
import Navbar from "../components/navbar";
import getNavItems from "../functions/getNavItems";

const Events = ({ events, navItems }) => {
  return (
    <>
      <Navbar navItems={navItems} />
      <EventsLayout events={events} />
    </>
  );
};
export default Events;

export async function getStaticProps() {
  try {
    const navItems = await getNavItems();
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    const events = await getEvents();
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        events,
        navItems,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
