import getEvents from "../functions/getEvents";
import EventsLayout from "../components/eventsLayout";
import Navbar from "../components/navbar";
import getNavItems from "../functions/getNavItems";
import settings from "../settings.js";
import Head from "next/head";

const Events = ({ events, navItems, category, searchQuery }) => {
  return (
    <>
      <Head>
        <title>{settings.title} - Agenda</title>
      </Head>
      <Navbar navItems={navItems} initiallyHidden={true} />
      <EventsLayout
        events={events}
        currentCategory={category}
        currentSearchQuery={searchQuery}
      />
    </>
  );
};
export default Events;

export async function getServerSideProps(ctx) {
  try {
    const category = ctx.query?.category ? ctx.query.category : null;
    const searchQuery = ctx.query?.q ? ctx.query.q : null;
    const navItems = await getNavItems();
    if (!navItems) {
      return {
        notFound: true,
      };
    }
    const events = await getEvents(null, category, searchQuery);
    if (!events) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        events,
        navItems,
        category,
        searchQuery,
      },
      // revalidate: settings.revalidationTime,
    };
  } catch (error) {
    console.log(error);
  }
}
