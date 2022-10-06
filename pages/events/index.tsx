import { GetStaticProps, GetStaticPropsContext, PreviewData } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";
import { IEvent } from "../../interfaces/Event";

interface IEventsPageProps {
  events?: IEvent[];
}

const EventsPage = (props: IEventsPageProps) => {
  const router = useRouter();
  const { events } = props;

  const findEventsHandler = (selectedYear: string, selectedMonth: string) => {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;

    router.push(fullPath);
  };

  return events ? (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  ) : (
    <></>
  );
};

export const getStaticProps: GetStaticProps<IEventsPageProps> = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { params } = context;
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60
  };
};

export default EventsPage;
