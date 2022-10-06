import { GetStaticProps } from "next";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import { IEvent } from "../interfaces/Event";

interface IHomeProps {
  featuredEvents: IEvent[];
}

const HomePage = (props: IHomeProps) => {
  return (
    <div>
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
