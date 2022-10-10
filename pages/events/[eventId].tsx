import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  PreviewData,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { IEvent } from "../../interfaces/Event";

interface IEventDetailsPageProps {
  event?: IEvent;
}

const EventDetailsPage = (props: IEventDetailsPageProps) => {
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps: GetStaticProps<IEventDetailsPageProps> = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { params } = context;
  const eventId = params?.eventId;
  const event = await getEventById(eventId as string);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailsPage;
