import getEvents from "../functions/getEvents";
import EventsLayout from "../components/eventsLayout";
import Navbar from "../components/navbar";
import getNavItems from "../functions/getNavItems";
import settings from "../settings.js";
import Head from "next/head";
// import Footer from "../components/footer";

const Events = ({ events, navItems }) => {
  return (
    <>
      <Head>
        <title>{settings.title} - Agenda</title>
      </Head>
      <Navbar navItems={navItems} />
      <EventsLayout events={events} />
      {/* <Footer /> */}
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
      revalidate: settings.revalidationTime,
    };
  } catch (error) {
    console.log(error);
  }
}
