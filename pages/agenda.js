import getEvents from "../functions/getEvents";
import EventsLayout from "../components/eventsLayout";
import Navbar from "../components/navbar";
import getNavItems from "../functions/getNavItems";
import settings from "../settings.js";
import Head from "next/head";

const Events = ({ events, navItems }) => {
  return (
    <>
      <Head>
        <title>{settings.title} - Agenda</title>
      </Head>
      <Navbar navItems={navItems} />
      <EventsLayout events={events} />
    </>
  );
};
export default Events;

export async function getServerSideProps(ctx) {
  try {
    const category = ctx.query ? ctx.query.category : null;
    const navItems = await getNavItems();
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    const events = await getEvents(null, category);
    if (!events) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        events,
        navItems,
      },
      // revalidate: settings.revalidationTime,
    };
  } catch (error) {
    console.log(error);
  }
}
