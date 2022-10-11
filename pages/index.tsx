import { GetStaticProps } from "next";
import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-util";
import { IEvent } from "../interfaces/Event";

interface IHomeProps {
  featuredEvents: IEvent[];
}

const HomePage = (props: IHomeProps) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find sweet events that are bussin" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
